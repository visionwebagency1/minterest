import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Selected work on a light background: each project is a tilted browser mockup
 * with a coded mini-screen, righting itself on hover. Asymmetric, hover-rich.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const PROJECTS = [
  { name: 'Luna Light', cat: 'Webshop · Shopify', kind: 'shop', accent: 'from-emerald-deep to-emerald' },
  { name: 'Ascend Labs', cat: 'SaaS · Development', kind: 'dash', accent: 'from-emerald to-mint' },
  { name: 'DYOTA', cat: 'Branding · Landing', kind: 'lux', accent: 'from-mint to-lime-accent' },
  { name: 'Bloom & Co', cat: 'Webshop · Food', kind: 'food', accent: 'from-emerald-deep to-mint' },
]

/** A coded mini-screen, distinct per project kind. */
function MiniScreen({ kind, accent }: { kind: string; accent: string }) {
  return (
    <div className="relative h-full w-full bg-cream p-3">
      {/* top nav */}
      <div className="mb-2 flex items-center justify-between">
        <span className="h-2.5 w-2.5 rounded bg-emerald" />
        <div className="flex gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-black/15" />
          <span className="h-1.5 w-5 rounded-full bg-black/15" />
          <span className="h-1.5 w-5 rounded-full bg-black/15" />
        </div>
      </div>
      {kind === 'shop' && (
        <>
          <div className={`h-14 rounded-lg bg-gradient-to-br ${accent}`} />
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded bg-white shadow-sm" />
            ))}
          </div>
        </>
      )}
      {kind === 'dash' && (
        <div className="flex gap-2">
          <div className="w-10 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2 rounded bg-black/10" />
            ))}
          </div>
          <div className="flex-1 space-y-2">
            <div className={`h-12 rounded-lg bg-gradient-to-br ${accent}`} />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-6 rounded bg-white shadow-sm" />
              <div className="h-6 rounded bg-white shadow-sm" />
            </div>
          </div>
        </div>
      )}
      {kind === 'lux' && (
        <div className="grid h-[4.5rem] place-items-center rounded-lg bg-[#15130E]">
          <span className="font-accent text-lg italic text-[#C9A84C]">DYOTA</span>
        </div>
      )}
      {kind === 'food' && (
        <>
          <div className={`flex h-12 items-end rounded-lg bg-gradient-to-br ${accent} p-2`}>
            <span className="h-2 w-12 rounded bg-cream/80" />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-8 rounded bg-white shadow-sm" />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function Showcase() {
  return (
    <section id="work" className="relative bg-[#EEF1E7] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                Geselecteerd werk
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
                Werk dat <Accent>groeit.</Accent>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-6 py-3.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.03]"
            >
              Bekijk alles
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              className={`[perspective:1400px] ${i % 2 === 1 ? 'md:mt-16' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Link to="/work" className="group block">
                <motion.div
                  className="overflow-hidden rounded-2xl border border-emerald-deep/10 bg-white shadow-[0_30px_70px_rgba(15,92,77,0.14)] [transform-style:preserve-3d]"
                  style={{ rotateY: i % 2 === 0 ? 9 : -9, rotateX: 5 }}
                  whileHover={{ rotateY: 0, rotateX: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-black/5 bg-black/[0.03] px-3 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/25" />
                    <span className="ml-2 h-3.5 flex-1 rounded-full bg-black/[0.06]" />
                  </div>
                  <div className="aspect-[16/10]">
                    <MiniScreen kind={p.kind} accent={p.accent} />
                  </div>
                </motion.div>
              </Link>
              <div className="mt-4 flex items-center justify-between gap-2 md:mt-5">
                <div>
                  <h3 className="font-display text-base font-semibold md:text-2xl">{p.name}</h3>
                  <p className="mt-1 font-sans text-xs text-near-black/50 md:text-sm">{p.cat}</p>
                </div>
                <span className="hidden font-sans text-sm text-emerald-deep sm:inline">Bekijk project &nearr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
