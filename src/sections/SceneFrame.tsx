import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { M_PATH } from '@/three/mPath'
import {
  BrowserRender,
  BrandingRender,
  VideoRender,
  AiVideoRender,
  SeoRender,
  NetworkRender,
} from './serviceRenders'

/**
 * A filled, near-square scene container for the service pages. The animated
 * "mini-UI" render (same family as the homepage cards) is the main scene and
 * fills the frame edge to edge; a living emerald→mint gradient, a breathing
 * mint glow and 1–2 floating detail badges on different depths make the whole
 * frame feel rich instead of a small element on a dead black panel.
 *
 * Perf: the heavy render is lazy-mounted on first in-view. Reduced-motion stops
 * the breathing glow and the badge float.
 */

const RENDERS = {
  websites: BrowserRender,
  branding: BrandingRender,
  video: VideoRender,
  aivideo: AiVideoRender,
  seo: SeoRender,
  influencer: NetworkRender,
} as const

export type SceneSlug = keyof typeof RENDERS

type Badge = {
  icon: string
  text: string
  /** Tailwind position classes for the corner it sits in. */
  pos: string
  /** Float direction/strength multiplier (parallax depth). */
  depth: number
  /** Optional coloured dot instead of a glyph icon. */
  dot?: string
}

// 1–2 floating detail elements per service, placed in the empty corners so they
// never cover the central scene, drifting at different depths for parallax.
const BADGES: Record<SceneSlug, Badge[]> = {
  websites: [
    { icon: '⚡', text: '100/100', pos: 'left-4 top-4', depth: 1 },
    { icon: '✓', text: 'Live', pos: 'right-4 bottom-4', depth: -1.4 },
  ],
  branding: [
    { icon: '', dot: '#4FD89B', text: 'Mint', pos: 'left-4 top-4', depth: 1.2 },
    { icon: 'Aa', text: 'Satoshi', pos: 'right-4 bottom-4', depth: -1 },
  ],
  video: [
    { icon: '♥', text: '12.4k', pos: 'right-4 top-4', depth: 1 },
    { icon: '▶', text: '2.1M', pos: 'left-4 bottom-4', depth: -1.3 },
  ],
  aivideo: [
    { icon: '✦', text: '4K klaar', pos: 'left-4 top-4', depth: 1.3 },
    { icon: '◷', text: '100%', pos: 'right-4 bottom-4', depth: -1 },
  ],
  seo: [
    { icon: '#', text: '1 in Google', pos: 'right-4 top-4', depth: 1 },
    { icon: '↑', text: '+320%', pos: 'left-4 bottom-4', depth: -1.4 },
  ],
  influencer: [
    { icon: '+', text: '1 verkoop', pos: 'left-4 top-4', depth: 1.2 },
    { icon: '♥', text: '2.4k', pos: 'right-4 bottom-4', depth: -1 },
  ],
}

export function SceneFrame({ slug }: { slug: SceneSlug }) {
  const Render = RENDERS[slug]
  const badges = BADGES[slug]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  // Lazy-mount the render the first time the frame scrolls near the viewport.
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true)
      },
      { rootMargin: '160px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  return (
    <div
      ref={ref}
      className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)] ring-1 ring-mint/10 lg:aspect-[4/3.5]"
    >
      {/* living brand gradient base (kept dark so the light mini-UI pops) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(155deg, #0F5C4D 0%, #0A1F19 52%, #06120F 100%)',
        }}
      />

      {/* breathing mint glow */}
      <motion.div
        className="pointer-events-none absolute left-[18%] top-[8%] h-[64%] w-[64%] rounded-full bg-mint/20 blur-[90px]"
        animate={
          reduce ? undefined : { opacity: [0.32, 0.6, 0.32], scale: [0.9, 1.06, 0.9] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* faint M watermark */}
      <svg
        viewBox="-1.75 -1 3.5 2"
        className="pointer-events-none absolute -right-8 -top-10 h-2/3 opacity-[0.06]"
        aria-hidden="true"
      >
        <path d={M_PATH} transform="scale(1,-1)" fill="#4FD89B" />
      </svg>

      {/* the main scene, scaled to reach toward the edges */}
      <div className="absolute inset-0 grid place-items-center [&>*]:h-full [&>*]:w-full md:[&>*]:scale-[1.06]">
        {seen && <Render />}
      </div>

      {/* floating detail badges (parallax depths) */}
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.pos} z-10 flex items-center gap-1.5 rounded-full border border-white/12 bg-near-black/70 px-3 py-1.5 font-mono text-[11px] font-semibold text-lime-bright shadow-[0_8px_24px_rgba(0,0,0,0.5)]`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { opacity: 1, y: [0, b.depth * -6, 0], x: [0, b.depth * 2, 0] }
          }
          transition={{
            y: { duration: 5 + i * 1.3, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 7 + i * 1.3, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.6, delay: 0.2 + i * 0.15 },
          }}
        >
          {b.dot ? (
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: b.dot, boxShadow: `0 0 8px ${b.dot}` }}
            />
          ) : (
            <span aria-hidden="true">{b.icon}</span>
          )}
          <span className="tabular-nums text-cream/90">{b.text}</span>
        </motion.div>
      ))}

      {/* crisp inner ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
    </div>
  )
}
