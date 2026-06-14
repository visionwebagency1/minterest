import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/**
 * One big quote at a time on a rich green background, auto-rotating with an
 * avatar, rating and smooth blur transitions.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const QUOTES = [
  {
    quote: 'Onze nieuwe webshop laadt sneller, oogt strakker en verkoopt meer. Minterest dacht mee als partner, niet als leverancier.',
    name: 'Sanne de Vries',
    role: 'Oprichter, Bloom & Co',
    initials: 'SV',
  },
  {
    quote: 'Van merk tot site tot video, alles uit één hand en alles klopt. Eindelijk een team dat de hele klim begrijpt.',
    name: 'Mark Jansen',
    role: 'Marketinglead, Ascend Labs',
    initials: 'MJ',
  },
  {
    quote: 'Ze leverden niet alleen design, maar groei. Drie maanden later staan we hoger, sneller en duidelijker dan ooit.',
    name: 'Lisa Smit',
    role: 'Directeur, Verdant',
    initials: 'LS',
  },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % QUOTES.length), 6000)
    return () => clearInterval(t)
  }, [])
  const q = QUOTES[i]

  return (
    <section
      className="relative overflow-hidden py-28 text-cream md:py-40"
      style={{
        backgroundImage:
          'radial-gradient(60% 60% at 20% 0%, rgba(66,194,140,0.28), transparent 60%), radial-gradient(55% 55% at 90% 100%, rgba(0,128,129,0.3), transparent 60%), linear-gradient(160deg, #013F40 0%, #0A3A38 60%, #071311 100%)',
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
            Wat klanten zeggen
          </span>
        </div>

        <div className="relative mt-12 min-h-[18rem] md:min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center"
            >
              {/* rating */}
              <div className="mb-8 flex gap-1 text-lime-bright">
                {[0, 1, 2, 3, 4].map((s) => (
                  <svg key={s} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 2l2.9 6.3 6.8.6-5.1 4.5 1.5 6.7L12 17.8 5.9 20.6l1.5-6.7L2.3 8.9l6.8-.6L12 2Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mx-auto max-w-4xl text-balance font-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-cream">
                {q.quote}
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mint/20 font-display text-lg font-semibold text-lime-bright ring-1 ring-mint/30">
                  {q.initials}
                </span>
                <div className="text-left">
                  <div className="font-sans font-semibold text-cream">{q.name}</div>
                  <div className="font-sans text-sm text-cream/55">{q.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {QUOTES.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Quote ${d + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                d === i ? 'w-8 bg-lime-bright' : 'w-2 bg-cream/25 hover:bg-cream/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
