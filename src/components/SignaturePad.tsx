import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react'

/**
 * A small, dependency-free signature pad. Draws with mouse or touch on a canvas
 * (retina-crisp) and exposes clear() + toDataURL() through a ref. Calls onChange
 * with whether anything has been drawn yet, so the parent can enable "Verzenden".
 */

export type SignaturePadHandle = {
  clear: () => void
  toDataURL: () => string
  isEmpty: () => boolean
}

export const SignaturePad = forwardRef<SignaturePadHandle, { onChange?: (hasInk: boolean) => void }>(
  function SignaturePad({ onChange }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const drawing = useRef(false)
    const last = useRef<{ x: number; y: number } | null>(null)
    const [hasInk, setHasInk] = useState(false)

    // Size the canvas to its box at device pixel ratio for crisp lines.
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const setup = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 3)
        canvas.width = Math.round(rect.width * dpr)
        canvas.height = Math.round(rect.height * dpr)
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.scale(dpr, dpr)
        ctx.lineWidth = 2.2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = '#013F40'
      }
      setup()
      window.addEventListener('resize', setup)
      return () => window.removeEventListener('resize', setup)
    }, [])

    const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      drawing.current = true
      last.current = pos(e)
    }

    const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!drawing.current) return
      e.preventDefault()
      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx || !last.current) return
      const p = pos(e)
      ctx.beginPath()
      ctx.moveTo(last.current.x, last.current.y)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
      last.current = p
      if (!hasInk) {
        setHasInk(true)
        onChange?.(true)
      }
    }

    const end = () => {
      drawing.current = false
      last.current = null
    }

    const clear = () => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      setHasInk(false)
      onChange?.(false)
    }

    useImperativeHandle(ref, () => ({
      clear,
      isEmpty: () => !hasInk,
      toDataURL: () => canvasRef.current?.toDataURL('image/png') ?? '',
    }))

    return (
      <div className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="h-44 w-full touch-none rounded-xl border border-emerald-deep/15 bg-white"
          style={{ touchAction: 'none' }}
          aria-label="Handtekeningvak"
        />
        {!hasInk && (
          <span className="pointer-events-none absolute inset-0 grid place-items-center font-sans text-sm text-near-black/30">
            Teken hier je handtekening
          </span>
        )}
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 top-2 rounded-lg border border-emerald-deep/12 bg-white/90 px-2.5 py-1 font-sans text-xs font-semibold text-near-black/55 transition-colors hover:text-emerald-deep"
        >
          Wissen
        </button>
      </div>
    )
  },
)
