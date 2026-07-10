import { useParams, useLocation, Link, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider, themes } from '../theme.jsx'
import { company } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
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
  { to: 'game', label: 'Fire Drill Game' },
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
  const base = `/${variantId}`

  const linkCls = ({ isActive }) => {
    if (variantId === 'ember')
      return `font-condensed uppercase tracking-wider text-lg px-1 border-b-2 transition-colors ${
        isActive ? 'border-[#d7263d] text-white' : 'border-transparent text-white/70 hover:text-white'
      }`
    if (variantId === 'aegis')
      return `text-sm font-semibold px-1 transition-colors ${
        isActive ? 'text-[#c1121f]' : 'text-[#182635]/80 hover:text-[#0f2a43]'
      }`
    return `text-sm font-medium px-3 py-1.5 rounded-full transition-all ${
      isActive ? 'bg-[#ff6b35]/15 text-[#ff9f1c]' : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`
  }

  const Logo = (
    <Link to={base} className="flex items-center gap-2.5 shrink-0">
      <span
        className={
          variantId === 'ember'
            ? 'inline-flex items-center justify-center w-10 h-10 bg-[#d7263d] text-white border-2 border-white/20'
            : variantId === 'aegis'
              ? 'inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#c1121f] text-white'
              : 'inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff9f1c] text-[#0b0f14]'
        }
      >
        <Icon name="flame" size={22} />
      </span>
      <span className="leading-tight">
        <span className={`block font-bold ${variantId === 'ember' ? 'font-condensed uppercase text-xl tracking-wide text-white' : variantId === 'aegis' ? 'text-[#0f2a43]' : 'text-white'}`}>
          Newark Fire Sprinkler
        </span>
        <span className={`block text-[11px] ${variantId === 'ember' ? 'text-[#ffb703]' : variantId === 'aegis' ? 'text-slate-500' : 'text-slate-400'}`}>
          {company.permit}
        </span>
      </span>
    </Link>
  )

  if (variantId === 'aegis')
    return (
      <header className="sticky top-0 z-40">
        <div className="bg-[#0f2a43] text-white text-xs">
          <div className="max-w-6xl mx-auto px-5 py-1.5 flex items-center gap-4">
            <span className="hidden sm:inline">{company.permit} · {company.permitClass}</span>
            <span className="hidden md:inline text-white/60">{company.serviceArea}</span>
            <a href={company.phoneHref} className="ml-auto font-bold inline-flex items-center gap-1.5">
              <Icon name="phone" size={13} /> 24/7 Emergency: {company.phone}
            </a>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-6">
            {Logo}
            <nav className="hidden lg:flex items-center gap-5 ml-auto">
              {NAV.map((n) => (
                <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
                  {n.label}
                </NavLink>
              ))}
              <Link to={`${base}/contact`} className={t.btnPrimary + ' !px-5 !py-2.5 text-sm'}>
                Request a Quote
              </Link>
            </nav>
            <MobileToggle open={open} setOpen={setOpen} dark={false} />
          </div>
          {open && <MobileNav base={base} setOpen={setOpen} cls="bg-white border-t border-slate-200 text-[#0f2a43]" />}
        </div>
      </header>
    )

  if (variantId === 'ember')
    return (
      <header className="sticky top-0 z-40 bg-[#16181d] border-b-4 border-[#d7263d]">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center gap-6">
          {Logo}
          <nav className="hidden lg:flex items-center gap-5 ml-auto">
            {NAV.map((n) => (
              <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
                {n.label}
              </NavLink>
            ))}
            <a href={company.phoneHref} className="inline-flex items-center gap-2 bg-[#ffb703] text-[#16181d] font-condensed uppercase tracking-wider text-lg px-5 py-2 border-2 border-white/10">
              <Icon name="phone" size={17} /> {company.phone}
            </a>
          </nav>
          <MobileToggle open={open} setOpen={setOpen} dark />
        </div>
        {open && <MobileNav base={base} setOpen={setOpen} cls="bg-[#16181d] border-t border-white/10 text-white" />}
      </header>
    )

  // pulse — floating pill nav
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="max-w-5xl mx-auto rounded-full border border-white/10 bg-[#0b0f14]/80 backdrop-blur-xl px-4 py-2 flex items-center gap-4 shadow-2xl shadow-black/40">
        {Logo}
        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV.map((n) => (
            <NavLink key={n.to} to={`${base}/${n.to}`} end={n.end} className={linkCls}>
              {n.label}
            </NavLink>
          ))}
          <Link to={`${base}/contact`} className={t.btnPrimary + ' !px-5 !py-2 text-sm ml-1'}>
            Get a Quote
          </Link>
        </nav>
        <MobileToggle open={open} setOpen={setOpen} dark />
      </div>
      {open && (
        <div className="max-w-5xl mx-auto mt-2 rounded-2xl border border-white/10 bg-[#0b0f14]/95 backdrop-blur-xl overflow-hidden">
          <MobileNav base={base} setOpen={setOpen} cls="text-white" bare />
        </div>
      )}
    </header>
  )
}

function MobileToggle({ open, setOpen, dark }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`lg:hidden ml-auto p-2 ${dark ? 'text-white' : 'text-[#0f2a43]'}`}
      aria-label="Menu"
    >
      <Icon name={open ? 'close' : 'chat'} size={22} />
      <span className="sr-only">Menu</span>
    </button>
  )
}

function MobileNav({ base, setOpen, cls, bare }) {
  return (
    <nav className={`lg:hidden ${bare ? '' : cls} px-6 py-4 flex flex-col gap-3 ${bare ? cls : ''}`}>
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
  const dark = variantId !== 'aegis'
  const wrap =
    variantId === 'ember'
      ? 'bg-[#16181d] text-white border-t-4 border-[#d7263d]'
      : variantId === 'aegis'
        ? 'bg-[#0f2a43] text-white'
        : 'bg-[#080b0f] text-slate-300 border-t border-white/10'
  return (
    <footer className={wrap}>
      <div className="max-w-6xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className={`text-2xl font-bold ${variantId === 'ember' ? 'font-condensed uppercase tracking-wide' : ''}`}>
            Newark Fire Sprinkler Corp.
          </p>
          <p className={`mt-2 max-w-md text-sm ${dark ? 'text-white/60' : 'text-white/70'}`}>
            {company.tagline}. Design, installation, inspection and 24/7 emergency service
            for fire sprinkler systems across New Jersey.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full border border-white/20">{company.permit}</span>
            <span className="px-3 py-1 rounded-full border border-white/20">NICET Certified</span>
            <span className="px-3 py-1 rounded-full border border-white/20">NFPA 13 & 25</span>
            <span className="px-3 py-1 rounded-full border border-white/20">Licensed & Insured</span>
          </div>
        </div>
        <div>
          <p className="font-bold mb-3 text-sm uppercase tracking-wider text-white/50">Explore</p>
          <ul className="space-y-2 text-sm">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={`${base}/${n.to}`} className="hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold mb-3 text-sm uppercase tracking-wider text-white/50">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={company.phoneHref} className="font-bold hover:underline">
                {company.phone}
              </a>
              <span className="block text-xs text-white/50">24/7 emergency line</span>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:underline break-all">
                {company.email}
              </a>
            </li>
            <li className="text-white/70">{company.address}</li>
            <li>
              <a href={company.portal} target="_blank" rel="noreferrer" className="hover:underline">
                Customer payment portal ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 text-xs text-white/40 flex flex-wrap gap-2 justify-between">
          <span>© 2026 Newark Fire Sprinkler Corp. All rights reserved.</span>
          <span>{company.permit} · {company.permitClass}</span>
        </div>
      </div>
    </footer>
  )
}

function ConceptSwitcher({ current }) {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur px-3 py-2 text-white shadow-xl border border-white/15">
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
          {v[0].toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
