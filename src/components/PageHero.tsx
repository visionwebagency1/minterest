import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { M_PATH } from '@/three/mPath'

/**
 * Dark, gradient inner-page hero (same emerald vibe as the homepage hero) with
 * a kicker, big title, tagline, and two CTAs. A faint M watermark sits behind.
 */

const EASE = [0.22, 1, 0.36, 1] as const

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
      style={{
        backgroundImage:
          'radial-gradient(65% 60% at 78% 8%, rgba(31,166,122,0.4), transparent 60%), radial-gradient(55% 55% at 8% 100%, rgba(15,92,77,0.5), transparent 60%), linear-gradient(160deg, #08120F 0%, #0A1B16 100%)',
      }}
    >
      {/* faint M watermark */}
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-12 top-1/2 h-[80%] -translate-y-1/2 opacity-[0.08] md:-right-10 md:h-[120%] md:opacity-[0.06]"
        aria-hidden="true"
      >
        <path d={M_PATH} transform="scale(1,-1)" fill="#4FD89B" />
      </svg>

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
