import { useId } from 'react'
import { motion } from 'motion/react'

/**
 * A glowing segment that continuously travels around a rounded border — a
 * blurred mint glow under a crisp bright line, both chasing the same dash
 * offset (pathLength normalised to 100 so it works at any size). Reusable on
 * buttons. Each instance gets a unique filter id.
 */
export function BorderBeam({ rx = 12, duration = 4.5 }: { rx?: number; duration?: number }) {
  const uid = useId()
  const id = `beam-${uid.replace(/:/g, '')}`
  const spin = {
    animate: { strokeDashoffset: [0, -100] },
    transition: { duration, repeat: Infinity, ease: 'linear' as const },
  }
  return (
    <span
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{ borderRadius: rx }}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <motion.rect
          x="0" y="0" width="100%" height="100%" rx={rx} ry={rx} pathLength={100}
          fill="none" stroke="#90EE90" strokeWidth={4} strokeLinecap="round"
          strokeDasharray="16 84" opacity={0.75} filter={`url(#${id})`}
          {...spin}
        />
        <motion.rect
          x="0" y="0" width="100%" height="100%" rx={rx} ry={rx} pathLength={100}
          fill="none" stroke="#EAFCF2" strokeWidth={2} strokeLinecap="round"
          strokeDasharray="16 84"
          {...spin}
        />
      </svg>
    </span>
  )
}
