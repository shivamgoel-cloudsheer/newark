import { Link } from 'react-router-dom'
import { company, caseStudies, industries, images } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, SectionHeading, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard, Marquee, ProcessTimeline, FAQ, ServiceCards } from '../components/Blocks.jsx'
import { useTheme } from '../theme.jsx'

// B · MERIDIAN — consultancy trust: cream, deep navy, serif display
export default function HomeAegis() {
  const t = useTheme()
  return (
    <>
      {/* HERO — serif editorial + compliance dossier card */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-[#f2ede3] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 pt-16 md:pt-24 pb-14 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <p className="animate-rise inline-flex items-center gap-2 bg-white border border-[#0c2340]/12 rounded-full pl-2 pr-4 py-1.5 text-[13px] font-semibold text-[#5d6b7c] shadow-sm">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c2340] text-white">
                <Icon name="shield" size={13} />
              </span>
              {company.permit} — verifiable on the NJ DFS public registry
            </p>
            <h1 className="animate-rise font-fraunces font-semibold text-[2.8rem] md:text-[4.1rem] leading-[1.04] text-[#0c2340] mt-7 tracking-[-0.01em]" style={{ animationDelay: '90ms' }}>
              Compliance you can{' '}
              <em className="italic font-medium text-[#b3202c]">sign your name to.</em>
            </h1>
            <p className="animate-rise mt-6 text-lg text-[#5d6b7c] max-w-xl leading-relaxed" style={{ animationDelay: '180ms' }}>
              NFPA 25 inspections filed on time, systems installed to code, and a 24/7 line
              that answers. Fire sprinkler design, installation and service for New Jersey’s
              property owners and managers.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: '260ms' }}>
              <Link to="/aegis/contact" className={t.btnPrimary}>
                Schedule an inspection <Icon name="arrow" size={16} />
              </Link>
              <a href={company.phoneHref} className={t.btnGhost}>
                <Icon name="phone" size={16} /> {company.phone}
              </a>
            </div>
            <p className="animate-rise mt-6 text-sm text-[#5d6b7c] flex items-center gap-2" style={{ animationDelay: '320ms' }}>
              <span className="text-emerald-600"><Icon name="check" size={15} /></span>
              Free consultation · NICET-certified · Licensed, bonded & insured
            </p>
          </div>

          {/* dossier card */}
          <div className="relative animate-rise" style={{ animationDelay: '200ms' }}>
            <div className="absolute -top-10 -right-6 w-64 h-64 bg-[#b3202c]/8 rounded-full blur-3xl" />
            <div className="relative bg-white rounded-3xl shadow-[0_36px_90px_-30px_rgba(12,35,64,0.4)] border border-[#0c2340]/8 overflow-hidden">
              <div className="h-40 relative overflow-hidden">
                <img src={images.heroCorporate} alt="Commercial property" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/80 to-transparent" />
                <p className="absolute bottom-3.5 left-5 text-white font-fraunces text-lg">Your compliance calendar</p>
              </div>
              <div className="p-7">
                {[
                  ['Quarterly', 'Waterflow alarms & FDC inspection'],
                  ['Annual', 'Full system inspection & testing'],
                  ['5-Year', 'Internal pipe & obstruction inspection'],
                  ['Every visit', 'State forms filed with your fire official'],
                ].map(([when, what], i) => (
                  <div key={what} className={`flex items-start gap-3.5 py-3.5 ${i < 3 ? 'border-b border-[#0c2340]/8' : ''}`}>
                    <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-200">
                      <Icon name="check" size={12} />
                    </span>
                    <span>
                      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8c6b2f]">{when}</span>
                      <span className="block text-sm font-semibold text-[#1d2a3a] mt-0.5">{what}</span>
                    </span>
                  </div>
                ))}
                <div className="mt-5 flex items-center justify-between bg-[#faf8f4] border border-[#0c2340]/8 rounded-xl px-4 py-3">
                  <span className="text-xs font-semibold text-[#5d6b7c]">NJ 5-business-day filing rule</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Handled by us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5">
          <Marquee />
        </div>
      </Section>

      {/* SERVICES — photo cards */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeading
            center
            kicker="Services"
            title="One partner for the full system lifecycle"
            sub="From the first shop drawing to the 3 AM emergency call — a single accountable contractor."
          />
          <ServiceCards />
        </div>
      </Section>

      {/* INDUSTRIES — quiet band */}
      <Section className="py-24 bg-white border-y border-[#0c2340]/8">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeading center kicker="Who we protect" title="Every property type in New Jersey" />
          <div className="grid md:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <div key={ind.name} className="text-center px-4 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0c2340]/5 text-[#0c2340] border border-[#0c2340]/10">
                  <Icon name="building" size={26} />
                </span>
                <h3 className="font-fraunces font-semibold text-xl text-[#0c2340] mt-4">{ind.name}</h3>
                <p className="text-sm text-[#5d6b7c] mt-2 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STATS + PROCESS */}
      <Section alt className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
        </div>
      </Section>
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeading kicker="How we work" title="A process your fire official will recognize" />
          <ProcessTimeline />
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section className="py-24 bg-white border-y border-[#0c2340]/8">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeading kicker="Case studies" title="Work we can point to" />
            <Link to="/aegis/case-studies" className={`${t.btnGhost} mb-14 reveal`}>
              View all <Icon name="arrow" size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((cs, i) => (
              <CaseStudyCard key={cs.slug} cs={cs} delay={i * 90} />
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIAL */}
      <Section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <Testimonial />
        </div>
      </Section>

      {/* GAME + FAQ */}
      <Section className="pb-24">
        <div className="max-w-7xl mx-auto px-5">
          <GameTeaser />
          <div className="mt-24">
            <SectionHeading center kicker="Questions" title="What building owners ask us" />
            <FAQ />
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
