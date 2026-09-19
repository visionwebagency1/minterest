import brand from '../brand.json'

/** De Minterest-palette (teal-klim). Enige bron: shared/brand.json. */
export const COLORS = brand.colors
export const GRADIENT = brand.gradient
export const FONTS = brand.fonts

/** Stylesheets die elke app in de <head> laadt (Fontshare + Google Fonts). */
export const FONT_STYLESHEETS = brand.fontStylesheets

export const BRAND = {
  name: 'Minterest',
  tagline: 'Where interest becomes your growth',
  site: 'https://minterest.nl',
  kvk: '83955526',
  vat: 'NL003932189B46',
} as const
