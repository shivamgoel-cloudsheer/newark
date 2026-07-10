import { Link } from 'react-router-dom'
import { company, caseStudies } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { SectionHeading, ServicesGrid, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard, TrustRow } from '../components/Blocks.jsx'

export default function HomeEmber() {
  return (
    <>
      {/* HERO — dark industrial, hard edges */}
      <section className="bg-[#16181d] text-white relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[#d7263d] hidden lg:block" style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }} />
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 relative grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 bg-[#ffb703] text-[#16181d] font-bold text-xs uppercase tracking-widest px-3 py-1.5 border-2 border-white/10">
              <Icon name="shield" size={14} /> {company.permit} · NJ Licensed
            </span>
            <h1 className="font-condensed uppercase text-5xl md:text-7xl leading-[0.95] mt-6 tracking-tight">
              Fire doesn’t <span className="text-[#d7263d]">wait.</span>
              <br /> Neither do we.
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              {company.hero}. Design, installation, inspection and 24/7 emergency
              service across New Jersey — by a NICET-certified crew.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={company.phoneHref} className="inline-flex items-center gap-2 bg-[#d7263d] text-white font-condensed uppercase tracking-wider text-xl px-8 py-4 border-2 border-white/20 shadow-[6px_6px_0_#ffb703] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#ffb703] transition-all">
                <Icon name="phone" size={20} /> 24/7: {company.phone}
              </a>
              <Link to="/ember/contact" className="inline-flex items-center gap-2 bg-transparent text-white font-condensed uppercase tracking-wider text-xl px-8 py-4 border-2 border-white/40 hover:border-white transition-colors">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-4 animate-rise" style={{ animationDelay: '150ms' }}>
            {[
              ['218,028 sq ft', 'protected in one flagship high-rise'],
              ['2,638 heads', 'installed at 301 West Side Ave'],
              ['5 business days', 'NJ filing deadline we never miss'],
            ].map(([v, l]) => (
              <div key={l} className="bg-white text-[#16181d] border-2 border-[#16181d] shadow-[6px_6px_0_rgba(0,0,0,0.45)] p-5">
                <p className="font-condensed text-4xl text-[#d7263d]">{v}</p>
                <p className="text-sm font-semibold mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-6xl mx-auto px-5 -mt-8 relative z-10">
        <TrustRow />
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <SectionHeading
          kicker="What we do"
          title={<>Four services. <span className="text-[#d7263d]">Zero excuses.</span></>}
          sub="Everything a sprinkler system needs across its whole life — designed, installed, inspected and repaired by one accountable team."
        />
        <ServicesGrid />
      </section>

      {/* STATS band */}
      <section className="bg-[#16181d] text-white py-16 border-y-4 border-[#d7263d]">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
        </div>
      </section>

      {/* CASE STUDIES preview */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <SectionHeading kicker="Proof of work" title="Recent projects" sub="Real buildings, real head counts, real deadlines met." />
          <Link to="/ember/case-studies" className="inline-flex items-center gap-2 font-condensed uppercase tracking-wider text-lg text-[#d7263d] hover:gap-3.5 transition-all mb-12">
            All case studies <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.slice(0, 3).map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} />
          ))}
        </div>
      </section>

      {/* GAME teaser */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <GameTeaser />
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-white border-y-2 border-[#16181d] py-20">
        <div className="max-w-6xl mx-auto px-5">
          <Testimonial />
        </div>
      </section>

      <CTABand />
    </>
  )
}
