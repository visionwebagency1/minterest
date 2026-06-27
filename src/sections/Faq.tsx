import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'

/**
 * Clean accordion FAQ on a light background with smooth open/close.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const ITEMS = [
  {
    q: 'Wat doet Minterest precies?',
    a: 'Minterest helpt bedrijven met branding, websites, content, social media, vindbaarheid en extra ondersteuning. We bouwen geen losse diensten, maar oplossingen die bijdragen aan zichtbaarheid, vertrouwen en resultaat.',
  },
  {
    q: 'Hoe weet ik welke dienst ik nodig heb?',
    a: 'Dat hoef je niet vooraf exact te weten. Wij kijken met je mee en adviseren welke oplossing het beste past bij jouw situatie en doelen.',
  },
  {
    q: 'Kunnen jullie meerdere diensten combineren?',
    a: 'Ja. Vaak versterken diensten elkaar: een sterk merk, een converterende website en de juiste content werken samen aan meer zichtbaarheid en resultaat. We stellen een traject samen dat past bij jouw doel.',
  },
  {
    q: 'Werken jullie ook met bestaande websites of merken?',
    a: 'Ja. We bouwen niet alleen vanaf nul, maar verbeteren ook bestaande websites, merken en campagnes wanneer dat meer oplevert dan opnieuw beginnen.',
  },
  {
    q: 'Wat zijn Extra groeidiensten?',
    a: 'Extra groeidiensten zijn aanvullende oplossingen zoals AI-agents, administratie, sourcing en detachering. Hiermee helpen we ondernemers slimmer en schaalbaarder werken.',
  },
  {
    q: 'Hoe ziet de samenwerking eruit?',
    a: 'We starten met een kennismaking, bepalen wat je bedrijf nodig heeft en werken daarna een duidelijke aanpak uit. Vervolgens bouwen we de oplossing, leveren we op en denken we mee over de volgende stap.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative bg-cream py-28 text-near-black md:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 bg-emerald/50" />
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
              Veelgestelde vragen
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Goed om te weten.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-emerald-deep/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold text-near-black md:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-emerald/30 text-emerald transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 font-sans text-base leading-relaxed text-near-black/60">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
