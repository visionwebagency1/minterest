import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTENT_PAGES } from '@/content/registry'
import { fetchPageOverrides, pageDraftState } from '../data/content'
import { formatDate } from '../lib/format'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'

/** Website content overview: every editable page with its draft status. */
type PageState = { page: string; title: string; draftCount: number; lastPublished: string | null }

export function AdminContent() {
  const [pages, setPages] = useState<PageState[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    Promise.all(
      CONTENT_PAGES.map(async (p) => {
        const overrides = await fetchPageOverrides(p.page)
        const { draftCount, lastPublished } = pageDraftState(overrides)
        return { page: p.page, title: p.title, draftCount, lastPublished }
      }),
    )
      .then((rows) => active && setPages(rows))
      .catch((e) => active && setError(e?.message ?? 'Kon de content niet laden.'))
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeading kicker="Website content" title="Website content" />
      <p className="-mt-4 mb-6 max-w-xl font-sans text-sm text-near-black/55">
        Pas de teksten en foto's van de site aan. Wijzigingen worden als concept opgeslagen en gaan pas live als je
        op Publiceren klikt.
      </p>

      {error && <ErrorNote message={error} />}
      {!pages && !error && <Spinner />}

      {pages && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {pages.map((p) => (
            <Link
              key={p.page}
              to={`/admin/content/${p.page}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald/12 text-emerald-deep">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16M4 12h16M4 19h10" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-semibold text-near-black">{p.title}</p>
                <p className="font-sans text-xs text-near-black/50">
                  {p.lastPublished ? `Laatst gepubliceerd ${formatDate(p.lastPublished)}` : 'Nog niet gepubliceerd'}
                </p>
              </div>
              {p.draftCount > 0 && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 font-sans text-xs font-semibold text-amber-700">
                  {p.draftCount} concept
                </span>
              )}
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-near-black/30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </Card>
      )}
    </>
  )
}
