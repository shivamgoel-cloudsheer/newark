import { Link } from 'react-router-dom'
import { company, caseStudies, services, images } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, SectionHeading, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard, Marquee, ProcessTimeline, FAQ, Partners } from '../components/Blocks.jsx'
import { useTheme } from '../theme.jsx'

// A · FORGE — editorial industrial: warm paper, deep ink, precision red
export default function HomeEmber() {
  const t = useTheme()
  return (
    <>
      {/* HERO — editorial split with layered photo */}
      <Section className="relative">
        <div className="max-w-7xl mx-auto px-5 pt-16 md:pt-24 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <p className="animate-rise inline-flex items-center gap-2.5 text-[13px] font-semibold text-[#5b5f68]">
              <span className="inline-flex items-center gap-1.5 text-[#c8102e] font-archivo font-bold uppercase tracking-[0.16em] text-xs">
                <Icon name="shield" size={14} /> {company.permit}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#14161a]/30" />
              NICET-certified · Licensed & insured
            </p>
            <h1 className="animate-rise font-archivo font-black text-[2.9rem] md:text-[4.4rem] leading-[0.98] tracking-[-0.03em] mt-6" style={{ animationDelay: '90ms' }}>
              Fire protection,
              <br />
              engineered like
              <br />
              <span className="text-[#c8102e]">infrastructure.</span>
            </h1>
            <p className="animate-rise mt-7 text-lg text-[#5b5f68] max-w-lg leading-relaxed" style={{ animationDelay: '180ms' }}>
              {company.hero} — installation, 24/7 service, inspections and custom design for
              residential, commercial and industrial properties across New Jersey.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: '260ms' }}>
              <Link to="/ember/contact" className={t.btnPrimary}>
                Request a quote <Icon name="arrow" size={16} />
              </Link>
              <a href={company.phoneHref} className={t.btnGhost}>
                <Icon name="phone" size={16} /> 24/7 · {company.phone}
              </a>
            </div>
            <div className="animate-rise mt-10 flex items-center gap-8" style={{ animationDelay: '330ms' }}>
              {[
                ['2.9M+', 'sq ft protected'],
                ['12,694', 'heads · one project'],
                ['<5 days', 'NJ report filing'],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-archivo font-extrabold text-2xl tracking-tight">{v}</p>
                  <p className="text-xs text-[#5b5f68] mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* layered photo composition */}
          <div className="relative animate-rise hidden lg:block" style={{ animationDelay: '200ms' }}>
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full border-[10px] border-[#c8102e]/12" />
            <div className="rounded-2xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(20,22,26,0.45)] img-zoom relative">
              <img src={images.heroIndustrial} alt="Industrial fire sprinkler piping" className="w-full h-[560px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14161a]/60 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-white/15 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/25">
                Flagship project
              </span>
              <div className="absolute bottom-5 right-5 text-right text-white">
                <p className="font-archivo font-bold text-sm uppercase tracking-[0.14em]">301 West Side Ave</p>
                <p className="text-white/70 text-xs mt-1">202 units protected · Jersey City</p>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-10 bg-[#14161a] text-white rounded-xl px-6 py-5 shadow-2xl flex items-center gap-4">
              <span className="relative flex">
                <span className="absolute inline-flex w-10 h-10 rounded-full bg-[#c8102e] animate-pulse-ring" />
                <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c8102e] text-white">
                  <Icon name="phone" size={18} />
                </span>
              </span>
              <span>
                <span className="block font-archivo font-bold text-sm">24/7 Emergency line</span>
                <span className="block text-white/60 text-xs mt-0.5">Answered by a technician, not a machine</span>
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5">
          <Marquee />
        </div>
      </Section>

      {/* SERVICES — numbered editorial rows */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeading
              kicker="What we do"
              title="Four disciplines. One accountable team."
              sub="Everything a sprinkler system needs across its life — under a single NJ Division of Fire Safety permit."
            />
            <Link to="/ember/services" className={`${t.btnGhost} mb-14 reveal`}>
              All services <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className={`border-t ${t.hairline}`}>
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to="/ember/services"
                className={`group grid md:grid-cols-[90px_1.1fr_1.6fr_56px] gap-5 items-center py-8 border-b ${t.hairline} hover:bg-white transition-colors px-4 -mx-4 rounded-xl reveal`}
              >
                <span className="font-archivo font-black text-3xl text-[#14161a]/15 group-hover:text-[#c8102e] transition-colors">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-archivo font-extrabold text-xl md:text-2xl tracking-tight">{s.title}</h3>
                  <p className="text-sm text-[#c8102e] font-semibold mt-1">{s.tagline}</p>
                </div>
                <p className="text-[15px] text-[#5b5f68] leading-relaxed">{s.desc}</p>
                <span className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#14161a]/15 group-hover:bg-[#14161a] group-hover:text-white group-hover:border-[#14161a] transition-all">
                  <Icon name="arrow" size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* STATS — dark band */}
      <Section alt className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
          <div className="mt-16 pt-12 border-t border-white/10">
            <Partners light />
          </div>
        </div>
      </Section>

      {/* FEATURED CASE STUDY — magazine spread */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden img-zoom reveal shadow-[0_40px_80px_-36px_rgba(20,22,26,0.5)]">
            <img src={images.buildingGlass} alt="High-rise project" className="w-full h-[460px] object-cover" />
          </div>
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <p className={t.eyebrow}>Case study · Residential high-rise</p>
            <h2 className={`${t.display} text-3xl md:text-[2.6rem] leading-[1.08] mt-4`}>
              2,638 heads. 202 homes. One deadline — met.
            </h2>
            <p className={`mt-5 text-lg leading-relaxed ${t.muted}`}>
              Full wet-system design and installation for a 218,028 sq ft tower at
              301 West Side Avenue, Jersey City — engineered in-house, installed and
              commissioned on schedule.
            </p>
            <div className={`mt-7 grid grid-cols-3 gap-6 border-t ${t.hairline} pt-7`}>
              {caseStudies[0].metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-archivo font-extrabold text-2xl md:text-3xl text-[#c8102e]">{m.value}</p>
                  <p className={`text-xs mt-1 ${t.muted}`}>{m.label}</p>
                </div>
              ))}
            </div>
            <Link to="/ember/case-studies" className={`${t.btnSecondary} mt-8`}>
              View all case studies <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="py-24 bg-white border-y border-[#14161a]/8">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeading kicker="How we work" title="From walkthrough to fire-official sign-off" />
          <ProcessTimeline />
        </div>
      </Section>

      {/* GAME */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <GameTeaser />
        </div>
      </Section>

      {/* TESTIMONIAL + FAQ */}
      <Section className="pb-24">
        <div className="max-w-7xl mx-auto px-5">
          <Testimonial />
          <div className="mt-20">
            <SectionHeading center kicker="Questions" title="What building owners ask us" />
            <FAQ />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
