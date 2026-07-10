import { useParams, Link, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider, themes } from '../theme.jsx'
import { company } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { useScrolled } from '../components/hooks.js'
import ChatBot from '../components/ChatBot.jsx'
import HomeEmber from '../homes/HomeEmber.jsx'
import HomeAegis from '../homes/HomeAegis.jsx'
import HomePulse from '../homes/HomePulse.jsx'
import Services from '../pages/Services.jsx'
import CaseStudies from '../pages/CaseStudies.jsx'
import Blog from '../pages/Blog.jsx'
import BlogPost from '../pages/BlogPost.jsx'
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
import GamePage from '../pages/GamePage.jsx'

const NAV = [
  { to: '', label: 'Home', end: true },
  { to: 'services', label: 'Services' },
  { to: 'case-studies', label: 'Case Studies' },
  { to: 'blog', label: 'Blog' },
  { to: 'about', label: 'About' },
  { to: 'game', label: 'Fire Drill' },
  { to: 'contact', label: 'Contact' },
]

const HOMES = { ember: HomeEmber, aegis: HomeAegis, pulse: HomePulse }

export default function VariantSite() {
  const { variantId } = useParams()
  const t = themes[variantId]
  if (!t) return <Navigate to="/" replace />
  const Home = HOMES[variantId]

  return (
    <ThemeProvider value={t}>
      <div className={`min-h-screen flex flex-col ${t.body}`}>
        <Header />
        <div className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="game" element={<GamePage />} />
            <Route path="*" element={<Navigate to={`/${variantId}`} replace />} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
        <ConceptSwitcher current={variantId} />
      </div>
    </ThemeProvider>
  )
}

function Header() {
  const { variantId } = useParams()
  const t = themes[variantId]
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const base = `/${variantId}`

  const linkCls = ({ isActive }) => {
    if (variantId === 'ember')
      return `text-sm font-semibold px-1 pb-0.5 border-b-2 transition-colors ${
        isActive ? 'border-[#c8102e] text-[#14161a]' : 'border-transparent text-[#5b5f68] hover:text-[#14161a]'
      }`
    if (variantId === 'aegis')
      return `text-[13px] font-bold uppercase tracking-[0.08em] px-1 transition-colors ${
        isActive ? 'text-[#ff3b4f]' : 'text-white/70 hover:text-white'
      }`
    return `text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
      isActive ? 'bg-[#ff5c1a]/15 text-[#ff9f1c]' : 'text-[#8b96a5] hover:text-white hover:bg-white/5'
    }`
  }

  const Logo = (
    <Link to={base} className="flex items-center gap-2.5 shrink-0">
      <span
        className={
          variantId === 'ember'
            ? 'inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#c8102e] text-white'
            : variantId === 'aegis'
              ? 'inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-[#e5062d] to-[#ff6b1a] text-white'
              : 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#ff5c1a] to-[#ff9f1c] text-[#0a0c10]'
        }
      >
        <Icon name="flame" size={21} />
      </span>
      <span className="leading-tight">
        <span
          className={`block font-bold tracking-tight ${
            variantId === 'ember'
              ? 'font-archivo text-[#14161a]'
              : variantId === 'aegis'
                ? 'font-anton uppercase tracking-[0.04em] text-[#fff7f0]'
                : 'font-grotesk text-white'
          }`}
        >
          Newark Fire Sprinkler
        </span>
        <span className={`block text-[10.5px] tracking-wide ${variantId === 'pulse' ? 'text-[#8b96a5]' : variantId === 'aegis' ? 'text-[#ff8095] font-semibold' : 'text-[#5b5f68]'}`}>
          {company.permit} · New Jersey
        </span>
      </span>
    </Link>
  )

  if (variantId === 'aegis')
    return (
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'bg-[#0e0b0b]/95 shadow-[0_10px_40px_-16px_rgba(229,6,45,0.35)]' : 'bg-[#0e0b0b]/70'} backdrop-blur-xl border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-6">
          {Logo}
          <nav className="hidden lg:flex items-center gap-6 ml-auto">
            {NAV.map((n) => (
              <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
                {n.label}
              </NavLink>
            ))}
            <a href={company.phoneHref} className="inline-flex items-center gap-2 text-[13px] font-extrabold text-white">
              <span className="relative flex">
                <span className="absolute inline-flex w-8 h-8 rounded-full bg-[#e5062d]/50 animate-pulse-ring" />
                <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#e5062d] to-[#ff6b1a] text-white">
                  <Icon name="phone" size={14} />
                </span>
              </span>
              {company.phone}
            </a>
            <Link to={`${base}/contact`} className={t.btnPrimary + ' !px-5 !py-2.5 !text-xs'}>
              Get a quote
            </Link>
          </nav>
          <MobileToggle open={open} setOpen={setOpen} cls="text-white" />
        </div>
        {open && <MobileNav base={base} setOpen={setOpen} cls="bg-[#0e0b0b] border-t border-white/10 text-white" />}
      </header>
    )

  if (variantId === 'ember')
    return (
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'bg-[#f7f5f2]/95 backdrop-blur-xl shadow-[0_8px_30px_-16px_rgba(20,22,26,0.3)]' : 'bg-[#f7f5f2]'} border-b border-[#14161a]/8`}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-6">
          {Logo}
          <nav className="hidden lg:flex items-center gap-6 ml-auto">
            {NAV.map((n) => (
              <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
                {n.label}
              </NavLink>
            ))}
            <a href={company.phoneHref} className="inline-flex items-center gap-2 font-archivo font-bold text-sm text-[#14161a]">
              <span className="relative flex">
                <span className="absolute inline-flex w-8 h-8 rounded-full bg-[#c8102e]/40 animate-pulse-ring" />
                <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#c8102e] text-white">
                  <Icon name="phone" size={14} />
                </span>
              </span>
              {company.phone}
            </a>
            <Link to={`${base}/contact`} className={t.btnSecondary + ' !px-5 !py-2.5 text-sm'}>
              Get a quote
            </Link>
          </nav>
          <MobileToggle open={open} setOpen={setOpen} cls="text-[#14161a]" />
        </div>
        {open && <MobileNav base={base} setOpen={setOpen} cls="bg-[#f7f5f2] border-t border-[#14161a]/10 text-[#14161a]" />}
      </header>
    )

  // pulse — floating pill
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className={`max-w-5xl mx-auto rounded-full border transition-all ${scrolled ? 'border-white/15 bg-[#0a0c10]/90 shadow-2xl shadow-black/50' : 'border-white/10 bg-[#0a0c10]/70'} backdrop-blur-xl px-4 py-2 flex items-center gap-4`}>
        {Logo}
        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV.map((n) => (
            <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
          <Link to={`${base}/contact`} className={t.btnPrimary + ' !px-5 !py-2 text-sm ml-1'}>
            Get a quote
          </Link>
        </nav>
        <MobileToggle open={open} setOpen={setOpen} cls="text-white" />
      </div>
      {open && (
        <div className="max-w-5xl mx-auto mt-2 rounded-2xl border border-white/10 bg-[#0a0c10]/95 backdrop-blur-xl overflow-hidden">
          <MobileNav base={base} setOpen={setOpen} cls="text-white" bare />
        </div>
      )}
    </header>
  )
}

function MobileToggle({ open, setOpen, cls }) {
  return (
    <button onClick={() => setOpen(!open)} className={`lg:hidden ml-auto p-2 ${cls}`} aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {open ? (
          <>
            <path d="M6 6l12 12M18 6L6 18" />
          </>
        ) : (
          <>
            <path d="M4 7h16M4 12h16M4 17h10" />
          </>
        )}
      </svg>
    </button>
  )
}

function MobileNav({ base, setOpen, cls, bare }) {
  return (
    <nav className={`lg:hidden ${cls} px-6 py-4 flex flex-col gap-3`}>
      {NAV.map((n) => (
        <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} onClick={() => setOpen(false)} className="py-1.5 font-semibold">
          {n.label}
        </NavLink>
      ))}
    </nav>
  )
}

function Footer() {
  const { variantId } = useParams()
  const base = `/${variantId}`
  const wrap =
    variantId === 'ember'
      ? 'bg-[#14161a] text-white'
      : variantId === 'aegis'
        ? 'bg-[#0a0808] text-white border-t border-[#e5062d]/30'
        : 'bg-[#07090c] text-[#c9d2de] border-t border-white/8'
  const brandFont = variantId === 'ember' ? 'font-archivo' : variantId === 'aegis' ? 'font-anton uppercase tracking-[0.03em]' : 'font-grotesk'
  return (
    <footer className={wrap}>
      <div className="max-w-7xl mx-auto px-5 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className={`${brandFont} text-2xl font-bold tracking-tight`}>Newark Fire Sprinkler Corp.</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
            {company.tagline}. Design, installation, inspection and 24/7 emergency service
            for fire sprinkler systems across New Jersey.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold">
            {[company.permit, 'NICET Certified', 'NFPA 13 & 25', 'Licensed & Insured'].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full border border-white/15 text-white/70">
                {b}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold mb-4 text-xs uppercase tracking-[0.16em] text-white/40">Explore</p>
          <ul className="space-y-2.5 text-sm text-white/75">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={`${base}/${n.to}`} className="hover:text-white transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold mb-4 text-xs uppercase tracking-[0.16em] text-white/40">Contact</p>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a href={company.phoneHref} className="font-bold text-white hover:underline">
                {company.phone}
              </a>
              <span className="block text-xs text-white/45 mt-0.5">24/7 emergency line</span>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white break-all transition-colors">
                {company.email}
              </a>
            </li>
            <li className="text-white/55">{company.address}</li>
            <li>
              <a href={company.portal} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Customer payment portal ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-5 text-xs text-white/35 flex flex-wrap gap-2 justify-between">
          <span>© 2026 Newark Fire Sprinkler Corp. All rights reserved.</span>
          <span>{company.permit} · {company.permitClass}</span>
        </div>
      </div>
    </footer>
  )
}

function ConceptSwitcher({ current }) {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur px-3 py-2 text-white shadow-xl border border-white/15">
      <Link to="/" className="text-[11px] font-bold uppercase tracking-wider pr-1.5 border-r border-white/20 hover:text-orange-300">
        Gallery
      </Link>
      {['ember', 'aegis', 'pulse'].map((v) => (
        <Link
          key={v}
          to={`/${v}`}
          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full transition-colors ${
            v === current ? 'bg-white text-black' : 'hover:bg-white/20'
          }`}
        >
          {v === 'ember' ? 'A' : v === 'aegis' ? 'B' : 'C'}
        </Link>
      ))}
    </div>
  )
}
