import { Link } from 'react-router-dom'
import { company, caseStudies, services } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { SectionHeading, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard } from '../components/Blocks.jsx'
import { useTheme } from '../theme.jsx'

export default function HomePulse() {
  const t = useTheme()
  return (
    <>
      {/* HERO — centered, glowing, animated */}
      <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#ff6b35]/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-[10%] w-40 h-40 bg-[#ffd166]/10 blur-3xl rounded-full pointer-events-none animate-float" />
        <div className="max-w-5xl mx-auto px-5 pt-24 pb-20 md:pt-32 md:pb-28 text-center relative">
          <span className="inline-flex items-center gap-2 bg-[#ff6b35]/10 text-[#ff9f1c] font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#ff6b35]/25 animate-rise">
            <Icon name="shield" size={14} /> {company.permit} · NICET Certified · 24/7
          </span>
          <h1 className="font-grotesk font-bold text-5xl md:text-7xl text-white leading-[1.02] mt-8 tracking-tight animate-rise" style={{ animationDelay: '80ms' }}>
            Engineered to end fires
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] via-[#ff9f1c] to-[#ffd166]">
              before they begin.
            </span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto animate-rise" style={{ animationDelay: '160ms' }}>
            Design, installation, inspection and emergency service for fire sprinkler
            systems — engineered in-house, delivered across New Jersey.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-rise" style={{ animationDelay: '240ms' }}>
            <Link to="/pulse/contact" className={t.btnPrimary + ' text-lg'}>
              Get protected <Icon name="arrow" size={18} />
            </Link>
            <Link to="/pulse/game" className={t.btnSecondary + ' text-lg'}>
              <Icon name="gamepad" size={19} /> Try the fire simulator
            </Link>
          </div>

          {/* floating metric chips */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {[
              ['2,638', 'heads · one tower'],
              ['<5 days', 'NJ report filing'],
              ['24/7', 'emergency dispatch'],
              ['30+ yrs', 'leadership experience'],
            ].map(([v, l], i) => (
              <div
                key={l}
                className="bg-white/[0.04] backdrop-blur border border-white/10 rounded-2xl px-6 py-4 animate-float"
                style={{ animationDelay: `${i * 700}ms` }}
              >
                <p className="font-bold text-2xl text-white">{v}</p>
                <p className="text-xs text-slate-400 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — horizontal cards */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <SectionHeading
          center
          kicker="Capabilities"
          title={<span className="text-white">The full stack of fire protection</span>}
          sub="Four disciplines, one in-house team — no subcontracted weak links."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <div key={s.slug} className={`${t.card} ${t.cardHover} p-8 relative overflow-hidden group`}>
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#ff6b35]/10 blur-2xl rounded-full group-hover:bg-[#ff6b35]/20 transition-colors" />
              <div className="flex items-start gap-5 relative">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b35]/20 to-transparent border border-[#ff6b35]/25 text-[#ff9f1c] shrink-0">
                  <Icon name={s.icon} size={28} />
                </span>
                <div>
                  <h3 className="font-bold text-xl text-white">{s.title}</h3>
                  <p className="text-sm text-[#ff9f1c] font-medium mt-0.5">{s.tagline}</p>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{s.desc}</p>
                  <Link to="/pulse/services" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white hover:text-[#ff9f1c] hover:gap-3 transition-all">
                    Details <Icon name="arrow" size={15} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-[#10161e] py-16">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading kicker="Track record" title={<span className="text-white">Proof, not promises</span>} />
          <Link to="/pulse/case-studies" className="inline-flex items-center gap-2 font-semibold text-[#ff9f1c] hover:gap-3.5 transition-all mb-12">
            All projects <Icon name="arrow" size={17} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.slice(0, 3).map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} />
          ))}
        </div>
      </section>

      {/* GAME */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <GameTeaser />
      </section>

      {/* TESTIMONIAL */}
      <section className="border-t border-white/10 bg-[#10161e] py-20">
        <div className="max-w-6xl mx-auto px-5">
          <Testimonial light />
        </div>
      </section>

      <CTABand />
    </>
  )
}
