import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { LogoMark } from './Logo'

/**
 * Dark, gradient inner-page hero (fresh Minterest teal -> mint) with a kicker,
 * big title, tagline, and two CTAs. The brand M + wordmark sit in it, premium
 * and recognizable. This is the reference look shared by /start and every other
 * inner page (see ServicePage's hero).
 */

const EASE = [0.22, 1, 0.36, 1] as const

/** Shared fresh teal -> mint hero gradient (greener than the old near-black). */
export const HERO_BG =
  'radial-gradient(75% 70% at 82% 0%, rgba(66,194,140,0.5), transparent 62%), radial-gradient(62% 65% at 0% 100%, rgba(0,128,129,0.5), transparent 60%), linear-gradient(150deg, #0B3A37 0%, #08221F 55%, #061814 100%)'

/**
 * Subtle transparent brand-M watermark for inner-page heroes. Recognizable as
 * our M (not an enlarged blob), kept low-opacity and fully inside the hero so it
 * reads as a quiet brand motif. Shared by the service heroes and any sub-page.
 */
export function HeroMWatermark() {
  return (
    <LogoMark
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 right-4 h-[clamp(12rem,48vw,22rem)] w-auto opacity-[0.08] md:right-10"
    />
  )
}

type Cta = { label: string; to: string }

export function PageHero({
  kicker,
  title,
  tagline,
  primary,
  secondary,
}: {
  kicker: string
  title: ReactNode
  tagline: string
  primary?: Cta
  secondary?: Cta
}) {
  return (
    <section
      className="relative overflow-hidden bg-near-black pt-36 pb-24 text-cream md:pt-48 md:pb-32"
      style={{ backgroundImage: HERO_BG }}
    >
      {/* Quiet transparent brand-M motif (no redundant logo: the header has it) */}
      <HeroMWatermark />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
            {kicker}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight text-cream"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
          className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-cream/65"
        >
          {tagline}
        </motion.p>

        {(primary || secondary) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="mt-10 flex flex-row flex-wrap gap-3"
          >
            {primary && (
              <Link
                to={primary.to}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">{primary.label}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            )}
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-sans text-base font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-mint/40"
              >
                <span className="h-1.5 w-1.5 bg-lime-accent" />
                {secondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
