import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { services, industries, company, images } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, SectionHeading, CTABand, TrustRow, ProcessTimeline } from '../components/Blocks.jsx'

const serviceImages = {
  installation: images.heroIndustrial,
  'service-repairs': images.engineer,
  inspections: images.planningDesk,
  design: images.blueprint,
}

export default function Services() {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <>
      <PageHero
        kicker="Services"
        title="The full lifecycle of your sprinkler system"
        sub="Design, installation, inspection, and 24/7 emergency service — one licensed team accountable for all of it."
      />

      <Section className="py-20">
        <div className="max-w-7xl mx-auto px-5 space-y-8">
          {services.map((s, i) => (
            <div
              key={s.slug}
              id={s.slug}
              className={`${t.card} overflow-hidden grid lg:grid-cols-[0.9fr_1.1fr] reveal ${i % 2 ? 'lg:[direction:rtl]' : ''}`}
            >
              <div className="relative min-h-[260px] img-zoom overflow-hidden [direction:ltr]">
                <img src={serviceImages[s.slug]} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-4 left-5 text-white font-bold text-xs uppercase tracking-[0.16em]">
                  {`0${i + 1}`} — {s.tagline}
                </span>
              </div>
              <div className="p-8 md:p-12 [direction:ltr]">
                <span className={`${t.accentText} inline-block`}>
                  <Icon name={s.icon} size={34} />
                </span>
                <h2 className={`${t.display} text-2xl md:text-3xl leading-tight mt-4`}>{s.title}</h2>
                <p className={`mt-4 leading-relaxed ${t.muted}`}>{s.desc}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-medium">
                      <span className={`${t.accentText} mt-0.5 shrink-0`}>
                        <Icon name="check" size={16} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/${variantId}/contact`} className={`${t.btnPrimary} mt-8`}>
                  Get a quote <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* licensing note */}
      <Section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className={`${t.card} p-8 md:p-10 flex flex-col md:flex-row gap-7 items-start reveal`}>
            <span className={`${t.accentText} shrink-0`}>
              <Icon name="shield" size={42} />
            </span>
            <div>
              <h3 className={`${t.display} text-xl md:text-2xl`}>Licensed for exactly what we sell</h3>
              <p className={`mt-3 text-[15px] leading-relaxed ${t.muted}`}>
                New Jersey law requires a Division of Fire Safety permit for anyone who installs,
                services or inspects fire sprinkler systems. We hold {company.permit} ({company.permitClass}) —
                verifiable on the state's public Permitted Business list. If a contractor can't show you
                a P-number, they can't legally touch your system.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <div className="max-w-7xl mx-auto px-5">
          <SectionHeading kicker="How we work" title="From walkthrough to sign-off" />
          <ProcessTimeline />
          <div className="mt-16">
            <SectionHeading kicker="Industries" title="Built for every property type" />
            <div className="grid md:grid-cols-4 gap-5">
              {industries.map((ind, i) => (
                <div key={ind.name} className={`${t.card} p-6 reveal`} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className={t.accentText}>
                    <Icon name="building" size={28} />
                  </span>
                  <h3 className="font-bold mt-3">{ind.name}</h3>
                  <p className={`text-sm mt-2 leading-relaxed ${t.muted}`}>{ind.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <TrustRow />
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}

export function PageHero({ kicker, title, sub }) {
  const t = useTheme()
  const { variantId } = useParams()
  if (variantId === 'aegis')
    return (
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img src={images.cityDark} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0b0b]/60 to-[#0e0b0b]" />
          <div className="absolute -top-24 -right-24 w-[440px] h-[440px] bg-[#e5062d]/18 blur-[110px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24 relative">
          <p className={`${t.eyebrow} animate-rise`}>{kicker}</p>
          <h1 className="font-anton uppercase text-4xl md:text-[4.4rem] mt-4 leading-[0.98] max-w-4xl text-[#fff7f0] animate-rise" style={{ animationDelay: '80ms' }}>
            {title}
          </h1>
          {sub && (
            <p className="mt-6 text-lg max-w-2xl text-[#cbbdb5] leading-relaxed animate-rise" style={{ animationDelay: '160ms' }}>
              {sub}
            </p>
          )}
        </div>
      </section>
    )
  if (variantId === 'pulse')
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-[#ff5c1a]/12 blur-[110px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-20 relative">
          <p className={`${t.eyebrow} animate-rise`}>{kicker}</p>
          <h1 className={`${t.display} text-4xl md:text-[3.6rem] mt-4 leading-[1.05] max-w-3xl text-white animate-rise`} style={{ animationDelay: '80ms' }}>
            {title}
          </h1>
          {sub && (
            <p className="mt-5 text-lg max-w-2xl text-[#8b96a5] leading-relaxed animate-rise" style={{ animationDelay: '160ms' }}>
              {sub}
            </p>
          )}
        </div>
      </section>
    )
  return (
    <section className={`bg-gradient-to-b from-[#efece6] to-[#f7f5f2] border-b ${t.hairline}`}>
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <p className={`${t.eyebrow} animate-rise`}>{kicker}</p>
        <h1
          className={`${t.display} text-4xl md:text-[3.6rem] mt-4 leading-[1.06] max-w-3xl text-[#14161a] animate-rise`}
          style={{ animationDelay: '80ms' }}
        >
          {title}
        </h1>
        {sub && (
          <p className={`mt-5 text-lg max-w-2xl leading-relaxed ${t.muted} animate-rise`} style={{ animationDelay: '160ms' }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
