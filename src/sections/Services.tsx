import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'

/**
 * The four Minterest services rendered as ascending "steps" (treden): each
 * tread indents further right and climbs as you scroll, expressing the upward
 * growth motif. On mobile they stack as a clean numbered list.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const SERVICES = [
  {
    no: '01',
    title: 'Website & Webshops',
    desc: 'Snelle, schaalbare sites en webshops die laden, converteren en meegroeien.',
    tags: ['Webdesign', 'Development', 'E-commerce'],
  },
  {
    no: '02',
    title: 'Design & branding',
    desc: 'Een identiteit die blijft hangen: logo, systeem en uitstraling die vertrouwen wekken.',
    tags: ['Identiteit', 'Design system', 'Art direction'],
  },
  {
    no: '03',
    title: 'Short video content',
    desc: 'Scroll-stoppende video die je merk laat bewegen op elk platform.',
    tags: ['Concept', 'Productie', 'Editing'],
  },
  {
    no: '04',
    title: 'Influencer marketing',
    desc: 'Bereik via stemmen die jouw publiek écht vertrouwt, meetbaar en op maat.',
    tags: ['Strategie', 'Matching', 'Campagne'],
  },
]

// Per-tread indent on desktop, so the list literally climbs to the right.
const INDENT = ['lg:ml-0', 'lg:ml-[7%]', 'lg:ml-[14%]', 'lg:ml-[21%]']

export function Services() {
  return (
    <section id="diensten" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
            [03] Diensten als treden
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream md:text-5xl">
            Vier disciplines, één klim.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <motion.a
              key={s.no}
              href="#contact"
              className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-mint/40 hover:bg-white/[0.05] md:p-9 lg:w-[80%] ${INDENT[i]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <div className="flex items-start gap-5 md:gap-7">
                  <span className="font-accent text-2xl italic text-mint/80 md:text-3xl">
                    {s.no}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-cream md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/55 md:text-base">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="hidden rounded-full border border-white/10 px-3 py-1 font-sans text-xs text-white/50 lg:inline-block"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-mint transition-all duration-300 group-hover:border-mint/50 group-hover:bg-mint/10">
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 L17 7" />
                      <path d="M8 7 H17 V16" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* climbing accent line that grows on hover */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-emerald to-lime-accent transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
