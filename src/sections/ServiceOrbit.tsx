import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * The four Minterest services as liquid-glass pills slowly orbiting the 3D M
 * (which MShapes parks in the right half on desktop, centred on mobile). The
 * whole ring rotates; each pill counter-rotates at the same rate so its label
 * stays upright, and floats in its own direction for life. A faint dashed
 * ellipse traces the orbit path.
 *
 * Responsive: bigger ring + pills and a slower spin on desktop (around the M
 * on the right); a tighter, faster ring centred over the M on mobile.
 */

const SERVICES_DESKTOP = [
  'Website & Webshops',
  'Design & branding',
  'Short video',
  'Influencer Marketing',
]
// Shorter labels on mobile so the pills always fit within the screen width.
const SERVICES_MOBILE = ['Websites', 'Branding', 'Short video', 'Influencer']

// Each pill drifts in a different direction for a livelier, less mechanical feel.
const FLOATS = [
  { x: [0, 10, 0] },
  { y: [0, -10, 0] },
  { x: [0, -10, 0] },
  { y: [0, 10, 0] },
]

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

export function ServiceOrbit() {
  const desktop = useIsDesktop()

  const SERVICES = desktop ? SERVICES_DESKTOP : SERVICES_MOBILE
  const radius = desktop ? 195 : 104
  const orbitSeconds = desktop ? 42 : 24
  const pad = 70

  // Pill positions on the circle (start at top, clockwise).
  const positions = SERVICES.map((_, i) => {
    const angle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
  })

  // Subtle pointer parallax for the whole ring (desktop only).
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 50, damping: 18 })
  const y = useSpring(rawY, { stiffness: 50, damping: 18 })
  useEffect(() => {
    if (!desktop) return
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 36)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 24)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [desktop, rawX, rawY])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-[67%]"
    >
     <motion.div className="relative" style={{ x, y }}>
      {/* Dashed orbit path */}
      <motion.svg
        width={radius * 2 + pad * 2}
        height={radius * 2 + pad * 2}
        viewBox={`0 0 ${radius * 2 + pad * 2} ${radius * 2 + pad * 2}`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <ellipse
          cx={radius + pad}
          cy={radius + pad}
          rx={radius}
          ry={radius * 0.9}
          fill="none"
          stroke="rgba(127,227,168,0.18)"
          strokeWidth={1}
          strokeDasharray="2 7"
        />
      </motion.svg>

      {/* Rotating ring */}
      <motion.div
        className="relative h-0 w-0"
        animate={{ rotate: 360 }}
        transition={{ duration: orbitSeconds, repeat: Infinity, ease: 'linear' }}
      >
        {SERVICES.map((label, i) => (
          <div
            key={label}
            className="absolute left-0 top-0"
            style={{
              transform: `translate(-50%, -50%) translate(${positions[i].x}px, ${positions[i].y}px)`,
            }}
          >
            {/* Counter-rotate to keep the pill upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: orbitSeconds,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/60 bg-white/75 px-3.5 py-1.5 shadow-[0_14px_38px_rgba(10,21,18,0.5)] ring-1 ring-inset ring-white/50 backdrop-blur-xl md:gap-2.5 md:px-6 md:py-3"
                animate={FLOATS[i]}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(31,166,122,0.8)] md:h-2 md:w-2" />
                <span className="font-sans text-[12px] font-semibold text-emerald-deep md:text-base">
                  {label}
                </span>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
     </motion.div>
    </div>
  )
}
