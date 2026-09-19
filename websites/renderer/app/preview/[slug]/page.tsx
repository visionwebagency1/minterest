import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { TEMPLATE_BY_SLUG, TEMPLATES } from '@/templates'
import { DEMO_CONTENT } from '@/templates/content'

/**
 * Template preview: renders a template with its demo content, as a visitor of
 * that customer site would see it.
 *
 * Used to judge the designs, to take the gallery screenshots, and later as the
 * live demo behind "bekijk voorbeeld" on minterest.nl. Not indexable: these are
 * demo businesses, not real ones.
 */

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = TEMPLATE_BY_SLUG[slug]
  if (!template) return { title: 'Voorbeeld', robots: { index: false, follow: false } }
  return {
    title: `${template.name} - voorbeeldwebsite | Minterest`,
    description: template.description,
    robots: { index: false, follow: false },
  }
}

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const template = TEMPLATE_BY_SLUG[slug]
  const content = DEMO_CONTENT[slug]
  if (!template || !content) notFound()

  const { Component, fonts } = template
  const href = `https://fonts.googleapis.com/css2?${fonts
    .map((f) => `family=${f}`)
    .join('&')}&display=swap`

  return (
    <>
      {/* Each template brings its own typography; loaded per preview. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={href} />
      <Component content={content} />
    </>
  )
}
