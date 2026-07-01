import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { BlurReveal } from '@/components/BlurReveal'
import { Accent } from '@/components/Accent'
import { BorderBeam } from '@/components/BorderBeam'
import { HERO_BG, HeroMWatermark } from '@/components/PageHero'
import { SUB_ICON_BY_SLUG } from '@/components/subServiceIcons'
import { Footer } from '@/sections/Footer'
import { M_PATH } from '@/three/mPath'
import {
  SERVICE_BY_SLUG,
  slugifySub,
  subPath,
  type MainService,
} from '@/data/services'
import { SiteContentProvider, useContent } from '@/content/SiteContent'
import { NotFound } from './NotFound'

/**
 * Shared template for the 6 main service landing pages. A premium dark hero
 * (the fresh Minterest teal -> mint gradient shared with /start, brand M +
 * wordmark inside) flows into a light body: the solution promise · every
 * sub-service explained as its own section (icon, copy, link to its page) · a
 * living scene · how we work (icons, no numbers) · a CTA. No numbering anywhere.
 */

/** Generic fallback steps, used when a service has no custom `steps`. */
const STEPS = [
  { title: 'Kennismaken', desc: 'We brengen je doel, doelgroep en kansen scherp in beeld.' },
  { title: 'Plan', desc: 'Een helder plan en aanpak, volledig gebouwd rond resultaat.' },
  { title: 'Uitvoeren', desc: 'Wij maken het, jij blijft op de hoogte bij elke stap.' },
  { title: 'Groeien', desc: 'Live, meten en blijven optimaliseren wat werkt.' },
]

/** Step icons paired by index (works for both generic and per-service steps). */
const STEP_ICONS = [StepTargetIcon, StepPlanIcon, StepBuildIcon, StepGrowIcon]

/** Route wrapper: reads the :slug param for /diensten/:slug. */
export function ServiceRoute() {
  const { slug = '' } = useParams()
  return <ServicePage slug={slug} />
}

export function ServicePage({ slug }: { slug: string }) {
  const base = SERVICE_BY_SLUG[slug]
  if (!base) return <NotFound />
  return (
    <SiteContentProvider page={`dienst-${slug}`}>
      <ServicePageInner base={base} />
    </SiteContentProvider>
  )
}

function ServicePageInner({ base }: { base: MainService }) {
  const c = useContent()
  // Override only the two editable prose blocks; everything else stays as-is.
  const s: MainService = { ...base, tagline: c('tagline'), intro: c('intro') }

  return (
    <>
      <ServiceHero service={s} />

      <div className="bg-cream text-near-black">
        {/* De oplossing — solution promise with blur word-reveal */}
        <section className="bg-[#EAF4EC] py-24 md:py-32">
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
        {s.slug === 'web-development' && (
          <section className="mx-auto max-w-7xl px-6 pt-24 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-emerald/30 bg-white p-8 shadow-[0_18px_50px_rgba(1,63,64,0.1)] md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">Benieuwd hoe jouw site nu scoort?</h3>
                  <p className="mt-2 font-sans text-near-black/60">Ontvang gratis een korte website-audit met concrete groeikansen.</p>
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
                {s.whatTitle ?? (
                  <>
                    Alles binnen <Accent>{s.label.toLowerCase()}</Accent>.
                  </>
                )}
              </h2>
            </Reveal>

            <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-28">
              {s.subs.map((sub, i) => {
                const Icon = SUB_ICON_BY_SLUG[slugifySub(sub.name)]
                return (
                  <div
                    key={sub.name}
                    className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                      i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <Reveal>
                      <SubVisual accent={s.accent} />
                    </Reveal>
                    <Reveal delay={0.08}>
                      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald/10 p-4 text-emerald ring-1 ring-emerald/15 [&>svg]:h-full [&>svg]:w-full">
                        {Icon ? <Icon /> : null}
                      </span>
                      <h3 className="mt-6 font-display text-3xl font-semibold leading-tight md:text-4xl">
                        {sub.name}
                      </h3>
                      <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                        {sub.desc}
                      </p>
                      <Link
                        to={subPath(s.slug, sub.name)}
                        className="group relative mt-7 inline-flex w-fit items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-6 py-3 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/25 transition-transform duration-300 hover:scale-[1.03]"
                      >
                        <span className="relative z-10">Meer over {sub.name.toLowerCase()}</span>
                        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                        <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                      </Link>
                    </Reveal>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Living scene — the animated render in a framed card on light bg */}
        <section className="bg-[#EAF4EC] py-24 md:py-32">
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
                  {s.actionTitle ?? (
                    <>
                      Zo ziet <Accent>{s.label.toLowerCase()}</Accent> eruit.
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                  {s.actionText ?? s.tagline}
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
            {(s.steps ?? STEPS).map((st, i) => {
              const Icon = STEP_ICONS[i] ?? StepTargetIcon
              return (
                <Reveal key={st.title} delay={i * 0.06} className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <Icon />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{st.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
          <Reveal>
            <div
              className="relative flex flex-col items-center gap-7 overflow-hidden rounded-3xl p-10 text-center text-cream md:p-16"
              style={{
                backgroundImage:
                  'radial-gradient(70% 90% at 50% 0%, rgba(66,194,140,0.32), transparent 60%), linear-gradient(160deg, #008081 0%, #013F40 55%, #06140F 100%)',
              }}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                {s.ctaTitle ?? 'Klaar om hiermee te klimmen?'}
              </h2>
              {s.ctaText && (
                <p className="max-w-xl font-sans text-base leading-relaxed text-cream/70 md:text-lg">
                  {s.ctaText}
                </p>
              )}
              <Link
                to="/start"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-mint to-lime-accent px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">{s.heroCta ?? 'Start jouw project'}</span>
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
  return (
    <section
      className="relative overflow-hidden bg-near-black pt-36 pb-24 text-cream md:pt-48 md:pb-32"
      style={{ backgroundImage: HERO_BG }}
    >
      {/* per-service accent glow (kept subtle on the dark teal base) */}
      <div
        className={`pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br ${s.accent} opacity-20 blur-[130px]`}
        aria-hidden="true"
      />
      {/* quiet transparent brand-M motif (the header already carries the logo) */}
      <HeroMWatermark />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
            {s.kicker}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight text-cream"
        >
          {s.label}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
          className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-cream/65"
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-sans text-sm font-medium text-cream backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-accent" aria-hidden="true" />
                {sub.name}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            to="/start"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald to-mint px-4 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03] sm:flex-1 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="relative z-10">{s.heroCta ?? 'Start jouw project'}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
          <Link
            to="/diensten"
            className="inline-flex w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-sans text-sm font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-mint/40 sm:flex-1 sm:px-8 sm:py-4 sm:text-base"
          >
            <span className="h-1.5 w-1.5 bg-lime-accent" />
            Bekijk alle groeidiensten
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ───────────────────────── Visual helpers ───────────────────────── */

/** Branded gradient tile for a sub-service (no stock photos). */
function SubVisual({ accent }: { accent: string }) {
  return (
    <div
      className={`relative aspect-[5/4] overflow-hidden rounded-3xl bg-gradient-to-br ${accent} shadow-[0_30px_70px_rgba(1,63,64,0.22)]`}
    >
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-6 -top-8 h-3/4 opacity-[0.12]"
        aria-hidden="true"
      >
        <path d={M_PATH} transform="scale(1,-1)" fill="#0A1512" />
      </svg>
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
      className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_120px_rgba(1,63,64,0.25)] ring-1 ring-mint/10 lg:aspect-[4/3.5]"
    >
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(155deg, #013F40 0%, #082321 52%, #05110F 100%)' }} />
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

/* ───────────────────────── "Zo werken we" step icons ───────────────────────── */

function StepTargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
function StepPlanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </svg>
  )
}
function StepBuildIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
    </svg>
  )
}
function StepGrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 10 12l3.5 3.5L20 9" />
      <path d="M15 9h5v5" />
    </svg>
  )
}
