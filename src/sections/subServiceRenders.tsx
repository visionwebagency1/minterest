import { useEffect, useState, type ComponentType } from 'react'
import { motion } from 'motion/react'
import {
  BrowserRender,
  VideoRender,
  AiVideoRender,
  SeoRender,
  NetworkRender,
  SourcingRender,
} from './serviceRenders'

/**
 * Bespoke "service in actie" animations for each sub-service landing page.
 * Designed for a dark teal scene tile (light elements on dark). Where an
 * existing main-service render already tells the right story we reuse it; the
 * rest are built here. Mapped by `${serviceSlug}/${subSlug}`.
 */

const FLOAT = (d = 7) => ({ duration: d, repeat: Infinity, ease: 'easeInOut' as const })
const EASE = [0.22, 1, 0.36, 1] as const

/* ── Design & Branding ───────────────────────────────────────────────── */

/** Visuele identiteit — scattered shapes assemble into a mark, orbit ring. */
function IdentityBuildRender() {
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="relative aspect-square w-full max-w-[18rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {/* orbit ring */}
          <motion.circle
            cx="50" cy="50" r="38" fill="none" stroke="rgba(144,238,144,0.35)" strokeWidth="0.6" strokeDasharray="2 4"
            animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <motion.circle
            cx="88" cy="50" r="2.4" fill="#B6F5B6"
            animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />
          {/* shapes assembling toward the centre mark */}
          <motion.rect
            x="44" y="44" width="12" height="12" rx="2" fill="#008081"
            animate={{ x: [12, 44, 44, 12], y: [16, 44, 44, 16], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: EASE }}
          />
          <motion.circle
            cx="50" cy="50" r="6" fill="#42C28C"
            animate={{ cx: [82, 50, 50, 82], cy: [78, 50, 50, 78], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, times: [0, 0.45, 0.8, 1], repeat: Infinity, ease: EASE }}
          />
          <motion.path
            d="M50 40 L58 56 L42 56 Z" fill="#90EE90"
            animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
            transition={{ duration: 6, times: [0, 0.5, 0.8, 1], repeat: Infinity, ease: EASE }}
            style={{ transformOrigin: '50px 50px' }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-2 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-cream/40">
          identiteit
        </div>
      </motion.div>
    </div>
  )
}

/** Packaging — a flat dieline folds into a 3D box, rotating. */
function PackagingFoldRender() {
  return (
    <div className="grid h-full w-full place-items-center p-8 [perspective:900px]">
      <motion.div
        className="relative h-32 w-32 [transform-style:preserve-3d]"
        animate={{ rotateX: [12, 12], rotateY: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        {/* cube faces */}
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-emerald to-mint shadow-[0_20px_50px_rgba(0,0,0,0.5)] [transform:translateZ(64px)]" />
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-emerald-deep to-emerald [transform:rotateY(180deg)translateZ(64px)]" />
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-mint to-lime-accent [transform:rotateY(90deg)translateZ(64px)]" />
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-emerald to-lime-accent [transform:rotateY(-90deg)translateZ(64px)]" />
        <span className="absolute inset-0 grid place-items-center rounded-md bg-gradient-to-br from-lime-accent to-mint [transform:rotateX(90deg)translateZ(64px)]">
          <svg viewBox="6.5 6.5 56 31" className="h-8 w-12 opacity-80"><path d="M 61.09 25.2 C 59.24 27.59 54 34.36 52.44 36.37 C 52.19 36.7 51.8 36.89 51.38 36.89 L 45.6 36.89 C 44.48 36.89 43.84 35.6 44.53 34.71 C 47.48 30.9 53.39 23.27 55.43 20.63 C 55.8 20.14 55.8 19.46 55.43 18.98 L 54.05 17.2 C 53.52 16.5 52.46 16.5 51.92 17.2 C 48.07 22.18 40.31 32.2 37.09 36.37 C 36.83 36.7 36.44 36.89 36.02 36.89 L 28.31 36.89 C 27.19 36.89 26.55 35.59 27.25 34.71 L 34.14 25.8 C 34.52 25.31 34.52 24.63 34.14 24.14 L 32.06 21.45 C 31.52 20.75 30.46 20.75 29.93 21.45 L 18.38 36.36 C 18.12 36.7 17.73 36.89 17.31 36.89 L 9.6 36.89 C 8.48 36.89 7.85 35.59 8.54 34.7 L 25.43 12.89 C 25.97 12.19 27.02 12.19 27.56 12.89 C 29.64 15.57 32.72 19.55 34.79 22.21 C 35.32 22.91 36.38 22.91 36.92 22.21 L 47.43 8.64 C 47.97 7.94 49.02 7.94 49.56 8.64 C 53.11 13.22 57.65 19.08 61.1 23.54 C 61.48 24.02 61.48 24.71 61.1 25.2 Z" fill="#013F40" /></svg>
        </span>
        <span className="absolute inset-0 rounded-md bg-gradient-to-br from-emerald-deep to-mint [transform:rotateX(-90deg)translateZ(64px)]" />
      </motion.div>
    </div>
  )
}

/** Social Media Visual System — a 3x3 grid of posts fills and aligns. */
function SocialGridRender() {
  const tiles = Array.from({ length: 9 })
  const grads = ['from-emerald-deep to-emerald', 'from-emerald to-mint', 'from-mint to-lime-accent']
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="grid w-full max-w-[17rem] grid-cols-3 gap-2.5" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        {tiles.map((_, i) => (
          <motion.div
            key={i}
            className={`relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${grads[i % 3]} border border-white/10`}
            initial={{ opacity: 0.2, scale: 0.85 }}
            animate={{ opacity: [0.2, 1, 1, 0.2], scale: [0.85, 1, 1, 0.85] }}
            transition={{ duration: 5, times: [0, 0.3, 0.85, 1], repeat: Infinity, delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.25, ease: EASE }}
          >
            <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cream/80" />
            <span className="absolute inset-x-1.5 bottom-1.5 h-0.5 rounded-full bg-cream/40" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/** Complete Branding — brand elements converge onto a board. */
function BrandBoardRender() {
  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.6, delay, ease: EASE, repeat: Infinity, repeatType: 'reverse' as const, repeatDelay: 2.4 },
  })
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="grid w-full max-w-[20rem] grid-cols-3 gap-2.5" animate={{ y: [0, -8, 0] }} transition={FLOAT(8.5)}>
        <motion.div {...appear(0.1)} className="col-span-2 grid aspect-[2/1] place-items-center rounded-xl bg-gradient-to-br from-emerald to-mint">
          <span className="font-display text-lg font-bold text-cream">Merk</span>
        </motion.div>
        <motion.div {...appear(0.25)} className="grid aspect-square place-items-center rounded-xl border border-white/10 bg-[#0A2725]">
          <span className="font-accent text-xl italic text-lime-accent">Aa</span>
        </motion.div>
        <motion.div {...appear(0.4)} className="col-span-3 grid grid-cols-5 gap-1.5">
          {['#013F40', '#008081', '#42C28C', '#90EE90', '#B6F5B6'].map((c) => (
            <span key={c} className="h-8 rounded-md" style={{ backgroundColor: c }} />
          ))}
        </motion.div>
        <motion.div {...appear(0.55)} className="col-span-3 space-y-1.5 rounded-xl border border-white/10 bg-[#0A2725] p-3">
          <span className="block h-1.5 w-3/4 rounded-full bg-cream/70" />
          <span className="block h-1.5 w-1/2 rounded-full bg-cream/40" />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── Web Development ─────────────────────────────────────────────────── */

/** Webshops — a product grid fills while a cart counter ticks up. */
function WebshopRender() {
  const [cart, setCart] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCart((c) => (c >= 6 ? 0 : c + 1)), 900)
    return () => clearInterval(id)
  }, [])
  const products = [
    { g: 'from-mint to-lime-accent', p: '€ 39' },
    { g: 'from-emerald to-mint', p: '€ 59' },
    { g: 'from-emerald-deep to-emerald', p: '€ 29' },
    { g: 'from-emerald to-lime-accent', p: '€ 79' },
  ]
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="overflow-hidden rounded-xl bg-cream shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between border-b border-black/5 bg-black/[0.04] px-3 py-2.5">
            <span className="font-display text-[10px] font-bold text-emerald-deep">Shop</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-full bg-emerald text-cream">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12L6 6Z" /><path d="M6 6 5 3H3" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
              <motion.span key={cart} className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-lime-accent font-mono text-[8px] font-bold text-emerald-deep" initial={{ scale: 0.4 }} animate={{ scale: 1 }}>
                {cart}
              </motion.span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {products.map((p, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, 8] }}
                transition={{ duration: 5, times: [0, 0.2, 0.9, 1], repeat: Infinity, delay: i * 0.2, ease: EASE }}
              >
                <div className={`h-12 bg-gradient-to-br ${p.g}`} />
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="font-sans text-[7px] font-semibold text-emerald-deep">Item</span>
                  <span className="font-sans text-[7px] text-emerald">{p.p}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** Applicaties — a dashboard loads bars + a live counting metric. */
function DashboardRender() {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setVal((v) => (v >= 100 ? 0 : v + 4)), 90)
    return () => clearInterval(id)
  }, [])
  const bars = [40, 70, 55, 90, 65, 80]
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="rounded-xl border border-white/10 bg-[#0A2725] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/50">dashboard</span>
            <span className="font-mono text-base font-bold tabular-nums text-lime-bright">{val}%</span>
          </div>
          <div className="flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-emerald to-mint"
                initial={{ height: '10%' }}
                animate={{ height: [`10%`, `${h}%`, `${h}%`, `10%`] }}
                transition={{ duration: 4, times: [0, 0.35, 0.85, 1], repeat: Infinity, delay: i * 0.12, ease: EASE }}
              />
            ))}
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-mint to-lime-bright" animate={{ width: ['10%', '100%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** Software — modules connect into a system. */
function SoftwareModulesRender() {
  const nodes = [
    { x: 26, y: 30 }, { x: 74, y: 26 }, { x: 50, y: 52 }, { x: 28, y: 74 }, { x: 76, y: 72 },
  ]
  const links: [number, number][] = [[0, 2], [1, 2], [2, 3], [2, 4], [0, 1]]
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="relative aspect-square w-full max-w-[18rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {links.map(([a, b], i) => (
            <motion.line
              key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(144,238,144,0.5)" strokeWidth="0.7"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
              transition={{ duration: 5, times: [0, 0.4, 0.85, 1], repeat: Infinity, delay: i * 0.3, ease: EASE }}
            />
          ))}
          {nodes.map((n, i) => (
            <motion.g key={i} animate={{ scale: [0.8, 1, 1, 0.8] }} transition={{ duration: 5, times: [0, 0.4, 0.85, 1], repeat: Infinity, delay: i * 0.25, ease: EASE }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
              <rect x={n.x - 7} y={n.y - 5} width="14" height="10" rx="2.5" fill="url(#mod)" />
            </motion.g>
          ))}
          <defs>
            <linearGradient id="mod" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#008081" /><stop offset="1" stopColor="#90EE90" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
}

/* ── Video & Fotografie ──────────────────────────────────────────────── */

/** Short video content — film frames slide along a timeline, captions pop. */
function ShortVideoRender() {
  const frames = ['from-emerald-deep to-emerald', 'from-emerald to-mint', 'from-mint to-lime-accent', 'from-emerald to-lime-accent']
  const rail = [...frames, ...frames]
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden p-7">
      <motion.div className="w-full" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#062320] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#062320] to-transparent" />
          <motion.div className="flex w-max gap-2.5" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
            {rail.map((g, i) => (
              <div key={i} className={`relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${g}`}>
                <span className="absolute inset-x-1.5 bottom-1.5 rounded bg-ink/70 px-1 py-0.5 font-mono text-[7px] text-cream/90">caption</span>
              </div>
            ))}
          </motion.div>
        </div>
        {/* timeline */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-lime-accent" />
          <div className="relative h-1 flex-1 rounded-full bg-white/10">
            <motion.span className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-lime-bright shadow" animate={{ left: ['0%', '100%', '0%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** Fotoshoots — a camera aperture opens and focuses. */
function ApertureRender() {
  const blades = Array.from({ length: 6 })
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="relative aspect-square w-full max-w-[15rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="44" fill="#0A2725" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <motion.g animate={{ rotate: [0, 30, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '50px 50px' }}>
            {blades.map((_, i) => (
              <motion.path
                key={i}
                d="M50 50 L50 8 A42 42 0 0 1 86 29 Z"
                fill={i % 2 ? '#008081' : '#013F40'}
                opacity="0.92"
                transform={`rotate(${i * 60} 50 50)`}
                animate={{ scale: [1, 0.62, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '50px 50px' }}
              />
            ))}
          </motion.g>
          <motion.circle cx="50" cy="50" r="10" fill="#B6F5B6" animate={{ r: [10, 16, 10], opacity: [0.9, 1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        </svg>
      </motion.div>
    </div>
  )
}

/* ── Social Media ────────────────────────────────────────────────────── */

/** Meta Ads — a feed scrolls; a sponsored post lights up and ticks clicks. */
function MetaFeedRender() {
  const [clicks, setClicks] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setClicks((c) => (c >= 240 ? 0 : c + 12)), 260)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-[15rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="overflow-hidden rounded-xl bg-cream shadow-[0_28px_64px_rgba(0,0,0,0.5)]">
          <div className="space-y-2 p-2.5">
            <div className="rounded-lg bg-black/[0.04] p-2">
              <span className="block h-1.5 w-1/2 rounded-full bg-emerald-deep/20" />
              <span className="mt-1.5 block h-8 rounded bg-emerald-deep/10" />
            </div>
            {/* sponsored post */}
            <motion.div
              className="relative rounded-lg border-2 p-2"
              animate={{ borderColor: ['rgba(0,128,129,0.15)', 'rgba(0,128,129,0.9)', 'rgba(0,128,129,0.15)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-mono text-[7px] uppercase tracking-wider text-emerald">gesponsord</span>
              <div className="mt-1 h-10 rounded bg-gradient-to-br from-emerald to-mint" />
              <div className="mt-1.5 flex items-center justify-between">
                <span className="rounded bg-emerald px-2 py-0.5 font-sans text-[7px] font-bold text-cream">Shop nu</span>
                <span className="font-mono text-[8px] font-bold tabular-nums text-emerald-deep">{clicks} kliks</span>
              </div>
            </motion.div>
            <div className="rounded-lg bg-black/[0.04] p-2">
              <span className="block h-1.5 w-2/3 rounded-full bg-emerald-deep/20" />
              <span className="mt-1.5 block h-8 rounded bg-emerald-deep/10" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** Google Ads — a search bar with an ad appearing on top, clicks ticking. */
function GoogleAdsRender() {
  const [clicks, setClicks] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setClicks((c) => (c >= 180 ? 0 : c + 9)), 240)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="overflow-hidden rounded-xl bg-cream shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 border-b border-black/5 bg-black/[0.03] px-3 py-2.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-emerald" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <span className="font-sans text-[10px] text-emerald-deep/70">jouw dienst bij jou in de buurt</span>
          </div>
          <div className="space-y-2 p-3">
            <motion.div
              className="rounded-lg bg-gradient-to-r from-emerald to-mint p-2.5 shadow-[0_8px_20px_rgba(0,128,129,0.35)]"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: [0, 1, 1], y: [-6, 0, 0] }}
              transition={{ duration: 4, times: [0, 0.25, 1], repeat: Infinity, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-cream px-1.5 py-0.5 font-mono text-[7px] font-bold text-emerald-deep">Ad</span>
                <span className="font-mono text-[8px] font-bold tabular-nums text-cream">{clicks} kliks</span>
              </div>
              <span className="mt-1.5 block font-display text-[10px] font-bold text-cream">jouwmerk.nl</span>
            </motion.div>
            {['concurrent-a.nl', 'vergelijk-b.nl'].map((d) => (
              <div key={d} className="rounded-lg bg-black/[0.03] px-2.5 py-2">
                <span className="font-sans text-[9px] text-emerald-deep/40">{d}</span>
                <span className="mt-1 block h-1 w-3/4 rounded-full bg-emerald-deep/10" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Extra diensten ──────────────────────────────────────────────────── */

/** AI Agents — nodes connect and pulse like a brain. */
function AiBrainRender() {
  const nodes = [
    { x: 50, y: 50, r: 9 },
    { x: 24, y: 30, r: 5 }, { x: 76, y: 28, r: 5 }, { x: 20, y: 66, r: 4.5 },
    { x: 80, y: 68, r: 5 }, { x: 50, y: 18, r: 4 }, { x: 50, y: 84, r: 4.5 },
  ]
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="relative aspect-square w-full max-w-[18rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {nodes.slice(1).map((n, i) => (
            <motion.line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(144,238,144,0.45)" strokeWidth="0.6"
              animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
          {nodes.map((n, i) => (
            <motion.circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i === 0 ? '#B6F5B6' : '#42C28C'}
              animate={{ r: [n.r, n.r * 1.25, n.r], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

/** Administratie — document rows order themselves and get checked off. */
function AdminRender() {
  const rows = [0, 1, 2, 3, 4]
  return (
    <div className="grid h-full w-full place-items-center p-7">
      <motion.div className="w-full max-w-sm" animate={{ y: [0, -8, 0] }} transition={FLOAT(7.5)}>
        <div className="rounded-xl border border-white/10 bg-cream p-3.5 shadow-[0_28px_64px_rgba(0,0,0,0.5)]">
          <div className="mb-2.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-emerald-deep/60">administratie</span>
          </div>
          <div className="space-y-2">
            {rows.map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-black/[0.04] px-2.5 py-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2, ease: EASE, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2.2 }}
              >
                <motion.span
                  className="grid h-4 w-4 place-items-center rounded-full bg-emerald text-cream"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.2, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 2.4 }}
                >
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </motion.span>
                <span className="h-1.5 flex-1 rounded-full bg-emerald-deep/15" />
                <span className="h-1.5 w-10 rounded-full bg-emerald/30" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** Detachering — profiles slide to the open slot and click in. */
function PlacementRender() {
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    const id = setInterval(() => setFilled((f) => !f), 1900)
    return () => clearInterval(id)
  }, [])
  const people = ['#90EE90', '#42C28C', '#B6F5B6']
  return (
    <div className="grid h-full w-full place-items-center p-8">
      <motion.div className="w-full max-w-[18rem]" animate={{ y: [0, -8, 0] }} transition={FLOAT(8)}>
        <div className="flex items-center justify-between gap-3">
          {/* candidates */}
          <div className="flex flex-col gap-2.5">
            {people.map((c, i) => (
              <motion.span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: c }}
                animate={i === 0 ? { x: filled ? 120 : 0, opacity: filled ? 0 : 1 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-deep" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0Z" /></svg>
              </motion.span>
            ))}
          </div>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-mint" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          {/* open slot */}
          <motion.div
            className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-dashed"
            animate={{ borderColor: filled ? 'rgba(144,238,144,0.9)' : 'rgba(255,255,255,0.25)', backgroundColor: filled ? 'rgba(144,238,144,0.12)' : 'rgba(255,255,255,0.02)' }}
            transition={{ duration: 0.4 }}
          >
            <motion.span className="grid h-9 w-9 place-items-center rounded-full bg-lime-accent" animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 14, delay: filled ? 0.15 : 0 }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-deep" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0Z" /></svg>
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── map: `${serviceSlug}/${subSlug}` → render ───────────────────────── */

export const SUB_RENDER_BY_KEY: Record<string, ComponentType> = {
  'design-branding/visuele-identiteit': IdentityBuildRender,
  'design-branding/packaging': PackagingFoldRender,
  'design-branding/social-media-visual-system': SocialGridRender,
  'design-branding/complete-branding': BrandBoardRender,

  'web-development/websites': BrowserRender,
  'web-development/webshops': WebshopRender,
  'web-development/applicaties': DashboardRender,
  'web-development/software': SoftwareModulesRender,

  'video-fotografie/short-video-content': ShortVideoRender,
  'video-fotografie/ai-video-content': AiVideoRender,
  'video-fotografie/fotoshoots': ApertureRender,

  'social-media/influencer-marketing': NetworkRender,
  'social-media/meta-ads': MetaFeedRender,
  'social-media/tiktok-ads': VideoRender,

  'seo-sea/seo': SeoRender,
  'seo-sea/google-ads': GoogleAdsRender,

  'extra/ai-agents': AiBrainRender,
  'extra/administratie': AdminRender,
  'extra/sourcing': SourcingRender,
  'extra/detachering': PlacementRender,
}
