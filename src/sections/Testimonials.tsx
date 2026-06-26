import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

/**
 * One review at a time on a rich green background, auto-rotating with a
 * rating, a category tag and smooth blur transitions.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const QUOTES = [
  {
    quote: 'Ze keken verder dan alleen de website.',
    detail:
      'Minterest dacht mee over onze uitstraling, doelgroep en hoe we online meer vertrouwen konden opbouwen. Het resultaat voelt professioneel, duidelijk en veel sterker dan wat we eerst hadden.',
    tag: 'Branding & website',
  },
  {
    quote: 'Alles voelt nu veel consistenter.',
    detail:
      'Van content tot uitstraling: alles sluit beter op elkaar aan. We zijn professioneler zichtbaar en krijgen vaker reacties van mensen die ons online hebben gezien.',
    tag: 'Social media & content',
  },
  {
    quote: 'Fijn dat alles onder een dak zit.',
    detail:
      'We hoefden niet met vijf verschillende partijen te schakelen. Minterest dacht mee over de juiste oplossing en hielp ons stap voor stap om ons bedrijf beter neer te zetten.',
    tag: 'Strategie, website & marketing',
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
            Wat ondernemers over ons zeggen
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-cream/65 md:text-lg">
          We leveren geen losse websites, video's of campagnes. We denken mee
          over wat jouw bedrijf nodig heeft om sterker zichtbaar te worden,
          vertrouwen op te bouwen en meer aanvragen te krijgen.
        </p>

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
              <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-cream/65 md:text-lg">
                {q.detail}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 font-sans text-sm font-medium text-lime-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-accent" aria-hidden="true" />
                {q.tag}
              </span>
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

        <div className="mt-12 flex justify-center">
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Start jouw groeigesprek</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}
