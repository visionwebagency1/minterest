import { useEffect, useState, type FormEvent } from 'react'
import { fetchSettings, updateSettings, type CompanySettings } from '../data/settings'
import { PrimaryButton, TextAreaField, TextField } from '../components/form'
import { Card, ErrorNote, PageHeading, Spinner } from '../components/ui'

/** Company settings: Minterest's own details that appear on quotes and invoices. */
export function AdminSettings() {
  const [form, setForm] = useState<CompanySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let active = true
    fetchSettings()
      .then((s) => active && setForm(s))
      .catch((e) => active && setError(e?.message ?? 'Kon de instellingen niet laden.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const set = (key: keyof CompanySettings) => (e: { target: { value: string } }) =>
    setForm((f) => (f ? { ...f, [key]: e.target.value } : f))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      await updateSettings({
        ...form,
        default_vat_rate: Number(form.default_vat_rate) || 21,
        quote_validity_days: Number(form.quote_validity_days) || 30,
        invoice_due_days: Number(form.invoice_due_days) || 14,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />
  if (!form) return <ErrorNote message={error ?? 'Instellingen niet beschikbaar.'} />

  return (
    <>
      <PageHeading
        kicker="Instellingen"
        title="Bedrijfsgegevens"
      />
      <p className="-mt-4 mb-6 max-w-xl font-sans text-sm text-near-black/55">
        Deze gegevens komen op je offertes en facturen te staan. Vul ze één keer in.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Card className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Bedrijfsnaam" required value={form.company_name ?? ''} onChange={set('company_name')} />
            <TextField label="E-mail" type="email" value={form.email ?? ''} onChange={set('email')} />
            <TextField label="Telefoon" value={form.phone ?? ''} onChange={set('phone')} />
            <TextField label="Website" value={form.website ?? ''} onChange={set('website')} />
            <TextField label="KvK-nummer" value={form.kvk ?? ''} onChange={set('kvk')} />
            <TextField label="BTW-nummer" value={form.vat ?? ''} onChange={set('vat')} />
            <TextField label="IBAN" value={form.iban ?? ''} onChange={set('iban')} />
          </div>
          <div className="mt-5">
            <TextAreaField label="Adres" value={form.address ?? ''} onChange={set('address')} placeholder="Straat en nummer, postcode en plaats" />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="font-display text-base font-semibold text-near-black">Offerte-standaarden</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Standaard btw %" type="number" required value={String(form.default_vat_rate ?? 21)} onChange={set('default_vat_rate')} />
            <TextField label="Geldigheidsduur (dagen)" type="number" required value={String(form.quote_validity_days ?? 30)} onChange={set('quote_validity_days')} />
          </div>
          <div className="mt-5">
            <TextAreaField
              label="Voettekst op offerte"
              value={form.quote_footer ?? ''}
              onChange={set('quote_footer')}
              placeholder="Bijv. betaalvoorwaarden of een bedankje dat onderaan elke offerte komt."
            />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="font-display text-base font-semibold text-near-black">Factuur-standaarden</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <TextField label="Betaaltermijn (dagen)" type="number" required value={String(form.invoice_due_days ?? 14)} onChange={set('invoice_due_days')} />
          </div>
          <div className="mt-5">
            <TextAreaField
              label="Voettekst op factuur"
              value={form.invoice_footer ?? ''}
              onChange={set('invoice_footer')}
              placeholder="Bijv. betaalinstructies of een bedankje dat onderaan elke factuur komt."
            />
          </div>
        </Card>

        {error && <ErrorNote message={error} />}

        <div className="flex items-center gap-4">
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? 'Opslaan…' : 'Opslaan'}
          </PrimaryButton>
          {saved && <span className="font-sans text-sm font-medium text-emerald-deep">Opgeslagen</span>}
        </div>
      </form>
    </>
  )
}
