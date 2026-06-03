import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Leva } from 'leva'
import { HeroContent } from './HeroContent'
import { ServiceOrbit } from './ServiceOrbit'

// Lazy-load the WebGL hero so the rest of the page paints first.
const HeroCanvas = lazy(() => import('@/three/HeroCanvas'))

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  // Parallax: the WebGL background + orbiting pills drift slower than the page
  // as you scroll, so the hero stays put a beat longer instead of flying off.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Dev-only 3D tweak panel. */}
      <Leva collapsed hidden={!import.meta.env.DEV} />

      {/* Parallax layer: WebGL background + the orbiting service pills. */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0">
          <Suspense fallback={<div className="h-full w-full bg-near-black" />}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Liquid-glass service pills orbiting the M. */}
        <ServiceOrbit />
      </motion.div>

      {/* HTML overlay: copy, CTAs, stats (scrolls at normal speed). */}
      <HeroContent />
    </section>
  )
}
