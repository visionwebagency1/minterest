import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPage } from '@/content/registry'
import type { ContentField } from '@/content/types'
import {
  discardField,
  discardPage,
  fetchPageOverrides,
  publishPage,
  saveDraft,
  uploadImage,
  type ContentRow,
} from '../data/content'
import { formatDateTime } from '../lib/format'
import { GhostButton, PrimaryButton } from '../components/form'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'

/**
 * Editor for one page's content. Every field shows the current value (draft, or
 * else published, or else the built-in default). Edits auto-save as a draft on
 * blur; nothing reaches the live site until "Publiceren".
 */
export function AdminContentEditor() {
  const { page = '' } = useParams<{ page: string }>()
  const def = getPage(page)

  const [overrides, setOverrides] = useState<Record<string, ContentRow>>({})
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [savedKey, setSavedKey] = useState<string | null>(null)

  const baseline = (f: ContentField) => overrides[f.key]?.published ?? f.default

  const reset = (rows: Record<string, ContentRow>) => {
    setOverrides(rows)
    const v: Record<string, string> = {}
    for (const f of def?.fields ?? []) v[f.key] = rows[f.key]?.draft ?? rows[f.key]?.published ?? f.default
    setValues(v)
  }

  useEffect(() => {
    if (!def) return
    let active = true
    fetchPageOverrides(page)
      .then((rows) => active && reset(rows))
      .catch((e) => active && setError(e?.message ?? 'Laden mislukt.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const draftCount = useMemo(
    () => Object.values(overrides).filter((r) => r.draft !== null).length,
    [overrides],
  )
  const lastPublished = useMemo(() => {
    let last: string | null = null
    for (const r of Object.values(overrides)) {
      if (r.published_at && (!last || r.published_at > last)) last = r.published_at
    }
    return last
  }, [overrides])

  const commit = async (f: ContentField, value: string) => {
    const base = baseline(f)
    try {
      if (value === base) {
        await discardField(page, f.key)
        setOverrides((o) => ({ ...o, [f.key]: { ...(o[f.key] ?? blankRow(page, f.key)), draft: null } }))
      } else {
        await saveDraft(page, f.key, value)
        setOverrides((o) => ({ ...o, [f.key]: { ...(o[f.key] ?? blankRow(page, f.key)), draft: value } }))
        setSavedKey(f.key)
        setTimeout(() => setSavedKey((k) => (k === f.key ? null : k)), 1500)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Opslaan mislukt.')
    }
  }

  const onImage = async (f: ContentField, file: File) => {
    setBusy(true)
    try {
      const url = await uploadImage(file, page)
      setValues((v) => ({ ...v, [f.key]: url }))
      await commit(f, url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const publish = async () => {
    setBusy(true)
    setError(null)
    try {
      await publishPage(page)
      const rows = await fetchPageOverrides(page)
      reset(rows)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Publiceren mislukt.')
    } finally {
      setBusy(false)
    }
  }

  const discardAll = async () => {
    if (!window.confirm('Alle niet-gepubliceerde wijzigingen op deze pagina verwerpen?')) return
    setBusy(true)
    try {
      await discardPage(page)
      const rows = await fetchPageOverrides(page)
      reset(rows)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verwerpen mislukt.')
    } finally {
      setBusy(false)
    }
  }

  if (!def) return <ErrorNote message="Onbekende pagina." />
  if (loading) return <Spinner />

  const groups = [...new Set(def.fields.map((f) => f.group))]

  return (
    <>
      <Link
        to="/admin/content"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug naar overzicht
      </Link>

      <PageHeading kicker="Website content" title={def.title} />

      {/* sticky publish bar */}
      <div className="sticky top-0 z-10 -mx-1 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-deep/10 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="font-sans text-sm">
          {draftCount > 0 ? (
            <span className="font-semibold text-amber-700">
              {draftCount} niet-gepubliceerde {draftCount === 1 ? 'wijziging' : 'wijzigingen'}
            </span>
          ) : (
            <span className="text-near-black/55">Alles gepubliceerd</span>
          )}
          <span className="ml-2 text-near-black/40">
            {lastPublished ? `Laatst gepubliceerd ${formatDateTime(lastPublished)}` : 'Nog niet eerder gepubliceerd'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {draftCount > 0 && (
            <GhostButton type="button" onClick={discardAll} disabled={busy}>
              Concept verwerpen
            </GhostButton>
          )}
          <PrimaryButton type="button" onClick={publish} disabled={busy || draftCount === 0}>
            {busy ? 'Bezig…' : 'Publiceren'}
          </PrimaryButton>
        </div>
      </div>

      {error && (
        <div className="mb-5">
          <ErrorNote message={error} />
        </div>
      )}

      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <Card key={group} className="p-6">
            <h2 className="mb-4 font-display text-base font-semibold text-near-black">{group}</h2>
            <div className="flex flex-col gap-5">
              {def.fields
                .filter((f) => f.group === group)
                .map((f) => {
                  const changed = overrides[f.key]?.draft != null
                  return (
                    <div key={f.key}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <label className="font-sans text-sm font-semibold text-near-black">{f.label}</label>
                        {changed && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                            concept
                          </span>
                        )}
                        {savedKey === f.key && (
                          <span className="font-sans text-[11px] font-medium text-emerald-deep">opgeslagen</span>
                        )}
                      </div>
                      <FieldInput
                        field={f}
                        value={values[f.key] ?? ''}
                        onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
                        onCommit={(v) => commit(f, v)}
                        onImage={(file) => onImage(f, file)}
                        busy={busy}
                      />
                    </div>
                  )
                })}
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

function FieldInput({
  field,
  value,
  onChange,
  onCommit,
  onImage,
  busy,
}: {
  field: ContentField
  value: string
  onChange: (v: string) => void
  onCommit: (v: string) => void
  onImage: (file: File) => void
  busy: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const cls =
    'w-full rounded-xl border border-emerald-deep/15 bg-white px-3.5 py-2.5 font-sans text-sm text-near-black outline-none transition-colors focus:border-emerald'

  if (field.kind === 'image') {
    return (
      <div className="flex items-center gap-4">
        {value ? (
          <img src={value} alt="" className="h-16 w-24 rounded-lg border border-emerald-deep/10 object-cover" />
        ) : (
          <div className="grid h-16 w-24 place-items-center rounded-lg border border-dashed border-emerald-deep/20 text-xs text-near-black/40">
            geen foto
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onImage(file)
            e.target.value = ''
          }}
        />
        <GhostButton type="button" onClick={() => fileRef.current?.click()} disabled={busy}>
          Foto vervangen
        </GhostButton>
      </div>
    )
  }

  if (field.kind === 'multiline') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onCommit(e.target.value)}
        className={`${cls} min-h-[6rem] resize-y`}
      />
    )
  }

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onCommit(e.target.value)}
      className={cls}
    />
  )
}

function blankRow(page: string, key: string): ContentRow {
  return { page, key, draft: null, published: null, published_at: null, updated_at: '' }
}
