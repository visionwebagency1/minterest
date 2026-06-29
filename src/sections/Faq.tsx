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
    a: 'Minterest helpt ondernemers met branding, websites, content, social media, vindbaarheid en slimme groeiondersteuning. We leveren geen losse diensten, maar bouwen complete oplossingen die bijdragen aan een professionele uitstraling, meer vertrouwen en betere commerciële kansen.',
  },
  {
    q: 'Hoe weet ik welke dienst ik nodig heb?',
    a: 'Dat hoef je niet vooraf exact te weten. Tijdens een kennismaking kijken we naar je bedrijf, doelen en huidige situatie. Daarna adviseren we welke oplossing op dat moment het meeste waarde toevoegt, van branding of website tot content, marketing of een compleet groeitraject.',
  },
  {
    q: 'Kunnen jullie meerdere diensten combineren?',
    a: 'Ja. Juist de combinatie maakt Minterest sterk. Een duidelijk merk, een converterende website, sterke content en betere vindbaarheid versterken elkaar. Daarom stellen we trajecten samen waarin meerdere onderdelen slim op elkaar aansluiten.',
  },
  {
    q: 'Werken jullie ook met bestaande websites of merken?',
    a: 'Ja. We bouwen niet alleen vanaf nul, maar verbeteren ook bestaande websites, merken en campagnes. We kijken eerst wat al goed is, waar de grootste winst zit en of optimaliseren slimmer is dan volledig opnieuw beginnen.',
  },
  {
    q: 'Wat zijn extra groeidiensten?',
    a: 'Extra groeidiensten zijn aanvullende oplossingen die ondernemers helpen slimmer, efficiënter en schaalbaarder te werken. Denk aan AI-oplossingen, automatisering, operationele ondersteuning, sourcing of administratieve processen. We zetten deze diensten alleen in wanneer ze direct bijdragen aan structuur, efficiëntie of groei.',
  },
  {
    q: 'Hoe ziet de samenwerking eruit?',
    a: 'We starten met een kennismaking waarin we jouw bedrijf, doelen en uitdagingen bespreken. Daarna werken we een duidelijke aanpak, scope en planning uit. Vervolgens bouwen we de oplossing, leveren we professioneel op en denken we mee over de volgende stap wanneer verdere groei of optimalisatie nodig is.',
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
