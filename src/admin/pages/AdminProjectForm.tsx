import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createProject,
  deleteProject,
  fetchProject,
  slugifyTitle,
  updateProject,
  uploadProjectImage,
  type ProjectInput,
} from '../data/projects'
import { GhostButton, PrimaryButton, TextAreaField, TextField } from '../components/form'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'
import { encodeGalleryItem, parseGalleryItem } from '@/lib/projects'

const EMPTY: ProjectInput = {
  slug: '',
  title: '',
  category: '',
  client: '',
  year: '',
  cover_image: '',
  before_image: '',
  after_image: '',
  summary: '',
  intro: '',
  challenge: '',
  approach: '',
  result: '',
  gallery: [],
  quote: '',
  quote_author: '',
  featured: false,
  sort_order: 0,
  status: 'concept',
}

const clean = (s: string | null): string | null => (s && s.trim() !== '' ? s.trim() : null)

export function AdminProjectForm({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState<ProjectInput>(EMPTY)
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [busyImg, setBusyImg] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    let active = true
    fetchProject(id)
      .then((p) => {
        if (!active) return
        if (!p) setError('Project niet gevonden.')
        else {
          const { id: _id, created_at: _c, updated_at: _u, ...rest } = p
          setForm({ ...EMPTY, ...rest })
          setSlugTouched(true)
        }
        setLoading(false)
      })
      .catch((e) => {
        if (active) {
          setError(e?.message ?? 'Laden mislukt.')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [id, mode])

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const onTitle = (v: string) =>
    setForm((f) => ({ ...f, title: v, slug: slugTouched ? f.slug : slugifyTitle(v) }))

  const uploadTo = (apply: (url: string) => void) => async (e: { target: HTMLInputElement }) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusyImg(true)
    try {
      apply(await uploadProjectImage(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload mislukt.')
    } finally {
      setBusyImg(false)
      e.target.value = ''
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!clean(form.title)) {
      setError('Geef het project een titel.')
      return
    }
    const payload: ProjectInput = {
      ...form,
      title: form.title.trim(),
      slug: (clean(form.slug) ?? slugifyTitle(form.title)) as string,
      category: clean(form.category),
      client: clean(form.client),
      year: clean(form.year),
      cover_image: clean(form.cover_image),
      summary: clean(form.summary),
      intro: clean(form.intro),
      challenge: clean(form.challenge),
      approach: clean(form.approach),
      result: clean(form.result),
      quote: clean(form.quote),
      quote_author: clean(form.quote_author),
      before_image: clean(form.before_image),
      after_image: clean(form.after_image),
      sort_order: Number(form.sort_order) || 0,
    }
    setSaving(true)
    setError(null)
    try {
      if (mode === 'create') {
        const created = await createProject(payload)
        navigate(`/admin/projecten/${created.id}`, { replace: true })
      } else if (id) {
        await updateProject(id, payload)
        navigate('/admin/projecten', { replace: true })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Opslaan mislukt.'
      setError(msg.includes('duplicate') ? 'Deze slug bestaat al. Kies een andere.' : msg)
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id || !window.confirm(`Project "${form.title}" verwijderen?`)) return
    setSaving(true)
    try {
      await deleteProject(id)
      navigate('/admin/projecten', { replace: true })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verwijderen mislukt.')
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      <Link to="/admin/projecten" className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        Terug naar projecten
      </Link>
      <PageHeading kicker="Portfolio" title={mode === 'create' ? 'Nieuw project' : 'Project bewerken'} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card className="p-6 md:p-8">
          <h2 className="mb-4 font-display text-base font-semibold text-near-black">Basis</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Titel" required value={form.title} onChange={(e) => onTitle(e.target.value)} placeholder="Projectnaam" />
            <TextField label="Slug (URL)" value={form.slug ?? ''} onChange={(e) => { setSlugTouched(true); set('slug', e.target.value) }} hint={`/work/${form.slug || 'slug'}`} />
            <TextField label="Categorie" value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} placeholder="Webshop · Shopify" />
            <TextField label="Klant" value={form.client ?? ''} onChange={(e) => set('client', e.target.value)} />
            <TextField label="Jaar" value={form.year ?? ''} onChange={(e) => set('year', e.target.value)} placeholder="2026" />
            <TextField label="Volgorde" type="number" value={String(form.sort_order)} onChange={(e) => set('sort_order', Number(e.target.value))} />
          </div>
          <div className="mt-5">
            <ImageField label="Cover-foto" value={form.cover_image ?? ''} busy={busyImg} onPick={uploadTo((url) => set('cover_image', url))} onClear={() => set('cover_image', '')} />
          </div>
          <div className="mt-5">
            <TextAreaField label="Samenvatting" value={form.summary ?? ''} onChange={(e) => set('summary', e.target.value)} placeholder="Korte zin die op de grid en boven de case verschijnt." />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="mb-4 font-display text-base font-semibold text-near-black">Case-pagina</h2>
          <div className="flex flex-col gap-5">
            <TextAreaField label="Intro" value={form.intro ?? ''} onChange={(e) => set('intro', e.target.value)} />
            <TextAreaField label="De uitdaging" value={form.challenge ?? ''} onChange={(e) => set('challenge', e.target.value)} />
            <TextAreaField label="Onze aanpak" value={form.approach ?? ''} onChange={(e) => set('approach', e.target.value)} />
            <TextAreaField label="Het resultaat" value={form.result ?? ''} onChange={(e) => set('result', e.target.value)} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <TextAreaField label="Quote (klant)" value={form.quote ?? ''} onChange={(e) => set('quote', e.target.value)} />
              <TextField label="Quote - naam" value={form.quote_author ?? ''} onChange={(e) => set('quote_author', e.target.value)} />
            </div>
          </div>
          <div className="mt-6">
            <GalleryField
              images={form.gallery}
              busy={busyImg}
              onAdd={uploadTo((url) => set('gallery', [...form.gallery, url]))}
              onRemove={(i) => set('gallery', form.gallery.filter((_, idx) => idx !== i))}
              onCaption={(i, caption) =>
                set(
                  'gallery',
                  form.gallery.map((entry, idx) =>
                    idx === i ? encodeGalleryItem(parseGalleryItem(entry).src, caption) : entry,
                  ),
                )
              }
            />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="mb-1 font-display text-base font-semibold text-near-black">Voor / na</h2>
          <p className="mb-4 font-sans text-sm text-near-black/55">Vul beide velden om hoog op de case-pagina een sleep-vergelijking te tonen. Laat leeg om de slider te verbergen.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ImageField label="Voor" value={form.before_image ?? ''} busy={busyImg} onPick={uploadTo((url) => set('before_image', url))} onClear={() => set('before_image', '')} />
            <ImageField label="Na" value={form.after_image ?? ''} busy={busyImg} onPick={uploadTo((url) => set('after_image', url))} onClear={() => set('after_image', '')} />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="mb-4 font-display text-base font-semibold text-near-black">Publicatie</h2>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2.5 font-sans text-sm font-medium text-near-black">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 accent-emerald" />
              Uitgelicht op de homepage
            </label>
            <div className="flex items-center gap-2">
              {(['concept', 'gepubliceerd'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => set('status', st)}
                  className={`rounded-xl border px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                    form.status === st ? 'border-emerald bg-emerald/10 text-emerald-deep' : 'border-emerald-deep/12 text-near-black/60 hover:border-emerald/40'
                  }`}
                >
                  {st === 'concept' ? 'Concept' : 'Gepubliceerd'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {error && <ErrorNote message={error} />}

        <div className="flex items-center gap-3">
          <PrimaryButton type="submit" disabled={saving || busyImg}>
            {saving ? 'Opslaan…' : mode === 'create' ? 'Project aanmaken' : 'Wijzigingen opslaan'}
          </PrimaryButton>
          <Link to="/admin/projecten"><GhostButton type="button">Annuleren</GhostButton></Link>
          {mode === 'edit' && (
            <button type="button" onClick={handleDelete} disabled={saving} className="ml-auto font-sans text-sm font-medium text-red-500/80 transition-colors hover:text-red-600">
              Verwijderen
            </button>
          )}
        </div>
      </form>
    </>
  )
}

function ImageField({
  label,
  value,
  busy,
  onPick,
  onClear,
}: {
  label: string
  value: string
  busy: boolean
  onPick: (e: { target: HTMLInputElement }) => void
  onClear: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <span className="mb-1.5 block font-sans text-sm font-semibold text-near-black">{label}</span>
      <div className="flex items-center gap-4">
        {value ? (
          <img src={value} alt="" className="h-20 w-32 rounded-lg border border-emerald-deep/10 object-cover" />
        ) : (
          <div className="grid h-20 w-32 place-items-center rounded-lg border border-dashed border-emerald-deep/20 text-xs text-near-black/40">geen foto</div>
        )}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onPick} />
        <GhostButton type="button" onClick={() => ref.current?.click()} disabled={busy}>
          {value ? 'Vervangen' : 'Foto uploaden'}
        </GhostButton>
        {value && (
          <button type="button" onClick={onClear} className="font-sans text-sm text-red-500/80 hover:text-red-600">Verwijderen</button>
        )}
      </div>
    </div>
  )
}

function GalleryField({
  images,
  busy,
  onAdd,
  onRemove,
  onCaption,
}: {
  images: string[]
  busy: boolean
  onAdd: (e: { target: HTMLInputElement }) => void
  onRemove: (i: number) => void
  onCaption: (i: number, caption: string) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <span className="mb-1 block font-sans text-sm font-semibold text-near-black">Galerij</span>
      <p className="mb-3 font-sans text-sm text-near-black/55">
        Foto's verschijnen in een net raster op de case-pagina. Het bijschrift komt klein onderaan de foto (optioneel).
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((entry, i) => {
          const { src, caption } = parseGalleryItem(entry)
          return (
            <div key={i} className="rounded-xl border border-emerald-deep/10 bg-white p-2">
              <div className="group relative">
                <img src={src} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => onRemove(i)}
                  className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-red-500 shadow ring-1 ring-emerald-deep/10"
                  aria-label="Verwijder foto"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                value={caption}
                onChange={(e) => onCaption(i, e.target.value)}
                placeholder="Bijschrift (optioneel)"
                className="mt-2 w-full rounded-lg border border-emerald-deep/12 bg-cream/40 px-2.5 py-1.5 font-sans text-xs text-near-black placeholder:text-near-black/35 focus:border-emerald/50 focus:outline-none"
              />
            </div>
          )
        })}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onAdd} />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="grid aspect-[4/3] w-full place-items-center rounded-xl border border-dashed border-emerald-deep/25 text-2xl text-near-black/40 transition-colors hover:border-emerald/50 hover:text-emerald disabled:opacity-50"
        >
          +
        </button>
      </div>
    </div>
  )
}
