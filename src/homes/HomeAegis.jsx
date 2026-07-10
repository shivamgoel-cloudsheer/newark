import { Link } from 'react-router-dom'
import { company, caseStudies, industries } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { SectionHeading, ServicesGrid, StatBand, Testimonial, CTABand, GameTeaser, CaseStudyCard, TrustRow } from '../components/Blocks.jsx'

export default function HomeAegis() {
  return (
    <>
      {/* HERO — clean corporate split with compliance card */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f7f9fc]" />
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-24 relative grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 bg-[#eaf1f8] text-[#0f2a43] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              <Icon name="shield" size={14} /> NJ Division of Fire Safety · {company.permit}
            </span>
            <h1 className="font-manrope font-extrabold text-4xl md:text-6xl text-[#0f2a43] leading-[1.05] mt-6 tracking-tight">
              Fire protection your <span className="text-[#c1121f]">fire official</span> will sign off on.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              NFPA 25 inspections filed on time, systems installed to code, and a
              24/7 line that answers. {company.experience} — serving all of New Jersey.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/aegis/contact" className="inline-flex items-center gap-2 bg-[#c1121f] hover:bg-[#a00e19] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5">
                Schedule an Inspection <Icon name="arrow" size={17} />
              </Link>
              <a href={company.phoneHref} className="inline-flex items-center gap-2 bg-white text-[#0f2a43] font-bold px-8 py-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#0f2a43]/40 transition-colors">
                <Icon name="phone" size={17} /> {company.phone}
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500 flex items-center gap-2">
              <Icon name="check" size={15} /> Free consultation · Licensed, bonded & insured
            </p>
          </div>

          {/* compliance checklist card */}
          <div className="relative animate-rise" style={{ animationDelay: '150ms' }}>
            <div className="absolute -top-6 -right-4 w-56 h-56 bg-[#c1121f]/10 rounded-full blur-3xl" />
            <div className="bg-white rounded-3xl shadow-[0_25px_70px_-20px_rgba(15,42,67,0.35)] border border-slate-100 p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <p className="font-extrabold text-[#0f2a43]">Your NFPA 25 compliance calendar</p>
                <span className="text-[#c1121f]">
                  <Icon name="clipboard" size={26} />
                </span>
              </div>
              {[
                ['Quarterly', 'Waterflow alarms & FDC inspection', true],
                ['Annual', 'Full system inspection & testing', true],
                ['5-Year', 'Internal pipe & obstruction inspection', true],
                ['Every visit', 'State forms filed with your fire official', true],
              ].map(([when, what]) => (
                <div key={what} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
                  <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                    <Icon name="check" size={13} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-[#3d7dca]">{when}</span>
                    <span className="block text-sm font-semibold text-slate-700">{what}</span>
                  </span>
                </div>
              ))}
              <p className="mt-5 text-xs text-slate-400">
                NJ requires reports filed within 5 business days — we handle it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-6xl mx-auto px-5 pb-4">
        <TrustRow />
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <SectionHeading
          center
          kicker="Services"
          title="One partner for the full system lifecycle"
          sub="From the first shop drawing to the 3 AM emergency call — a single accountable contractor."
        />
        <ServicesGrid />
      </section>

      {/* INDUSTRIES */}
      <section className="bg-white border-y border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <SectionHeading center kicker="Who we protect" title="Every property type in New Jersey" />
          <div className="grid md:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="rounded-2xl border border-slate-100 bg-[#f7f9fc] p-6 hover:bg-[#eaf1f8] transition-colors">
                <span className="text-[#0f2a43]">
                  <Icon name="building" size={30} />
                </span>
                <h3 className="font-extrabold text-[#0f2a43] mt-3">{ind.name}</h3>
                <p className="text-sm text-slate-500 mt-2">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS + testimonial */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <StatBand />
        <div className="mt-20">
          <Testimonial />
        </div>
      </section>

      {/* CASE STUDIES preview */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeading kicker="Case studies" title="Work we can point to" />
            <Link to="/aegis/case-studies" className="inline-flex items-center gap-2 font-bold text-[#c1121f] hover:gap-3.5 transition-all mb-12">
              View all <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((cs) => (
              <CaseStudyCard key={cs.slug} cs={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* GAME */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <GameTeaser />
      </section>

      <CTABand />
    </>
  )
}
