import { useTheme } from '../theme.jsx'
import { team, company, stats, testimonial } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { CTABand, StatBand, TrustRow } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'

const values = [
  {
    icon: 'shield',
    title: 'Compliance is the product',
    desc: 'A sprinkler system that isn’t inspected, documented and filed is a liability. We treat the paperwork with the same rigor as the pipe.',
  },
  {
    icon: 'blueprint',
    title: 'Engineering in-house',
    desc: 'Our own design department produces hydraulic calculations and shop drawings — no subcontracted black boxes between design and field.',
  },
  {
    icon: 'phone',
    title: 'Answer the phone',
    desc: 'Fires and burst pipes don’t book appointments. Our emergency line is staffed 24/7, every day of the year.',
  },
]

export default function About() {
  const t = useTheme()
  return (
    <>
      <PageHero
        kicker="About us"
        title="A specialist crew, not a generalist vendor"
        sub={`${company.tagline} — fire sprinkler design, installation, inspection and service for New Jersey, backed by ${company.experience.toLowerCase()}.`}
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className={`${t.display} text-3xl md:text-4xl leading-tight`}>
              Built around one system, done <span className={t.accentText}>completely right</span>
            </h2>
            <p className={`mt-5 leading-relaxed ${t.muted}`}>
              Newark Fire Sprinkler Corp. is a New Jersey fire protection contractor focused on
              water-based fire suppression. We design, install, inspect, and service fire
              sprinkler systems for residential, commercial, industrial and mixed-use
              properties — from single tenant fit-outs to a 218,028 sq ft high-rise with
              2,638 heads.
            </p>
            <p className={`mt-4 leading-relaxed ${t.muted}`}>
              We hold New Jersey Division of Fire Safety business permit{' '}
              <strong>P01570 (Class C2 — Fire Sprinkler Systems)</strong>, our technicians are
              NICET-certified, and every inspection we perform is filed with your local fire
              official within the state’s five-business-day deadline.
            </p>
            <div className="mt-8">
              <TrustRow />
            </div>
          </div>
          <div className="space-y-5">
            {values.map((v) => (
              <div key={v.title} className={`${t.card} p-7 flex gap-5 items-start`}>
                <span className={`${t.accentText} shrink-0`}>
                  <Icon name={v.icon} size={30} />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{v.title}</h3>
                  <p className={`text-sm mt-1.5 leading-relaxed ${t.muted}`}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${t.sectionAlt} py-16`}>
        <div className="max-w-6xl mx-auto px-5">
          <StatBand light />
        </div>
      </section>

      {/* team */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className={`${t.display} text-3xl md:text-4xl`}>Leadership & team</h2>
        <p className={`mt-3 max-w-xl ${t.muted}`}>
          Administration, design, field and inspection departments under one roof.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {team.map((m) => (
            <div key={m.name} className={`${t.card} p-6 text-center`}>
              <span
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-xl font-bold mb-4 ${t.badge}`}
                style={{ borderRadius: '9999px' }}
              >
                {m.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <p className="font-bold">{m.name}</p>
              <p className={`text-sm mt-0.5 ${t.muted}`}>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <figure className={`${t.card} p-10 text-center`}>
          <blockquote className={`${t.display} text-xl md:text-2xl max-w-2xl mx-auto leading-snug`}>
            “{testimonial.quote}”
          </blockquote>
          <figcaption className={`mt-4 text-sm font-semibold ${t.muted}`}>
            {testimonial.author} · {testimonial.source}
          </figcaption>
        </figure>
      </section>

      <CTABand />
    </>
  )
}
