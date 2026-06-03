import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { M_PATH } from '@/three/mPath'

/**
 * Animated, crisp "mini-UI" renders for each service card. Each one tells a
 * little story: a site being typed + built, a brand identity coming together,
 * a TikTok-style video rail, and an influencer network.
 */

const FLOAT = (d = 7) => ({ duration: d, repeat: Infinity, ease: 'easeInOut' as const })

/** Looping typewriter for the browser address bar. */
function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    let wi = 0
    let ci = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[wi]
      if (!deleting) {
        ci++
        setText(word.slice(0, ci))
        if (ci === word.length) {
          deleting = true
          timer = setTimeout(tick, 1600)
          return
        }
      } else {
        ci--
        setText(word.slice(0, ci))
        if (ci === 0) {
          deleting = false
          wi = (wi + 1) % words.length
        }
      }
      timer = setTimeout(tick, deleting ? 55 : 110)
    }
    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return text
}

/** 01 — a light browser: the domain is typed and the page builds itself, with
 *  a real nav menu and product text appearing in the blocks. */
export function BrowserRender() {
  const typed = useTypewriter(['jouwwebshop.nl', 'nieuwmerk.nl', 'jouwshop.nl'])
  // staggered "build" reveal that plays when the card scrolls into view
  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 6 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  })
  const products = [
    { g: 'from-mint to-lime-accent', name: 'Sneaker', price: '€ 89' },
    { g: 'from-emerald to-mint', name: 'Jas', price: '€ 129' },
    { g: 'from-emerald-deep to-emerald', name: 'Tas', price: '€ 59' },
  ]
  return (
    <div className="grid h-full w-full place-items-center p-8 [perspective:1200px]">
      <motion.div
        className="w-full max-w-sm [transform-style:preserve-3d]"
        style={{ rotateY: -12, rotateX: 6 }}
        animate={{ y: [0, -9, 0] }}
        transition={FLOAT(7)}
      >
        <div className="overflow-hidden rounded-xl bg-cream shadow-[0_36px_80px_rgba(0,0,0,0.5)]">
          {/* topbar with live address */}
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-black/[0.04] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald/40" />
            <span className="h-2 w-2 rounded-full bg-emerald/25" />
            <span className="h-2 w-2 rounded-full bg-emerald/25" />
            <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white px-2 font-mono text-[9px] text-emerald-deep shadow-inner">
              {typed}
              <motion.span
                className="ml-px inline-block h-2.5 w-px bg-emerald"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            </span>
          </div>
          {/* page builds itself */}
          <div className="bg-cream p-3">
            {/* nav menu */}
            <div className="mb-3 flex items-center justify-between">
              <motion.span {...appear(0.1)} className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-md bg-emerald" />
                <span className="font-display text-[8px] font-bold text-emerald-deep">Merk</span>
              </motion.span>
              <div className="flex gap-2.5">
                {['Home', 'Shop', 'Over'].map((t, i) => (
                  <motion.span
                    key={t}
                    {...appear(0.2 + i * 0.08)}
                    className="font-sans text-[7px] font-medium text-emerald-deep/70"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* hero with headline + button text */}
            <motion.div
              {...appear(0.32)}
              className="flex h-20 flex-col justify-center gap-1.5 rounded-lg bg-gradient-to-br from-emerald to-mint px-3"
            >
              <motion.span {...appear(0.55)} className="font-display text-[10px] font-bold leading-tight text-cream">
                Jouw merk, online.
              </motion.span>
              <motion.span
                {...appear(0.75)}
                className="grid h-4 w-12 place-items-center rounded bg-cream font-sans text-[6px] font-semibold text-emerald-deep"
              >
                Shop nu
              </motion.span>
            </motion.div>
            {/* product grid with names + prices appearing */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {products.map((p, i) => (
                <motion.div
                  key={p.name}
                  {...appear(0.5 + i * 0.12)}
                  className="overflow-hidden rounded-md bg-white shadow-sm"
                >
                  <div className={`h-8 bg-gradient-to-br ${p.g}`} />
                  <div className="space-y-0.5 p-1.5">
                    <motion.span {...appear(0.8 + i * 0.12)} className="block font-sans text-[6px] font-semibold text-emerald-deep">
                      {p.name}
                    </motion.span>
                    <motion.span {...appear(0.9 + i * 0.12)} className="block font-sans text-[6px] text-emerald">
                      {p.price}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** 02 — a gold/white brand identity coming together on a dark tile. */
export function BrandingRender() {
  const GOLD = '#C9A84C'
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div
        className="grid w-full max-w-[20rem] grid-cols-2 gap-3"
        animate={{ y: [0, -9, 0] }}
        transition={FLOAT(8)}
      >
        {/* logo tile — animated gold mark on charcoal */}
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl bg-[#15130E] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-3/5"
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.circle
              cx="50" cy="50" r="30"
              fill="none" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 6, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M35 58 L50 36 L65 58" fill="none" stroke="#FFFFFF" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 1, 1, 0] }}
              transition={{ duration: 6, times: [0, 0.3, 0.6, 0.85, 1], repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="50" cy="50" r="3.5" fill={GOLD} />
          </motion.svg>
          {/* shimmer sweep */}
          <motion.div
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          />
        </div>
        {/* wordmark tile */}
        <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[#15130E]">
          <span className="font-accent text-3xl italic tracking-wide" style={{ color: GOLD }}>
            Aurum
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">
            Studio
          </span>
        </div>
        {/* gold/white palette */}
        <div className="col-span-2 grid grid-cols-4 gap-2">
          {[GOLD, '#E8D9A8', '#FFFFFF', '#15130E'].map((c) => (
            <div
              key={c}
              className="h-10 rounded-lg border border-white/10 shadow-sm"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/** 03 — a TikTok-style rail of vertical videos, auto-scrolling. */
export function VideoRender() {
  const reels = [
    { g: 'from-emerald-deep to-emerald', tag: '@minterest' },
    { g: 'from-emerald to-mint', tag: '@growth' },
    { g: 'from-mint to-lime-accent', tag: '@studio' },
    { g: 'from-emerald-deep to-mint', tag: '@reels' },
  ]
  const rail = [...reels, ...reels]
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden p-6">
      <div className="relative w-full overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#082019] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#082019] to-transparent" />
        <motion.div
          className="flex w-max gap-3"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          {rail.map((r, i) => (
            <div
              key={i}
              className={`relative grid aspect-[9/16] w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br ${r.g} shadow-[0_16px_40px_rgba(0,0,0,0.45)]`}
            >
              <motion.span
                className="grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-emerald-deep"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: (i % 4) * 0.3 }}
              >
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.span>
              {/* caption + likes */}
              <div className="absolute inset-x-1.5 bottom-1.5">
                <span className="block h-1 w-3/4 rounded-full bg-white/70" />
                <span className="mt-1 block h-1 w-1/2 rounded-full bg-white/40" />
              </div>
              <span className="absolute right-1.5 top-1.5 font-mono text-[7px] text-white/80">
                {r.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/** Count up to a target while `run` is true. */
function useCountUp(target: number, run: boolean, duration = 1700) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    let start: number | null = null
    const tick = (now: number) => {
      if (start === null) start = now
      const t = Math.min((now - start) / duration, 1)
      setVal(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])
  return val
}

const fmt = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(1) + 'k' : Math.round(n).toString()

function EngagementBadge({
  icon,
  target,
  run,
  x,
  y,
  big = false,
}: {
  icon: string
  target: number
  run: boolean
  x: number
  y: number
  big?: boolean
}) {
  const v = useCountUp(target, run)
  return (
    <div
      className={`absolute -translate-x-1/2 flex items-center gap-1 rounded-full bg-ink/90 font-mono font-semibold text-lime-bright shadow-[0_6px_16px_rgba(0,0,0,0.5)] ring-1 ring-white/10 ${
        big ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]'
      }`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span>{icon}</span>
      <span className="tabular-nums">{fmt(v)}</span>
    </div>
  )
}

/** 04 — an influencer network: the Minterest M at the centre, profiles around
 *  it, with live-counting likes / comments / views per profile. */
export function NetworkRender() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const center = { x: 50, y: 50, r: 13 }
  const profiles = [
    { x: 16, y: 24, r: 7.5, c: '#F4F1EA', label: 'JK', icon: '♥', val: 312 },
    { x: 84, y: 26, r: 8, c: '#4FD89B', label: 'AM', icon: '✦', val: 89 },
    { x: 22, y: 78, r: 7.5, c: '#7FE3A8', label: 'TS', icon: '↑', val: 1200 },
    { x: 82, y: 74, r: 8, c: '#F4F1EA', label: 'LD', icon: '♥', val: 540 },
  ]

  return (
    <div ref={ref} className="grid h-full w-full place-items-center p-6">
      <div className="relative aspect-square w-full max-w-[20rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {profiles.map((n, i) => (
            <motion.line
              key={i}
              x1={center.x} y1={center.y} x2={n.x} y2={n.y}
              stroke="rgba(127,227,168,0.5)" strokeWidth={0.7}
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* centre node = the Minterest M */}
          <motion.g
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${center.x}px ${center.y}px` }}
          >
            <circle cx={center.x} cy={center.y} r={center.r} fill="#9BF5BE" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} />
            <path d={M_PATH} transform={`translate(${center.x} ${center.y}) scale(2.7,-2.7)`} fill="#0F5C4D" />
          </motion.g>
          {/* profile nodes */}
          {profiles.map((n, i) => (
            <motion.g
              key={i}
              animate={{ scale: [1, 1.09, 1] }}
              transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.35))' }} />
              <text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="4" fontWeight="700" fill="#0F5C4D" fontFamily="Satoshi, sans-serif">
                {n.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* live-counting engagement badges (HTML overlay) */}
        {profiles.map((n, i) => (
          <EngagementBadge key={i} icon={n.icon} target={n.val} run={inView} x={n.x} y={n.y + n.r + 6} />
        ))}
        <EngagementBadge icon="♥" target={2400} run={inView} x={center.x} y={center.y + center.r + 7} big />
      </div>
    </div>
  )
}
