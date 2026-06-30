import { PageHeading } from '../components/ui'

/** Placeholder for sections that arrive in a later step of this build. */
export function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <PageHeading title={title} />
      <div className="grid place-items-center rounded-2xl border border-dashed border-emerald-deep/15 bg-white/50 px-6 py-20 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald/10 text-emerald-deep">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-near-black">Komt eraan</p>
        <p className="mt-2 max-w-sm font-sans text-sm text-near-black/55">{note}</p>
      </div>
    </>
  )
}
