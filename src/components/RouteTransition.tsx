import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { M_PATH } from '@/three/mPath'

/** Jump to the top whenever the route changes (resets Lenis too). */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const EASE = [0.76, 0, 0.24, 1] as const

/**
 * Brand page-transition: on navigation an emerald panel wipes up over the
 * screen with the M, hiding the content swap, then slides away to reveal the
 * new page. Skips the very first render (the preloader covers initial load).
 */
export function RouteWipe() {
  const { pathname } = useLocation()
  const [active, setActive] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setActive(true)
    const t = setTimeout(() => setActive(false), 600)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-wipe"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-deep"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <motion.svg
            viewBox="-1.75 -1 3.5 2"
            className="w-[34vw] max-w-[180px] drop-shadow-[0_10px_40px_rgba(66,194,140,0.3)]"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.14, ease: EASE }}
            aria-hidden="true"
          >
            <path d={M_PATH} transform="scale(1,-1)" fill="#F4F4F4" />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
