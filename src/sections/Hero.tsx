import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Leva } from 'leva'
import { HeroContent } from './HeroContent'
import { ServiceOrbit } from './ServiceOrbit'

// Lazy-load the WebGL hero so the rest of the page paints first.
const HeroCanvas = lazy(() => import('@/three/HeroCanvas'))

/** True from the md breakpoint up — where the hero becomes a full-bleed overlay. */
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
  // as you scroll, so the hero stays put a beat longer instead of flying off.
  // Desktop only — on mobile the stage lives in normal flow, so we don't shift it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-near-black md:h-screen md:bg-transparent"
    >
      {/* Dev-only 3D tweak panel. */}
      <Leva collapsed hidden={!import.meta.env.DEV} />

      {/* Mobile-only backdrop behind the copy: on mobile the canvas only covers
          the lower stage, so the text needs its own dark gradient to read on. */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          backgroundImage:
            'radial-gradient(70% 45% at 72% 14%, rgba(31,166,122,0.32), transparent 60%), linear-gradient(160deg, #08120F 0%, #0A1B16 100%)',
        }}
      />

      {/* Copy + CTAs + stats. In normal flow on mobile (sits on top); absolute
          overlay on desktop (the M shows through behind it). */}
      <HeroContent />

      {/* Stage: WebGL M + orbiting service pills. On mobile a contained block in
          flow BELOW the copy; on desktop the full-bleed background. */}
      <motion.div
        style={desktop ? { y: bgY } : undefined}
        className="relative h-[46svh] w-full md:absolute md:inset-0 md:h-auto"
      >
        <div className="absolute inset-0">
          <Suspense fallback={<div className="h-full w-full bg-near-black" />}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Liquid-glass service pills orbiting the M. */}
        <ServiceOrbit />
      </motion.div>
    </section>
  )
}
