import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * FAQ of the subscription. Own copy (not the site-wide CMS FAQ), because these
 * questions are the objections of this product: the change rule of Start, the
 * notice period and the VAT.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const ITEMS = [
  {
    q: 'Zijn er opstartkosten?',
    a: 'Nee. Je betaalt alleen het maandbedrag. Ontwerp, inrichting en het live zetten zitten erbij.',
  },
  {
    q: 'Kan ik maandelijks opzeggen?',
    a: 'Ja. Je zegt op per maand, via je eigen omgeving. Je site blijft online tot het einde van de betaalde maand. Je domein blijft van jou en verhuist gewoon mee.',
  },
  {
    q: 'Kan ik mijn eigen domein gebruiken?',
    a: 'Ja. Heb je al een domein, dan koppelen wij het. Je krijgt de instellingen in je klantomgeving en wij controleren of alles klopt. Heb je nog geen domein, dan regelen wij er een.',
  },
  {
    q: 'Wat als ik bij Start een tekst wil aanpassen?',
    a: 'Bij Start is een kleine tekstwijziging per maand inbegrepen. Je dient hem in via je klantomgeving en wij voeren hem uit. Wil je vaker of zelf wijzigen, dan stap je over naar Groei en pas je alles zelf aan in je eigen editor.',
  },
  {
    q: 'Kan ik later upgraden?',
    a: 'Ja, op elk moment. Je site blijft staan en je betaalt vanaf dat moment het nieuwe maandbedrag. Van Start naar Groei nemen we je teksten en foto’s mee naar de editor.',
  },
  {
    q: 'Hoe snel staat mijn site online?',
    a: 'Binnen tien werkdagen nadat wij je gegevens en je teksten binnen hebben. Zit alles direct goed, dan is het vaak sneller.',
  },
  {
    q: 'Zit de btw in de prijs?',
    a: 'Nee, alle genoemde prijzen zijn exclusief btw. Op je factuur staat het btw-bedrag apart vermeld.',
  },
  {
    q: 'Wat is het verschil met een website op maat?',
    a: 'Een abonnement gaat uit van een bestaand template en een vaste maandprijs. Een maatwerksite ontwerpen we van nul, met eigen functionaliteit en een offerte vooraf. Wil je dat, kijk dan bij Web Development.',
  },
]

export function AbonnementFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="vragen" className="scroll-mt-24 bg-[#EAF4EC] py-28 text-near-black md:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
        <div>
          <Reveal>
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
              Veelgestelde vragen
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
              Even alles <Accent>helder</Accent>.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="border-b border-emerald-deep/10">
                <button
                  type="button"
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
