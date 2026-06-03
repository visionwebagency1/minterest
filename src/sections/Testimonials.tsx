import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'

/**
 * One huge quote at a time, auto-rotating. Light section with a soft green
 * accent. No small cards.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const QUOTES = [
  {
    quote: 'Onze nieuwe webshop laadt sneller, oogt strakker en verkoopt meer. Minterest dacht mee als partner, niet als leverancier.',
    name: 'Sanne de Vries',
    role: 'Oprichter, Bloom & Co',
  },
  {
    quote: 'Van merk tot site tot video, alles uit een hand en alles klopt. Eindelijk een team dat de hele klim begrijpt.',
    name: 'Mark Jansen',
    role: 'Marketinglead, Ascend Labs',
  },
  {
    quote: 'Ze leverden niet alleen design, maar groei. Drie maanden later staan we hoger, sneller en duidelijker dan ooit.',
    name: 'Lisa Smit',
    role: 'Directeur, Verdant',
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
    <section className="relative overflow-hidden bg-cream py-28 text-near-black md:py-40">
      <div className="pointer-events-none absolute right-0 top-0 h-[40vmin] w-[40vmin] rounded-full bg-mint/20 blur-[120px]" />
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Wat klanten zeggen
          </span>
        </Reveal>

        <div className="relative mt-12 min-h-[16rem] md:min-h-[20rem]">
          <span className="font-accent text-[6rem] italic leading-none text-emerald/25 md:text-[10rem]">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="-mt-10 max-w-4xl text-balance font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-semibold leading-[1.12] tracking-tight text-near-black"
            >
              {q.quote}
              <footer className="mt-8 font-sans text-base font-normal not-italic text-near-black/55">
                <span className="font-semibold text-emerald-deep">{q.name}</span>
                {' · '}
                {q.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="mt-10 flex gap-2">
          {QUOTES.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Quote ${d + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                d === i ? 'w-8 bg-emerald' : 'w-2 bg-emerald/25 hover:bg-emerald/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
