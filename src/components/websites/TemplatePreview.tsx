import type { TemplateLayout, TemplatePalette } from '@/data/websiteTemplates'

/**
 * A drawn miniature of a template: a small vector website in the template's own
 * palette. Used in the hero mockups and in the gallery until the real templates
 * exist (phase 1 of the websites platform).
 *
 * Vector instead of screenshots on purpose: it stays razor sharp at any size,
 * costs no image requests on a page that already has to load fast, and every
 * template reads as a distinct design rather than the same grey wireframe.
 */

const VIEWBOX = { w: 480, h: 360 }

/** Text is drawn as rounded bars, at the weight a real line of copy would have. */
function Line({ x, y, w, h = 6, fill, opacity = 1 }: {
  x: number
  y: number
  w: number
  h?: number
  fill: string
  opacity?: number
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={opacity} />
}

function Panel({ x, y, w, h, fill, r = 8, opacity = 1 }: {
  x: number
  y: number
  w: number
  h: number
  fill: string
  r?: number
  opacity?: number
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} opacity={opacity} />
}

/** The strip every layout shares: wordmark, a few links and a call-to-action. */
function Nav({ p }: { p: TemplatePalette }) {
  return (
    <g>
      <Panel x={28} y={26} w={34} h={10} r={3} fill={p.accent} />
      <Line x={300} y={29} w={28} h={5} fill={p.ink} opacity={0.45} />
      <Line x={338} y={29} w={28} h={5} fill={p.ink} opacity={0.45} />
      <Line x={376} y={29} w={28} h={5} fill={p.ink} opacity={0.45} />
      <Panel x={414} y={22} w={38} h={18} r={9} fill={p.accent} opacity={0.18} />
    </g>
  )
}

function Split({ p }: { p: TemplatePalette }) {
  return (
    <g>
      <Line x={28} y={86} w={64} h={5} fill={p.accent} />
      <Line x={28} y={106} w={180} h={15} fill={p.ink} opacity={0.9} />
      <Line x={28} y={130} w={140} h={15} fill={p.ink} opacity={0.9} />
      <Line x={28} y={164} w={168} h={6} fill={p.ink} opacity={0.35} />
      <Line x={28} y={178} w={132} h={6} fill={p.ink} opacity={0.35} />
      <Panel x={28} y={202} w={92} h={26} r={13} fill={p.accent} />
      <Panel x={252} y={80} w={200} h={160} r={14} fill={p.muted} />
      <circle cx={318} cy={140} r={26} fill={p.accent} opacity={0.5} />
      <Panel x={282} y={178} w={140} h={8} r={4} fill={p.ink} opacity={0.12} />
      {[28, 184, 340].map((x) => (
        <g key={x}>
          <Panel x={x} y={266} w={112} h={62} r={10} fill={p.muted} opacity={0.75} />
          <Line x={x + 14} y={284} w={52} h={6} fill={p.ink} opacity={0.55} />
          <Line x={x + 14} y={300} w={78} h={5} fill={p.ink} opacity={0.28} />
        </g>
      ))}
    </g>
  )
}

function Centered({ p }: { p: TemplatePalette }) {
  return (
    <g>
      <Line x={196} y={80} w={88} h={5} fill={p.accent} />
      <Line x={104} y={102} w={272} h={17} fill={p.ink} opacity={0.9} />
      <Line x={148} y={128} w={184} h={17} fill={p.ink} opacity={0.9} />
      <Line x={140} y={162} w={200} h={6} fill={p.ink} opacity={0.32} />
      <Panel x={194} y={186} w={92} h={26} r={13} fill={p.accent} />
      <Panel x={28} y={232} w={424} h={96} r={14} fill={p.muted} />
      <circle cx={240} cy={280} r={22} fill={p.accent} opacity={0.45} />
      <Line x={150} y={314} w={180} h={6} fill={p.ink} opacity={0.14} />
    </g>
  )
}

function Grid({ p }: { p: TemplatePalette }) {
  return (
    <g>
      <Panel x={28} y={62} w={424} h={104} r={14} fill={p.muted} />
      <Line x={48} y={92} w={150} h={14} fill={p.ink} opacity={0.75} />
      <Line x={48} y={116} w={104} h={6} fill={p.ink} opacity={0.35} />
      <Panel x={48} y={132} w={76} h={20} r={10} fill={p.accent} />
      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => {
          const x = 28 + col * 146
          const y = 190 + row * 76
          return (
            <g key={`${col}-${row}`}>
              <Panel x={x} y={y} w={132} h={48} r={9} fill={p.muted} opacity={0.8} />
              <circle cx={x + 24} cy={y + 24} r={11} fill={p.accent} opacity={0.5} />
              <Line x={x + 44} y={y + 18} w={62} h={6} fill={p.ink} opacity={0.5} />
              <Line x={x + 44} y={y + 31} w={40} h={5} fill={p.ink} opacity={0.25} />
            </g>
          )
        }),
      )}
    </g>
  )
}

function Editorial({ p }: { p: TemplatePalette }) {
  return (
    <g>
      <Panel x={28} y={72} w={216} h={176} r={14} fill={p.muted} />
      <circle cx={136} cy={150} r={34} fill={p.accent} opacity={0.42} />
      <Line x={272} y={84} w={54} h={5} fill={p.accent} />
      <Line x={272} y={104} w={168} h={16} fill={p.ink} opacity={0.9} />
      <Line x={272} y={128} w={124} h={16} fill={p.ink} opacity={0.9} />
      <Line x={272} y={162} w={172} h={6} fill={p.ink} opacity={0.32} />
      <Line x={272} y={176} w={148} h={6} fill={p.ink} opacity={0.32} />
      <Line x={272} y={190} w={110} h={6} fill={p.ink} opacity={0.32} />
      <Panel x={272} y={214} w={84} h={24} r={12} fill={p.accent} />
      <Line x={28} y={280} w={300} h={9} fill={p.ink} opacity={0.6} />
      <Line x={28} y={300} w={210} h={9} fill={p.ink} opacity={0.6} />
      <Panel x={356} y={272} w={96} h={56} r={10} fill={p.muted} />
    </g>
  )
}

const LAYOUTS: Record<TemplateLayout, (props: { p: TemplatePalette }) => JSX.Element> = {
  split: Split,
  centered: Centered,
  grid: Grid,
  editorial: Editorial,
}

export function TemplatePreview({
  layout,
  palette,
  className = '',
  title,
}: {
  layout: TemplateLayout
  palette: TemplatePalette
  className?: string
  /** Accessible name. Omit inside a frame that already names the template. */
  title?: string
}) {
  const Layout = LAYOUTS[layout]
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={VIEWBOX.w} height={VIEWBOX.h} fill={palette.bg} />
      <Nav p={palette} />
      <Layout p={palette} />
    </svg>
  )
}

/**
 * Browser chrome around a preview, so a template reads as a real website instead
 * of an illustration.
 */
export function BrowserFrame({
  children,
  domain = 'jouwbedrijf.nl',
  className = '',
}: {
  children: React.ReactNode
  domain?: string
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0D1A18] shadow-[0_30px_80px_rgba(1,25,24,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 truncate rounded-full bg-white/10 px-3 py-1 font-sans text-[10px] text-cream/50">
          {domain}
        </span>
      </div>
      {children}
    </div>
  )
}
