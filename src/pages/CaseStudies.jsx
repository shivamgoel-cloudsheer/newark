import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { caseStudies } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { CTABand } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'

export default function CaseStudies() {
  const t = useTheme()
  const { variantId } = useParams()
  const [flagship, ...rest] = caseStudies
  return (
    <>
      <PageHero
        kicker="Case Studies"
        title="Buildings we protect"
        sub="Head counts, square footage and deadlines — the numbers behind the work."
      />

      {/* flagship */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className={`${t.card} overflow-hidden grid lg:grid-cols-2`}>
          <div className="p-8 md:p-12 flex flex-col">
            <span className={t.badge}>
              <Icon name="building" size={14} /> Flagship project · {flagship.sector}
            </span>
            <h2 className={`${t.display} text-3xl md:text-4xl mt-4 leading-tight`}>{flagship.title}</h2>
            <p className={`mt-4 leading-relaxed ${t.muted}`}>{flagship.summary}</p>
            <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>{flagship.body}</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {flagship.metrics.map((m) => (
                <div key={m.label}>
                  <p className={`${t.display} text-2xl md:text-3xl ${t.accentText}`}>{m.value}</p>
                  <p className={`text-xs mt-0.5 ${t.muted}`}>{m.label}</p>
                </div>
              ))}
            </div>
            <Link to={`/${variantId}/contact`} className={`${t.btnPrimary} mt-8 self-start`}>
              Start your project <Icon name="arrow" size={16} />
            </Link>
          </div>
          {/* stylized building visual */}
          <div className="relative min-h-[320px] flex items-end justify-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${flagship.accent}, #16181d)` }}>
            <BuildingArt />
          </div>
        </div>
      </section>

      {/* rest */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {rest.map((cs) => (
            <div key={cs.slug} className={`${t.card} ${t.cardHover} overflow-hidden flex flex-col`}>
              <div className="h-32 relative flex items-end p-4" style={{ background: `linear-gradient(135deg, ${cs.accent}, ${cs.accent}55)` }}>
                <span className="absolute top-3 right-3 text-white/80">
                  <Icon name="building" size={28} />
                </span>
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">
                  {cs.sector}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className={`${t.display} text-lg leading-snug`}>{cs.title}</h3>
                <p className={`mt-2 text-sm flex-1 ${t.muted}`}>{cs.summary}</p>
                <div className="mt-4 pt-4 border-t border-current/10 grid grid-cols-3 gap-2">
                  {cs.metrics.map((m) => (
                    <span key={m.label}>
                      <span className={`block font-bold text-sm ${t.accentText}`}>{m.value}</span>
                      <span className={`block text-[11px] ${t.muted}`}>{m.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}

function BuildingArt() {
  // simple SVG tower with lit windows + sprinkler grid overlay
  return (
    <svg viewBox="0 0 300 260" className="w-4/5 max-w-[340px]" aria-hidden>
      <rect x="70" y="30" width="110" height="230" fill="#0d1117" opacity="0.85" />
      <rect x="180" y="90" width="70" height="170" fill="#0d1117" opacity="0.65" />
      {Array.from({ length: 9 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={82 + c * 24}
            y={44 + r * 24}
            width="14"
            height="12"
            fill={(r * 4 + c) % 5 === 0 ? '#ffd166' : '#ffffff'}
            opacity={(r * 4 + c) % 5 === 0 ? 0.9 : 0.18}
          />
        )),
      )}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 2 }).map((_, c) => (
          <rect key={`b-${r}-${c}`} x={192 + c * 28} y={104 + r * 26} width="16" height="12" fill="#ffffff" opacity="0.14" />
        )),
      )}
      <g stroke="#7dd3fc" strokeWidth="1.2" opacity="0.9">
        <line x1="70" y1="24" x2="250" y2="24" />
        {[90, 130, 170, 210].map((x) => (
          <g key={x}>
            <line x1={x} y1="24" x2={x} y2="30" />
            <circle cx={x} cy="33" r="2.5" fill="#7dd3fc" />
          </g>
        ))}
      </g>
      <text x="75" y="18" fill="#7dd3fc" fontSize="9" fontFamily="monospace" opacity="0.9">
        WET SYSTEM · 2,638 HEADS
      </text>
    </svg>
  )
}
