import { motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'

/**
 * Selected-work teaser. Placeholder projects with brand-gradient thumbnails —
 * swap the names/categories (and later, real imagery) when the portfolio is
 * ready.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const PROJECTS = [
  { name: 'Verdant', cat: 'Branding · Website', grad: 'from-emerald-deep to-emerald' },
  { name: 'Ascend Labs', cat: 'Webshop · Development', grad: 'from-emerald to-mint' },
  { name: 'Northbound', cat: 'Short video', grad: 'from-mint to-lime-accent' },
  { name: 'Bloom & Co', cat: 'Influencer campagne', grad: 'from-emerald-deep to-mint' },
]

export function Showcase() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-mint/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
                [04] Geselecteerd werk
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream md:text-5xl">
                Merken die zijn gaan klimmen.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <a
              href="/work"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-sans text-sm font-medium text-white transition-colors duration-300 hover:border-mint/40"
            >
              Bekijk alles
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.name}
              href="/work"
              className="group relative block overflow-hidden rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.1 }}
            >
              <div
                className={`relative aspect-[16/10] w-full bg-gradient-to-br ${p.grad}`}
              >
                <div className="absolute inset-0 bg-near-black/20 transition-colors duration-500 group-hover:bg-near-black/5" />
                {/* subtle M watermark feel via diagonal sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-cream md:text-2xl">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-white/50">{p.cat}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-mint transition-all duration-300 group-hover:border-mint/50 group-hover:bg-mint/10">
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
