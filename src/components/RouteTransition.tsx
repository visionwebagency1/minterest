import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, type Location } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { M_PATH } from '@/three/mPath'

const EASE = [0.76, 0, 0.24, 1] as const

function scrollToTop() {
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

type Stage = 'idle' | 'cover' | 'reveal'

/**
 * Brand page-transition with NO flash of the next page. A two-phase wipe:
 *   1. cover  — an emerald panel (with the M) slides up and fully covers the
 *      screen. Only THEN do we swap the routed content and jump to the top.
 *   2. reveal — the panel slides away, uncovering the already-mounted new page.
 *
 * The routed <Routes> render against `displayLocation` (passed via the render
 * prop), which only updates once the screen is covered, so the new page never
 * shows before the transition.
 */
export function RouteTransition({
  children,
}: {
  children: (location: Location) => ReactNode
}) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState<Stage>('idle')
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    // Same page (hash/search change) — swap without a wipe.
    if (location.pathname === displayLocation.pathname) {
      setDisplayLocation(location)
      return
    }
    // Reduced motion — swap instantly, no animation.
    if (reduce) {
      setDisplayLocation(location)
      scrollToTop()
      return
    }
    setStage('cover')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduce])

  return (
    <>
      {children(displayLocation)}

      {stage !== 'idle' && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-emerald-deep"
          initial={{ y: '100%' }}
          animate={{ y: stage === 'cover' ? '0%' : '-100%' }}
          transition={{ duration: 0.5, ease: EASE }}
          onAnimationComplete={() => {
            if (stage === 'cover') {
              // Screen is fully covered: swap the page and jump to top, hidden.
              setDisplayLocation(location)
              scrollToTop()
              setStage('reveal')
            } else if (stage === 'reveal') {
              setStage('idle')
            }
          }}
        >
          <motion.svg
            viewBox="-1.75 -1 3.5 2"
            className="w-[34vw] max-w-[180px] drop-shadow-[0_10px_40px_rgba(66,194,140,0.3)]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.12, ease: EASE }}
            aria-hidden="true"
          >
            <path d={M_PATH} transform="scale(1,-1)" fill="#F4F4F4" />
          </motion.svg>
        </motion.div>
      )}
    </>
  )
}
