import { currentHost, isPlatformHost } from '@/lib/host'
import { isSupabaseConfigured } from '@/lib/env'

/** Elk verzoek is domeinafhankelijk, dus nooit statisch cachen op buildtijd. */
export const dynamic = 'force-dynamic'

/**
 * Fase 0: de renderer staat en herkent zijn domein. Er wordt nog geen klant-site
 * gerenderd; dat is fase 1 (site opzoeken, content laden, template renderen).
 */
export default async function Page() {
  const host = await currentHost()
  const platform = isPlatformHost(host)

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6 py-24">
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-mint">
        Minterest Websites
      </span>
      <h1 className="text-3xl font-semibold md:text-4xl">
        Renderer <span className="text-lime-accent">actief</span>
      </h1>
      <p className="max-w-prose text-cream/70">
        {platform
          ? 'Dit is het platformdomein. Klant-sites draaien op hun eigen domein en worden vanaf fase 1 hier gerenderd.'
          : 'Dit domein wordt herkend. Vanaf fase 1 zoekt de renderer de bijbehorende site op en rendert hij het gekozen template.'}
      </p>

      <dl className="grid gap-3 rounded-2xl border border-mint/20 bg-emerald-deep/40 p-6 font-sans text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Host</dt>
          <dd className="font-medium">{host || 'onbekend'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Type</dt>
          <dd className="font-medium">{platform ? 'platformdomein' : 'klantdomein'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-cream/60">Supabase</dt>
          <dd className="font-medium">
            {isSupabaseConfigured ? 'geconfigureerd' : 'nog niet ingesteld'}
          </dd>
        </div>
      </dl>
    </main>
  )
}
