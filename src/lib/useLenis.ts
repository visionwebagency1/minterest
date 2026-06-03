import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * App-wide smooth scrolling via Lenis.
 * Mounted once at the App root. Runs Lenis on rAF and exposes the
 * instance on `window.__lenis` so other modules (GSAP ScrollTrigger,
 * anchor links) can hook into it later.
 */
export function useLenis() {
  useEffect(() => {
    // lerp-mode (frame-rate independent) feels smoother & more responsive
    // than duration/easing, which restarts the tween on every wheel tick.
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: true,
      touchMultiplier: 1.5,
    })

    // expose for later integrations (anchor links, etc.)
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    // Drive Lenis from GSAP's single ticker (instead of a separate rAF loop)
    // and feed scroll updates to ScrollTrigger. One clock = no fighting loops,
    // so pinned/scrubbed sections track the smooth scroll without jitter.
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])
}
