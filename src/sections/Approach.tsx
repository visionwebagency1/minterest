import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * "Onze aanpak" — a light, climbing timeline. A mint line fills as you scroll;
 * four steps rise alternately (the climb), each with a softly floating SVG icon
 * that symbolises the phase.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const STEPS = [
  {
    no: '01',
    title: 'Kennismaken & strategie',
    desc: 'We duiken in je merk, je doelen en je markt. Daaruit komt een helder plan waar alles op rust.',
    Icon: TargetIcon,
  },
  {
    no: '02',
    title: 'Ontwerp & richting',
    desc: 'Identiteit, interface en prototype. Hier wordt je merk zichtbaar en voelbaar.',
    Icon: LayersIcon,
  },
  {
    no: '03',
    title: 'Bouwen',
    desc: 'Engineering op een moderne stack. Snel, schoon en gemaakt om jaren mee te gaan.',
    Icon: CodeIcon,
  },
  {
    no: '04',
    title: 'Lanceren & laten groeien',
    desc: 'Live, meten en verbeteren. Je merk groeit door, en wij groeien mee.',
    Icon: RocketIcon,
  },
]

function FloatingIcon({ Icon }: { Icon: () => JSX.Element }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-emerald/20 bg-white text-emerald shadow-[0_18px_50px_rgba(15,92,77,0.18)]"
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon />
    </motion.div>
  )
}

export function Approach() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-cream py-28 text-near-black md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Onze aanpak
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-near-black">
            De <Accent>klim</Accent>, in vier stappen.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20 md:mt-28">
          {/* track */}
          <div className="absolute left-[39px] top-2 h-[calc(100%-1rem)] w-px bg-emerald/15 md:left-1/2 md:-translate-x-1/2" />
          {/* fill */}
          <motion.div
            className="absolute left-[39px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-emerald to-mint md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineScale }}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((s, i) => (
              <div
                key={s.no}
                className={`relative flex items-center gap-6 md:gap-10 ${
                  i % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''
                }`}
              >
                <div className="flex w-full items-start gap-6 md:w-1/2 md:items-center">
                  <div
                    className={`relative z-10 ${i % 2 === 1 ? 'md:order-2' : ''}`}
                  >
                    <FloatingIcon Icon={s.Icon} />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <span className="font-accent text-2xl italic text-emerald">{s.no}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-near-black md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-sm font-sans text-base leading-relaxed text-near-black/60">
                      {s.desc}
                    </p>
                  </motion.div>
                </div>
                {/* node on the centre line (desktop) */}
                <span className="absolute left-[35px] top-9 h-2.5 w-2.5 rounded-full bg-emerald ring-4 ring-cream md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
              </div>
            ))}
          </div>
        </div>
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
