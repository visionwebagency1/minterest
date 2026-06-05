import { PageHero } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { Accent } from '@/components/Accent'

/** Dedicated 404 — keeps people on the climb instead of silently dumping them home. */
export function NotFound() {
  return (
    <>
      <PageHero
        kicker="404 — pagina niet gevonden"
        title={
          <>
            Hier loopt het pad <Accent>dood.</Accent>
          </>
        }
        tagline="Deze pagina bestaat niet (meer). Geen zorgen — vanaf hier klim je zo weer verder omhoog."
        primary={{ label: 'Terug naar home', to: '/' }}
        secondary={{ label: 'Bekijk ons werk', to: '/work' }}
      />
      <Footer />
    </>
  )
}
