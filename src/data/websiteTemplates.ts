/**
 * The template gallery for /websites.
 *
 * Phase 1 of the websites platform builds the real templates in the renderer;
 * until then these entries drive the gallery and the hero mockups with drawn
 * previews (see components/websites/TemplatePreview.tsx) instead of screenshots.
 * The shape already matches the `web_templates` table, so swapping a drawn
 * preview for a real screenshot later is a one-field change (`preview`).
 */

import type { WebsitePlanSlug } from './websitePlans'

/** The drawn preview layouts. One per look, reused across templates. */
export type TemplateLayout = 'split' | 'centered' | 'grid' | 'editorial'

export interface TemplatePalette {
  /** Page background. */
  bg: string
  /** Headings and blocks of text. */
  ink: string
  /** Buttons, links and highlights. */
  accent: string
  /** Image placeholders and quiet surfaces. */
  muted: string
}

export interface WebsiteTemplate {
  slug: string
  name: string
  /** Who this template is for, in one line. */
  description: string
  /** Branche label, used as the gallery filter chip. */
  sector: string
  layout: TemplateLayout
  palette: TemplatePalette
  /** Which plans this template is available on. */
  plans: WebsitePlanSlug[]
  /** Real screenshot once the template exists (phase 1). Empty = drawn preview. */
  preview?: string
}

export const WEBSITE_TEMPLATES: WebsiteTemplate[] = [
  {
    slug: 'atelier',
    name: 'Atelier',
    description: 'Rustig en verzorgd, met veel ruimte voor beeld.',
    sector: 'Studio en creatief',
    layout: 'editorial',
    palette: { bg: '#F6F4EF', ink: '#1C1C1C', accent: '#008081', muted: '#E2DFD6' },
    plans: ['start', 'groei'],
  },
  {
    slug: 'kade',
    name: 'Kade',
    description: 'Stevig en zakelijk, voor bouw, techniek en installatie.',
    sector: 'Bouw en techniek',
    layout: 'split',
    palette: { bg: '#0E1B1A', ink: '#F4F4F4', accent: '#90EE90', muted: '#1E3230' },
    plans: ['start', 'groei'],
  },
  {
    slug: 'bloem',
    name: 'Bloem',
    description: 'Warm en uitnodigend, voor horeca en winkels.',
    sector: 'Horeca en retail',
    layout: 'grid',
    palette: { bg: '#FFFDF8', ink: '#2A2118', accent: '#C2703D', muted: '#F0E6DA' },
    plans: ['start', 'groei'],
  },
  {
    slug: 'praktijk',
    name: 'Praktijk',
    description: 'Helder en vertrouwd, voor zorg, coaching en advies.',
    sector: 'Zorg en advies',
    layout: 'centered',
    palette: { bg: '#F4FAF7', ink: '#13322C', accent: '#42C28C', muted: '#DCEDE5' },
    plans: ['start', 'groei'],
  },
  {
    slug: 'vakman',
    name: 'Vakman',
    description: 'Direct en duidelijk, met je diensten en contact vooraan.',
    sector: 'Dienstverlening',
    layout: 'split',
    palette: { bg: '#FFFFFF', ink: '#1C1C1C', accent: '#0B6BCB', muted: '#E8EEF4' },
    plans: ['start', 'groei'],
  },
  {
    slug: 'noord',
    name: 'Noord',
    description: 'Donker en zelfverzekerd, voor merken die opvallen.',
    sector: 'Merk en lifestyle',
    layout: 'editorial',
    palette: { bg: '#141414', ink: '#F4F4F4', accent: '#90EE90', muted: '#262626' },
    plans: ['groei'],
  },
]

export const TEMPLATE_BY_SLUG: Record<string, WebsiteTemplate> = Object.fromEntries(
  WEBSITE_TEMPLATES.map((t) => [t.slug, t]),
)

/** The templates a given plan can choose from. Pro is always custom work. */
export function templatesForPlan(plan: WebsitePlanSlug): WebsiteTemplate[] {
  return WEBSITE_TEMPLATES.filter((t) => t.plans.includes(plan))
}
