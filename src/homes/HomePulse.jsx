import { Link } from 'react-router-dom'
import { company, caseStudies, services } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, SectionHeading, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard, Marquee, FAQ, Partners } from '../components/Blocks.jsx'
import { useTheme } from '../theme.jsx'
import { spotlightMove } from '../components/hooks.js'

// C · SENTINEL — precision dark: grid, aurora, bento, spotlight
export default function HomePulse() {
  const t = useTheme()
  return (
    <>
      {/* HERO — kinetic type over grid + aurora, with system-status bento */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-[#ff5c1a]/14 blur-[130px] rounded-full animate-aurora pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 pt-20 md:pt-28 pb-14 text-center relative">
          <p className="animate-rise inline-flex items-center gap-2 bg-white/[0.05] border border-white/12 rounded-full px-4 py-2 text-xs font-semibold text-[#c9d2de] backdrop-blur">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            24/7 dispatch online · {company.permit}
          </p>
          <h1 className="animate-rise font-grotesk font-bold text-[3rem] md:text-[4.6rem] leading-[1.0] tracking-[-0.03em] text-white mt-8" style={{ animationDelay: '90ms' }}>
            Engineered to end fires
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c1a] via-[#ff9f1c] to-[#ffd166]">
              before they begin.
            </span>
          </h1>
          <p className="animate-rise mt-7 text-lg md:text-xl text-[#8b96a5] max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '170ms' }}>
            {company.hero} — engineered by our in-house design team, delivered across New Jersey.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: '250ms' }}>
            <Link to="/pulse/contact" className={`${t.btnPrimary} text-base`}>
              Get protected <Icon name="arrow" size={17} />
            </Link>
            <a
              href="#fire-drill"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('fire-drill')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
              className={`${t.btnSecondary} text-base`}
            >
              <Icon name="gamepad" size={18} /> Run the fire drill
            </a>
          </div>

          {/* system status console */}
          <div className="animate-rise mt-16 max-w-4xl mx-auto g-border rounded-2xl overflow-hidden text-left shadow-[0_50px_120px_-40px_rgba(255,92,26,0.25)]" style={{ animationDelay: '330ms' }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-white/[0.03]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c5c]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd166]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs font-semibold text-[#8b96a5] tracking-wide">system-status · 301 West Side Ave</span>
              <span className="ml-auto text-[11px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full">
                ALL SYSTEMS NORMAL
              </span>
            </div>
            <div className="grid sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
              {[
                ['Heads online', '2,638', 'across 202 units'],
                ['Last inspection', 'PASSED', 'annual · NFPA 25'],
                ['Report filed', '2 days', 'of 5-day NJ window'],
                ['Next due', 'Q3 2026', 'auto-scheduled'],
              ].map(([k, v, sub]) => (
                <div key={k} className="px-6 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b96a5]">{k}</p>
                  <p className="font-grotesk font-bold text-2xl text-white mt-1.5">{v}</p>
                  <p className="text-xs text-[#5c6675] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-5 relative">
          <Marquee dark />
        </div>
      </Section>

      {/* BENTO — dominant card + satellites */}
      <Section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHeading
            center
            kicker="Capabilities"
            title={<span className="text-white">The full stack of fire protection</span>}
            sub="Four disciplines, one in-house team — no subcontracted weak links."
          />
          <div className="grid md:grid-cols-6 gap-5">
            {/* dominant */}
            <div onMouseMove={spotlightMove} className="spotlight g-border rounded-2xl p-9 md:col-span-4 reveal">
              <span className="inline-flex items-center justify-center w-13 h-13 p-3 rounded-xl bg-[#ff5c1a]/12 border border-[#ff5c1a]/25 text-[#ff9f1c]">
                <Icon name={services[0].icon} size={28} />
              </span>
              <h3 className="font-grotesk font-bold text-2xl md:text-3xl text-white mt-5">{services[0].title}</h3>
              <p className="text-[#8b96a5] mt-3 max-w-xl leading-relaxed">{services[0].desc}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {services[0].features.map((f) => (
                  <p key={f} className="flex items-start gap-2.5 text-sm text-[#c9d2de]">
                    <span className="text-[#ff7a29] mt-0.5 shrink-0"><Icon name="check" size={15} /></span>
                    {f}
                  </p>
                ))}
              </div>
              <Link to="/pulse/services" className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-white hover:text-[#ff9f1c] hover:gap-3.5 transition-all">
                Explore installation <Icon name="arrow" size={15} />
              </Link>
            </div>
            {/* satellites */}
            <div className="md:col-span-2 grid gap-5">
              {services.slice(1, 3).map((s) => (
                <Link key={s.slug} to="/pulse/services" onMouseMove={spotlightMove} className="spotlight g-border rounded-2xl p-6 reveal block" style={{ transitionDelay: '90ms' }}>
                  <span className="text-[#ff9f1c]"><Icon name={s.icon} size={24} /></span>
                  <h3 className="font-grotesk font-bold text-lg text-white mt-3">{s.title}</h3>
                  <p className="text-sm text-[#8b96a5] mt-1.5 leading-relaxed line-clamp-3">{s.desc}</p>
                </Link>
              ))}
            </div>
            <Link to="/pulse/services" onMouseMove={spotlightMove} className="spotlight g-border rounded-2xl p-6 md:col-span-3 reveal flex items-center gap-6" style={{ transitionDelay: '140ms' }}>
              <span className="text-[#ff9f1c] shrink-0"><Icon name={services[3].icon} size={30} /></span>
              <div>
                <h3 className="font-grotesk font-bold text-lg text-white">{services[3].title}</h3>
                <p className="text-sm text-[#8b96a5] mt-1 leading-relaxed">{services[3].desc}</p>
              </div>
            </Link>
            <div onMouseMove={spotlightMove} className="spotlight g-border rounded-2xl p-6 md:col-span-3 reveal flex items-center justify-between gap-6" style={{ transitionDelay: '190ms' }}>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b96a5]">Emergency line</p>
                <p className="font-grotesk font-bold text-2xl text-white mt-1">{company.phone}</p>
                <p className="text-xs text-[#5c6675] mt-0.5">Answered 24/7 by a technician</p>
              </div>
              <a href={company.phoneHref} className={t.btnPrimary + ' !px-5 !py-3'}>
                <Icon name="phone" size={17} />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* METRICS */}
      <Section alt className="py-20 border-y border-white/8">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
          <div className="mt-16 pt-12 border-t border-white/8">
            <Partners light />
          </div>
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeading kicker="Track record" title={<span className="text-white">Proof, not promises</span>} />
            <Link to="/pulse/case-studies" className={`${t.btnGhost} mb-14 reveal`}>
              All projects <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((cs, i) => (
              <CaseStudyCard key={cs.slug} cs={cs} delay={i * 90} />
            ))}
          </div>
        </div>
      </Section>

      {/* GAME */}
      <Section className="pb-24">
        <div className="max-w-6xl mx-auto px-5">
          <GameTeaser />
        </div>
      </Section>

      {/* TESTIMONIAL + FAQ */}
      <Section alt className="py-24 border-t border-white/8">
        <div className="max-w-6xl mx-auto px-5">
          <Testimonial light />
          <div className="mt-20">
            <SectionHeading center kicker="Questions" title={<span className="text-white">What building owners ask us</span>} />
            <FAQ light />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
