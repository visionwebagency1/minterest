import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { Footer } from '@/sections/Footer'
import { M_PATH } from '@/three/mPath'
import { MAIN_SERVICES } from '@/data/services'

/**
 * Diensten-overzicht (/diensten): the single hub that shows all 6 main services.
 * From here you click through to each main-service landing page. Predominantly
 * light and premium, matching the landing-page template.
 */
export function Services() {
  return (
    <>
      {/* Light hero */}
      <section className="relative overflow-hidden bg-cream pt-36 pb-16 text-near-black md:pt-48 md:pb-20">
        <div
          className="pointer-events-none absolute -right-32 -top-20 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-emerald to-lime-accent opacity-25 blur-[120px]"
          aria-hidden="true"
        />
        <svg
          viewBox="-1.75 -1 3.5 2"
          className="pointer-events-none absolute -right-12 top-1/2 h-[90%] -translate-y-1/2 opacity-[0.05]"
          aria-hidden="true"
        >
          <path d={M_PATH} transform="scale(1,-1)" fill="#0F5C4D" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-emerald/40" />
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
              Onze diensten
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.0] tracking-tight"
          >
            Zes diensten, één <Accent>opwaartse</Accent> beweging.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-near-black/65"
          >
            Van merk en website tot video, social, vindbaarheid en alles eromheen.
            Elke dienst haakt in op de volgende en tilt je merk stap voor stap hoger.
          </motion.p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="bg-cream pb-28 text-near-black">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-10 lg:px-16">
          {MAIN_SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.06}>
              <Link
                to={`/diensten/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_30px_80px_rgba(15,92,77,0.16)] md:p-10"
              >
                {/* accent strip */}
                <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accent}`} aria-hidden="true" />

                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-emerald">0{i + 1}</span>
                  <span className="font-sans text-xs uppercase tracking-[0.24em] text-emerald-deep/50">
                    {s.kicker}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight">
                  {s.label}
                </h2>
                <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-near-black/60">
                  {s.cardDesc}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.subs.map((sub) => (
                    <li key={sub.name}>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-deep/10 bg-[#EEF1E7] px-3 py-1.5 font-sans text-[13px] font-medium text-emerald-deep">
                        <span className="h-1 w-1 rounded-full bg-emerald" aria-hidden="true" />
                        {sub.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <span className="mt-7 inline-flex items-center gap-2 font-sans text-sm font-semibold text-emerald-deep">
                  Ontdek {s.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
