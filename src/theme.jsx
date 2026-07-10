import { createContext, useContext } from 'react'

// Per-variant design tokens (Tailwind class strings). Components consume these
// so each concept renders as a genuinely different website.
export const themes = {
  ember: {
    id: 'ember',
    name: 'Ember',
    body: 'font-inter bg-[#f5f5f2] text-[#16181d]',
    display: 'font-condensed uppercase tracking-tight',
    accentText: 'text-[#d7263d]',
    muted: 'text-[#5a5e66]',
    section: 'py-20',
    sectionAlt: 'bg-[#16181d] text-white',
    btnPrimary:
      'inline-flex items-center gap-2 bg-[#d7263d] text-white font-condensed uppercase tracking-wider text-lg px-7 py-3 border-2 border-[#16181d] shadow-[5px_5px_0_#16181d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#16181d] transition-all',
    btnSecondary:
      'inline-flex items-center gap-2 bg-white text-[#16181d] font-condensed uppercase tracking-wider text-lg px-7 py-3 border-2 border-[#16181d] shadow-[5px_5px_0_#16181d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#16181d] transition-all',
    card: 'bg-white border-2 border-[#16181d] shadow-[7px_7px_0_#16181d]',
    cardHover: 'hover:-translate-y-1 transition-transform',
    badge:
      'inline-flex items-center gap-1.5 bg-[#ffb703] text-[#16181d] font-bold text-xs uppercase tracking-wider px-3 py-1 border-2 border-[#16181d]',
    input:
      'w-full bg-white border-2 border-[#16181d] px-4 py-3 outline-none focus:shadow-[4px_4px_0_#d7263d] transition-shadow',
    chatBtn: 'bg-[#d7263d] text-white border-2 border-[#16181d] shadow-[4px_4px_0_#16181d]',
    chatPanel: 'bg-white border-2 border-[#16181d] shadow-[8px_8px_0_#16181d] rounded-none',
    chatHeader: 'bg-[#16181d] text-white',
    bubbleBot: 'bg-[#f0efe9] text-[#16181d] rounded-none border border-[#16181d]/20',
    bubbleUser: 'bg-[#d7263d] text-white rounded-none',
    chip: 'border-2 border-[#16181d] bg-white hover:bg-[#ffb703] text-xs font-bold uppercase tracking-wide px-3 py-1.5 transition-colors',
  },
  aegis: {
    id: 'aegis',
    name: 'Aegis',
    body: 'font-manrope bg-[#f7f9fc] text-[#182635]',
    display: 'font-manrope font-extrabold tracking-tight',
    accentText: 'text-[#c1121f]',
    muted: 'text-slate-500',
    section: 'py-20',
    sectionAlt: 'bg-[#0f2a43] text-white',
    btnPrimary:
      'inline-flex items-center gap-2 bg-[#c1121f] hover:bg-[#a00e19] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5',
    btnSecondary:
      'inline-flex items-center gap-2 bg-[#0f2a43] hover:bg-[#183a5c] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5',
    card: 'bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(15,42,67,0.18)] border border-slate-100',
    cardHover: 'hover:shadow-[0_18px_50px_-12px_rgba(15,42,67,0.3)] hover:-translate-y-1 transition-all',
    badge:
      'inline-flex items-center gap-1.5 bg-[#eaf1f8] text-[#0f2a43] font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full',
    input:
      'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0f2a43]/30 focus:border-[#0f2a43] transition-all',
    chatBtn: 'bg-[#0f2a43] text-white rounded-full shadow-xl shadow-slate-900/30',
    chatPanel: 'bg-white rounded-2xl shadow-2xl border border-slate-200',
    chatHeader: 'bg-[#0f2a43] text-white rounded-t-2xl',
    bubbleBot: 'bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm',
    bubbleUser: 'bg-[#0f2a43] text-white rounded-2xl rounded-br-sm',
    chip: 'border border-slate-300 bg-white hover:border-[#0f2a43] hover:bg-[#eaf1f8] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
  },
  pulse: {
    id: 'pulse',
    name: 'Pulse',
    body: 'font-grotesk bg-[#0b0f14] text-slate-200',
    display: 'font-grotesk font-bold tracking-tight',
    accentText: 'text-[#ff6b35]',
    muted: 'text-slate-400',
    section: 'py-20',
    sectionAlt: 'bg-[#10161e]',
    btnPrimary:
      'inline-flex items-center gap-2 bg-gradient-to-r from-[#ff6b35] to-[#ff9f1c] text-[#0b0f14] font-bold px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/50 hover:scale-[1.03] transition-all',
    btnSecondary:
      'inline-flex items-center gap-2 bg-white/5 text-white font-semibold px-7 py-3.5 rounded-full border border-white/15 backdrop-blur hover:bg-white/10 hover:border-[#ff6b35]/50 transition-all',
    card: 'bg-white/[0.04] backdrop-blur border border-white/10 rounded-2xl',
    cardHover: 'hover:border-[#ff6b35]/40 hover:bg-white/[0.07] transition-all hover:-translate-y-1',
    badge:
      'inline-flex items-center gap-1.5 bg-[#ff6b35]/10 text-[#ff9f1c] font-semibold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border border-[#ff6b35]/25',
    input:
      'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ff6b35]/60 focus:bg-white/[0.08] transition-all placeholder:text-slate-500',
    chatBtn: 'bg-gradient-to-r from-[#ff6b35] to-[#ff9f1c] text-[#0b0f14] rounded-full shadow-xl shadow-orange-500/40',
    chatPanel: 'bg-[#10161e] rounded-2xl shadow-2xl border border-white/10',
    chatHeader: 'bg-gradient-to-r from-[#ff6b35]/20 to-transparent text-white rounded-t-2xl border-b border-white/10',
    bubbleBot: 'bg-white/[0.07] text-slate-200 rounded-2xl rounded-bl-sm border border-white/5',
    bubbleUser: 'bg-gradient-to-r from-[#ff6b35] to-[#ff9f1c] text-[#0b0f14] font-medium rounded-2xl rounded-br-sm',
    chip: 'border border-white/15 bg-white/5 hover:border-[#ff6b35]/50 hover:bg-[#ff6b35]/10 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
  },
}

const ThemeContext = createContext(themes.ember)
export const ThemeProvider = ThemeContext.Provider
export const useTheme = () => useContext(ThemeContext)
