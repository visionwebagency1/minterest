import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Leva } from 'leva'
import { HeroContent } from './HeroContent'
import { ServiceOrbit } from './ServiceOrbit'

// Lazy-load the WebGL hero so the rest of the page paints first.
const HeroCanvas = lazy(() => import('@/three/HeroCanvas'))

/** True from the md breakpoint up — where the hero is a full-screen overlay. */
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

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktop()
  // Parallax: the WebGL background + orbiting pills drift slower than the page
  // as you scroll. Desktop only — on mobile the canvas is full-bleed behind a
  // taller hero, so we keep it still to avoid any shift.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-near-black md:h-screen"
    >
      {/* Dev-only 3D tweak panel. */}
      <Leva collapsed hidden={!import.meta.env.DEV} />

      {/* ONE full-bleed background behind the copy AND the M (no seam). */}
      <motion.div style={desktop ? { y: bgY } : undefined} className="absolute inset-0">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="h-full w-full bg-near-black" />}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Liquid-glass service pills orbiting the M. */}
        <ServiceOrbit />
      </motion.div>

      {/* Mobile legibility: ONE smooth top-down scrim across the whole hero, so
          the copy reads well and there is no hard edge / seam between the copy
          area and the M below — they share one continuous background. */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-near-black/85 via-near-black/25 to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Copy + CTAs + stats. Flows at the top on mobile (over the canvas);
          absolute overlay on desktop. */}
      <HeroContent />

      {/* Mobile only: reserve the lower zone where the M + orbit sit, so the copy
          never overlaps them. Desktop centres the M in the viewport instead. */}
      <div className="h-[450px] md:hidden" aria-hidden="true" />
    </section>
  )
}
