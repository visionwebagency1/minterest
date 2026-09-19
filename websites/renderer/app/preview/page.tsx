import Link from 'next/link'
import { TEMPLATES } from '@/templates'

export const metadata = {
  title: 'Templates - voorbeelden',
  robots: { index: false, follow: false },
}

/** Index of the template previews, handy while designing and reviewing. */
export default function PreviewIndex() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-3xl font-semibold">Templates</h1>
      <p className="mt-3 text-cream/60">Zes voorbeeldwebsites, elk met eigen content en eigen ontwerp.</p>
      <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {TEMPLATES.map((t) => (
          <li key={t.slug}>
            <Link href={`/preview/${t.slug}`} className="flex items-baseline justify-between gap-6 py-5 transition hover:text-lime-accent">
              <span>
                <span className="font-display text-xl font-semibold">{t.name}</span>
                <span className="ml-3 text-sm text-cream/50">{t.sector}</span>
              </span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
