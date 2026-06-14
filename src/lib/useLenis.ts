import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth scroll, done the official way so it never fights the pinned services
 * section (the old jank): Lenis drives the page, GSAP's single ticker drives
 * Lenis (no second RAF loop), and every Lenis scroll tick calls
 * ScrollTrigger.update so pins/scrubs stay perfectly in sync. We refresh
 * ScrollTrigger after fonts swap and after full load so font-swap layout shift
 * never leaves a pin measured against the wrong height.
 *
 * The Lenis instance is exposed on window.__lenis so anchor links and the
 * clickable hero pills can do a smooth, momentum-correct scrollTo.
 */

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function useScrollSetup() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      // A touch of smoothing, not heavy momentum: enough to feel premium,
      // little enough that the pinned section never overshoots.
      lerp: reduce ? 1 : 0.12,
      smoothWheel: !reduce,
      // Native touch scrolling on mobile (Lenis wheel-smoothing is desktop-only
      // here) keeps the carousel + page feeling crisp and avoids touch conflicts.
      syncTouch: false,
    })
    window.__lenis = lenis

    // Keep ScrollTrigger in lockstep with Lenis on every scroll tick.
    lenis.on('scroll', ScrollTrigger.update)

    // ONE rAF loop: GSAP's ticker drives Lenis. No separate requestAnimationFrame.
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Re-measure once fonts have swapped and once everything has loaded.
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}

/** Smooth-scroll to an element / selector / offset, via Lenis when available. */
export function lenisScrollTo(
  target: string | number | HTMLElement,
  opts?: { offset?: number; duration?: number },
) {
  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: opts?.offset ?? 0, duration: opts?.duration })
    return
  }
  // Fallback: native scroll.
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    const el =
      typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
