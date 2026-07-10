import { useState } from 'react'
import { useTheme } from '../theme.jsx'
import { company, team } from '../data/content.js'
import { Icon } from '../components/Icons.jsx'
import { PageHero } from './Services.jsx'

const contactDepts = ['Residential & Commercial', 'Industrial', 'Service & Inspections', 'Design', 'Administration']

export default function Contact() {
  const t = useTheme()
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        kicker="Contact"
        title="Talk to a licensed fire protection team"
        sub="Quotes, inspections, emergencies — one number, one email, one office in Newark."
      />

      <section className="max-w-6xl mx-auto px-5 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {/* info cards */}
        <div className="space-y-5">
          <a href={company.phoneHref} className={`${t.card} ${t.cardHover} p-6 flex items-center gap-5 block`}>
            <span className={t.accentText}>
              <Icon name="phone" size={34} />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider opacity-60">24/7 Emergency & Sales</span>
              <span className={`block ${t.display} text-2xl mt-0.5`}>{company.phone}</span>
            </span>
          </a>
          <a href={`mailto:${company.email}`} className={`${t.card} ${t.cardHover} p-6 flex items-center gap-5 block`}>
            <span className={t.accentText}>
              <Icon name="send" size={30} />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider opacity-60">Email</span>
              <span className="block font-bold mt-0.5 break-all">{company.email}</span>
            </span>
          </a>
          <div className={`${t.card} p-6 flex items-center gap-5`}>
            <span className={t.accentText}>
              <Icon name="building" size={32} />
            </span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-wider opacity-60">Office</span>
              <span className="block font-bold mt-0.5">{company.address}</span>
              <span className={`block text-sm ${t.muted}`}>{company.serviceArea}</span>
            </span>
          </div>
          <div className={`${t.card} p-6`}>
            <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">Credentials</p>
            <ul className={`text-sm space-y-1.5 ${t.muted}`}>
              <li className="flex gap-2 items-center"><span className={t.accentText}><Icon name="check" size={14} /></span>{company.permit} · {company.permitClass}</li>
              <li className="flex gap-2 items-center"><span className={t.accentText}><Icon name="check" size={14} /></span>NICET-certified technicians</li>
              <li className="flex gap-2 items-center"><span className={t.accentText}><Icon name="check" size={14} /></span>Licensed, bonded & insured</li>
            </ul>
          </div>
        </div>

        {/* form */}
        <div className={`${t.card} p-8 md:p-10`}>
          {sent ? (
            <div className="text-center py-16">
              <span className={`${t.accentText} inline-block mb-4`}>
                <Icon name="check" size={54} />
              </span>
              <h2 className={`${t.display} text-2xl`}>Request received</h2>
              <p className={`mt-2 ${t.muted}`}>
                We’ll get back to you within one business day. For emergencies, call{' '}
                <a href={company.phoneHref} className={`font-bold ${t.accentText}`}>{company.phone}</a> now.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="space-y-5"
            >
              <h2 className={`${t.display} text-2xl md:text-3xl`}>Request a free quote</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-sm font-semibold mb-1.5 block">Name *</span>
                  <input required className={t.input} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold mb-1.5 block">Phone *</span>
                  <input required type="tel" className={t.input} placeholder="(973) ___-____" />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold mb-1.5 block">Email</span>
                <input type="email" className={t.input} placeholder="you@company.com" />
              </label>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="text-sm font-semibold mb-1.5 block">Service needed</span>
                  <select className={t.input}>
                    <option>Inspection & compliance</option>
                    <option>New installation</option>
                    <option>Service / repair</option>
                    <option>Design & shop drawings</option>
                    <option>Emergency</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold mb-1.5 block">Property type</span>
                  <select className={t.input}>
                    <option>Commercial</option>
                    <option>Residential</option>
                    <option>Industrial</option>
                    <option>Mixed-use</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold mb-1.5 block">Tell us about the building</span>
                <textarea rows="4" className={t.input} placeholder="Address, square footage, existing system, deadline…" />
              </label>
              <button type="submit" className={`${t.btnPrimary} w-full justify-center`}>
                Send request <Icon name="send" size={17} />
              </button>
              <p className={`text-xs text-center ${t.muted}`}>
                Demo form — submissions are not sent anywhere yet.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* direct department contacts — from newarkfiresprinkler.com/contact */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <h2 className={`${t.display} text-2xl md:text-3xl mb-2`}>Reach the right desk directly</h2>
        <p className={`text-sm mb-8 ${t.muted}`}>Skip the switchboard — every department has a direct line.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contactDepts.map((dept) => (
            <div key={dept} className={`${t.card} p-6`}>
              <p className={`${t.eyebrow} mb-4`}>{dept}</p>
              <ul className="space-y-3">
                {team
                  .filter((m) => m.dept === dept && m.email)
                  .map((m) => (
                    <li key={m.name}>
                      <p className="font-bold text-sm leading-tight">{m.name}</p>
                      <p className={`text-[11px] ${t.muted}`}>{m.role}</p>
                      <a href={`mailto:${m.email}`} className={`text-xs font-semibold ${t.accentText} hover:underline break-all`}>
                        {m.email}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
