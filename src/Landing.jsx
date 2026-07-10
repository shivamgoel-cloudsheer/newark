import { Link } from 'react-router-dom'
import { variants, company } from './data/content.js'
import { Icon } from './components/Icons.jsx'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-white font-grotesk relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#ff6b35]/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#d7263d] text-white">
            <Icon name="flame" size={24} />
          </span>
          <div>
            <p className="font-bold leading-tight">{company.shortName}</p>
            <p className="text-xs text-slate-400">Website Redesign · Concept Gallery</p>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Three concepts.<br />
          One <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffd166]">fire-ready</span> brand.
        </h1>
        <p className="mt-5 max-w-2xl text-slate-400 text-lg">
          Every concept is a complete, working website — services, case studies, blog,
          live chat assistant, and an interactive fire-safety simulator. Click a card to
          explore it end to end.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {variants.map((v, i) => (
            <Link
              key={v.id}
              to={`/${v.id}`}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:border-[#ff6b35]/50 hover:bg-white/[0.06] hover:-translate-y-1.5 transition-all animate-rise"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* mini mock preview */}
              <div className="rounded-xl overflow-hidden border border-white/10 mb-5">
                <MiniPreview variant={v} />
              </div>
              <div className="flex gap-2 mb-3">
                {v.swatches.map((c) => (
                  <span key={c} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
                ))}
              </div>
              <h2 className="text-xl font-bold">{v.name}</h2>
              <p className="text-sm font-semibold text-[#ff9f1c] mt-0.5">{v.vibe}</p>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{v.desc}</p>
              <span className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white group-hover:gap-3.5 transition-all">
                Open concept <Icon name="arrow" size={17} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-slate-500 border-t border-white/10 pt-6">
          <span>Each concept includes:</span>
          {['Services', 'Case Studies', 'Blog', 'About & Team', 'Contact', 'Chat Assistant', 'Fire-Safety Simulator Game'].map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <span className="text-[#ff6b35]"><Icon name="check" size={14} /></span> {f}
            </span>
          ))}
        </div>
      </main>
    </div>
  )
}

// Stylized skeleton screenshot of each concept's homepage
function MiniPreview({ variant }) {
  const [bg, accent, paper, gold] = variant.swatches
  if (variant.id === 'ember')
    return (
      <div className="h-40 p-3" style={{ background: paper }}>
        <div className="h-4 mb-3 flex items-center gap-1.5 px-1">
          <span className="w-2.5 h-2.5 rounded" style={{ background: accent }} />
          <span className="w-12 h-1.5 rounded" style={{ background: bg, opacity: 0.85 }} />
          <span className="ml-auto w-9 h-3 rounded-md" style={{ background: bg }} />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 pt-1">
            <div className="w-full h-3.5 rounded-sm mb-1.5" style={{ background: bg }} />
            <div className="w-3/4 h-3.5 rounded-sm mb-1.5" style={{ background: bg }} />
            <div className="w-1/2 h-3.5 rounded-sm mb-2.5" style={{ background: accent }} />
            <div className="w-4/5 h-1.5 rounded bg-black/15 mb-1" />
            <div className="w-3/5 h-1.5 rounded bg-black/15 mb-3" />
            <div className="w-12 h-4 rounded-md" style={{ background: accent }} />
          </div>
          <div className="w-2/5 h-[104px] rounded-lg overflow-hidden relative" style={{ background: `linear-gradient(150deg, ${bg}, #3a3f47)` }}>
            <div className="absolute bottom-2 left-2 w-10 h-1.5 rounded bg-white/60" />
            <div className="absolute bottom-5 left-2 w-6 h-1.5 rounded bg-white/30" />
            <div className="absolute -bottom-3 -left-4 w-14 h-9 rounded-md" style={{ background: bg, boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
              <span className="block w-2 h-2 rounded-full mt-2 ml-2" style={{ background: accent }} />
            </div>
          </div>
        </div>
      </div>
    )
  if (variant.id === 'aegis')
    return (
      <div className="h-40 p-3" style={{ background: paper }}>
        <div className="h-3 mb-1 rounded-sm flex items-center px-2" style={{ background: bg }}>
          <span className="w-14 h-1 bg-white/50" />
          <span className="ml-auto w-8 h-1 bg-white/70" />
        </div>
        <div className="h-5 mb-3 bg-white rounded-sm shadow-sm flex items-center px-2 gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
          <span className="w-8 h-1.5 rounded" style={{ background: bg }} />
          <span className="ml-auto w-9 h-2.5 rounded-md" style={{ background: accent }} />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="w-full h-3.5 rounded mb-1.5" style={{ background: bg }} />
            <div className="w-2/3 h-3.5 rounded mb-2" style={{ background: accent }} />
            <div className="w-full h-1.5 rounded mb-1 bg-slate-300" />
            <div className="w-4/5 h-1.5 rounded bg-slate-300" />
          </div>
          <div className="w-2/5 h-20 bg-white rounded-lg shadow-md p-2">
            {[0, 1, 2].map((k) => (
              <div key={k} className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#3d7dca' }} />
                <span className="flex-1 h-1.5 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  return (
    <div className="h-40 p-3 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute -top-10 right-0 w-32 h-32 rounded-full blur-2xl opacity-40" style={{ background: accent }} />
      <div className="h-5 mx-6 mb-4 rounded-full border border-white/15 flex items-center px-2 gap-2" style={{ background: '#ffffff10' }}>
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <span className="w-8 h-1 bg-white/40 rounded" />
        <span className="ml-auto w-7 h-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <div className="text-center">
        <div className="w-1/2 h-3.5 rounded mx-auto mb-1.5 bg-white/80" />
        <div className="w-1/3 h-3.5 rounded mx-auto mb-3" style={{ background: `linear-gradient(90deg, ${accent}, ${gold})` }} />
        <div className="flex gap-1.5 justify-center">
          {[0, 1, 2].map((k) => (
            <div key={k} className="w-14 h-11 rounded-lg border border-white/15" style={{ background: '#ffffff0a' }}>
              <div className="w-4 h-1.5 mt-2 ml-2 rounded" style={{ background: accent }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
