import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { caseStudies } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { Section, CTABand, CaseStudyCard, caseStudyImage } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'

export default function CaseStudies() {
  const t = useTheme()
  const { variantId } = useParams()
  const [flagship, ...rest] = caseStudies
  return (
    <>
      <PageHero
        kicker="Case Studies"
        title="Buildings we protect"
        sub="Head counts, square footage and deadlines — the numbers behind the work."
      />

      {/* flagship spread */}
      <Section className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className={`${t.card} overflow-hidden grid lg:grid-cols-2 reveal`}>
            <div className="relative min-h-[340px] img-zoom overflow-hidden">
              <img src={caseStudyImage(flagship.slug)} alt={flagship.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-4 left-4 text-white text-[11px] font-bold uppercase tracking-[0.14em] bg-black/35 backdrop-blur px-3 py-1.5 rounded-full">
                Flagship · {flagship.sector}
              </span>
            </div>
            <div className="p-8 md:p-12 flex flex-col">
              <p className={t.eyebrow}>Case study</p>
              <h2 className={`${t.display} text-3xl md:text-4xl mt-3 leading-tight`}>{flagship.title}</h2>
              <p className={`mt-4 leading-relaxed ${t.muted}`}>{flagship.summary}</p>
              <p className={`mt-3 text-sm leading-relaxed ${t.muted}`}>{flagship.body}</p>
              <div className={`mt-7 grid grid-cols-3 gap-4 border-t ${t.hairline} pt-6`}>
                {flagship.metrics.map((m) => (
                  <div key={m.label}>
                    <p className={`${t.display} text-2xl md:text-3xl ${t.accentText}`}>{m.value}</p>
                    <p className={`text-xs mt-1 ${t.muted}`}>{m.label}</p>
                  </div>
                ))}
              </div>
              <Link to={`/${variantId}/contact`} className={`${t.btnPrimary} mt-8 self-start`}>
                Start your project <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* the rest */}
      <Section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-6">
          {rest.map((cs, i) => (
            <CaseStudyCard key={cs.slug} cs={cs} delay={i * 90} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  )
}
