import { Link } from 'react-router-dom'
import { company, caseStudies, services, images, stats } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, Testimonial, CTABand, GameTeaser, CaseStudyCard, ProcessTimeline, FAQ, Partners } from '../components/Blocks.jsx'
import { useCountUp } from '../components/hooks.js'
import { useTheme } from '../theme.jsx'

// B · INFERNO — cinematic fire brand: near-black, crimson heat, poster type

const TICKER = [
  '24/7 EMERGENCY RESPONSE',
  'NJ DFS PERMIT #P01570',
  'NICET-CERTIFIED CREWS',
  'NFPA 25 INSPECTIONS',
  '2,638 HEADS · ONE TOWER',
  'REPORTS FILED IN <5 DAYS',
  'LICENSED · BONDED · INSURED',
]

const posterImages = {
  installation: images.heroIndustrial,
  'service-repairs': images.engineer,
  inspections: images.planningDesk,
  design: images.blueprint,
}

export default function HomeAegis() {
  const t = useTheme()
  return (
    <>
      {/* ── HERO — full-bleed cinematic ── */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.cityDark} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b0b]/80 via-[#0e0b0b]/60 to-[#0e0b0b]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#e5062d]/28 via-transparent to-transparent" />
          <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px] bg-[#e5062d]/22 blur-[150px] rounded-full animate-aurora" />
        </div>

        <div className="relative flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-5 py-24 w-full">
            <p className="animate-rise inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.24em] text-[#ff8095]">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#ff3b4f] animate-ping opacity-75" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#ff3b4f]" />
              </span>
              Newark · New Jersey · {company.permit}
            </p>
            <h1
              className="animate-rise font-anton uppercase text-[15vw] sm:text-[10vw] lg:text-[6.4rem] leading-[0.94] text-[#fff7f0] mt-6"
              style={{ animationDelay: '100ms' }}
            >
              Total fire protection.
              <br />
              <span className="text-fire">Tailored to you.</span>
            </h1>
            <div className="animate-rise mt-8 flex flex-col md:flex-row md:items-end gap-8" style={{ animationDelay: '200ms' }}>
              <p className="text-lg md:text-xl text-[#cbbdb5] max-w-xl leading-relaxed">
                Expertly designed, installed and maintained fire safety systems you can
                rely on — by the crew that answers at 3 AM.
              </p>
              <div className="flex flex-wrap gap-4 md:ml-auto shrink-0">
                <Link to="/aegis/contact" className={t.btnPrimary}>
                  Get protected <Icon name="arrow" size={16} />
                </Link>
                <a href={company.phoneHref} className={t.btnGhost}>
                  <Icon name="phone" size={16} /> {company.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* fire ticker */}
        <div className="relative border-y border-white/10 bg-[#e5062d] overflow-hidden">
          <div className="flex w-max animate-marquee py-3">
            {[...TICKER, ...TICKER].map((m, i) => (
              <span key={i} className="flex items-center font-anton uppercase tracking-[0.08em] text-[#0e0b0b] text-sm whitespace-nowrap">
                <span className="px-6">{m}</span>
                <span className="text-[#0e0b0b]/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — poster cards over ghost text ── */}
      <Section className="relative py-28 overflow-hidden">
        <p className="absolute top-10 left-1/2 -translate-x-1/2 font-anton uppercase text-[22vw] leading-none text-stroke whitespace-nowrap pointer-events-none" aria-hidden>
          Services
        </p>
        <div className="max-w-7xl mx-auto px-5 relative">
          <div className="pt-[8vw] mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="reveal">
              <p className={t.eyebrow}>What we do</p>
              <h2 className="font-anton uppercase text-4xl md:text-6xl text-[#fff7f0] mt-3 leading-[0.98]">
                Four ways we <span className="text-fire">kill fires</span>
                <br /> before they start.
              </h2>
            </div>
            <Link to="/aegis/services" className={`${t.btnGhost} reveal`}>
              All services <Icon name="arrow" size={15} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to="/aegis/services"
                className="group relative rounded-xl overflow-hidden border border-white/10 min-h-[300px] flex items-end img-zoom reveal hover:border-[#ff3b4f]/50 transition-colors"
                style={{ transitionDelay: `${(i % 2) * 90}ms` }}
              >
                <img src={posterImages[s.slug]} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b0b] via-[#0e0b0b]/40 to-transparent" />
                <div className="absolute top-5 right-6 font-anton text-5xl text-white/12 group-hover:text-[#ff3b4f]/70 transition-colors">
                  0{i + 1}
                </div>
                <div className="relative p-7 md:p-9">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ff8095]">{s.tagline}</p>
                  <h3 className="font-anton uppercase text-2xl md:text-[2rem] text-[#fff7f0] mt-2 leading-tight">{s.title}</h3>
                  <p className="text-sm text-[#cbbdb5] mt-3 max-w-md leading-relaxed line-clamp-2">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm font-extrabold uppercase tracking-wide text-white group-hover:text-[#ff3b4f] group-hover:gap-3.5 transition-all">
                    Explore <Icon name="arrow" size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── GIANT STATS ── */}
      <Section alt className="py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
            {stats.map((s, i) => (
              <GiantStat key={s.label} value={s.value} label={s.label} delay={i * 80} />
            ))}
          </div>
          <div className="mt-20 pt-12 border-t border-white/10">
            <Partners light />
          </div>
        </div>
      </Section>

      {/* ── FLAGSHIP — full-bleed case band ── */}
      <section className="relative min-h-[560px] flex items-end overflow-hidden">
        <img src={images.buildingGlass} alt="301 West Side Avenue" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b0b] via-[#0e0b0b]/55 to-[#0e0b0b]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e5062d]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-5 pb-16 pt-40 w-full">
          <p className={t.eyebrow}>Flagship · Jersey City</p>
          <h2 className="font-anton uppercase text-4xl md:text-7xl text-[#fff7f0] mt-3 leading-[0.95] max-w-4xl">
            2,638 heads. 202 homes.
            <br />
            <span className="text-fire">One deadline — met.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-5">
            {caseStudies[0].metrics.map((m) => (
              <div key={m.label}>
                <p className="font-anton text-3xl md:text-4xl text-white">{m.value}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-[#cbbdb5] mt-1">{m.label}</p>
              </div>
            ))}
            <Link to="/aegis/case-studies" className={`${t.btnSecondary} md:ml-auto`}>
              All case studies <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY WALL ── */}
      <Section className="py-28">
        <div className="max-w-7xl mx-auto px-5">
          <div className="burn-glow relative rounded-2xl border border-[#e5062d]/40 bg-gradient-to-br from-[#1c0b0d] to-[#0e0b0b] overflow-hidden reveal">
            <div className="absolute -top-24 right-0 w-96 h-96 bg-[#e5062d]/25 blur-[110px] rounded-full" />
            <div className="relative px-7 md:px-14 py-14 md:py-16 text-center">
              <p className="font-manrope font-extrabold uppercase tracking-[0.3em] text-[#ff8095] text-sm">
                Burst pipe? Impaired system? Frozen line?
              </p>
              <a href={company.phoneHref} className="block font-anton text-[13vw] lg:text-[7.5rem] leading-none text-[#fff7f0] mt-6 hover:text-fire transition-colors">
                (973) 817-8114
              </a>
              <p className="mt-6 text-[#cbbdb5] max-w-xl mx-auto">
                Answered 24/7, every day of the year — by a technician, not a machine.
                We manage the impairment paperwork with your fire official too.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── PROCESS ── */}
      <Section alt className="py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal mb-14">
            <p className={t.eyebrow}>How we work</p>
            <h2 className="font-anton uppercase text-4xl md:text-5xl text-[#fff7f0] mt-3">
              Walkthrough → <span className="text-fire">sign-off</span>
            </h2>
          </div>
          <ProcessTimeline light />
        </div>
      </Section>

      {/* ── CASE GRID ── */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
            <div className="reveal">
              <p className={t.eyebrow}>Track record</p>
              <h2 className="font-anton uppercase text-4xl md:text-5xl text-[#fff7f0] mt-3">Proof, not promises</h2>
            </div>
            <Link to="/aegis/case-studies" className={`${t.btnGhost} reveal`}>
              View all <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.slice(1, 4).map((cs, i) => (
              <CaseStudyCard key={cs.slug} cs={cs} delay={i * 90} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── GAME + TESTIMONIAL + FAQ ── */}
      <Section className="pb-24">
        <div className="max-w-7xl mx-auto px-5">
          <GameTeaser />
          <div className="mt-24">
            <Testimonial light />
          </div>
          <div className="mt-24">
            <div className="reveal text-center mb-14">
              <p className={t.eyebrow}>Questions</p>
              <h2 className="font-anton uppercase text-4xl md:text-5xl text-[#fff7f0] mt-3">Straight answers</h2>
            </div>
            <FAQ light />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}

function GiantStat({ value, label, delay }) {
  const [ref, text] = useCountUp(value)
  return (
    <div ref={ref} className="text-center reveal" style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-anton text-6xl md:text-[5.4rem] leading-none text-fire">{text}</p>
      <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#a3948c] mt-3">{label}</p>
    </div>
  )
}
