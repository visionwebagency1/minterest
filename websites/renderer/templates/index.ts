import type { ComponentType } from 'react'
import type { SiteContent, TemplateTheme } from './types'
import { Atelier, atelierTheme } from './Atelier'
import { Kade, kadeTheme } from './Kade'
import { Bloem, bloemTheme } from './Bloem'
import { Praktijk, praktijkTheme } from './Praktijk'
import { Vakman, vakmanTheme } from './Vakman'
import { Noord, noordTheme } from './Noord'

export interface TemplateEntry {
  slug: string
  name: string
  sector: string
  /** One line on what this design is for. */
  description: string
  Component: ComponentType<{ content: SiteContent }>
  theme: TemplateTheme
  /** Google Fonts families this design needs, in the order they load. */
  fonts: string[]
}

/**
 * The template registry. Adding a template means adding an entry here plus its
 * demo content; the preview route, the gallery shots and (from phase 1 onward)
 * the renderer all read from this one list.
 */
export const TEMPLATES: TemplateEntry[] = [
  {
    slug: 'atelier',
    name: 'Atelier',
    sector: 'Kapsalon en beauty',
    description: 'Editorial en rustig, met een grote foto voorop en een prijslijst die leest als een kaart.',
    Component: Atelier,
    theme: atelierTheme,
    fonts: ['Cormorant+Garamond:wght@400;500;600', 'Inter+Tight:wght@400;500;600'],
  },
  {
    slug: 'kade',
    name: 'Kade',
    sector: 'Installatie en techniek',
    description: 'Stevig en zakelijk. Gedeelde hero, harde cijfers eronder en je telefoonnummer altijd in beeld.',
    Component: Kade,
    theme: kadeTheme,
    fonts: ['Barlow+Condensed:wght@500;600;700', 'Barlow:wght@400;500;600'],
  },
  {
    slug: 'bloem',
    name: 'Bloem',
    sector: 'Horeca',
    description: 'Beeldvullende hero, openingstijden direct eronder en de kaart als echte menukaart.',
    Component: Bloem,
    theme: bloemTheme,
    fonts: ['Playfair+Display:wght@500;600;700', 'Karla:wght@400;500;600'],
  },
  {
    slug: 'praktijk',
    name: 'Praktijk',
    sector: 'Zorg en praktijk',
    description: 'Licht en geruststellend. Wachttijd en vergoeding staan meteen boven de vouw.',
    Component: Praktijk,
    theme: praktijkTheme,
    fonts: ['DM+Sans:wght@400;500;600;700'],
  },
  {
    slug: 'vakman',
    name: 'Vakman',
    sector: 'Hovenier en klus',
    description: 'Fotografie voorop, met een werkgalerij en je werkgebied duidelijk benoemd.',
    Component: Vakman,
    theme: vakmanTheme,
    fonts: ['Fraunces:opsz,wght@9..144,500;9..144,600', 'Inter:wght@400;500;600'],
  },
  {
    slug: 'noord',
    name: 'Noord',
    sector: 'Zakelijke dienstverlening',
    description: 'De rustigste van de zes. Kop op wit, brede foto eronder, diensten als genummerde lijst.',
    Component: Noord,
    theme: noordTheme,
    fonts: ['Instrument+Sans:wght@400;500;600;700'],
  },
]

export const TEMPLATE_BY_SLUG = Object.fromEntries(TEMPLATES.map((t) => [t.slug, t]))
