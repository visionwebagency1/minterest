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
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-2xl bg-[#121A18] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
        <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[#121A18]">
          <span className="font-accent text-3xl italic tracking-wide" style={{ color: GOLD }}>
            Aurum
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/70">
            Studio
          </span>
        </div>
        {/* gold/white palette */}
        <div className="col-span-2 grid grid-cols-4 gap-2">
          {[GOLD, '#E8D9A8', '#FFFFFF', '#121A18'].map((c) => (
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
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#062320] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#062320] to-transparent" />
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
    { x: 16, y: 24, r: 7.5, c: '#F4F4F4', label: 'JK', icon: '♥', val: 312 },
    { x: 84, y: 26, r: 8, c: '#42C28C', label: 'AM', icon: '✦', val: 89 },
    { x: 22, y: 78, r: 7.5, c: '#90EE90', label: 'TS', icon: '↑', val: 1200 },
    { x: 82, y: 74, r: 8, c: '#F4F4F4', label: 'LD', icon: '♥', val: 540 },
  ]

  return (
    <div ref={ref} className="grid h-full w-full place-items-center p-6">
      <div className="relative aspect-square w-full max-w-[20rem]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {profiles.map((n, i) => (
            <motion.line
              key={i}
              x1={center.x} y1={center.y} x2={n.x} y2={n.y}
              stroke="rgba(144,238,144,0.5)" strokeWidth={0.7}
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
            <circle cx={center.x} cy={center.y} r={center.r} fill="#B6F5B6" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} />
            <path d={M_PATH} transform={`translate(${center.x} ${center.y}) scale(2.7,-2.7)`} fill="#013F40" />
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
              <text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="4" fontWeight="700" fill="#013F40" fontFamily="Satoshi, sans-serif">
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

/** 05 — AI video: a prompt is typed and a grid of video frames generates itself
 *  (blur → sharp), each with a scanning sweep, while a progress bar fills. */
export function AiVideoRender() {
  const typed = useTypewriter([
    'productvideo, cinematic…',
    'merkvideo, mintgroen…',
    'reel, energiek…',
  ])
  const frames = [
    'from-emerald-deep to-emerald',
    'from-emerald to-mint',
    'from-mint to-lime-accent',
    'from-emerald-deep to-mint',
  ]
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -9, 0] }} transition={FLOAT(7.5)}>
        {/* prompt bar */}
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-mint/30 bg-[#0A2725] px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <motion.span
            className="text-lime-bright"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            &#10022;
          </motion.span>
          <span className="font-mono text-[10px] text-cream/90">
            {typed}
            <motion.span
              className="ml-px inline-block h-2.5 w-px bg-lime-bright align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </span>
        </div>
        {/* generating frames */}
        <div className="grid grid-cols-2 gap-2.5">
          {frames.map((g, i) => (
            <motion.div
              key={i}
              className={`relative grid aspect-video place-items-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${g}`}
              initial={{ opacity: 0.25, filter: 'blur(6px)' }}
              animate={{
                opacity: [0.25, 1, 1, 0.25],
                filter: ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'],
              }}
              transition={{ duration: 4, times: [0, 0.3, 0.85, 1], repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            >
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-lime-bright/40 to-transparent"
                animate={{ y: ['-120%', '320%'] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
              />
              <span className="relative grid h-7 w-7 place-items-center rounded-full bg-cream/85 text-emerald-deep">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="absolute left-1.5 top-1.5 font-mono text-[7px] text-cream/80">&#10022; AI</span>
            </motion.div>
          ))}
        </div>
        {/* progress */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald to-lime-bright"
              animate={{ width: ['8%', '100%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-mono text-[8px] text-cream/60">genereren</span>
        </div>
      </motion.div>
    </div>
  )
}

/** 07 — Sourcing: a magnifying glass scans a catalog of products from different
 *  suppliers and "finds" the right one on a loop (it lights up green with a
 *  check + price), while incoming items keep arriving. */
export function SourcingRender() {
  const [found, setFound] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFound((f) => (f + 1) % 4), 1700)
    return () => clearInterval(id)
  }, [])

  const items = [
    { g: 'from-emerald-deep to-emerald', price: '€ 12' },
    { g: 'from-emerald to-mint', price: '€ 24' },
    { g: 'from-mint to-lime-accent', price: '€ 9' },
    { g: 'from-emerald-deep to-mint', price: '€ 18' },
  ]
  // magnifier target (in % of the catalog panel) per tile.
  const pos = [
    { x: 30, y: 38 },
    { x: 72, y: 38 },
    { x: 30, y: 76 },
    { x: 72, y: 76 },
  ]

  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div
        className="w-full max-w-[18rem]"
        animate={{ y: [0, -9, 0] }}
        transition={FLOAT(7.5)}
      >
        <div className="relative rounded-2xl border border-white/10 bg-[#0A2725] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          {/* header — supplier feed */}
          <div className="mb-2.5 flex items-center gap-1.5">
            <motion.span
              className="h-2 w-2 rounded-full bg-lime-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-cream/60">
              sourcing
            </span>
            <span className="ml-auto font-mono text-[8px] text-cream/40">4 leveranciers</span>
          </div>

          {/* product grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {items.map((it, i) => {
              const on = found === i
              return (
                <motion.div
                  key={i}
                  className={`relative overflow-hidden rounded-lg border bg-gradient-to-br ${it.g}`}
                  animate={{
                    borderColor: on ? 'rgba(144,238,144,0.9)' : 'rgba(255,255,255,0.1)',
                    scale: on ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* incoming item drops in on a loop */}
                  <motion.div
                    className="grid aspect-[4/3] place-items-center"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="h-6 w-6 rounded-md bg-cream/85 shadow-sm" />
                  </motion.div>
                  {/* found check */}
                  <motion.span
                    className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-lime-accent text-emerald-deep"
                    animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.span>
                  {/* price tag when found */}
                  <motion.span
                    className="absolute bottom-1 left-1 rounded bg-ink/85 px-1 py-px font-mono text-[7px] font-bold text-lime-bright"
                    animate={{ opacity: on ? 1 : 0, y: on ? 0 : 5 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {it.price}
                  </motion.span>
                </motion.div>
              )
            })}
          </div>

          {/* magnifying glass scans to the found tile */}
          <motion.div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
            animate={{ left: `${pos[found].x}%`, top: `${pos[found].y}%` }}
            transition={{ type: 'spring', stiffness: 110, damping: 15 }}
          >
            <motion.svg
              viewBox="0 0 40 40"
              className="h-12 w-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
              animate={{ scale: [1, 1.09, 1] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="17" cy="17" r="11" fill="rgba(182,245,182,0.12)" stroke="#B6F5B6" strokeWidth="2.6" />
              <line x1="25" y1="25" x2="34" y2="34" stroke="#B6F5B6" strokeWidth="3.2" strokeLinecap="round" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

/** 06 — SEO: a search result for "jouwmerk.nl" climbs from #5 to #1 on a loop
 *  (real list reorder), the rest of the results easing aside. */
export function SeoRender() {
  const [rank, setRank] = useState(5)
  useEffect(() => {
    const id = setInterval(() => setRank((r) => (r === 1 ? 5 : r - 1)), 1500)
    return () => clearInterval(id)
  }, [])

  const competitors = ['concurrent-a.nl', 'vergelijk-b.nl', 'shop-c.nl', 'merk-d.nl']
  const rows: { id: string; brand: boolean; d?: string }[] = []
  let ci = 0
  for (let pos = 0; pos < 5; pos++) {
    if (pos === rank - 1) rows.push({ id: 'brand', brand: true })
    else rows.push({ id: competitors[ci], brand: false, d: competitors[ci++] })
  }

  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -9, 0] }} transition={FLOAT(7)}>
        <div className="overflow-hidden rounded-xl bg-cream shadow-[0_36px_80px_rgba(0,0,0,0.5)]">
          {/* search bar */}
          <div className="flex items-center gap-2 border-b border-black/5 bg-black/[0.03] px-3 py-2.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <span className="font-sans text-[10px] text-emerald-deep/75">beste merk bij jou in de buurt</span>
          </div>
          {/* results */}
          <div className="flex flex-col gap-1.5 p-2.5">
            {rows.map((row, i) => (
              <motion.div
                key={row.id}
                layout
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                  row.brand
                    ? 'bg-gradient-to-r from-emerald to-mint shadow-[0_8px_20px_rgba(0,128,129,0.4)]'
                    : 'bg-black/[0.03]'
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md font-mono text-[9px] font-bold ${
                    row.brand ? 'bg-cream text-emerald-deep' : 'bg-black/5 text-emerald-deep/45'
                  }`}
                >
                  {i + 1}
                </span>
                {row.brand ? (
                  <>
                    <span className="h-3 w-3 rounded bg-cream/90" />
                    <span className="font-display text-[10px] font-bold text-cream">jouwmerk.nl</span>
                    <span className="ml-auto flex items-center gap-0.5 font-mono text-[8px] font-bold text-cream">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5M6 11l6-6 6 6" />
                      </svg>
                      stijgt
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald/20" />
                    <span className="font-sans text-[9px] text-emerald-deep/40">{row.d}</span>
                    <span className="ml-auto h-1 w-8 rounded-full bg-emerald-deep/10" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
