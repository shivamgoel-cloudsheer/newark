import { Link, useParams } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { services, caseStudies, stats, trustBadges, testimonial, company } from '../data/content.js'
import { Icon } from './Icons.jsx'

export function SectionHeading({ kicker, title, sub, light = false, center = false }) {
  const t = useTheme()
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
      {kicker && <span className={t.badge}>{kicker}</span>}
      <h2 className={`${t.display} text-3xl md:text-5xl mt-4 leading-tight ${light ? 'text-white' : ''}`}>{title}</h2>
      {sub && <p className={`mt-4 text-lg ${light ? 'text-white/70' : t.muted}`}>{sub}</p>}
    </div>
  )
}

export function ServicesGrid({ compact = false }) {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <div className={`grid gap-6 ${compact ? 'md:grid-cols-4' : 'md:grid-cols-2'}`}>
      {services.map((s) => (
        <div key={s.slug} className={`${t.card} ${t.cardHover} p-7 flex flex-col`}>
          <span className={`${t.accentText} mb-4`}>
            <Icon name={s.icon} size={34} />
          </span>
          <h3 className={`${t.display} text-xl md:text-2xl`}>{s.title}</h3>
          <p className={`text-sm font-semibold mt-1 ${t.accentText}`}>{s.tagline}</p>
          {!compact && <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>{s.desc}</p>}
          {!compact && (
            <ul className="mt-4 space-y-2 text-sm">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className={`${t.accentText} mt-0.5 shrink-0`}>
                    <Icon name="check" size={15} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <Link to={`/${variantId}/contact`} className={`mt-auto pt-5 inline-flex items-center gap-2 text-sm font-bold ${t.accentText} hover:gap-3 transition-all`}>
            Request this service <Icon name="arrow" size={15} />
          </Link>
        </div>
      ))}
    </div>
  )
}

export function StatBand({ light = false }) {
  const t = useTheme()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className={`${t.display} text-4xl md:text-5xl ${light ? 'text-white' : ''}`}>
            <span className={t.accentText}>{s.value}</span>
          </p>
          <p className={`text-sm mt-1 ${light ? 'text-white/60' : t.muted}`}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}

export function TrustRow({ light = false }) {
  const t = useTheme()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {trustBadges.map((b) => (
        <div key={b.label} className={`${t.card} p-4 flex items-center gap-3`}>
          <span className={t.accentText}>
            <Icon name="shield" size={26} />
          </span>
          <span>
            <span className="block font-bold text-sm">{b.label}</span>
            <span className={`block text-xs ${t.muted}`}>{b.detail}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function CaseStudyCard({ cs, big = false }) {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <Link to={`/${variantId}/case-studies`} className={`${t.card} ${t.cardHover} overflow-hidden flex flex-col`}>
      <div
        className="h-36 relative flex items-end p-4"
        style={{ background: `linear-gradient(135deg, ${cs.accent}, ${cs.accent}55)` }}
      >
        <span className="absolute top-3 right-3 text-white/80">
          <Icon name="building" size={30} />
        </span>
        <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">
          {cs.sector}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`${t.display} text-lg md:text-xl leading-snug`}>{cs.title}</h3>
        <p className={`mt-2 text-sm ${t.muted} ${big ? '' : 'line-clamp-2'}`}>{cs.summary}</p>
        <div className="mt-4 pt-4 border-t border-current/10 grid grid-cols-3 gap-2">
          {cs.metrics.map((m) => (
            <span key={m.label}>
              <span className={`block font-bold ${t.accentText}`}>{m.value}</span>
              <span className={`block text-[11px] ${t.muted}`}>{m.label}</span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function Testimonial({ light = false }) {
  const t = useTheme()
  return (
    <figure className="max-w-3xl mx-auto text-center">
      <span className={`${t.accentText} inline-block mb-4`}>
        <Icon name="chat" size={34} />
      </span>
      <blockquote className={`${t.display} text-2xl md:text-3xl leading-snug ${light ? 'text-white' : ''}`}>
        “{testimonial.quote}”
      </blockquote>
      <figcaption className={`mt-5 text-sm font-semibold ${light ? 'text-white/60' : t.muted}`}>
        {testimonial.author} · {testimonial.source}
      </figcaption>
    </figure>
  )
}

export function CTABand() {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <section className={`${t.sectionAlt} py-16`}>
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h2 className={`${t.display} text-3xl md:text-4xl text-white`}>
            Is your building due for an <span className={t.accentText}>NFPA 25 inspection?</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-xl">
            New Jersey fines run $500–$5,000 per violation, per day. One call puts your
            compliance calendar on our desk instead of yours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a href={company.phoneHref} className={t.btnPrimary}>
            <Icon name="phone" size={18} /> {company.phone}
          </a>
          <Link to={`/${variantId}/contact`} className={t.btnSecondary}>
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}

export function GameTeaser() {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <div className={`${t.card} p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative`}>
      <div className="flex-1">
        <span className={t.badge}>
          <Icon name="gamepad" size={14} /> Interactive
        </span>
        <h3 className={`${t.display} text-2xl md:text-3xl mt-3`}>
          Think you could stop a fire? <span className={t.accentText}>Play the Fire Drill.</span>
        </h3>
        <p className={`mt-3 ${t.muted}`}>
          Place sprinkler heads on a limited budget, then watch a live fire break out.
          See how many seconds — and square feet — proper coverage actually buys you.
        </p>
        <Link to={`/${variantId}/game`} className={`${t.btnPrimary} mt-6`}>
          Launch the simulator <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-1.5 shrink-0 opacity-90" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className={`w-9 h-9 rounded ${
              [5, 6, 9].includes(i)
                ? 'bg-gradient-to-br from-orange-400 to-red-600 animate-flicker'
                : [0, 3, 12, 15].includes(i)
                  ? 'bg-sky-400/70'
                  : 'bg-current/10'
            }`}
            style={{ animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
