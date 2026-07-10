import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { services, caseStudies, stats, trustBadges, testimonial, company, marqueeItems, process, faqs, images } from '../data/content.js'
import { Icon } from './Icons.jsx'
import { useRevealAll, useCountUp } from './hooks.js'

// ─── primitives ───────────────────────────────────────────────────────────────

export function Section({ children, className = '', alt = false }) {
  const t = useTheme()
  const ref = useRevealAll()
  return (
    <section ref={ref} className={`${alt ? t.sectionAlt : ''} ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeading({ kicker, title, sub, light = false, center = false }) {
  const t = useTheme()
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-14 reveal`}>
      {kicker && <p className={t.eyebrow}>{kicker}</p>}
      <h2 className={`${t.display} text-3xl md:text-[2.75rem] mt-4 leading-[1.08] ${light ? 'text-white' : ''}`}>{title}</h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-white/65' : t.muted}`}>{sub}</p>}
    </div>
  )
}

function CountStat({ value, label, light }) {
  const t = useTheme()
  const [ref, text] = useCountUp(value)
  return (
    <div ref={ref} className="text-center reveal">
      <p className={`${t.display} text-4xl md:text-[3.4rem] leading-none ${light ? 'text-white' : ''}`}>
        <span className={t.accentText}>{text}</span>
      </p>
      <p className={`text-sm mt-2.5 ${light ? 'text-white/55' : t.muted}`}>{label}</p>
    </div>
  )
}

export function StatBand({ light = false }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {stats.map((s) => (
        <CountStat key={s.label} value={s.value} label={s.label} light={light} />
      ))}
    </div>
  )
}

// credential marquee strip
export function Marquee({ dark = false }) {
  const t = useTheme()
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div className={`relative overflow-hidden py-5 border-y ${t.hairline}`}>
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {row.map((m, i) => (
          <span key={i} className={`flex items-center gap-3 text-sm font-semibold whitespace-nowrap ${dark ? 'text-white/50' : t.muted}`}>
            <span className={t.accentText}>
              <Icon name="shield" size={15} />
            </span>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

export function TrustRow() {
  const t = useTheme()
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {trustBadges.map((b, i) => (
        <div key={b.label} className={`${t.card} p-5 flex items-center gap-3.5 reveal`} style={{ transitionDelay: `${i * 70}ms` }}>
          <span className={t.accentText}>
            <Icon name="shield" size={26} />
          </span>
          <span>
            <span className="block font-bold text-sm">{b.label}</span>
            <span className={`block text-xs mt-0.5 ${t.muted}`}>{b.detail}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── content blocks ───────────────────────────────────────────────────────────

const serviceImages = {
  installation: images.heroIndustrial,
  'service-repairs': images.engineer,
  inspections: images.planningDesk,
  design: images.blueprint,
}

export function ServiceCards() {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          to={`/${variantId}/services`}
          className={`${t.card} ${t.cardHover} overflow-hidden group img-zoom reveal flex flex-col`}
          style={{ transitionDelay: `${(i % 2) * 90}ms` }}
        >
          <div className="h-52 overflow-hidden relative">
            <img src={serviceImages[s.slug]} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute bottom-4 left-5 text-white font-bold text-xs uppercase tracking-[0.16em] flex items-center gap-2">
              <span className="text-white/90"><Icon name={s.icon} size={18} /></span> {s.tagline}
            </span>
          </div>
          <div className="p-7 flex flex-col flex-1">
            <h3 className={`${t.display} text-xl md:text-2xl`}>{s.title}</h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${t.muted}`}>{s.desc}</p>
            <span className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${t.accentText} group-hover:gap-3.5 transition-all`}>
              Explore service <Icon name="arrow" size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

const csImages = {
  'singh-tower': images.buildingGlass,
  'logistics-warehouse': images.warehouse,
  'mixed-use-newark': images.buildingWhite,
  'restaurant-repair': images.interior,
}
export const caseStudyImage = (slug) => csImages[slug] || images.buildingGlass

export function CaseStudyCard({ cs, delay = 0 }) {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <Link
      to={`/${variantId}/case-studies`}
      className={`${t.card} ${t.cardHover} overflow-hidden flex flex-col img-zoom reveal`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-44 relative overflow-hidden">
        <img src={caseStudyImage(cs.slug)} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="absolute bottom-3.5 left-4 text-white text-[11px] font-bold uppercase tracking-[0.14em] bg-black/35 backdrop-blur px-3 py-1.5 rounded-full">
          {cs.sector}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`${t.display} text-lg leading-snug`}>{cs.title}</h3>
        <p className={`mt-2 text-sm flex-1 ${t.muted}`}>{cs.summary}</p>
        <div className={`mt-5 pt-4 border-t ${t.hairline} grid grid-cols-3 gap-2`}>
          {cs.metrics.map((m) => (
            <span key={m.label}>
              <span className={`block font-bold ${t.accentText}`}>{m.value}</span>
              <span className={`block text-[11px] mt-0.5 ${t.muted}`}>{m.label}</span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ProcessTimeline({ light = false }) {
  const t = useTheme()
  return (
    <div className="grid md:grid-cols-4 gap-8 md:gap-6">
      {process.map((p, i) => (
        <div key={p.n} className="relative reveal" style={{ transitionDelay: `${i * 90}ms` }}>
          {i < process.length - 1 && (
            <span className={`hidden md:block absolute top-5 left-14 right-0 border-t border-dashed ${light ? 'border-white/15' : t.hairline}`} />
          )}
          <span className={`relative inline-flex items-center justify-center w-11 h-11 rounded-full font-bold text-sm ${light ? 'bg-white/10 text-white border border-white/20' : `${t.badge} !text-[13px]`}`}>
            {p.n}
          </span>
          <h3 className={`${t.display} text-lg mt-5 ${light ? 'text-white' : ''}`}>{p.title}</h3>
          <p className={`text-sm mt-2 leading-relaxed ${light ? 'text-white/60' : t.muted}`}>{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function FAQ({ light = false }) {
  const t = useTheme()
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((f, i) => {
        const open = openIdx === i
        return (
          <div key={i} className={`${t.card} overflow-hidden reveal`} style={{ transitionDelay: `${i * 60}ms` }}>
            <button
              onClick={() => setOpenIdx(open ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
            >
              <span className="font-bold text-[15px]">{f.q}</span>
              <span className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''} ${t.accentText}`}>
                <Icon name="close" size={18} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className={`px-6 pb-6 text-sm leading-relaxed ${t.muted}`}>{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Testimonial({ light = false }) {
  const t = useTheme()
  return (
    <figure className="max-w-3xl mx-auto text-center reveal">
      <div className="flex justify-center gap-1 mb-6 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
          </svg>
        ))}
      </div>
      <blockquote className={`${t.serif} text-2xl md:text-[2rem] leading-[1.35] ${light ? 'text-white' : ''}`}>
        “{testimonial.quote}”
      </blockquote>
      <figcaption className={`mt-6 text-sm font-semibold ${light ? 'text-white/55' : t.muted}`}>
        {testimonial.author} — {testimonial.source}
      </figcaption>
    </figure>
  )
}

export function CTABand() {
  const t = useTheme()
  const { variantId } = useParams()
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={images.cityDark} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${variantId === 'aegis' ? 'bg-gradient-to-r from-[#1a0709]/95 to-[#0e0b0b]/92' : variantId === 'ember' ? 'bg-[#14161a]/93' : 'bg-[#0a0c10]/93'}`} />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 py-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <p className={t.eyebrow}>NFPA 25 · NJ Fire Code</p>
          <h2 className={`${t.display} text-3xl md:text-[2.6rem] leading-[1.1] text-white mt-3`}>
            Is your building due for an inspection?
          </h2>
          <p className="mt-4 text-white/65 max-w-xl text-lg">
            New Jersey fines run $500–$5,000 per violation, per day. One call puts your
            compliance calendar on our desk instead of yours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a href={company.phoneHref} className={t.btnPrimary}>
            <Icon name="phone" size={18} /> {company.phone}
          </a>
          <Link to={`/${variantId}/contact`} className={t.btnSecondary}>
            Request a quote
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
    <div className={`${t.card} overflow-hidden grid lg:grid-cols-2 reveal`}>
      <div className="p-9 md:p-12">
        <p className={t.eyebrow}>Interactive · 60 seconds</p>
        <h3 className={`${t.display} text-2xl md:text-[2.1rem] leading-[1.12] mt-3`}>
          Think you could stop a fire? <span className={t.accentText}>Run the drill.</span>
        </h3>
        <p className={`mt-4 leading-relaxed ${t.muted}`}>
          Place sprinkler heads on a limited budget, then watch a live fire model take over —
          spreading flames, evacuating people, heads triggering on heat. Then see the same
          fire with no protection at all.
        </p>
        <Link to={`/${variantId}/game`} className={`${t.btnPrimary} mt-7`}>
          <Icon name="gamepad" size={18} /> Launch the simulator
        </Link>
      </div>
      <div className="relative min-h-[260px] bg-[#0a0c10] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark" />
        <div className="grid grid-cols-5 gap-2 relative" aria-hidden>
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className={`w-10 h-10 rounded-lg ${
                [6, 7, 12].includes(i)
                  ? 'bg-gradient-to-br from-amber-300 via-orange-500 to-red-700 animate-flicker shadow-[0_0_24px_rgba(255,120,40,0.5)]'
                  : [0, 4, 20, 24].includes(i)
                    ? 'bg-sky-400/80 shadow-[0_0_16px_rgba(56,152,255,0.45)]'
                    : 'bg-white/[0.06] border border-white/10'
              }`}
              style={{ animationDelay: `${i * 110}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
