import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../theme.jsx'
import { company } from '../data/content.js'
import { Icon } from './Icons.jsx'

// Rule-based assistant. Runs fully client-side — swap answer() with an API
// call later without touching the UI.

const QUICK = ['Inspection schedule?', 'Get a quote', 'Emergency!', 'Are you licensed?', 'What services?']

const INTENTS = [
  {
    match: /emergen|leak|burst|flood|fire now|help now|urgent/i,
    reply: () => ({
      text: `🚨 If there is an active fire, call 911 first.\n\nFor a sprinkler emergency — leaks, burst pipes, impaired systems — our line is staffed 24/7:\n\n📞 ${company.phone}\n\nTap to call, and keep the area clear until our technician arrives.`,
      chips: ['What should I do while I wait?', 'Get a quote'],
    }),
  },
  {
    match: /wait|while.*arriv|shut.*off|valve/i,
    reply: () => ({
      text: `Until the technician arrives:\n\n1. If water is flowing from a burst pipe (not a fire), locate the system control valve and shut it — it's usually a large labeled valve near the riser.\n2. Never shut a valve during an actual fire.\n3. Move valuables away from the water.\n4. Take photos for your insurer.\n\nOur tech will manage the impairment paperwork with your fire official.`,
      chips: ['Emergency!', 'Inspection schedule?'],
    }),
  },
  {
    match: /inspect|nfpa|schedule|how often|compliance|due/i,
    reply: () => ({
      text: `New Jersey requires NFPA 25 inspections on this cadence:\n\n• Weekly/monthly — gauges & control valves\n• Quarterly — waterflow alarms & fire dept. connections\n• Annually — full system inspection\n• Every 5 years — internal pipe inspection\n\nNJ also requires reports filed with your local fire official within 5 business days — we file them for you. Want me to set up an inspection quote?`,
      chips: ['Get a quote', 'What are the fines?'],
    }),
  },
  {
    match: /fine|penalt|violat|fail/i,
    reply: () => ({
      text: `NJ fire code penalties run $500–$5,000 per violation per day, and up to $25,000 for serious life-safety violations — plus possible insurance consequences.\n\nAn inspection contract costs a small fraction of one fine. Want a quote?`,
      chips: ['Get a quote', 'Inspection schedule?'],
    }),
  },
  {
    match: /licens|permit|certif|nicet|insur|legit|trust/i,
    reply: () => ({
      text: `Yes — fully licensed:\n\n✅ ${company.permit} (${company.permitClass})\n✅ NICET-certified technicians\n✅ Licensed, bonded & insured\n\nYou can verify our permit on the NJ Division of Fire Safety's public Permitted Business list. In NJ it's illegal to service sprinklers without one.`,
      chips: ['What services?', 'Get a quote'],
    }),
  },
  {
    match: /service|what.*do|install|design|repair|offer/i,
    reply: () => ({
      text: `We handle the full sprinkler lifecycle:\n\n🔧 Installation — residential, commercial, industrial, mixed-use\n🚨 24/7 Service & Repairs\n📋 Inspections & NFPA 25 compliance (state forms filed for you)\n📐 Custom design & shop drawings by our in-house engineers\n\nWhich one do you need?`,
      chips: ['Get a quote', 'Inspection schedule?', 'Are you licensed?'],
    }),
  },
  {
    match: /price|cost|quote|estimate|how much/i,
    lead: true,
  },
  {
    match: /area|where|jersey|newark|serve/i,
    reply: () => ({
      text: `We're based at ${company.address} and serve all of New Jersey — Newark, Jersey City, Essex & Hudson counties and statewide.`,
      chips: ['What services?', 'Get a quote'],
    }),
  },
  {
    match: /hi|hello|hey|good (morning|afternoon|evening)/i,
    reply: () => ({
      text: `Hi! I'm the Newark Fire Sprinkler assistant. I can explain inspection requirements, our services, or get you a quote. What do you need?`,
      chips: QUICK.slice(0, 4),
    }),
  },
  {
    match: /game|simulat|play/i,
    reply: () => ({
      text: `We built a fire simulator you can play right on this site — place sprinkler heads on a budget, then watch a fire break out and see how much of the building you save. Try the "Fire Drill Game" tab!`,
      chips: ['What services?', 'Get a quote'],
      goGame: true,
    }),
  },
  {
    match: /human|person|agent|call me|talk/i,
    reply: () => ({
      text: `Of course — call us at ${company.phone} (24/7) or email ${company.email}. Or leave your details here and we'll call you back: just type "quote".`,
      chips: ['Get a quote'],
    }),
  },
]

const FALLBACK = {
  text: `I might not have that one — but a human does. Call ${company.phone} (24/7) or ask me about inspections, services, licensing or quotes.`,
  chips: QUICK.slice(0, 4),
}

export default function ChatBot() {
  const t = useTheme()
  const { variantId } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    {
      from: 'bot',
      text: `👋 Welcome to Newark Fire Sprinkler. I can help with inspection schedules, services, licensing — or get you a fast quote.`,
      chips: QUICK,
    },
  ])
  const [input, setInput] = useState('')
  const [lead, setLead] = useState(null) // null | 'name' | 'phone' | 'done'
  const leadData = useRef({})
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  function push(msg) {
    setMsgs((m) => [...m, msg])
  }

  function botSay(reply, delay = 450) {
    setTimeout(() => push({ from: 'bot', ...reply }), delay)
  }

  function startLead() {
    setLead('name')
    botSay({ text: `Great — I'll take a few details and the team will call you back within one business day.\n\nFirst, what's your name?` })
  }

  function handleSend(raw) {
    const text = (raw ?? input).trim()
    if (!text) return
    push({ from: 'user', text })
    setInput('')

    // lead capture flow
    if (lead === 'name') {
      leadData.current.name = text
      setLead('phone')
      botSay({ text: `Thanks ${text.split(' ')[0]}! Best phone number to reach you?` })
      return
    }
    if (lead === 'phone') {
      leadData.current.phone = text
      setLead('done')
      botSay({
        text: `Perfect — got it:\n\n👤 ${leadData.current.name}\n📞 ${text}\n\nThe team will call you back within one business day. Need anything else right now? For emergencies, always use ${company.phone}.`,
        chips: ['Inspection schedule?', 'What services?'],
      })
      return
    }

    // intent matching
    const intent = INTENTS.find((i) => i.match.test(text))
    if (intent?.lead || /^get a quote$/i.test(text)) {
      startLead()
      return
    }
    if (intent) {
      const r = intent.reply()
      botSay(r)
      if (r.goGame) setTimeout(() => navigate(`/${variantId}/game`), 1600)
      return
    }
    botSay(FALLBACK)
  }

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-50 w-15 h-15 p-4 flex items-center justify-center ${t.chatBtn} hover:scale-105 transition-transform`}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <Icon name={open ? 'close' : 'chat'} size={26} />
      </button>

      {/* panel */}
      {open && (
        <div className={`fixed bottom-24 right-5 z-50 w-[min(94vw,390px)] flex flex-col ${t.chatPanel} overflow-hidden animate-rise`} style={{ height: 'min(70vh, 560px)' }}>
          <div className={`${t.chatHeader} px-5 py-4 flex items-center gap-3`}>
            <span className="relative inline-flex">
              <Icon name="flame" size={24} />
              <span className="absolute -top-0.5 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black/30" />
            </span>
            <div>
              <p className="font-bold leading-tight">Fire Safety Assistant</p>
              <p className="text-xs opacity-70">Typically replies instantly · 24/7</p>
            </div>
          </div>

          <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[85%]">
                  <div className={`px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${m.from === 'user' ? t.bubbleUser : t.bubbleBot}`}>
                    {m.text}
                  </div>
                  {m.chips && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.chips.map((c) => (
                        <button key={c} onClick={() => handleSend(c)} className={t.chip}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 border-t border-current/10 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lead === 'name' ? 'Your name…' : lead === 'phone' ? 'Phone number…' : 'Ask about inspections, quotes…'}
              className={`${t.input} !py-2.5 text-sm flex-1`}
            />
            <button type="submit" className={`${t.btnPrimary} !px-4 !py-2`} aria-label="Send">
              <Icon name="send" size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
