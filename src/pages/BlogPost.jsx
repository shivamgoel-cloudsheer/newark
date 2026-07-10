import { useParams, Link, Navigate } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { blogPosts, company } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { CTABand } from '../components/Blocks.jsx'

export default function BlogPost() {
  const t = useTheme()
  const { variantId, slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return <Navigate to={`/${variantId}/blog`} replace />
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <article className="max-w-3xl mx-auto px-5 py-16">
        <Link to={`/${variantId}/blog`} className={`inline-flex items-center gap-2 text-sm font-bold ${t.accentText}`}>
          <span className="rotate-180 inline-block"><Icon name="arrow" size={15} /></span> All articles
        </Link>
        <div className="flex gap-2 flex-wrap mt-6">
          {post.tags.map((tag) => (
            <span key={tag} className={t.badge}>{tag}</span>
          ))}
        </div>
        <h1 className={`${t.display} text-3xl md:text-5xl mt-4 leading-tight`}>{post.title}</h1>
        <p className={`mt-4 text-sm font-semibold uppercase tracking-wider ${t.muted}`}>
          {post.date} · Newark Fire Sprinkler Corp.
        </p>

        <div className="mt-10 space-y-6">
          {post.body.map(([kind, text], i) =>
            kind === 'h3' ? (
              <h3 key={i} className={`${t.display} text-xl md:text-2xl pt-2`}>{text}</h3>
            ) : (
              <p key={i} className={`leading-relaxed ${t.muted}`}>{text}</p>
            ),
          )}
        </div>

        <div className={`${t.card} p-7 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5`}>
          <span className={t.accentText}>
            <Icon name="phone" size={32} />
          </span>
          <div className="flex-1">
            <p className="font-bold">Questions about your system?</p>
            <p className={`text-sm ${t.muted}`}>Talk to a NICET-certified technician — free consultation.</p>
          </div>
          <a href={company.phoneHref} className={t.btnPrimary}>
            {company.phone}
          </a>
        </div>
      </article>

      <section className="max-w-3xl mx-auto px-5 pb-16">
        <h2 className={`${t.display} text-xl mb-5`}>Keep reading</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {others.map((p) => (
            <Link key={p.slug} to={`/${variantId}/blog/${p.slug}`} className={`${t.card} ${t.cardHover} p-6`}>
              <h3 className="font-bold leading-snug">{p.title}</h3>
              <p className={`text-xs mt-2 uppercase tracking-wider font-semibold ${t.muted}`}>{p.date}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
