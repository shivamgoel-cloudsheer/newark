import { Link, useParams } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { blogPosts } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { CTABand } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'

export default function Blog() {
  const t = useTheme()
  const { variantId } = useParams()
  const [featured, ...rest] = blogPosts
  return (
    <>
      <PageHero
        kicker="Blog"
        title="Fire safety, decoded"
        sub="Compliance deadlines, maintenance red flags and sprinkler myths — written for building owners, not engineers."
      />

      <section className="max-w-6xl mx-auto px-5 py-16">
        {/* featured */}
        <Link to={`/${variantId}/blog/${featured.slug}`} className={`${t.card} ${t.cardHover} grid lg:grid-cols-2 overflow-hidden mb-12 block`}>
          <div className="min-h-[220px] bg-gradient-to-br from-orange-500 via-red-600 to-red-900 relative flex items-center justify-center">
            <span className="text-white/90 animate-flicker">
              <Icon name="flame" size={90} />
            </span>
            <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-white bg-black/30 backdrop-blur px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
          <div className="p-8 md:p-10">
            <div className="flex gap-2 flex-wrap">
              {featured.tags.map((tag) => (
                <span key={tag} className={t.badge}>{tag}</span>
              ))}
            </div>
            <h2 className={`${t.display} text-2xl md:text-3xl mt-4 leading-tight`}>{featured.title}</h2>
            <p className={`mt-3 ${t.muted}`}>{featured.excerpt}</p>
            <p className={`mt-4 text-xs font-semibold uppercase tracking-wider ${t.muted}`}>{featured.date}</p>
            <span className={`inline-flex items-center gap-2 mt-5 font-bold ${t.accentText}`}>
              Read article <Icon name="arrow" size={16} />
            </span>
          </div>
        </Link>

        {/* grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p) => (
            <Link key={p.slug} to={`/${variantId}/blog/${p.slug}`} className={`${t.card} ${t.cardHover} p-7 flex flex-col`}>
              <div className="flex gap-2 flex-wrap mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className={t.badge}>{tag}</span>
                ))}
              </div>
              <h3 className={`${t.display} text-xl leading-snug`}>{p.title}</h3>
              <p className={`mt-2 text-sm flex-1 ${t.muted}`}>{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className={`text-xs font-semibold uppercase tracking-wider ${t.muted}`}>{p.date}</span>
                <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${t.accentText}`}>
                  Read <Icon name="arrow" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
