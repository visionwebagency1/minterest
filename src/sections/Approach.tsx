import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { useContent } from '@/content/SiteContent'

/**
 * "Onze aanpak" — a light, climbing timeline. A mint line fills as you scroll;
 * four steps rise alternately (the climb), each with a softly floating SVG icon
 * that symbolises the phase.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const STEP_ICONS = [TargetIcon, LayersIcon, CodeIcon, RocketIcon]

function FloatingIcon({ Icon }: { Icon: () => JSX.Element }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-emerald/20 bg-white text-emerald shadow-[0_18px_50px_rgba(1,63,64,0.18)]"
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon />
    </motion.div>
  )
}

export function Approach() {
  const c = useContent()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const steps = STEP_ICONS.map((Icon, i) => ({
    title: c(`approach.step.${i}.title`),
    desc: c(`approach.step.${i}.desc`),
    Icon,
  }))

  return (
    <section
      className="relative overflow-hidden py-28 text-cream md:py-40"
      style={{
        backgroundImage:
          'radial-gradient(60% 50% at 80% 8%, rgba(0,128,129,0.28), transparent 60%), radial-gradient(50% 45% at 10% 95%, rgba(1,63,64,0.4), transparent 60%), linear-gradient(170deg, #08201E 0%, #071311 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/70">
            {c('approach.eyebrow')}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-cream">
            {c('approach.headingPre')}<Accent>{c('approach.headingAccent')}</Accent>{c('approach.headingPost')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-cream/65">
            {c('approach.intro')}
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* MOBILE: vertical track + scroll-fill (connects the stacked steps) */}
          <div className="absolute left-[39px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 md:hidden" />
          <motion.div
            className="absolute left-[39px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-emerald to-lime-bright md:hidden"
            style={{ scaleY: lineScale }}
          />
          {/* DESKTOP: horizontal track + scroll-fill (runs behind the icon row) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-white/12 md:block" />
          <motion.div
            className="absolute left-[12.5%] top-10 hidden h-px w-3/4 origin-left bg-gradient-to-r from-emerald to-lime-bright md:block"
            style={{ scaleX: lineScale }}
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {steps.map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative flex items-start gap-6 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <div className="relative z-10 md:mb-8">
                  <FloatingIcon Icon={s.Icon} />
                </div>
                <div className="pt-2 md:pt-0">
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-sm font-sans text-base leading-relaxed text-cream/60 md:mx-auto md:max-w-[15rem]">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Opstap naar de diensten — the growth plan leads into the services. */}
        <Reveal delay={0.05} className="mt-16 flex justify-center md:mt-24">
          <Link
            to="/diensten"
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">{c('approach.cta')}</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ---- step icons (clean, mint/emerald line art) ---- */
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 21 8 12 13 3 8 12 3Z" />
      <path d="M3 13 12 18 21 13" />
    </svg>
  )
}
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 7 4 12 9 17" />
      <path d="M15 7 20 12 15 17" />
    </svg>
  )
}
function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-3 1.5-4.5 3-5l2 2c-.5 1.5-2 3-5 3Z" />
      <path d="M11 16 8 13c1.5-5 5-8 11-8 0 6-3 9.5-8 11Z" />
      <circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
