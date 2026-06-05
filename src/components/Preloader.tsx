import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { M_PATH } from '@/three/mPath'

/**
 * Full-screen loading screen. The Minterest M starts empty (just a faint
 * outline) and a liquid white fill rises through it from bottom to top — with a
 * glowing mint "waterline" at the surface — as the progress climbs to 100%,
 * finishing as a clean white logo. Below it: a thin progress bar with the live
 * percentage and the tagline on a single line.
 *
 * The path data (see mPath.ts) is normalised to y-up for Three.js, so we flip
 * it back with scale(1,-1) for SVG's y-down space.
 */

const DURATION_MS = 2300
const VB = { x: -1.8, y: -1.05, w: 3.6, h: 2.1 } // SVG viewBox around the M
const EASE = [0.22, 1, 0.36, 1] as const
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / DURATION_MS, 1)
      setProgress(easeOutCubic(t))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        // Only reveal once the web fonts have actually swapped in, so the hero
        // doesn't flash unstyled text / reflow the moment the preloader lifts.
        const finish = () => setTimeout(onComplete, 400)
        if (typeof document !== 'undefined' && document.fonts?.ready) {
          document.fonts.ready.then(finish)
        } else {
          finish()
        }
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pct = Math.round(progress * 100)
  // Liquid level: rect grows upward from the bottom of the viewBox.
  const fillY = VB.y + VB.h - progress * VB.h
  const filling = progress > 0.01 && progress < 0.995

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-near-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
    >
      {/* soft mint glow behind the mark, brightens as it fills. A radial
          gradient (not a large CSS blur) so it never clips to a visible square
          on mobile GPUs. */}
      <div
        className="pointer-events-none absolute h-[85vmin] w-[85vmin]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(79,216,155,0.30), rgba(79,216,155,0) 72%)',
          opacity: 0.35 + progress * 0.5,
        }}
      />

      <motion.div
        className="relative flex w-[min(80vw,460px)] flex-col items-center gap-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {/* The filling M */}
        <svg
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className="w-full drop-shadow-[0_10px_40px_rgba(79,216,155,0.25)]"
          role="img"
          aria-label="Minterest laadt"
        >
          <defs>
            <clipPath id="m-fill-clip" clipPathUnits="userSpaceOnUse">
              <path d={M_PATH} transform="scale(1,-1)" />
            </clipPath>
            <filter id="m-waterline" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.018" />
            </filter>
          </defs>

          {/* empty outline (always visible) */}
          <path
            d={M_PATH}
            transform="scale(1,-1)"
            fill="none"
            stroke="rgba(244,241,234,0.22)"
            strokeWidth={0.02}
            strokeLinejoin="round"
          />

          {/* liquid white fill + glowing waterline, clipped to the M */}
          <g clipPath="url(#m-fill-clip)">
            <rect
              x={VB.x}
              y={fillY}
              width={VB.w}
              height={progress * VB.h}
              fill="#F4F1EA"
            />
            {filling && (
              <rect
                x={VB.x}
                y={fillY - 0.014}
                width={VB.w}
                height={0.028}
                fill="#7FE3A8"
                filter="url(#m-waterline)"
              />
            )}
          </g>
        </svg>

        {/* progress bar + percentage */}
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-white/12">
            <div
              className="h-full bg-gradient-to-r from-emerald to-lime-accent"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-12 text-right font-display text-lg font-medium tabular-nums text-cream">
            {pct}%
          </span>
        </div>

        {/* tagline — single line */}
        <p className="whitespace-nowrap font-sans text-xs uppercase tracking-[0.28em] text-white/45 sm:tracking-[0.34em]">
          Where interest becomes your growth
        </p>
      </motion.div>
    </motion.div>
  )
}
