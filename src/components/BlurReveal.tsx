import { motion, useReducedMotion } from 'motion/react'

/**
 * Word-by-word reveal driven by a single container (reliable stagger): each
 * word animates from blurred + dimmed to sharp when the block scrolls into
 * view. Words wrapped in *asterisks* render as a green, softly glowing accent.
 * Spacing is margin-based so it always wraps cleanly, left-aligned. Respects
 * prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const ACCENT = 'text-emerald [text-shadow:0_0_16px_rgba(79,216,155,0.7)]'

export function BlurReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ').map((w) => ({
    clean: w.replace(/\*/g, ''),
    accent: w.includes('*'),
  }))

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className={`mr-[0.25em] inline-block ${w.accent ? ACCENT : ''}`}>
            {w.clean}
          </span>
        ))}
      </span>
    )
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { opacity: 0, filter: 'blur(12px)', y: '0.25em' },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className={`mr-[0.25em] inline-block will-change-[transform,filter] ${w.accent ? ACCENT : ''}`}
        >
          {w.clean}
        </motion.span>
      ))}
    </motion.span>
  )
}
