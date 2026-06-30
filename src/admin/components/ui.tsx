import type { ReactNode } from 'react'

/** Small shared building blocks for the admin pages: headings, cards, states. */

export function PageHeading({
  kicker,
  title,
  actions,
}: {
  kicker?: string
  title: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && (
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-emerald">
            {kicker}
          </span>
        )}
        <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-near-black md:text-3xl">
          {title}
        </h1>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-emerald-deep/10 bg-white shadow-[0_12px_40px_rgba(1,63,64,0.05)] ${className}`}
    >
      {children}
    </div>
  )
}

const TONES: Record<string, string> = {
  emerald: 'bg-emerald/12 text-emerald-deep',
  slate: 'bg-near-black/8 text-near-black/60',
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-lime-accent/25 text-emerald-deep',
  red: 'bg-red-100 text-red-700',
}

export function StatusPill({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-semibold ${
        TONES[tone] ?? TONES.slate
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-deep/15 bg-white/50 px-6 py-16 text-center">
      <p className="font-display text-lg font-semibold text-near-black">{title}</p>
      {hint && <p className="mt-2 max-w-sm font-sans text-sm text-near-black/55">{hint}</p>}
    </div>
  )
}

export function Spinner({ label = 'Laden' }: { label?: string }) {
  return (
    <div className="grid place-items-center py-20">
      <span
        className="h-6 w-6 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald"
        aria-label={label}
      />
    </div>
  )
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
      {message}
    </div>
  )
}
