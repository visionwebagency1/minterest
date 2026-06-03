import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/**
 * Word-by-word reveal that animates each word from blurred + dimmed + slightly
 * down to sharp, on scroll-into-view. Used for headings and statements.
 * Respects prefers-reduced-motion (renders instantly).
 */

const EASE = [0.22, 1, 0.36, 1] as const

export function BlurReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            className="inline-block will-change-[transform,filter]"
            initial={{ opacity: 0, filter: 'blur(14px)', y: '0.35em' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}
