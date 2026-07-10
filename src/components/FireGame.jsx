import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme.jsx'
import { Icon } from './Icons.jsx'

// ─── Fire Drill: a grid fire-spread simulation ────────────────────────────────
// plan phase: player places sprinkler heads on a budget
// sim phase:  fire ignites and spreads; sprinklers activate on heat; occupants evacuate
// done phase: results vs a headless "no sprinklers" run of the exact same fire

const CELL = 34
const SPREAD_MS = 850 // fire attempts to spread this often
const BURN_MS = { fuel: 6500, floor: 4800 } // cell burns out after this
const DOUSE_MS = 1300 // cumulative spray needed to extinguish a burning cell
const ALARM_MS = 1600 // smoke detection delay before occupants move
const OCC_STEP_MS = 340
const TIME_LIMIT = 60000
const RADIUS = 2.6 // sprinkler coverage radius in cells

const LEVELS = {
  office: {
    name: 'The Office',
    budget: 5,
    desc: 'Open plan + private offices. Desks and paper feed the fire.',
    map: [
      '################',
      '#..FF...#..FF..#',
      '#..FF...#..FF..E',
      '#.......#......#',
      '#...O...#..O...#',
      '####.####......#',
      '#..............#',
      '#.FF..O....FF..#',
      '#.FF.......FF..#',
      '#I.............E',
      '################',
    ],
  },
  warehouse: {
    name: 'The Warehouse',
    budget: 6,
    desc: 'High-piled stock racks. Once racks catch, fire moves fast.',
    map: [
      '################',
      '#FFFF.FFFF.FFF.#',
      '#FFFF.FFFF.FFF.E',
      '#..............#',
      '#FFFF.FFFF.FFF.#',
      '#FFFF.IFFF.FFF.#',
      '#..............#',
      '#FFFF.FFFF.O...#',
      '#FFFF.FFFF.....E',
      '#....O.........#',
      '################',
    ],
  },
  restaurant: {
    name: 'The Restaurant',
    budget: 4,
    desc: 'A kitchen flare-up during dinner service. Guests everywhere.',
    map: [
      '################',
      '#FFI...#.......#',
      '#FF....#.O..O..#',
      '#......#.......E',
      '#...####.......#',
      '#..............#',
      '#..O...FF..O...#',
      '#......FF......#',
      '#..O.......O...#',
      '#..............E',
      '################',
    ],
  },
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function parseLevel(def) {
  const rows = def.map.length
  const cols = def.map[0].length
  const cells = []
  const occupants = []
  const exits = []
  let ignition = null
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = def.map[y][x]
      const type = ch === '#' ? 'wall' : ch === 'F' ? 'fuel' : ch === 'E' ? 'exit' : 'floor'
      cells.push({ x, y, type, state: 'intact', burnStart: 0, douse: 0, wet: 0 })
      if (ch === 'O') occupants.push({ x, y, state: 'waiting', px: x, py: y })
      if (ch === 'E') exits.push({ x, y })
      if (ch === 'I') ignition = { x, y }
    }
  }
  return { rows, cols, cells, occupants, exits, ignition }
}

function makeState(levelKey, sprinklers, seed) {
  const def = LEVELS[levelKey]
  const g = parseLevel(def)
  return {
    ...g,
    levelKey,
    sprinklers: sprinklers.map((s) => ({ ...s, active: false, activatedAt: 0 })),
    rng: mulberry32(seed),
    time: 0,
    spreadAcc: 0,
    occAcc: 0,
    alarmed: false,
    finished: false,
    extinguishedAt: null,
  }
}

const at = (s, x, y) => s.cells[y * s.cols + x]
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

function igniteCell(s, x, y) {
  const c = at(s, x, y)
  if (c && (c.type === 'floor' || c.type === 'fuel') && c.state === 'intact') {
    c.state = 'burning'
    c.burnStart = s.time
    c.douse = 0
  }
}

function bfsNext(s, from) {
  // one BFS toward nearest exit avoiding fire/burnt/walls; returns next step or null
  const key = (x, y) => y * s.cols + x
  const passable = (x, y) => {
    const c = at(s, x, y)
    return c && c.type !== 'wall' && c.state !== 'burning' && c.state !== 'burnt'
  }
  const q = [[from.x, from.y]]
  const prev = new Map([[key(from.x, from.y), null]])
  let found = null
  while (q.length) {
    const [x, y] = q.shift()
    if (at(s, x, y).type === 'exit') {
      found = [x, y]
      break
    }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= s.cols || ny >= s.rows) continue
      if (prev.has(key(nx, ny)) || !passable(nx, ny)) continue
      prev.set(key(nx, ny), [x, y])
      q.push([nx, ny])
    }
  }
  if (!found) return null
  let cur = found
  let back = prev.get(key(cur[0], cur[1]))
  while (back && !(back[0] === from.x && back[1] === from.y)) {
    cur = back
    back = prev.get(key(cur[0], cur[1]))
  }
  return back ? { x: cur[0], y: cur[1] } : null
}

function step(s, dt) {
  if (s.finished) return
  s.time += dt
  if (s.time === dt) igniteCell(s, s.ignition.x, s.ignition.y)

  // sprinkler activation + dousing + wetting
  for (const sp of s.sprinklers) {
    if (!sp.active) {
      const heat = s.cells.some((c) => c.state === 'burning' && dist(sp, c) <= RADIUS)
      if (heat) {
        sp.active = true
        sp.activatedAt = s.time
      }
    }
    if (sp.active) {
      for (const c of s.cells) {
        if (dist(sp, c) > RADIUS) continue
        if (c.state === 'burning') {
          c.douse += dt
          if (c.douse >= DOUSE_MS) {
            c.state = 'doused'
          }
        } else if (c.state === 'intact') {
          c.wet = Math.min(c.wet + dt * 2, 8000)
        }
      }
    }
  }

  // burnout
  for (const c of s.cells) {
    if (c.state === 'burning') {
      const dur = c.type === 'fuel' ? BURN_MS.fuel : BURN_MS.floor
      if (s.time - c.burnStart >= dur) c.state = 'burnt'
    } else if (c.wet > 0) {
      c.wet = Math.max(0, c.wet - dt * 0.4)
    }
  }

  // spread
  s.spreadAcc += dt
  while (s.spreadAcc >= SPREAD_MS) {
    s.spreadAcc -= SPREAD_MS
    const burning = s.cells.filter((c) => c.state === 'burning')
    for (const b of burning) {
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const nx = b.x + dx
        const ny = b.y + dy
        if (nx < 0 || ny < 0 || nx >= s.cols || ny >= s.rows) continue
        const n = at(s, nx, ny)
        if (!n || n.state !== 'intact' || n.type === 'wall' || n.type === 'exit') continue
        const diag = dx !== 0 && dy !== 0
        let p = n.type === 'fuel' ? 0.5 : 0.22
        if (diag) p *= 0.45
        if (n.wet > 0) p *= 0.12
        if (s.rng() < p) {
          n.state = 'burning'
          n.burnStart = s.time
          n.douse = 0
        }
      }
    }
  }

  // occupants
  if (!s.alarmed && s.time >= ALARM_MS) s.alarmed = true
  s.occAcc += dt
  const moveNow = s.occAcc >= OCC_STEP_MS
  if (moveNow) s.occAcc -= OCC_STEP_MS
  for (const o of s.occupants) {
    if (o.state === 'out' || o.state === 'overcome') continue
    const here = at(s, o.x, o.y)
    if (here.state === 'burning') {
      o.state = 'overcome'
      continue
    }
    if (!s.alarmed) continue
    if (o.state === 'waiting') o.state = 'evacuating'
    if (moveNow && o.state === 'evacuating') {
      const nxt = bfsNext(s, o)
      if (nxt) {
        o.x = nxt.x
        o.y = nxt.y
        if (at(s, o.x, o.y).type === 'exit') o.state = 'out'
      }
    }
  }

  // end conditions
  const anyBurning = s.cells.some((c) => c.state === 'burning')
  if (!anyBurning && s.time > 1200) {
    s.finished = true
    s.extinguishedAt = s.time
  } else if (s.time >= TIME_LIMIT) {
    s.finished = true
  }
}

function results(s) {
  const burnable = s.cells.filter((c) => c.type === 'floor' || c.type === 'fuel')
  const lost = burnable.filter((c) => c.state === 'burnt' || c.state === 'burning').length
  const saved = Math.round(((burnable.length - lost) / burnable.length) * 100)
  const evac = s.occupants.filter((o) => o.state === 'out').length
  const overcome = s.occupants.filter((o) => o.state === 'overcome').length
  const still = s.occupants.length - evac - overcome
  return {
    saved,
    evac,
    overcome,
    still,
    total: s.occupants.length,
    time: s.extinguishedAt,
    heads: s.sprinklers.filter((sp) => sp.active).length,
  }
}

function runHeadless(levelKey, seed) {
  const s = makeState(levelKey, [], seed)
  while (!s.finished) step(s, 100)
  return results(s)
}

// ─── component ────────────────────────────────────────────────────────────────

export default function FireGame() {
  const t = useTheme()
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const rafRef = useRef(0)
  const [levelKey, setLevelKey] = useState('office')
  const [phase, setPhase] = useState('plan') // plan | sim | done
  const [sprinklers, setSprinklers] = useState([])
  const [speed, setSpeed] = useState(1)
  const [hud, setHud] = useState({ time: 0, saved: 100, evac: 0, total: 0, overcome: 0, active: 0 })
  const [outcome, setOutcome] = useState(null)
  const level = LEVELS[levelKey]
  const seedRef = useRef(1)

  const cols = level.map[0].length
  const rows = level.map.length

  // reset when level changes
  useEffect(() => {
    setPhase('plan')
    setSprinklers([])
    setOutcome(null)
    stateRef.current = null
  }, [levelKey])

  // draw loop (runs in all phases)
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    cv.width = cols * CELL * dpr
    cv.height = rows * CELL * dpr
    ctx.scale(dpr, dpr)

    let last = performance.now()
    let hudAcc = 0

    function frame(now) {
      const dt = Math.min(now - last, 50)
      last = now

      if (phase === 'sim' && stateRef.current && !stateRef.current.finished) {
        step(stateRef.current, dt * speed)
        hudAcc += dt
        if (hudAcc > 180) {
          hudAcc = 0
          const r = results(stateRef.current)
          setHud({
            time: stateRef.current.time,
            saved: r.saved,
            evac: r.evac,
            total: r.total,
            overcome: r.overcome,
            active: r.heads,
          })
        }
        if (stateRef.current.finished) {
          const withS = results(stateRef.current)
          const withoutS = runHeadless(levelKey, seedRef.current)
          setOutcome({ withS, withoutS })
          setPhase('done')
        }
      }

      draw(ctx)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, levelKey, sprinklers, speed])

  function draw(ctx) {
    const s = stateRef.current
    const g = s || parseLevel(level)
    ctx.clearRect(0, 0, cols * CELL, rows * CELL)

    for (const c of g.cells) {
      const px = c.x * CELL
      const py = c.y * CELL
      if (c.type === 'wall') {
        ctx.fillStyle = '#1f2733'
        ctx.fillRect(px, py, CELL, CELL)
        ctx.fillStyle = '#2a3442'
        ctx.fillRect(px + 1, py + 1, CELL - 2, 3)
        continue
      }
      // base floor
      ctx.fillStyle = c.type === 'exit' ? '#123524' : '#0e1319'
      ctx.fillRect(px, py, CELL, CELL)
      ctx.strokeStyle = 'rgba(255,255,255,0.045)'
      ctx.strokeRect(px + 0.5, py + 0.5, CELL - 1, CELL - 1)

      if (c.type === 'exit') {
        ctx.fillStyle = '#34d399'
        ctx.font = 'bold 9px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('EXIT', px + CELL / 2, py + CELL / 2 + 3)
      }
      if (c.type === 'fuel' && c.state !== 'burnt') {
        ctx.fillStyle = c.state === 'burning' ? '#7c4a12' : '#8a6a3b'
        ctx.fillRect(px + 5, py + 5, CELL - 10, CELL - 10)
        ctx.fillStyle = 'rgba(0,0,0,0.25)'
        ctx.fillRect(px + 5, py + CELL / 2, CELL - 10, 2)
      }
      // wet tint
      if (c.wet > 0 && c.state === 'intact') {
        ctx.fillStyle = `rgba(56,152,255,${Math.min(0.28, c.wet / 16000)})`
        ctx.fillRect(px, py, CELL, CELL)
      }
      if (c.state === 'burnt') {
        ctx.fillStyle = '#05070a'
        ctx.fillRect(px, py, CELL, CELL)
        ctx.fillStyle = 'rgba(255,255,255,0.05)'
        ctx.fillRect(px + 8, py + 8, 3, 3)
        ctx.fillRect(px + 20, py + 18, 3, 3)
      }
      if (c.state === 'doused') {
        ctx.fillStyle = '#101c28'
        ctx.fillRect(px, py, CELL, CELL)
        ctx.fillStyle = 'rgba(80,160,255,0.25)'
        ctx.fillRect(px, py, CELL, CELL)
      }
      if (c.state === 'burning') {
        const fl = 0.75 + Math.random() * 0.25
        const grd = ctx.createRadialGradient(px + CELL / 2, py + CELL / 2, 2, px + CELL / 2, py + CELL / 2, CELL * 0.75)
        grd.addColorStop(0, `rgba(255,220,120,${fl})`)
        grd.addColorStop(0.45, `rgba(255,120,40,${fl * 0.95})`)
        grd.addColorStop(1, 'rgba(180,30,10,0.15)')
        ctx.fillStyle = grd
        ctx.fillRect(px - 4, py - 4, CELL + 8, CELL + 8)
        // smoke
        ctx.fillStyle = 'rgba(90,90,100,0.18)'
        ctx.beginPath()
        ctx.arc(px + CELL / 2 + Math.sin((g.time || 0) / 300 + c.x) * 4, py + 4, 9, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // sprinkler coverage in plan phase
    const list = s ? s.sprinklers : sprinklers
    if (phase === 'plan') {
      for (const sp of list) {
        ctx.fillStyle = 'rgba(56,152,255,0.10)'
        ctx.beginPath()
        ctx.arc(sp.x * CELL + CELL / 2, sp.y * CELL + CELL / 2, RADIUS * CELL, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(56,152,255,0.45)'
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.arc(sp.x * CELL + CELL / 2, sp.y * CELL + CELL / 2, RADIUS * CELL, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // sprinkler heads + spray
    for (const sp of list) {
      const cx = sp.x * CELL + CELL / 2
      const cy = sp.y * CELL + CELL / 2
      if (sp.active) {
        for (let i = 0; i < 7; i++) {
          const ang = (i / 7) * Math.PI * 2 + ((g.time || 0) / 150)
          const rr = RADIUS * CELL * (0.35 + 0.6 * ((((g.time || 0) / 90 + i * 13) % 10) / 10))
          ctx.fillStyle = 'rgba(120,190,255,0.7)'
          ctx.beginPath()
          ctx.arc(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, 1.8, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = 'rgba(56,152,255,0.12)'
        ctx.beginPath()
        ctx.arc(cx, cy, RADIUS * CELL, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = sp.active ? '#4da3ff' : '#9fb6cc'
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#0b0f14'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(cx - 4, cy)
      ctx.lineTo(cx + 4, cy)
      ctx.moveTo(cx, cy - 4)
      ctx.lineTo(cx, cy + 4)
      ctx.stroke()
    }

    // occupants
    const occs = s ? s.occupants : parseLevel(level).occupants
    for (const o of occs) {
      if (o.state === 'out') continue
      const cx = o.x * CELL + CELL / 2
      const cy = o.y * CELL + CELL / 2
      if (o.state === 'overcome') {
        ctx.fillStyle = 'rgba(255,80,80,0.85)'
        ctx.font = 'bold 13px Inter'
        ctx.textAlign = 'center'
        ctx.fillText('✕', cx, cy + 4)
        continue
      }
      ctx.fillStyle = '#f5f5f2'
      ctx.beginPath()
      ctx.arc(cx, cy - 3, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillRect(cx - 3, cy + 1, 6, 8)
    }

    // ignition marker in plan phase
    if (phase === 'plan') {
      const ig = parseLevel(level).ignition
      const cx = ig.x * CELL + CELL / 2
      const cy = ig.y * CELL + CELL / 2
      ctx.strokeStyle = 'rgba(255,120,40,0.9)'
      ctx.lineWidth = 2
      ctx.setLineDash([3, 3])
      ctx.strokeRect(ig.x * CELL + 3, ig.y * CELL + 3, CELL - 6, CELL - 6)
      ctx.setLineDash([])
      ctx.fillStyle = '#ff9f1c'
      ctx.font = 'bold 10px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('🔥', cx, cy + 4)
    }
  }

  function onCanvasClick(e) {
    if (phase !== 'plan') return
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = (cols * CELL) / rect.width
    const scaleY = (rows * CELL) / rect.height
    const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL)
    const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL)
    const g = parseLevel(level)
    const c = g.cells[y * cols + x]
    if (!c || c.type === 'wall' || c.type === 'exit') return
    const existing = sprinklers.findIndex((s) => s.x === x && s.y === y)
    if (existing >= 0) {
      setSprinklers(sprinklers.filter((_, i) => i !== existing))
    } else if (sprinklers.length < level.budget) {
      setSprinklers([...sprinklers, { x, y }])
    }
  }

  function start() {
    seedRef.current = Math.floor(Math.random() * 1e9)
    stateRef.current = makeState(levelKey, sprinklers, seedRef.current)
    setHud({ time: 0, saved: 100, evac: 0, total: stateRef.current.occupants.length, overcome: 0, active: 0 })
    setOutcome(null)
    setPhase('sim')
  }

  function reset() {
    stateRef.current = null
    setOutcome(null)
    setPhase('plan')
  }

  return (
    <div className={`${t.card} p-5 md:p-8`}>
      {/* level tabs + controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {Object.entries(LEVELS).map(([k, lv]) => (
          <button
            key={k}
            onClick={() => setLevelKey(k)}
            className={`${t.chip} ${k === levelKey ? '!font-bold ring-2 ring-current' : ''}`}
          >
            {lv.name}
          </button>
        ))}
        <span className={`ml-auto text-sm font-semibold ${t.muted}`}>{level.desc}</span>
      </div>

      {/* HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <HudStat label={phase === 'plan' ? 'Heads to place' : 'Heads activated'} value={phase === 'plan' ? `${level.budget - sprinklers.length} / ${level.budget}` : `${hud.active} / ${sprinklers.length}`} />
        <HudStat label="Property intact" value={`${phase === 'plan' ? 100 : hud.saved}%`} good={hud.saved > 70} />
        <HudStat label="People safe" value={phase === 'plan' ? '—' : `${hud.evac} / ${hud.total}`} bad={hud.overcome > 0} />
        <HudStat label="Clock" value={`${((phase === 'plan' ? 0 : hud.time) / 1000).toFixed(1)}s`} />
      </div>

      {/* canvas */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0b0f14]">
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          style={{ width: '100%', display: 'block', cursor: phase === 'plan' ? 'crosshair' : 'default', aspectRatio: `${cols}/${rows}` }}
        />
        {phase === 'plan' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full pointer-events-none whitespace-nowrap">
            🧯 Click the floor to place {level.budget} sprinkler heads — then hit Start Fire
          </div>
        )}
        {phase === 'done' && outcome && (
          <ResultOverlay outcome={outcome} onReplay={reset} t={t} />
        )}
      </div>

      {/* action bar */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        {phase === 'plan' && (
          <button onClick={start} className={t.btnPrimary} disabled={false}>
            <Icon name="flame" size={18} /> Start the fire
          </button>
        )}
        {phase === 'sim' && (
          <>
            <button onClick={() => setSpeed(speed === 1 ? 3 : 1)} className={t.btnSecondary}>
              {speed === 1 ? '⏩ Fast forward' : '▶ Normal speed'}
            </button>
            <button onClick={reset} className={t.btnSecondary}>
              ↺ Abort & replan
            </button>
          </>
        )}
        {phase === 'done' && (
          <button onClick={reset} className={t.btnPrimary}>
            ↺ Play again
          </button>
        )}
        <div className={`ml-auto flex flex-wrap gap-x-4 gap-y-1 text-xs ${t.muted}`}>
          <Legend swatch="#8a6a3b" label="Furniture / stock (burns fast)" />
          <Legend swatch="#4da3ff" label="Sprinkler head" round />
          <Legend swatch="#34d399" label="Exit" />
          <Legend swatch="#ff7828" label="Fire" round />
        </div>
      </div>
    </div>
  )
}

function HudStat({ label, value, good, bad }) {
  const t = useTheme()
  return (
    <div className={`${t.card} !shadow-none p-3 text-center`}>
      <p className={`text-[11px] font-bold uppercase tracking-wider ${t.muted}`}>{label}</p>
      <p className={`text-xl font-bold mt-0.5 ${bad ? 'text-red-500' : good ? 'text-emerald-500' : ''}`}>{value}</p>
    </div>
  )
}

function Legend({ swatch, label, round }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-3 h-3 inline-block ${round ? 'rounded-full' : 'rounded-sm'}`} style={{ background: swatch }} />
      {label}
    </span>
  )
}

function ResultOverlay({ outcome, onReplay, t }) {
  const { withS, withoutS } = outcome
  const win = withS.saved >= 70 && withS.overcome === 0
  return (
    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full text-center text-white py-4">
        <p className="text-4xl mb-2">{win ? '🏆' : withS.saved >= 40 ? '⚠️' : '🔥'}</p>
        <h3 className="text-2xl font-bold">
          {win ? 'Building saved.' : withS.saved >= 40 ? 'Partial save — tough fire.' : 'The fire won this round.'}
        </h3>
        <p className="text-sm text-white/70 mt-1">
          {withS.time ? `Fire controlled in ${(withS.time / 1000).toFixed(1)}s.` : 'The fire burned until the clock ran out.'}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6 text-left">
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Your sprinklers</p>
            <p className="text-3xl font-bold mt-1">{withS.saved}%</p>
            <p className="text-xs text-white/60">property intact</p>
            <p className="text-sm mt-2 font-semibold">
              {withS.evac}/{withS.total} people out safely
            </p>
          </div>
          <div className="rounded-xl border border-red-400/40 bg-red-400/10 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-red-300">Same fire, no sprinklers</p>
            <p className="text-3xl font-bold mt-1">{withoutS.saved}%</p>
            <p className="text-xs text-white/60">property intact</p>
            <p className="text-sm mt-2 font-semibold">
              {withoutS.evac}/{withoutS.total} people out safely
            </p>
          </div>
        </div>

        <p className="text-sm text-white/80 mt-5 leading-relaxed">
          That gap is what a sprinkler system buys. In real fires, sprinklers control the
          blaze in ~96% of cases where they operate — usually with just one or two heads
          (NFPA).
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button onClick={onReplay} className={t.btnPrimary}>↺ Play again</button>
          <a href="tel:+19738178114" className={t.btnSecondary}>Protect a real building</a>
        </div>
      </div>
    </div>
  )
}
