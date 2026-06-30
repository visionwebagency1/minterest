import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  createCustomer,
  fetchCustomer,
  linkLeadToCustomer,
  updateCustomer,
  type CustomerInput,
} from '../data/customers'
import { GhostButton, PrimaryButton, TextAreaField, TextField } from '../components/form'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'

/** Prefill + linking passed in when creating a customer from a lead. */
type FormNavState = { initial?: Partial<CustomerInput>; fromLeadId?: string }

const EMPTY: CustomerInput = {
  company_name: '',
  contact_name: '',
  email: '',
  phone: '',
  address: '',
  kvk: '',
  vat: '',
  notes: '',
}

const clean = (s: string | null): string | null => (s && s.trim() !== '' ? s.trim() : null)

export function AdminCustomerForm({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const navState = (location.state as FormNavState | null) ?? null

  const [form, setForm] = useState<CustomerInput>({ ...EMPTY, ...navState?.initial })
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (mode !== 'edit' || !id) return
    let active = true
    fetchCustomer(id)
      .then((c) => {
        if (!active) return
        if (!c) {
          setError('Klant niet gevonden.')
        } else {
          setForm({
            company_name: c.company_name ?? '',
            contact_name: c.contact_name ?? '',
            email: c.email ?? '',
            phone: c.phone ?? '',
            address: c.address ?? '',
            kvk: c.kvk ?? '',
            vat: c.vat ?? '',
            notes: c.notes ?? '',
          })
        }
        setLoading(false)
      })
      .catch((e) => {
        if (active) {
          setError(e?.message ?? 'Kon de klant niet laden.')
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [id, mode])

  const set = (key: keyof CustomerInput) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!clean(form.company_name) && !clean(form.contact_name)) {
      setError('Vul minstens een bedrijfsnaam of een contactpersoon in.')
      return
    }
    setError(null)
    setSaving(true)
    const payload: CustomerInput = {
      company_name: clean(form.company_name),
      contact_name: clean(form.contact_name),
      email: clean(form.email),
      phone: clean(form.phone),
      address: clean(form.address),
      kvk: clean(form.kvk),
      vat: clean(form.vat),
      notes: clean(form.notes),
    }
    try {
      if (mode === 'create') {
        const created = await createCustomer(payload)
        if (navState?.fromLeadId) {
          await linkLeadToCustomer(navState.fromLeadId, created.id)
        }
        navigate(`/admin/klanten/${created.id}`, { replace: true })
      } else if (id) {
        await updateCustomer(id, payload)
        navigate(`/admin/klanten/${id}`, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.')
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  const backTo = mode === 'edit' && id ? `/admin/klanten/${id}` : '/admin/klanten'

  return (
    <>
      <Link
        to={backTo}
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-near-black/55 transition-colors hover:text-emerald-deep"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Terug
      </Link>

      <PageHeading
        kicker="Klanten"
        title={mode === 'create' ? 'Nieuwe klant' : 'Klant bewerken'}
      />

      {navState?.fromLeadId && mode === 'create' && (
        <div className="mb-5 rounded-xl border border-emerald/30 bg-emerald/[0.06] px-4 py-3 font-sans text-sm text-emerald-deep">
          Gegevens overgenomen uit de aanvraag. Vul aan en sla op om de klant te koppelen.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Bedrijfsnaam" value={form.company_name ?? ''} onChange={set('company_name')} placeholder="Bedrijf BV" />
            <TextField label="Contactpersoon" value={form.contact_name ?? ''} onChange={set('contact_name')} placeholder="Voor- en achternaam" />
            <TextField label="E-mail" type="email" value={form.email ?? ''} onChange={set('email')} placeholder="naam@bedrijf.nl" />
            <TextField label="Telefoon" value={form.phone ?? ''} onChange={set('phone')} placeholder="06 12 34 56 78" />
            <TextField label="KvK-nummer" value={form.kvk ?? ''} onChange={set('kvk')} placeholder="12345678" />
            <TextField label="BTW-nummer" value={form.vat ?? ''} onChange={set('vat')} placeholder="NL000000000B00" />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5">
            <TextAreaField label="Adres" value={form.address ?? ''} onChange={set('address')} placeholder="Straat en nummer, postcode en plaats" />
            <TextAreaField label="Notities" value={form.notes ?? ''} onChange={set('notes')} placeholder="Interne notities over deze klant" />
          </div>

          {error && (
            <div className="mt-5">
              <ErrorNote message={error} />
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? 'Opslaan…' : mode === 'create' ? 'Klant aanmaken' : 'Wijzigingen opslaan'}
            </PrimaryButton>
            <Link to={backTo}>
              <GhostButton type="button">Annuleren</GhostButton>
            </Link>
          </div>
        </Card>
      </form>
    </>
  )
}
