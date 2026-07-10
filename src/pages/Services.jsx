import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { services, industries, company } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { SectionHeading, CTABand, TrustRow } from '../components/Blocks.jsx'

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

      <section className="max-w-6xl mx-auto px-5 py-16 space-y-10">
        {services.map((s, i) => (
          <div key={s.slug} id={s.slug} className={`${t.card} p-8 md:p-12 grid md:grid-cols-[1fr_1.4fr] gap-10 items-start`}>
            <div>
              <span className={`${t.accentText} inline-block mb-4`}>
                <Icon name={s.icon} size={44} />
              </span>
              <h2 className={`${t.display} text-2xl md:text-4xl leading-tight`}>{s.title}</h2>
              <p className={`mt-2 font-semibold ${t.accentText}`}>{s.tagline}</p>
              <Link to={`/${variantId}/contact`} className={`${t.btnPrimary} mt-7`}>
                Get a quote <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div>
              <p className={`leading-relaxed ${t.muted}`}>{s.desc}</p>
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
            </div>
          </div>
        ))}
      </section>

      {/* compliance note */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className={`${t.card} p-8 flex flex-col md:flex-row gap-6 items-start`}>
          <span className={`${t.accentText} shrink-0`}>
            <Icon name="shield" size={40} />
          </span>
          <div>
            <h3 className={`${t.display} text-xl md:text-2xl`}>Licensed for exactly what we sell</h3>
            <p className={`mt-2 text-sm leading-relaxed ${t.muted}`}>
              New Jersey law requires a Division of Fire Safety permit for anyone who installs,
              services or inspects fire sprinkler systems. We hold {company.permit} ({company.permitClass}) —
              verifiable on the state’s public Permitted Business list. If a contractor can’t show you
              a P-number, they can’t legally touch your system.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <SectionHeading kicker="Industries" title="Built for every property type" />
        <div className="grid md:grid-cols-4 gap-5">
          {industries.map((ind) => (
            <div key={ind.name} className={`${t.card} p-6`}>
              <span className={t.accentText}>
                <Icon name="building" size={28} />
              </span>
              <h3 className="font-bold mt-3">{ind.name}</h3>
              <p className={`text-sm mt-2 ${t.muted}`}>{ind.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <TrustRow />
        </div>
      </section>

      <CTABand />
    </>
  )
}

export function PageHero({ kicker, title, sub }) {
  const t = useTheme()
  const { variantId } = useParams()
  const wrap =
    variantId === 'ember'
      ? 'bg-[#16181d] text-white border-b-4 border-[#d7263d]'
      : variantId === 'aegis'
        ? 'bg-white border-b border-slate-100'
        : 'relative overflow-hidden'
  return (
    <section className={wrap}>
      {variantId === 'pulse' && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff6b35]/12 blur-[100px] rounded-full pointer-events-none" />
      )}
      <div className="max-w-6xl mx-auto px-5 py-16 md:py-20 relative">
        <span className={t.badge}>{kicker}</span>
        <h1 className={`${t.display} text-4xl md:text-6xl mt-5 leading-[1.02] max-w-3xl ${variantId !== 'aegis' ? 'text-white' : 'text-[#0f2a43]'}`}>
          {title}
        </h1>
        {sub && <p className={`mt-5 text-lg max-w-2xl ${variantId === 'aegis' ? 'text-slate-600' : 'text-white/70'}`}>{sub}</p>}
      </div>
    </section>
  )
}
