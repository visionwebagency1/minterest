import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll setup. We use NATIVE scrolling (no Lenis smooth-scroll): the
 * smooth-scroll momentum fought the pinned services section, which made the
 * scroll overshoot / feel buggy right after it. Native scroll is crisp and
 * works out of the box with GSAP ScrollTrigger.
 *
 * The only thing we do here is re-measure ScrollTrigger after the web fonts have
 * swapped in and after full load, so pinned sections don't jump from font-swap
 * layout shift.
 */
export function useScrollSetup() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(refresh)
    }
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
}
