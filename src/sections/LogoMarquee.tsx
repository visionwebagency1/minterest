import { motion, useReducedMotion } from 'motion/react'

/**
 * Infinite horizontal marquee of client names, separated by a mint ✦. Sits in
 * the dark→lighter transition zone just below the hero. The track is duplicated
 * so the loop is seamless.
 */

const CLIENTS = [
  'ONLINE GROEI',
  'MEER ZICHTBAARHEID',
  'STERKER MERK',
  'MEER AANVRAGEN',
  'BETERE CONVERSIE',
  'GROEI DIE BLIJFT',
]

export function LogoMarquee() {
  const reduce = useReducedMotion()
  const items = [...CLIENTS, ...CLIENTS]

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-near-black/45 py-7 backdrop-blur-sm md:py-9">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-near-black/80 to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-near-black/80 to-transparent md:w-48" />

      <motion.div
        className="flex w-max items-center gap-12 md:gap-20"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {items.map((name, i) => (
          <div key={i} className="flex items-center gap-12 md:gap-20">
            <span className="font-display text-xl font-medium uppercase tracking-tight text-white/45 transition-colors hover:text-white/80 md:text-2xl">
              {name}
            </span>
            <span className="text-mint/70" aria-hidden="true">
              &#10022;
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
