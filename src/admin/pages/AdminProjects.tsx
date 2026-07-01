import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProjects, type Project } from '../data/projects'
import { PrimaryButton } from '../components/form'
import { Card, EmptyState, ErrorNote, PageHeading, Spinner, StatusPill } from '../components/ui'

/** Projecten overzicht: portfolio-cases, gesorteerd, met status + uitgelicht. */
export function AdminProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetchProjects()
      .then((rows) => active && setProjects(rows))
      .catch((e) => active && setError(e?.message ?? 'Kon de projecten niet laden.'))
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeading
        kicker="Portfolio"
        title="Projecten"
        actions={
          <Link to="/admin/projecten/nieuw">
            <PrimaryButton type="button">
              <span className="text-base leading-none">+</span> Nieuw project
            </PrimaryButton>
          </Link>
        }
      />
      <p className="-mt-4 mb-6 max-w-xl font-sans text-sm text-near-black/55">
        Elk project krijgt een eigen case-pagina (/work/slug). "Uitgelicht" bepaalt of het op de homepage komt;
        publiceer om het live te zetten.
      </p>

      {error && <ErrorNote message={error} />}
      {!projects && !error && <Spinner />}

      {projects && projects.length === 0 && (
        <EmptyState title="Nog geen projecten" hint="Maak je eerste project met de knop rechtsboven." />
      )}

      {projects && projects.length > 0 && (
        <Card className="divide-y divide-emerald-deep/8 overflow-hidden">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/admin/projecten/${p.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-emerald-deep/[0.03]"
            >
              {p.cover_image ? (
                <img src={p.cover_image} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-emerald-deep/20 text-[10px] text-near-black/35">
                  geen foto
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-sans text-sm font-semibold text-near-black">{p.title}</p>
                  {p.featured && (
                    <span className="rounded-full bg-emerald/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-deep">
                      uitgelicht
                    </span>
                  )}
                </div>
                <p className="truncate font-sans text-sm text-near-black/55">{p.category || 'Geen categorie'}</p>
              </div>
              <StatusPill
                label={p.status === 'gepubliceerd' ? 'Gepubliceerd' : 'Concept'}
                tone={p.status === 'gepubliceerd' ? 'green' : 'slate'}
              />
            </Link>
          ))}
        </Card>
      )}
    </>
  )
}
