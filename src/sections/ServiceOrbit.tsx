import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { MAIN_SERVICES, focusService } from '@/data/services'

/**
 * The 6 Minterest services as liquid-glass pills arranged in a ring around the
 * 3D M (parked in the right half on desktop, centred on mobile). The pills no
 * longer spin as a ring (a moving target is hard to click) — instead each one
 * holds its place on a dashed orbit and floats gently, so it stays clickable.
 *
 * Each pill is a real button: hover lifts + glows it, and clicking smooth-scrolls
 * the page to the services section and brings that exact service forward
 * (desktop: the right card; mobile: the carousel on that service). A quiet hint
 * under the ring tells visitors the pills are clickable.
 */

// Each pill drifts in its own direction for a livelier, less mechanical feel.
const FLOATS = [
  { y: [0, -9, 0] },
  { x: [0, 9, 0] },
  { y: [0, 9, 0] },
  { y: [0, -8, 0] },
  { x: [0, -9, 0] },
  { x: [0, 8, 0] },
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

  // Mobile uses a TALLER-than-wide ellipse: narrower horizontally so the full
  // service names never run off-screen, but more vertical spread so the six
  // pills breathe and the M keeps room in the centre. Desktop is unchanged.
  const rx = desktop ? 205 : 108
  const ry = desktop ? 188 : 142
  const pad = 80

  // 6 fixed pill positions on the ellipse (start at top, clockwise).
  const positions = MAIN_SERVICES.map((_, i) => {
    const angle = (i / MAIN_SERVICES.length) * Math.PI * 2 - Math.PI / 2
    return { x: Math.cos(angle) * rx, y: Math.sin(angle) * ry }
  })

  // Subtle pointer parallax for the whole ring (desktop only).
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 50, damping: 18 })
  const y = useSpring(rawY, { stiffness: 50, damping: 18 })
  useEffect(() => {
    if (!desktop) return
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 30)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [desktop, rawX, rawY])

  return (
    <div className="pointer-events-none absolute left-1/2 top-[72%] z-10 -translate-x-1/2 -translate-y-1/2 md:left-[70%] md:top-1/2">
      <motion.div className="relative" style={{ x, y }}>
        {/* Dashed orbit path (decorative) */}
        <motion.svg
          width={rx * 2 + pad * 2}
          height={ry * 2 + pad * 2}
          viewBox={`0 0 ${rx * 2 + pad * 2} ${ry * 2 + pad * 2}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          aria-hidden="true"
        >
          <ellipse
            cx={rx + pad}
            cy={ry + pad}
            rx={rx}
            ry={ry}
            fill="none"
            stroke="rgba(144,238,144,0.18)"
            strokeWidth={1}
            strokeDasharray="2 7"
          />
        </motion.svg>

        {/* The 6 clickable, floating pills */}
        {MAIN_SERVICES.map((s, i) => (
          <div
            key={s.slug}
            className="absolute left-0 top-0"
            style={{
              transform: `translate(-50%, -50%) translate(${positions[i].x}px, ${positions[i].y}px)`,
            }}
          >
            <motion.button
              type="button"
              onClick={() => focusService(i)}
              aria-label={`Bekijk ${s.label}`}
              className="group pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/60 bg-white/90 px-2.5 py-1.5 shadow-[0_14px_38px_rgba(10,21,18,0.5)] ring-1 ring-inset ring-white/50 outline-none transition-[box-shadow,background-color] duration-300 hover:bg-white hover:shadow-[0_18px_50px_rgba(0,128,129,0.45)] focus-visible:ring-2 focus-visible:ring-emerald md:gap-2.5 md:px-6 md:py-3"
              animate={FLOATS[i]}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_rgba(0,128,129,0.8)] transition-colors duration-300 group-hover:bg-mint md:h-2 md:w-2" />
              <span className="font-sans text-[10.5px] font-semibold leading-none text-emerald-deep md:text-base">
                {s.label}
              </span>
            </motion.button>
          </div>
        ))}

        {/* "These are clickable" hint. Desktop: parked top-right between the
            "Design & Branding" (top) and "Web Development" (top-right) pills.
            Mobile: larger and centred BELOW the M and the pills. */}
        <motion.div
          className="pointer-events-none absolute"
          style={
            desktop
              ? {
                  left: (positions[0].x + positions[1].x) / 2,
                  top: (positions[0].y + positions[1].y) / 2,
                  transform: 'translate(-50%, -50%)',
                }
              : { left: 0, top: ry + 52, transform: 'translate(-50%, 0)' }
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden="true"
        >
          <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-near-black/40 px-3.5 py-2 font-sans text-xs uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm md:gap-1.5 md:bg-near-black/35 md:px-2.5 md:py-1 md:text-[11px]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-3 md:w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11V6a2 2 0 1 1 4 0v5" />
              <path d="M13 7a2 2 0 1 1 4 0v6a6 6 0 0 1-6 6h-1.5a4 4 0 0 1-3-1.4L3 14a1.6 1.6 0 0 1 2.4-2L7 13.5V8a2 2 0 1 1 4 0" />
            </svg>
            Klik op een dienst
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
