import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { BlurReveal } from '@/components/BlurReveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { M_PATH } from '@/three/mPath'
import { SERVICES } from './servicesData'
import { EXTRAS, type Stat } from './serviceExtras'
import {
  BrowserRender,
  BrandingRender,
  VideoRender,
  AiVideoRender,
  SeoRender,
  NetworkRender,
} from '@/sections/serviceRenders'

/** The animated "mini-UI" demo per service — the show-don't-tell centrepiece. */
const RENDERS: Record<keyof typeof SERVICES, () => JSX.Element> = {
  websites: BrowserRender,
  branding: BrandingRender,
  video: VideoRender,
  aivideo: AiVideoRender,
  seo: SeoRender,
  influencer: NetworkRender,
}

/**
 * Shared, story-driven template for the service pages, built on one spine:
 *   Probleem  → de pijn die de klant nu voelt
 *   Aanpak    → hoe we het oplossen (mét de geanimeerde demo)
 *   Resultaat → meetbare cijfers + bewijs
 */
export function ServicePage({ slug }: { slug: keyof typeof SERVICES }) {
  const s = SERVICES[slug]
  const x = EXTRAS[slug]
  const Render = RENDERS[slug]

  return (
    <>
      <PageHero
        kicker={s.kicker}
        title={s.label}
        tagline={s.tagline}
        primary={{ label: 'Start jouw project', to: '/start' }}
        secondary={{ label: 'Bekijk werk', to: '/work' }}
      />

      <div className="bg-cream text-near-black">
        {/* ───────────────── AKTE 1 — Probleem ───────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <Reveal className="flex items-center gap-3">
            <span className="h-px w-10 bg-emerald-deep/40" />
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/55">
              Het probleem
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1.06] tracking-tight">
              {x.problem.heading}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {x.problem.points.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.06}
                className="rounded-2xl border border-emerald-deep/10 bg-white p-7 shadow-[0_18px_50px_rgba(15,92,77,0.06)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-deep/[0.06] text-emerald-deep/70">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M7 7l10 10M17 7 7 17" />
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/60">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The turn — solution promise with blur word-reveal */}
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

        {/* audit callout (websites only) */}
        {slug === 'websites' && (
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

        {/* ───────────────── AKTE 2 — Aanpak (show, don't tell) ───────────────── */}
        <section
          className="relative overflow-hidden py-24 text-cream md:py-32"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 80% 0%, rgba(79,216,155,0.22), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #08120F 100%)',
          }}
        >
          <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* text + approach pillars */}
              <div>
                <Reveal className="flex items-center gap-3">
                  <span className="h-px w-10 bg-mint/50" />
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
                    De aanpak
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-8 max-w-xl text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight">
                    Zo lossen we dit <Accent>voor je op</Accent>.
                  </h2>
                </Reveal>
                <div className="mt-10 flex flex-col divide-y divide-white/10 border-y border-white/10">
                  {x.why.map((w, i) => (
                    <Reveal key={w.title} delay={i * 0.07} className="flex gap-4 py-5">
                      <span className="font-accent text-2xl italic text-lime-bright">{`0${i + 1}`}</span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-cream">{w.title}</h3>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-cream/60">{w.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* the animated demo */}
              <Reveal delay={0.1}>
                <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-[#06140F] shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:h-[460px]">
                  <Render />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* features / capabilities — branded visuals, no stock photos */}
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
                Alles wat <Accent>{s.label.toLowerCase()}</Accent> sterk maakt.
              </h2>
            </Reveal>

            <div className="mt-20 flex flex-col gap-20 md:gap-28">
              {s.features.map((f, i) => (
                <div
                  key={f.title}
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                    i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal>
                    <FeatureVisual i={i} />
                  </Reveal>
                  <Reveal delay={0.08}>
                    <span className="font-accent text-3xl italic text-emerald">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                      {f.title}
                    </h3>
                    <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                      {f.desc}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* what you get — deliverables */}
        <section className="bg-[#EEF1E7] py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal delay={0.05}>
              <h2 className="max-w-3xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05]">
                Wat je <Accent>van ons krijgt</Accent>.
              </h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.deliverables.map((d, i) => (
                <Reveal
                  key={d.title}
                  delay={(i % 3) * 0.06}
                  className="rounded-2xl border border-emerald-deep/10 bg-white p-7 shadow-[0_18px_50px_rgba(15,92,77,0.08)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5 10 17 19 7" />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/60">{d.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* how we work — per service */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Zo werken we</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {x.steps.map((st, i) => (
              <Reveal key={st.no} delay={i * 0.06} className="relative">
                <span className="font-accent text-3xl italic text-emerald/70">{st.no}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{st.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────────── AKTE 3 — Resultaat ───────────────── */}
        <section
          className="relative overflow-hidden py-24 text-cream md:py-32"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 25% 0%, rgba(79,216,155,0.25), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #08120F 100%)',
          }}
        >
          <svg
            viewBox="-1.75 -1 3.5 2"
            className="pointer-events-none absolute -right-10 top-1/2 h-[110%] -translate-y-1/2 opacity-[0.05]"
            aria-hidden="true"
          >
            <path d={M_PATH} transform="scale(1,-1)" fill="#4FD89B" />
          </svg>

          <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-mint/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
                Het resultaat
              </span>
            </Reveal>

            {/* stats strip */}
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {x.stats.map((st, i) => (
                <Reveal key={st.label} delay={i * 0.08} className="border-t border-white/15 pt-6">
                  <div className="font-display text-[clamp(2.8rem,6vw,4.5rem)] font-semibold leading-none text-cream">
                    <CountUp stat={st} />
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-cream/60">{st.label}</p>
                </Reveal>
              ))}
            </div>

            {/* proof */}
            <div className="mx-auto mt-20 max-w-4xl text-center">
              <div className="mb-7 flex justify-center gap-1 text-lime-bright">
                {[0, 1, 2, 3, 4].map((st) => (
                  <svg key={st} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 2l2.9 6.3 6.8.6-5.1 4.5 1.5 6.7L12 17.8 5.9 20.6l1.5-6.7L2.3 8.9l6.8-.6L12 2Z" />
                  </svg>
                ))}
              </div>
              <Reveal>
                <blockquote className="text-balance font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.15] text-cream">
                  {x.review.quote}
                </blockquote>
              </Reveal>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mint/20 font-display text-lg font-semibold text-lime-bright ring-1 ring-mint/30">
                  {x.review.initials}
                </span>
                <div className="text-left">
                  <div className="font-sans font-semibold text-cream">{x.review.name}</div>
                  <div className="font-sans text-sm text-cream/55">{x.review.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
          <Reveal>
            <div
              className="flex flex-col items-center gap-7 rounded-3xl p-10 text-center text-cream md:p-16"
              style={{
                backgroundImage:
                  'radial-gradient(70% 90% at 50% 0%, rgba(79,216,155,0.32), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #0A3329 100%)',
              }}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                Klaar om hiermee te <Accent>klimmen</Accent>?
              </h2>
              <Link
                to="/start"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-emerald-deep px-8 py-4 font-sans text-base font-semibold text-cream shadow-lg shadow-emerald/40 transition-transform duration-300 hover:scale-[1.03]"
              >
                <BorderBeam rx={12} />
                <span className="relative z-10">Start jouw project</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  )
}

/** Branded gradient tile for a feature, replacing stock photography. */
function FeatureVisual({ i }: { i: number }) {
  const grads = [
    'from-emerald-deep via-emerald to-mint',
    'from-emerald via-mint to-lime-accent',
    'from-emerald-deep via-emerald to-mint',
  ]
  return (
    <div
      className={`relative aspect-[5/4] overflow-hidden rounded-3xl bg-gradient-to-br ${grads[i % 3]} shadow-[0_30px_70px_rgba(15,92,77,0.22)]`}
    >
      {/* faint M motif */}
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-6 -top-8 h-3/4 opacity-[0.12]"
        aria-hidden="true"
      >
        <path d={M_PATH} transform="scale(1,-1)" fill="#0A1512" />
      </svg>
      {/* big ghost number */}
      <span className="absolute bottom-2 left-6 font-display text-[7rem] font-semibold leading-none text-cream/15">
        0{i + 1}
      </span>
      {/* shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-cream/15 to-transparent"
        animate={{ x: ['-130%', '130%'] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
    </div>
  )
}

/** Count up to a stat when it scrolls into view (respects reduced-motion). */
function CountUp({ stat }: { stat: Stat }) {
  const { num, prefix = '', suffix = '' } = stat
  const decimals = Number.isInteger(num) ? 0 : 1
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(num)
      return
    }
    let raf = 0
    let start: number | null = null
    const dur = 1500
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / dur, 1)
      setVal(num * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, num, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
