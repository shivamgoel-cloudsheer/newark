import { useTheme } from '../theme.jsx'
import FireGame from '../components/FireGame.jsx'
import { CTABand } from '../components/Blocks.jsx'
import { PageHero } from './Services.jsx'
import { Icon } from '../components/Icons.jsx'

const facts = [
  {
    icon: 'flame',
    stat: '~96%',
    text: 'of fires are controlled when sprinklers operate — usually by just 1–2 heads (NFPA).',
  },
  {
    icon: 'shield',
    stat: '↓ 85%',
    text: 'lower risk of dying in a fire in sprinklered properties.',
  },
  {
    icon: 'droplet',
    stat: '10–25×',
    text: 'less water used by a sprinkler than a fire hose — less fire AND less water damage.',
  },
  {
    icon: 'clipboard',
    stat: '#1 cause',
    text: 'of sprinkler failure is human error: closed valves and skipped maintenance. Inspections exist for a reason.',
  },
]

export default function GamePage() {
  const t = useTheme()
  return (
    <>
      <PageHero
        kicker="Interactive · Fire Drill"
        title="Could you stop the fire?"
        sub="Place sprinkler heads on a budget. Then a real fire model takes over — spreading flames, evacuating people, activating heads by heat. See what coverage actually does."
      />

      <section className="max-w-6xl mx-auto px-5 py-14">
        <FireGame />
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className={`${t.card} p-5`}>
            <p className="font-bold mb-1">1 · Plan</p>
            <p className={`text-sm ${t.muted}`}>Click the floor plan to position your sprinkler heads. Dashed circles show coverage. The 🔥 marker is where ignition will start.</p>
          </div>
          <div className={`${t.card} p-5`}>
            <p className="font-bold mb-1">2 · Burn</p>
            <p className={`text-sm ${t.muted}`}>Fire spreads cell to cell — faster through furniture and stock. Heads trigger on heat, just like real ones. People head for the exits once the alarm sounds.</p>
          </div>
          <div className={`${t.card} p-5`}>
            <p className="font-bold mb-1">3 · Compare</p>
            <p className={`text-sm ${t.muted}`}>When it's over, we re-run the exact same fire with zero sprinklers. The difference is the point.</p>
          </div>
        </div>
      </section>

      <section className={`${t.sectionAlt} py-16`}>
        <div className="max-w-6xl mx-auto px-5">
          <h2 className={`${t.display} text-3xl text-white mb-10`}>
            The game is simplified. <span className={t.accentText}>The physics of the argument isn’t.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facts.map((f) => (
              <div key={f.stat} className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white">
                <span className={t.accentText}>
                  <Icon name={f.icon} size={28} />
                </span>
                <p className={`${t.display} text-3xl mt-3 ${t.accentText}`}>{f.stat}</p>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
