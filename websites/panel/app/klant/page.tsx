import { Binnenkort } from '@/components/Shell'
import { requireCustomer } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function KlantOverzicht() {
  const user = await requireCustomer()

  return (
    <div className="grid gap-8">
      <div>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-emerald">
          Welkom
        </span>
        <h1 className="mt-1.5 text-2xl font-semibold md:text-3xl">
          {user.fullName ?? 'Jouw omgeving'}
        </h1>
      </div>

      <Binnenkort
        titel="Jouw omgeving"
        fase="fase 4"
        punten={[
          'Je plan en je factuurhistorie',
          'De status van je domein met de DNS-instructies',
          'Een wijziging aanvragen (Start)',
          'De knop naar je eigen tekst-editor (Groei)',
        ]}
      />
    </div>
  )
}
