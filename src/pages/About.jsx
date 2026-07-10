import { useTheme } from '../theme.jsx'
import { team, company, values, testimonial, images } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, CTABand, StatBand, TrustRow } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'

const departments = ['Administration', 'Residential & Commercial', 'Industrial', 'Service & Inspections', 'Design']

export default function About() {
  const t = useTheme()
  return (
    <>
      <PageHero
        kicker="About us"
        title="30 years of fire protection leadership"
        sub={company.mission}
      />

      {/* story */}
      <Section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className={t.eyebrow}>Our story</p>
            <h2 className={`${t.display} text-3xl md:text-4xl leading-tight mt-4`}>
              Total fire protection, <span className={t.accentText}>tailored to you</span>
            </h2>
            <p className={`mt-6 leading-relaxed ${t.muted}`}>{company.story}</p>
            <p className={`mt-4 leading-relaxed ${t.muted}`}>
              We hold New Jersey Division of Fire Safety business permit{' '}
              <strong>P01570 (Class C2 — Fire Sprinkler Systems)</strong>, our technicians are
              NICET-certified, and every inspection we perform is filed with your local fire
              official within the state's five-business-day deadline.
            </p>
            <div className="mt-8">
              <TrustRow />
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden img-zoom reveal shadow-2xl" style={{ transitionDelay: '120ms' }}>
            <img src={images.meeting} alt="The Newark Fire Sprinkler team" className="w-full h-[440px] object-cover" />
          </div>
        </div>
      </Section>

      {/* values — real, from the About page */}
      <Section alt className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal mb-12">
            <p className={t.eyebrow}>Core values</p>
            <h2 className={`${t.display} text-3xl md:text-4xl text-white mt-4`}>What we hold ourselves to</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className="rounded-2xl border border-white/12 bg-white/5 p-7 flex gap-5 items-start reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className={`${t.accentText} shrink-0`}>
                  <Icon name={v.icon} size={28} />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-white">{v.title}</h3>
                  <p className="text-sm mt-2 leading-relaxed text-white/60">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* stats */}
      <Section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <StatBand />
        </div>
      </Section>

      {/* team — full real roster, grouped by department */}
      <Section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="reveal">
            <p className={t.eyebrow}>The team</p>
            <h2 className={`${t.display} text-3xl md:text-4xl mt-4`}>Five departments, one roof</h2>
            <p className={`mt-3 max-w-xl ${t.muted}`}>
              Administration, estimating, design, field and inspections — the whole lifecycle staffed in-house.
            </p>
          </div>
          <div className="mt-12 space-y-12">
            {departments.map((dept) => (
              <div key={dept} className="reveal">
                <h3 className={`${t.eyebrow} mb-5`}>{dept}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {team
                    .filter((m) => m.dept === dept)
                    .map((m) => (
                      <div key={m.name} className={`${t.card} ${t.cardHover} p-5`}>
                        <span className={`${t.badge} !px-3 !py-2 !rounded-full text-sm`}>
                          {m.name.split(' ').map((w) => w[0]).join('')}
                        </span>
                        <p className="font-bold mt-3.5 leading-tight">{m.name}</p>
                        <p className={`text-xs mt-1 ${t.muted}`}>{m.role}</p>
                        {m.email && (
                          <a href={`mailto:${m.email}`} className={`block text-[11px] mt-2 font-semibold ${t.accentText} hover:underline break-all`}>
                            {m.email}
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* testimonial */}
      <Section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <figure className={`${t.card} p-10 text-center reveal`}>
            <blockquote className={`${t.serif} text-xl md:text-2xl max-w-2xl mx-auto leading-snug`}>
              “{testimonial.quote}”
            </blockquote>
            <figcaption className={`mt-4 text-sm font-semibold ${t.muted}`}>
              {testimonial.author} — {testimonial.source}
            </figcaption>
          </figure>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
