import { Binnenkort } from '@/components/Shell'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const TABELLEN = [
  'web_plans',
  'web_templates',
  'customers',
  'web_subscriptions',
  'web_sites',
  'web_site_content',
  'web_domains',
  'leads',
  'web_change_requests',
  'invoices',
] as const

/**
 * Fase 0: het dashboard bewijst dat het fundament staat. Het telt de rijen van
 * elke tabel uit het datamodel, met de rechten van de ingelogde admin. Komt hier
 * een getal te staan, dan kloppen de migratie, de verbinding en de RLS-policy.
 * De echte cijfers (actieve sites, MRR, mislukte betalingen) volgen in fase 4.
 */
async function tellen() {
  const supabase = await createClient()
  const resultaten = await Promise.all(
    TABELLEN.map(async (tabel) => {
      const { count, error } = await supabase
        .from(tabel)
        .select('*', { count: 'exact', head: true })
      return { tabel, count: count ?? 0, error: error?.message ?? null }
    }),
  )
  return resultaten
}

export default async function AdminDashboard() {
  const rijen = await tellen()

  return (
    <div className="grid gap-8">
      <div>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-emerald">
          Fase 0
        </span>
        <h1 className="mt-1.5 text-2xl font-semibold md:text-3xl">Fundament</h1>
        <p className="mt-2 max-w-prose font-sans text-sm text-near-black/60">
          De apps staan, het datamodel is aangemaakt en de rollen zijn gescheiden. Hieronder
          de tabellen zoals de database ze nu teruggeeft.
        </p>
      </div>

      <section className="rounded-2xl border border-emerald-deep/10 bg-white p-6 shadow-[0_12px_40px_rgba(1,63,64,0.05)]">
        <h2 className="text-lg font-semibold">Datamodel</h2>
        <table className="mt-4 w-full font-sans text-sm">
          <thead>
            <tr className="border-b border-emerald-deep/10 text-left text-xs uppercase tracking-wider text-near-black/50">
              <th className="pb-2 font-semibold">Tabel</th>
              <th className="pb-2 text-right font-semibold">Rijen</th>
            </tr>
          </thead>
          <tbody>
            {rijen.map((r) => (
              <tr key={r.tabel} className="border-b border-emerald-deep/5 last:border-0">
                <td className="py-2">{r.tabel}</td>
                <td className="py-2 text-right tabular-nums">
                  {r.error ? <span className="text-red-600">{r.error}</span> : r.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Binnenkort
        titel="Dashboard"
        fase="fase 4"
        punten={[
          'Actieve sites en MRR',
          'Nieuwe leads met badge',
          'Mislukte betalingen',
          'Open wijzigingsaanvragen',
        ]}
      />
    </div>
  )
}
