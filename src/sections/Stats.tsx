import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Reveal } from '@/components/Reveal'

/**
 * Numbers section — figures count up when they scroll into view.
 * Values are placeholders; swap for real metrics.
 */

const STATS = [
  { to: 50, decimals: 0, suffix: '+', label: 'Projecten opgeleverd' },
  { to: 1.5, decimals: 1, suffix: 'M+', label: 'Mensen bereikt' },
  { to: 5.0, decimals: 1, suffix: '★', label: 'Gem. beoordeling' },
  { to: 4, decimals: 0, suffix: '', label: 'Disciplines in huis' },
]

function CountUp({
  to,
  decimals,
  suffix,
}: {
  to: number
  decimals: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    let start: number | null = null
    const DUR = 1500
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / DUR, 1)
      setVal(to * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="font-display text-5xl font-semibold tracking-tight text-mint md:text-6xl">
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-3 font-sans text-sm uppercase tracking-[0.18em] text-white/45">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
