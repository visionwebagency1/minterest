import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * How it works: four steps drawn as a climb instead of a numbered list, in line
 * with the brand's upward motif. Short on purpose; the point is that it is easy.
 */

const STEPS = [
  {
    title: 'Kies je plan',
    text: 'Start, Groei of Pro. Je kunt later altijd upgraden.',
    Icon: PlanIcon,
  },
  {
    title: 'Kies je template',
    text: 'Bekijk de galerij en kies het ontwerp dat bij je bedrijf past.',
    Icon: TemplateIcon,
  },
  {
    title: 'Vul je gegevens in',
    text: 'Je bedrijfsgegevens, je teksten en je logo. Heb je nog geen domein, dan regelen wij er een.',
    Icon: FormIcon,
  },
  {
    title: 'Wij zetten hem live',
    text: 'Binnen tien werkdagen staat je site online, met domein, hosting en SSL.',
    Icon: LiveIcon,
  },
]

/** Elke stap staat iets hoger dan de vorige: de klim naar rechtsboven. */
const LIFT = ['md:mt-12', 'md:mt-8', 'md:mt-4', 'md:mt-0']

function PlanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h4V9H4v10ZM10 19h4V5h-4v14ZM16 19h4v-6h-4v6Z" />
    </svg>
  )
}
function TemplateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  )
}
function FormIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h14v16H5V4Z" />
      <path d="M8.5 9h7M8.5 13h7M8.5 17h4" />
    </svg>
  )
}
function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.2 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.2-3.3-8.5S9.8 5.8 12 3.5Z" />
    </svg>
  )
}

export function AbonnementSteps() {
  return (
    <section id="hoe-het-werkt" className="scroll-mt-24 bg-cream py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Hoe het werkt
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.03] tracking-tight">
            Van keuze naar <Accent>online</Accent>.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={0.08 * i} className={LIFT[i]}>
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-emerald/20 bg-white text-emerald shadow-[0_10px_30px_rgba(1,63,64,0.08)]">
                    <step.Icon />
                  </span>
                  {/* The arrow climbs to the next step, the way the whole site does. */}
                  {i < STEPS.length - 1 && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="hidden h-5 w-5 text-mint md:block"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 17 17 5" />
                      <path d="M9 5h8v8" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 max-w-xs font-sans text-base leading-relaxed text-near-black/60">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
