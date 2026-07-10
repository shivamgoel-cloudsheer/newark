import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme.jsx'
import { Icon } from './Icons.jsx'

// ─── FIRE DRILL v2 — grid fire simulation with a particle renderer ───────────
// plan → countdown → sim → done. Results compare the same seeded fire
// re-run headless with zero sprinklers.

const CELL = 40
const SPREAD_MS = 850
const BURN_MS = { fuel: 6500, floor: 4800 }
const DOUSE_MS = 1300
const ALARM_MS = 1600
const OCC_STEP_MS = 340
const TIME_LIMIT = 60000
const RADIUS = 2.6

const LEVELS = {
  office: {
    name: 'Office',
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
    name: 'Warehouse',
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
    name: 'Restaurant',
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
  let ignition = null
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ch = def.map[y][x]
      const type = ch === '#' ? 'wall' : ch === 'F' ? 'fuel' : ch === 'E' ? 'exit' : 'floor'
      cells.push({ x, y, type, state: 'intact', burnStart: 0, douse: 0, wet: 0 })
      if (ch === 'O') occupants.push({ x, y, state: 'waiting', rx: x, ry: y })
      if (ch === 'I') ignition = { x, y }
    }
  }
  return { rows, cols, cells, occupants, ignition }
}

function makeState(levelKey, sprinklers, seed) {
  const g = parseLevel(LEVELS[levelKey])
  return {
    ...g,
    levelKey,
    sprinklers: sprinklers.map((s) => ({ ...s, active: false })),
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

function bfsNext(s, from) {
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
      const nx = x + dx, ny = y + dy
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
  if (s.time === dt) {
    const c = at(s, s.ignition.x, s.ignition.y)
    if (c.state === 'intact') {
      c.state = 'burning'
      c.burnStart = s.time
    }
  }

  for (const sp of s.sprinklers) {
    if (!sp.active && s.cells.some((c) => c.state === 'burning' && dist(sp, c) <= RADIUS)) {
      sp.active = true
      sp.activatedAt = s.time
    }
    if (sp.active) {
      for (const c of s.cells) {
        if (dist(sp, c) > RADIUS) continue
        if (c.state === 'burning') {
          c.douse += dt
          if (c.douse >= DOUSE_MS) c.state = 'doused'
        } else if (c.state === 'intact') {
          c.wet = Math.min(c.wet + dt * 2, 8000)
        }
      }
    }
  }

  for (const c of s.cells) {
    if (c.state === 'burning') {
      if (s.time - c.burnStart >= (c.type === 'fuel' ? BURN_MS.fuel : BURN_MS.floor)) c.state = 'burnt'
    } else if (c.wet > 0) {
      c.wet = Math.max(0, c.wet - dt * 0.4)
    }
  }

  s.spreadAcc += dt
  while (s.spreadAcc >= SPREAD_MS) {
    s.spreadAcc -= SPREAD_MS
    for (const b of s.cells.filter((c) => c.state === 'burning')) {
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const n = at(s, b.x + dx, b.y + dy)
        if (!n || n.state !== 'intact' || n.type === 'wall' || n.type === 'exit') continue
        let p = n.type === 'fuel' ? 0.5 : 0.22
        if (dx !== 0 && dy !== 0) p *= 0.45
        if (n.wet > 0) p *= 0.12
        if (s.rng() < p) {
          n.state = 'burning'
          n.burnStart = s.time
          n.douse = 0
        }
      }
    }
  }

  if (!s.alarmed && s.time >= ALARM_MS) s.alarmed = true
  s.occAcc += dt
  const moveNow = s.occAcc >= OCC_STEP_MS
  if (moveNow) s.occAcc -= OCC_STEP_MS
  for (const o of s.occupants) {
    if (o.state === 'out' || o.state === 'overcome') continue
    if (at(s, o.x, o.y).state === 'burning') {
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
  return { saved, evac, overcome, total: s.occupants.length, time: s.extinguishedAt, heads: s.sprinklers.filter((sp) => sp.active).length }
}

function runHeadless(levelKey, seed) {
  const s = makeState(levelKey, [], seed)
  while (!s.finished) step(s, 100)
  return results(s)
}

// greedy auto-placement: cover fuel + ignition with spaced heads
function autoPlace(levelKey) {
  const g = parseLevel(LEVELS[levelKey])
  const budget = LEVELS[levelKey].budget
  const candidates = g.cells.filter((c) => c.type === 'floor' || c.type === 'fuel')
  const value = (c) => {
    let v = 0
    for (const o of g.cells) {
      if (dist(c, o) > RADIUS) continue
      if (o.type === 'fuel') v += 3
      else if (o.type === 'floor') v += 1
      if (o.x === g.ignition.x && o.y === g.ignition.y) v += 14
    }
    return v
  }
  const picked = []
  const scored = candidates.map((c) => ({ c, v: value(c) })).sort((a, b) => b.v - a.v)
  for (const { c } of scored) {
    if (picked.length >= budget) break
    if (picked.every((p) => dist(p, c) >= RADIUS * 1.35)) picked.push({ x: c.x, y: c.y })
  }
  return picked
}

// ─── component ────────────────────────────────────────────────────────────────

export default function FireGame() {
  const t = useTheme()
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const particlesRef = useRef([])
  const pingsRef = useRef([])
  const shakeRef = useRef(null)
  const hoverRef = useRef(null)
  const countdownRef = useRef(0)
  const prevActiveRef = useRef(new Set())
  const seedRef = useRef(1)
  const pausedRef = useRef(false)

  const [levelKey, setLevelKey] = useState('office')
  const [phase, setPhase] = useState('plan') // plan | countdown | sim | done
  const [sprinklers, setSprinklers] = useState([])
  const [speed, setSpeed] = useState(1)
  const [paused, setPaused] = useState(false)
  const [hud, setHud] = useState({ time: 0, saved: 100, evac: 0, total: 0, overcome: 0, active: 0 })
  const [outcome, setOutcome] = useState(null)
  const level = LEVELS[levelKey]
  const cols = level.map[0].length
  const rows = level.map.length

  pausedRef.current = paused

  useEffect(() => {
    setPhase('plan')
    setSprinklers([])
    setOutcome(null)
    stateRef.current = null
    particlesRef.current = []
    pingsRef.current = []
  }, [levelKey])

  // main loop
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = cols * CELL * dpr
    cv.height = rows * CELL * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    let raf = 0
    let last = performance.now()
    let hudAcc = 0

    function frame(now) {
      const dt = Math.min(now - last, 50)
      last = now

      if (phase === 'countdown') {
        if (now - countdownRef.current >= 2400) {
          shakeRef.current = { t0: now, mag: 7 }
          setPhase('sim')
        }
      }

      if (phase === 'sim' && stateRef.current && !stateRef.current.finished && !pausedRef.current) {
        step(stateRef.current, dt * speed)
        // detect newly activated heads → ping
        for (const sp of stateRef.current.sprinklers) {
          const k = `${sp.x},${sp.y}`
          if (sp.active && !prevActiveRef.current.has(k)) {
            prevActiveRef.current.add(k)
            pingsRef.current.push({ x: sp.x, y: sp.y, t0: now })
          }
        }
        hudAcc += dt
        if (hudAcc > 160) {
          hudAcc = 0
          const r = results(stateRef.current)
          setHud({ time: stateRef.current.time, saved: r.saved, evac: r.evac, total: r.total, overcome: r.overcome, active: r.heads })
        }
        if (stateRef.current.finished) {
          const withS = results(stateRef.current)
          const withoutS = runHeadless(levelKey, seedRef.current)
          setHud((h) => ({ ...h, saved: withS.saved, evac: withS.evac, overcome: withS.overcome, active: withS.heads }))
          setOutcome({ withS, withoutS })
          setPhase('done')
        }
      }

      draw(ctx, now, dt)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, levelKey, sprinklers, speed])

  // ── renderer ──
  function draw(ctx, now, dt) {
    const s = stateRef.current
    const g = s || parseLevel(level)
    const W = cols * CELL
    const H = rows * CELL

    ctx.save()
    // screen shake
    if (shakeRef.current) {
      const el = now - shakeRef.current.t0
      if (el < 450) {
        const k = (1 - el / 450) * shakeRef.current.mag
        ctx.translate((Math.random() - 0.5) * k, (Math.random() - 0.5) * k)
      } else shakeRef.current = null
    }

    // backdrop
    const bgg = ctx.createLinearGradient(0, 0, 0, H)
    bgg.addColorStop(0, '#0d1117')
    bgg.addColorStop(1, '#090b0f')
    ctx.fillStyle = bgg
    ctx.fillRect(-8, -8, W + 16, H + 16)

    // cells
    for (const c of g.cells) {
      const px = c.x * CELL
      const py = c.y * CELL
      if (c.type === 'wall') {
        ctx.fillStyle = '#232b37'
        rr(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 5)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.07)'
        rr(ctx, px + 1, py + 1, CELL - 2, 6, 5)
        ctx.fill()
        continue
      }
      // floor
      ctx.fillStyle = c.type === 'exit' ? '#0d2b1e' : (c.x + c.y) % 2 ? '#11151c' : '#12161e'
      rr(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 4)
      ctx.fill()

      if (c.type === 'exit') {
        const pulse = 0.5 + 0.5 * Math.sin(now / 450)
        ctx.strokeStyle = `rgba(52,211,153,${0.35 + pulse * 0.45})`
        ctx.lineWidth = 1.6
        rr(ctx, px + 2.5, py + 2.5, CELL - 5, CELL - 5, 4)
        ctx.stroke()
        ctx.fillStyle = `rgba(52,211,153,${0.75 + pulse * 0.25})`
        ctx.font = 'bold 9.5px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('EXIT', px + CELL / 2, py + CELL / 2 + 3.5)
      }

      // furniture / stock
      if (c.type === 'fuel' && c.state !== 'burnt') {
        ctx.fillStyle = c.state === 'burning' ? '#6b3d10' : '#8a6a3b'
        rr(ctx, px + 6, py + 7, CELL - 12, CELL - 15, 3)
        ctx.fill()
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(px + 8, py + CELL - 10, 3, 4)
        ctx.fillRect(px + CELL - 11, py + CELL - 10, 3, 4)
        ctx.fillStyle = 'rgba(255,255,255,0.09)'
        ctx.fillRect(px + 6, py + 7, CELL - 12, 2.5)
      }

      if (c.wet > 0 && c.state === 'intact') {
        ctx.fillStyle = `rgba(64,156,255,${Math.min(0.3, c.wet / 15000)})`
        rr(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 4)
        ctx.fill()
      }
      if (c.state === 'burnt') {
        ctx.fillStyle = '#05070a'
        rr(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 4)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.04)'
        ctx.fillRect(px + 9, py + 10, 3, 3)
        ctx.fillRect(px + 24, py + 22, 3, 3)
      }
      if (c.state === 'doused') {
        ctx.fillStyle = 'rgba(64,120,190,0.22)'
        rr(ctx, px + 1, py + 1, CELL - 2, CELL - 2, 4)
        ctx.fill()
      }

      if (c.state === 'burning') {
        const fl = 0.72 + Math.random() * 0.28
        const grd = ctx.createRadialGradient(px + CELL / 2, py + CELL / 2, 2, px + CELL / 2, py + CELL / 2, CELL * 0.78)
        grd.addColorStop(0, `rgba(255,225,130,${fl})`)
        grd.addColorStop(0.45, `rgba(255,122,41,${fl * 0.95})`)
        grd.addColorStop(1, 'rgba(170,28,8,0.12)')
        ctx.fillStyle = grd
        ctx.fillRect(px - 5, py - 5, CELL + 10, CELL + 10)
        // spawn particles (cap total)
        if (particlesRef.current.length < 420 && !pausedRef.current) {
          for (let i = 0; i < 2; i++) {
            particlesRef.current.push({
              kind: Math.random() < 0.78 ? 'flame' : 'smoke',
              x: px + 6 + Math.random() * (CELL - 12),
              y: py + 8 + Math.random() * (CELL - 12),
              vx: (Math.random() - 0.5) * 0.18,
              vy: -0.35 - Math.random() * 0.5,
              life: 0,
              max: 520 + Math.random() * 480,
              r: 2.5 + Math.random() * 3.5,
            })
          }
          if (Math.random() < 0.12) {
            particlesRef.current.push({
              kind: 'spark', x: px + CELL / 2, y: py + CELL / 2,
              vx: (Math.random() - 0.5) * 1.6, vy: -0.8 - Math.random() * 1.4,
              life: 0, max: 700, r: 1.2,
            })
          }
        }
      }
    }

    // sprinkler coverage (plan) + hover ghost
    const list = s ? s.sprinklers : sprinklers
    if (phase === 'plan') {
      for (const sp of list) coverageCircle(ctx, sp.x, sp.y, 'rgba(64,156,255,0.5)', 'rgba(64,156,255,0.10)')
      const hv = hoverRef.current
      if (hv && !list.some((p) => p.x === hv.x && p.y === hv.y) && list.length < level.budget) {
        coverageCircle(ctx, hv.x, hv.y, 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0.05)')
      }
    }

    // water spray particles from active heads
    if (!pausedRef.current) {
      for (const sp of list) {
        if (!sp.active) continue
        if (particlesRef.current.length < 480) {
          for (let i = 0; i < 3; i++) {
            const ang = Math.random() * Math.PI * 2
            const spd = 0.8 + Math.random() * 1.4
            particlesRef.current.push({
              kind: 'water',
              x: sp.x * CELL + CELL / 2,
              y: sp.y * CELL + CELL / 2,
              vx: Math.cos(ang) * spd,
              vy: Math.sin(ang) * spd * 0.6 - 0.2,
              life: 0, max: 380 + Math.random() * 200, r: 1.4 + Math.random(),
            })
          }
        }
      }
    }

    // particles
    const ps = particlesRef.current
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i]
      if (!pausedRef.current) {
        p.life += dt
        p.x += p.vx * dt * 0.08
        p.y += p.vy * dt * 0.08
        if (p.kind === 'water') p.vy += dt * 0.004
        if (p.kind === 'smoke') p.vx += (Math.random() - 0.5) * 0.05
      }
      const k = p.life / p.max
      if (k >= 1) {
        ps.splice(i, 1)
        continue
      }
      if (p.kind === 'flame') {
        ctx.fillStyle = `rgba(${255},${Math.round(200 - k * 150)},${Math.round(90 - k * 80)},${(1 - k) * 0.7})`
      } else if (p.kind === 'smoke') {
        ctx.fillStyle = `rgba(120,124,134,${(1 - k) * 0.22})`
      } else if (p.kind === 'spark') {
        ctx.fillStyle = `rgba(255,214,102,${(1 - k) * 0.95})`
      } else {
        ctx.fillStyle = `rgba(120,190,255,${(1 - k) * 0.8})`
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * (p.kind === 'smoke' ? 1 + k * 2.2 : 1 - k * 0.4), 0, Math.PI * 2)
      ctx.fill()
    }

    // sprinkler heads
    for (const sp of list) {
      const cx = sp.x * CELL + CELL / 2
      const cy = sp.y * CELL + CELL / 2
      if (sp.active) {
        ctx.fillStyle = 'rgba(64,156,255,0.10)'
        ctx.beginPath()
        ctx.arc(cx, cy, RADIUS * CELL, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.fillStyle = sp.active ? '#4da3ff' : '#a9bed4'
      ctx.beginPath()
      ctx.arc(cx, cy, 6.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#0a0c10'
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(cx - 4, cy)
      ctx.lineTo(cx + 4, cy)
      ctx.moveTo(cx, cy - 4)
      ctx.lineTo(cx, cy + 4)
      ctx.stroke()
    }

    // activation pings
    for (let i = pingsRef.current.length - 1; i >= 0; i--) {
      const ping = pingsRef.current[i]
      const el = now - ping.t0
      if (el > 900) {
        pingsRef.current.splice(i, 1)
        continue
      }
      const k = el / 900
      ctx.strokeStyle = `rgba(120,190,255,${(1 - k) * 0.85})`
      ctx.lineWidth = 2.4 * (1 - k) + 0.6
      ctx.beginPath()
      ctx.arc(ping.x * CELL + CELL / 2, ping.y * CELL + CELL / 2, 8 + k * RADIUS * CELL, 0, Math.PI * 2)
      ctx.stroke()
    }

    // occupants — lerped movement
    const occs = s ? s.occupants : parseLevel(level).occupants
    for (const o of occs) {
      if (o.state === 'out') continue
      if (o.rx === undefined) { o.rx = o.x; o.ry = o.y }
      o.rx += (o.x - o.rx) * Math.min(1, dt / 160)
      o.ry += (o.y - o.ry) * Math.min(1, dt / 160)
      const cx = o.rx * CELL + CELL / 2
      const cy = o.ry * CELL + CELL / 2
      if (o.state === 'overcome') {
        ctx.fillStyle = 'rgba(255,92,92,0.9)'
        ctx.font = 'bold 14px Inter'
        ctx.textAlign = 'center'
        ctx.fillText('✕', cx, cy + 4)
        continue
      }
      // soft shadow
      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.beginPath()
      ctx.ellipse(cx, cy + 8, 6, 2.4, 0, 0, Math.PI * 2)
      ctx.fill()
      const moving = o.state === 'evacuating'
      const bob = moving ? Math.sin(now / 90) * 1.6 : 0
      ctx.fillStyle = moving ? '#ffd166' : '#f2f5f9'
      ctx.beginPath()
      ctx.arc(cx, cy - 4 + bob, 4.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillRect(cx - 3.2, cy + bob, 6.4, 8.5)
    }

    // ignition marker (plan)
    if (phase === 'plan') {
      const ig = g.ignition
      const px = ig.x * CELL
      const py = ig.y * CELL
      const pulse = 0.5 + 0.5 * Math.sin(now / 300)
      ctx.strokeStyle = `rgba(255,122,41,${0.5 + pulse * 0.5})`
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      rr(ctx, px + 3, py + 3, CELL - 6, CELL - 6, 5)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.font = '15px serif'
      ctx.textAlign = 'center'
      ctx.fillText('🔥', px + CELL / 2, py + CELL / 2 + 5)
    }

    // vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 0.95)
    vg.addColorStop(0, 'rgba(0,0,0,0)')
    vg.addColorStop(1, 'rgba(0,0,0,0.35)')
    ctx.fillStyle = vg
    ctx.fillRect(0, 0, W, H)

    // countdown overlay number
    if (phase === 'countdown') {
      const el = now - countdownRef.current
      const n = Math.max(1, 3 - Math.floor(el / 800))
      const frac = (el % 800) / 800
      ctx.fillStyle = 'rgba(5,7,10,0.55)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = `rgba(255,255,255,${1 - frac * 0.7})`
      ctx.font = `bold ${64 + frac * 28}px "Space Grotesk", Inter, sans-serif`
      ctx.textAlign = 'center'
      ctx.fillText(String(n), W / 2, H / 2 + 24)
      ctx.font = 'bold 13px Inter, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.fillText('IGNITION IMMINENT', W / 2, H / 2 + 56)
    }

    ctx.restore()
  }

  function coverageCircle(ctx, x, y, stroke, fill) {
    const cx = x * CELL + CELL / 2
    const cy = y * CELL + CELL / 2
    ctx.fillStyle = fill
    ctx.beginPath()
    ctx.arc(cx, cy, RADIUS * CELL, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = stroke
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.arc(cx, cy, RADIUS * CELL, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
  }

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  function cellFromEvent(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.floor((((e.clientX - rect.left) * cols) / rect.width))
    const y = Math.floor((((e.clientY - rect.top) * rows) / rect.height))
    if (x < 0 || y < 0 || x >= cols || y >= rows) return null
    return { x, y }
  }

  function onClick(e) {
    if (phase !== 'plan') return
    const cell = cellFromEvent(e)
    if (!cell) return
    const g = parseLevel(level)
    const c = g.cells[cell.y * cols + cell.x]
    if (!c || c.type === 'wall' || c.type === 'exit') return
    const idx = sprinklers.findIndex((s) => s.x === cell.x && s.y === cell.y)
    if (idx >= 0) setSprinklers(sprinklers.filter((_, i) => i !== idx))
    else if (sprinklers.length < level.budget) setSprinklers([...sprinklers, cell])
  }

  function onMove(e) {
    if (phase !== 'plan') return
    const cell = cellFromEvent(e)
    if (!cell) return (hoverRef.current = null)
    const g = parseLevel(level)
    const c = g.cells[cell.y * cols + cell.x]
    hoverRef.current = c && c.type !== 'wall' && c.type !== 'exit' ? cell : null
  }

  function start() {
    seedRef.current = Math.floor(Math.random() * 1e9)
    stateRef.current = makeState(levelKey, sprinklers, seedRef.current)
    particlesRef.current = []
    pingsRef.current = []
    prevActiveRef.current = new Set()
    setHud({ time: 0, saved: 100, evac: 0, total: stateRef.current.occupants.length, overcome: 0, active: 0 })
    setOutcome(null)
    setPaused(false)
    countdownRef.current = performance.now()
    setPhase('countdown')
  }

  function reset(keepHeads = true) {
    stateRef.current = null
    particlesRef.current = []
    pingsRef.current = []
    setOutcome(null)
    setPaused(false)
    if (!keepHeads) setSprinklers([])
    setPhase('plan')
  }

  const fireCells = phase === 'sim' && stateRef.current ? stateRef.current.cells.filter((c) => c.state === 'burning').length : 0

  return (
    <div className={`${t.card} p-5 md:p-8`}>
      {/* level tabs */}
      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        {Object.entries(LEVELS).map(([k, lv]) => (
          <button
            key={k}
            onClick={() => setLevelKey(k)}
            className={`${t.chip} !px-4 !py-2 ${k === levelKey ? `!font-bold ring-2 ring-current ${t.accentText}` : ''}`}
          >
            {lv.name}
          </button>
        ))}
        <span className={`ml-auto hidden md:inline text-sm ${t.muted}`}>{level.desc}</span>
      </div>

      {/* HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <HudStat
          label={phase === 'plan' ? 'Heads remaining' : 'Heads activated'}
          value={phase === 'plan' ? `${level.budget - sprinklers.length} / ${level.budget}` : `${hud.active} / ${sprinklers.length}`}
        />
        <HudStat label="Property intact" value={`${phase === 'plan' ? 100 : hud.saved}%`} good={hud.saved > 70} bad={hud.saved < 45 && phase !== 'plan'} />
        <HudStat label="People safe" value={phase === 'plan' ? '—' : `${hud.evac} / ${hud.total}`} bad={hud.overcome > 0} />
        <HudStat label="Active fire" value={phase === 'plan' ? '—' : `${fireCells} cells`} bad={fireCells > 10} />
      </div>

      {/* canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#090b0f] shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]">
        <canvas
          ref={canvasRef}
          onClick={onClick}
          onMouseMove={onMove}
          onMouseLeave={() => (hoverRef.current = null)}
          style={{ width: '100%', display: 'block', cursor: phase === 'plan' ? 'crosshair' : 'default', aspectRatio: `${cols}/${rows}`, touchAction: 'manipulation' }}
        />
        {phase === 'plan' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur text-white text-[11px] md:text-sm font-semibold px-4 py-2 rounded-full pointer-events-none whitespace-nowrap border border-white/15">
            🧯 Tap the floor to place {level.budget} heads — the 🔥 marks ignition
          </div>
        )}
        {phase === 'done' && outcome && <ResultOverlay outcome={outcome} onReplay={() => reset(true)} onReplan={() => reset(false)} t={t} />}
      </div>

      {/* action bar */}
      <div className="flex flex-wrap items-center gap-3 mt-5">
        {phase === 'plan' && (
          <>
            <button onClick={start} className={t.btnPrimary} disabled={sprinklers.length === 0 && false}>
              <Icon name="flame" size={18} /> Start the fire
            </button>
            <button onClick={() => setSprinklers(autoPlace(levelKey))} className={t.btnSecondary}>
              ✨ Pro layout
            </button>
            {sprinklers.length > 0 && (
              <button onClick={() => setSprinklers([])} className={t.chip + ' !py-2.5'}>
                Clear heads
              </button>
            )}
          </>
        )}
        {phase === 'sim' && (
          <>
            <button onClick={() => setPaused(!paused)} className={t.btnSecondary}>
              {paused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={() => setSpeed(speed === 1 ? 3 : 1)} className={t.btnSecondary}>
              {speed === 1 ? '⏩ 3× speed' : '▶ 1× speed'}
            </button>
            <button onClick={() => reset(true)} className={t.chip + ' !py-2.5'}>
              ↺ Abort & replan
            </button>
          </>
        )}
        {phase === 'done' && (
          <button onClick={() => reset(true)} className={t.btnPrimary}>
            ↺ Play again
          </button>
        )}
        <div className={`ml-auto hidden md:flex flex-wrap gap-x-4 gap-y-1 text-xs ${t.muted}`}>
          <Legend swatch="#8a6a3b" label="Furniture / stock" />
          <Legend swatch="#4da3ff" label="Sprinkler" round />
          <Legend swatch="#34d399" label="Exit" />
          <Legend swatch="#ff7a29" label="Fire" round />
        </div>
      </div>
    </div>
  )
}

function HudStat({ label, value, good, bad }) {
  const t = useTheme()
  return (
    <div className={`${t.card} p-3.5 text-center`}>
      <p className={`text-[10.5px] font-bold uppercase tracking-[0.14em] ${t.muted}`}>{label}</p>
      <p className={`text-xl font-bold mt-1 tabular-nums ${bad ? 'text-red-500' : good ? 'text-emerald-500' : ''}`}>{value}</p>
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

function Bar({ pct, color, delay }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const id = setTimeout(() => setW(pct), 200 + delay)
    return () => clearTimeout(id)
  }, [pct, delay])
  return (
    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  )
}

function ResultOverlay({ outcome, onReplay, onReplan, t }) {
  const { withS, withoutS } = outcome
  const allSafe = withS.overcome === 0
  const stars = (withS.saved >= 80 && allSafe ? 1 : 0) + (withS.saved >= 55 && allSafe ? 1 : 0) + (withS.time && withS.time < 22000 ? 1 : 0)
  const title = stars === 3 ? 'Flawless response.' : stars === 2 ? 'Building saved.' : stars === 1 ? 'Close call.' : 'The fire won this round.'
  return (
    <div className="absolute inset-0 bg-black/88 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full text-white py-4 animate-rise">
        <div className="text-center">
          <div className="flex justify-center gap-1.5 mb-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`text-3xl transition-all duration-500 ${i < stars ? 'scale-100' : 'scale-90 opacity-25 grayscale'}`} style={{ transitionDelay: `${400 + i * 250}ms` }}>
                ⭐
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-sm text-white/60 mt-1">
            {withS.time
              ? `Fire controlled in ${(withS.time / 1000).toFixed(1)}s by ${withS.heads} head${withS.heads === 1 ? '' : 's'}.`
              : 'The fire burned until the clock ran out.'}
          </p>
        </div>

        <div className="mt-7 space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-sky-300">WITH your sprinklers</span>
              <span className="tabular-nums">{withS.saved}% saved · {withS.evac}/{withS.total} safe</span>
            </div>
            <Bar pct={withS.saved} color="linear-gradient(90deg,#38bdf8,#34d399)" delay={0} />
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span className="text-red-300">Same fire, NO sprinklers</span>
              <span className="tabular-nums">{withoutS.saved}% saved · {withoutS.evac}/{withoutS.total} safe</span>
            </div>
            <Bar pct={withoutS.saved} color="linear-gradient(90deg,#f87171,#b91c1c)" delay={350} />
          </div>
        </div>

        <p className="text-[13px] text-white/70 mt-6 leading-relaxed text-center">
          That gap is what a sprinkler system buys. In real fires, sprinklers control the blaze
          in ~96% of cases where they operate — usually with just one or two heads (NFPA).
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <button onClick={onReplay} className={t.btnPrimary}>↺ Same layout</button>
          <button onClick={onReplan} className={t.btnSecondary}>✎ New layout</button>
          <a href="tel:+19738178114" className={t.btnGhost + ' !text-white !border-white/25'}>Protect a real building</a>
        </div>
      </div>
    </div>
  )
}
