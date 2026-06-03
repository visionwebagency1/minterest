import { useEffect, useState } from 'react'

/**
 * Heuristic detection of weak / mobile devices so the hero can fall back to
 * a lighter scene (no MeshTransmissionMaterial, no particles).
 * Conservative: defaults to "capable" and only flips to low-power on clear signals.
 */
export function useIsLowPower(): boolean {
  const [low, setLow] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || ''
    const mobile = /Mobi|Android|iPhone|iPad|iPod|Tablet/i.test(ua)
    const cores = navigator.hardwareConcurrency ?? 8
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setLow(mobile || cores <= 4 || mem <= 4 || reduced)
  }, [])

  return low
}
