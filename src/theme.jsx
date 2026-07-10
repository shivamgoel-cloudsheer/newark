import { createContext, useContext } from 'react'

// Per-variant design tokens (Tailwind class strings). Components consume these
// so each concept renders as a genuinely different website.
export const themes = {
  // ── A · FORGE — editorial industrial: warm paper, deep ink, precision red ──
  ember: {
    id: 'ember',
    name: 'Forge',
    body: 'font-inter bg-[#f7f5f2] text-[#14161a]',
    display: 'font-archivo font-extrabold tracking-[-0.02em]',
    serif: 'font-archivo font-extrabold tracking-[-0.02em]',
    eyebrow: 'font-archivo font-semibold uppercase tracking-[0.18em] text-xs text-[#c8102e]',
    accentText: 'text-[#c8102e]',
    muted: 'text-[#5b5f68]',
    hairline: 'border-[#14161a]/12',
    section: 'py-24',
    sectionAlt: 'bg-[#14161a] text-white',
    btnPrimary:
      'inline-flex items-center justify-center gap-2 bg-[#c8102e] text-white font-archivo font-bold px-7 py-3.5 rounded-lg shadow-[0_10px_30px_-10px_rgba(200,16,46,0.55)] hover:bg-[#a30d26] hover:-translate-y-0.5 transition-all',
    btnSecondary:
      'inline-flex items-center justify-center gap-2 bg-[#14161a] text-white font-archivo font-bold px-7 py-3.5 rounded-lg hover:bg-[#2a2d34] hover:-translate-y-0.5 transition-all',
    btnGhost:
      'inline-flex items-center justify-center gap-2 font-archivo font-bold px-7 py-3.5 rounded-lg border border-[#14161a]/20 hover:border-[#14161a] transition-colors',
    card: 'bg-white rounded-2xl border border-[#14161a]/8 shadow-[0_1px_2px_rgba(20,22,26,0.06),0_16px_40px_-24px_rgba(20,22,26,0.25)]',
    cardHover: 'hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(20,22,26,0.06),0_28px_56px_-24px_rgba(20,22,26,0.35)] transition-all duration-300',
    badge:
      'inline-flex items-center gap-1.5 bg-[#14161a] text-white font-archivo font-semibold text-[11px] uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full',
    input:
      'w-full bg-white border border-[#14161a]/15 rounded-lg px-4 py-3 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/15 transition-all',
    chatBtn: 'bg-[#14161a] text-white rounded-full shadow-xl shadow-black/25',
    chatPanel: 'bg-white rounded-2xl shadow-2xl border border-[#14161a]/10',
    chatHeader: 'bg-[#14161a] text-white rounded-t-2xl',
    bubbleBot: 'bg-[#f1efe9] text-[#14161a] rounded-2xl rounded-bl-sm',
    bubbleUser: 'bg-[#c8102e] text-white rounded-2xl rounded-br-sm',
    chip: 'border border-[#14161a]/20 bg-white hover:border-[#c8102e] hover:text-[#c8102e] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
  },

  // ── B · MERIDIAN — consultancy trust: cream, deep navy, serif display ──
  aegis: {
    id: 'aegis',
    name: 'Meridian',
    body: 'font-manrope bg-[#faf8f4] text-[#1d2a3a]',
    display: 'font-fraunces font-semibold tracking-[-0.01em]',
    serif: 'font-fraunces',
    eyebrow: 'font-manrope font-bold uppercase tracking-[0.18em] text-xs text-[#8c6b2f]',
    accentText: 'text-[#b3202c]',
    muted: 'text-[#5d6b7c]',
    hairline: 'border-[#0c2340]/12',
    section: 'py-24',
    sectionAlt: 'bg-[#0c2340] text-white',
    btnPrimary:
      'inline-flex items-center justify-center gap-2 bg-[#0c2340] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_34px_-14px_rgba(12,35,64,0.6)] hover:bg-[#16345c] hover:-translate-y-0.5 transition-all',
    btnSecondary:
      'inline-flex items-center justify-center gap-2 bg-[#b3202c] text-white font-bold px-8 py-4 rounded-full shadow-[0_14px_34px_-14px_rgba(179,32,44,0.55)] hover:bg-[#98131e] hover:-translate-y-0.5 transition-all',
    btnGhost:
      'inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full border border-[#0c2340]/25 text-[#0c2340] hover:border-[#0c2340] transition-colors',
    card: 'bg-white rounded-3xl border border-[#0c2340]/8 shadow-[0_2px_4px_rgba(12,35,64,0.04),0_24px_60px_-30px_rgba(12,35,64,0.28)]',
    cardHover: 'hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(12,35,64,0.05),0_32px_70px_-30px_rgba(12,35,64,0.4)] transition-all duration-300',
    badge:
      'inline-flex items-center gap-1.5 bg-[#0c2340]/6 text-[#0c2340] font-bold text-[11px] uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full border border-[#0c2340]/10',
    input:
      'w-full bg-white border border-[#0c2340]/15 rounded-xl px-4 py-3 outline-none focus:border-[#0c2340] focus:ring-2 focus:ring-[#0c2340]/15 transition-all',
    chatBtn: 'bg-[#0c2340] text-white rounded-full shadow-xl shadow-[#0c2340]/35',
    chatPanel: 'bg-white rounded-3xl shadow-2xl border border-[#0c2340]/10',
    chatHeader: 'bg-[#0c2340] text-white rounded-t-3xl',
    bubbleBot: 'bg-[#f1ede4] text-[#1d2a3a] rounded-2xl rounded-bl-sm',
    bubbleUser: 'bg-[#0c2340] text-white rounded-2xl rounded-br-sm',
    chip: 'border border-[#0c2340]/20 bg-white hover:border-[#0c2340] hover:bg-[#0c2340]/5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
  },

  // ── C · SENTINEL — precision dark: grid, aurora, gradient borders ──
  pulse: {
    id: 'pulse',
    name: 'Sentinel',
    body: 'font-grotesk bg-[#0a0c10] text-[#c9d2de]',
    display: 'font-grotesk font-bold tracking-[-0.02em]',
    serif: 'font-grotesk font-bold',
    eyebrow: 'font-grotesk font-semibold uppercase tracking-[0.2em] text-xs text-[#ff7a29]',
    accentText: 'text-[#ff7a29]',
    muted: 'text-[#8b96a5]',
    hairline: 'border-white/10',
    section: 'py-24',
    sectionAlt: 'bg-[#0d1016]',
    btnPrimary:
      'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff5c1a] to-[#ff9f1c] text-[#0a0c10] font-bold px-7 py-3.5 rounded-full shadow-[0_12px_36px_-10px_rgba(255,92,26,0.55)] hover:shadow-[0_16px_44px_-8px_rgba(255,92,26,0.75)] hover:-translate-y-0.5 transition-all',
    btnSecondary:
      'inline-flex items-center justify-center gap-2 bg-white/[0.06] text-white font-semibold px-7 py-3.5 rounded-full border border-white/12 backdrop-blur hover:bg-white/10 hover:border-white/25 transition-all',
    btnGhost:
      'inline-flex items-center justify-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full border border-white/15 hover:border-[#ff7a29]/60 transition-colors',
    card: 'bg-[#10141b] rounded-2xl border border-white/8',
    cardHover: 'hover:border-[#ff7a29]/35 hover:-translate-y-1 transition-all duration-300',
    badge:
      'inline-flex items-center gap-1.5 bg-[#ff5c1a]/10 text-[#ff9f1c] font-semibold text-[11px] uppercase tracking-[0.14em] px-3.5 py-1.5 rounded-full border border-[#ff5c1a]/25',
    input:
      'w-full bg-white/[0.05] border border-white/12 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ff7a29]/60 focus:bg-white/[0.08] transition-all placeholder:text-[#5c6675]',
    chatBtn: 'bg-gradient-to-r from-[#ff5c1a] to-[#ff9f1c] text-[#0a0c10] rounded-full shadow-xl shadow-orange-500/40',
    chatPanel: 'bg-[#10141b] rounded-2xl shadow-2xl border border-white/10',
    chatHeader: 'bg-gradient-to-r from-[#ff5c1a]/15 to-transparent text-white rounded-t-2xl border-b border-white/10',
    bubbleBot: 'bg-white/[0.06] text-[#c9d2de] rounded-2xl rounded-bl-sm border border-white/5',
    bubbleUser: 'bg-gradient-to-r from-[#ff5c1a] to-[#ff9f1c] text-[#0a0c10] font-medium rounded-2xl rounded-br-sm',
    chip: 'border border-white/12 bg-white/[0.05] hover:border-[#ff7a29]/50 hover:bg-[#ff5c1a]/10 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
  },
}

const ThemeContext = createContext(themes.ember)
export const ThemeProvider = ThemeContext.Provider
export const useTheme = () => useContext(ThemeContext)
