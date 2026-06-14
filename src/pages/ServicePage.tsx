import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { BlurReveal } from '@/components/BlurReveal'
import { Accent } from '@/components/Accent'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { M_PATH } from '@/three/mPath'
import { SERVICE_BY_SLUG, MAIN_SERVICES, type MainService } from '@/data/services'
import { NotFound } from './NotFound'

/**
 * Shared, predominantly LIGHT template for the 6 main service landing pages.
 * Each page: a light hero · the solution promise · every sub-service explained
 * as its own section (alternating rows with a branded visual) · a living scene ·
 * how we work · a CTA. The accent gradient varies per service (within the green
 * palette) so the six pages cohere but each has its own colour.
 */

const STEPS = [
  { no: '01', title: 'Kennismaken', desc: 'We brengen je doel, doelgroep en kansen scherp in beeld.' },
  { no: '02', title: 'Plan', desc: 'Een helder plan en aanpak, volledig gebouwd rond resultaat.' },
  { no: '03', title: 'Uitvoeren', desc: 'Wij maken het, jij blijft op de hoogte bij elke stap.' },
  { no: '04', title: 'Groeien', desc: 'Live, meten en blijven optimaliseren wat werkt.' },
]

/** Route wrapper: reads the :slug param for /diensten/:slug. */
export function ServiceRoute() {
  const { slug = '' } = useParams()
  return <ServicePage slug={slug} />
}

export function ServicePage({ slug }: { slug: string }) {
  const s = SERVICE_BY_SLUG[slug]
  if (!s) return <NotFound />

  return (
    <>
      <ServiceHero service={s} />

      <div className="bg-cream text-near-black">
        {/* De oplossing — solution promise with blur word-reveal */}
        <section className="bg-[#EEF1E7] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                De oplossing
              </span>
            </Reveal>
            <p className="mt-8 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.2] tracking-tight text-near-black">
              <BlurReveal text={s.intro} stagger={0.022} />
            </p>
          </div>
        </section>

        {/* Website-audit callout (web-development only) */}
        {slug === 'web-development' && (
          <section className="mx-auto max-w-7xl px-6 pt-24 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-emerald/30 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.1)] md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">Benieuwd hoe jouw site nu scoort?</h3>
                  <p className="mt-2 font-sans text-near-black/60">Ontvang gratis een audit met concrete groeikansen, binnen 24 uur.</p>
                </div>
                <Link
                  to="/website-audit"
                  className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <BorderBeam rx={12} />
                  <span className="relative z-10">Gratis website-audit</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
              </div>
            </Reveal>
          </section>
        )}

        {/* Sub-services — each explained as its own section (alternating rows) */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                Wat we doen
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
                Alles binnen <Accent>{s.label.toLowerCase()}</Accent>.
              </h2>
            </Reveal>

            <div className="mt-20 flex flex-col gap-20 md:gap-28">
              {s.subs.map((sub, i) => (
                <div
                  key={sub.name}
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                    i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal>
                    <SubVisual accent={s.accent} index={i} />
                  </Reveal>
                  <Reveal delay={0.08}>
                    <span className="font-accent text-3xl italic text-emerald">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                      {sub.name}
                    </h3>
                    <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                      {sub.desc}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Living scene — the animated render in a framed card on light bg */}
        <section className="bg-[#EEF1E7] py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:px-16">
            <div>
              <Reveal className="flex items-center gap-3">
                <span className="h-px w-10 bg-emerald/50" />
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                  In actie
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-8 max-w-md text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
                  Zo ziet <Accent>{s.label.toLowerCase()}</Accent> eruit.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                  {s.tagline}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ServiceScene service={s} />
            </Reveal>
          </div>
        </section>

        {/* How we work */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Zo werken we</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STEPS.map((st, i) => (
              <Reveal key={st.no} delay={i * 0.06} className="relative">
                <span className="font-accent text-3xl italic text-emerald/70">{st.no}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{st.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal>
            <div
              className={`flex flex-col items-center gap-7 rounded-3xl bg-gradient-to-br ${s.accent} p-10 text-center text-near-black md:p-16`}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                Klaar om hiermee te klimmen?
              </h2>
              <Link
                to="/start"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-near-black px-8 py-4 font-sans text-base font-semibold text-cream shadow-lg shadow-emerald-deep/30 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Start jouw project</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-mint/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  )
}

/* ───────────────────────── Light service hero ───────────────────────── */

function ServiceHero({ service: s }: { service: MainService }) {
  const idx = MAIN_SERVICES.findIndex((m) => m.slug === s.slug)
  return (
    <section className="relative overflow-hidden bg-cream pt-36 pb-20 text-near-black md:pt-48 md:pb-28">
      {/* soft accent glow */}
      <div
        className={`pointer-events-none absolute -right-32 -top-20 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br ${s.accent} opacity-25 blur-[120px]`}
        aria-hidden="true"
      />
      {/* faint M watermark */}
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-12 top-1/2 h-[80%] -translate-y-1/2 opacity-[0.05] md:-right-10 md:h-[120%]"
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
          <span className="font-mono text-sm text-emerald">0{idx + 1}</span>
          <span className="h-px w-10 bg-emerald/40" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            {s.kicker}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight"
        >
          {s.label}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-near-black/65"
        >
          {s.tagline}
        </motion.p>

        {/* sub-service chips */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {s.subs.map((sub) => (
            <li key={sub.name}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-deep/15 bg-white px-4 py-2 font-sans text-sm font-medium text-emerald-deep shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
                {sub.name}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 flex flex-row flex-wrap gap-3"
        >
          <Link
            to="/start"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Start jouw project</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <Link
            to="/diensten"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-emerald-deep/15 bg-white px-8 py-4 font-sans text-base font-medium text-emerald-deep transition-colors duration-300 hover:border-emerald/50"
          >
            <span className="h-1.5 w-1.5 bg-emerald" />
            Alle diensten
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Visual helpers ───────────────────────── */

/** Branded gradient tile for a sub-service (no stock photos). */
function SubVisual({ accent, index }: { accent: string; index: number }) {
  return (
    <div
      className={`relative aspect-[5/4] overflow-hidden rounded-3xl bg-gradient-to-br ${accent} shadow-[0_30px_70px_rgba(15,92,77,0.22)]`}
    >
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-6 -top-8 h-3/4 opacity-[0.12]"
        aria-hidden="true"
      >
        <path d={M_PATH} transform="scale(1,-1)" fill="#0A1512" />
      </svg>
      <span className="absolute bottom-2 left-6 font-display text-[7rem] font-semibold leading-none text-cream/20">
        0{index + 1}
      </span>
      <motion.div
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-cream/15 to-transparent"
        animate={{ x: ['-130%', '130%'] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** The service's animated render in a rich, framed scene (dark card on light bg). */
function ServiceScene({ service: s }: { service: MainService }) {
  const { Render } = s
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSeen(true),
      { rootMargin: '160px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_120px_rgba(15,92,77,0.25)] ring-1 ring-mint/10 lg:aspect-[4/3.5]"
    >
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(155deg, #0F5C4D 0%, #0A1F19 52%, #06120F 100%)' }} />
      <motion.div
        className="pointer-events-none absolute left-[18%] top-[8%] h-[64%] w-[64%] rounded-full bg-mint/20 blur-[90px]"
        animate={reduce ? undefined : { opacity: [0.32, 0.6, 0.32], scale: [0.9, 1.06, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 grid place-items-center [&>*]:h-full [&>*]:w-full md:[&>*]:scale-[1.06]">
        {seen && <Render />}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
    </div>
  )
}
