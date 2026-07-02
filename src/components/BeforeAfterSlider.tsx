import { useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'

/**
 * Draggable before/after image comparison. Both images are rendered at the same
 * aspect ratio; the "before" layer is clipped by a handle you can drag, click or
 * move with the arrow keys. Used high on a case page to show the transformation.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'Voor',
  afterLabel = 'Na',
  className = '',
}: {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const fromClientX = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }

  const onDown = (e: ReactPointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    fromClientX(e.clientX)
  }
  const onMove = (e: ReactPointerEvent) => {
    if (dragging.current) fromClientX(e.clientX)
  }
  const onUp = () => {
    dragging.current = false
  }
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
  }

  return (
    <div
      ref={ref}
      className={`relative touch-none select-none overflow-hidden rounded-3xl shadow-[0_30px_90px_rgba(1,63,64,0.22)] ${className}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      {/* After (full, bottom layer) */}
      <img src={after} alt={afterLabel} draggable={false} className="block aspect-[16/10] w-full object-cover" />

      {/* Before (clipped, top layer) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={beforeLabel} draggable={false} className="block aspect-[16/10] w-full object-cover" />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-near-black/65 px-3 py-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-emerald/85 px-3 py-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-[1.5px] w-[3px] bg-cream/90" />
        <div
          role="slider"
          aria-label="Sleep om voor en na te vergelijken"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKey}
          className="pointer-events-auto absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-cream text-emerald-deep shadow-[0_6px_20px_rgba(0,0,0,0.25)] outline-none ring-emerald/50 focus-visible:ring-2"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-4 6 4 6M15 6l4 6-4 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
