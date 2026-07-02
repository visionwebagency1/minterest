import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { HERO_BG, HeroMWatermark } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { getProjectBySlug, type Project } from '@/lib/projects'
import { NotFound } from './NotFound'

/** Public case page for one project (/work/:slug). */
export function ProjectCase() {
  const { slug = '' } = useParams()
  const [state, setState] = useState<'loading' | 'ready' | 'notfound'>('loading')
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    let active = true
    getProjectBySlug(slug)
      .then((p) => {
        if (!active) return
        if (!p) setState('notfound')
        else {
          setProject(p)
          setState('ready')
        }
      })
      .catch(() => active && setState('notfound'))
    return () => {
      active = false
    }
  }, [slug])

  if (state === 'loading') {
    return <div className="grid min-h-screen place-items-center bg-near-black"><span className="h-7 w-7 animate-spin rounded-full border-2 border-mint/30 border-t-mint" /></div>
  }
  if (state === 'notfound' || !project) return <NotFound />

  const blocks = [
    { title: 'De uitdaging', text: project.challenge },
    { title: 'Onze aanpak', text: project.approach },
    { title: 'Het resultaat', text: project.result },
  ].filter((b) => b.text)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-near-black pt-36 pb-20 text-cream md:pt-48 md:pb-24" style={{ backgroundImage: HERO_BG }}>
        <HeroMWatermark />
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <Link to="/work" className="inline-flex items-center gap-1.5 font-sans text-sm text-cream/55 transition-colors hover:text-cream">
            <span aria-hidden>&larr;</span> Alle projecten
          </Link>
          {project.category && (
            <p className="mt-8 font-sans text-xs uppercase tracking-[0.28em] text-mint/80">{project.category}</p>
          )}
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.4rem,6.5vw,5rem)] font-semibold leading-[1.0] tracking-tight">
            {project.title}
          </h1>
          {project.summary && <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-cream/65">{project.summary}</p>}
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-sans text-sm text-cream/60">
            {project.client && <span><span className="text-cream/40">Klant</span> · {project.client}</span>}
            {project.year && <span><span className="text-cream/40">Jaar</span> · {project.year}</span>}
          </div>
        </div>
      </section>

      <div className="bg-cream text-near-black">
        {/* Cover */}
        {project.cover_image && (
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="-mt-12 overflow-hidden rounded-3xl shadow-[0_40px_120px_rgba(1,63,64,0.25)] md:-mt-16">
              <img src={project.cover_image} alt="" className="aspect-[16/9] w-full object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
          {project.intro && (
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-[1.25] tracking-tight text-near-black">
                {project.intro}
              </p>
            </Reveal>
          )}

          <div className="mt-14 flex flex-col gap-12">
            {blocks.map((b) => (
              <Reveal key={b.title}>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">{b.title}</span>
                </div>
                <p className="mt-5 whitespace-pre-wrap font-sans text-lg leading-relaxed text-near-black/70">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <Reveal key={i}>
                  <img src={src} alt="" className="w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(1,63,64,0.12)]" />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Quote */}
        {project.quote && (
          <section className="relative overflow-hidden py-24 text-cream md:py-28" style={{ backgroundImage: 'radial-gradient(60% 60% at 25% 0%, rgba(66,194,140,0.25), transparent 60%), linear-gradient(160deg, #013F40 0%, #071311 100%)' }}>
            <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
              <blockquote className="text-balance font-display text-[clamp(1.6rem,4vw,2.75rem)] font-semibold leading-[1.15]">
                {project.quote}
              </blockquote>
              {project.quote_author && <div className="mt-8 font-sans text-sm text-cream/60">{project.quote_author}</div>}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="flex flex-col items-center gap-6 rounded-3xl p-10 text-center text-cream md:p-14" style={{ backgroundImage: 'radial-gradient(70% 90% at 50% 0%, rgba(66,194,140,0.3), transparent 60%), linear-gradient(160deg, #008081 0%, #013F40 60%, #06140F 100%)' }}>
            <h2 className="max-w-xl text-balance font-display text-[clamp(1.6rem,4vw,2.75rem)] font-semibold">Ook zo'n resultaat voor jouw merk?</h2>
            <Link to="/start" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mint to-lime-accent px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform hover:scale-[1.03]">
              Start jouw project <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
