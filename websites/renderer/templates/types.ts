/**
 * The content shape every template renders.
 *
 * One schema for all six templates: the same customer content can be poured
 * into another design without rewriting anything, which is what makes switching
 * templates a one-field change in the panel. Templates differ in how they lay
 * this out, not in what they need.
 *
 * This mirrors `web_site_content.data` in Supabase; the demo content in
 * templates/content is what the gallery and the previews show.
 */

export interface OpeningHour {
  /** "Maandag t/m vrijdag" or "Zaterdag". */
  days: string
  /** "08:00 - 17:30" or "Gesloten". */
  time: string
}

export interface Business {
  name: string
  /** One line under the logo, in the footer. */
  claim: string
  phone: string
  email: string
  street: string
  postcode: string
  city: string
  kvk?: string
  hours: OpeningHour[]
  /** Region served, shown by trades and practices. */
  area?: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Hero {
  kicker: string
  title: string
  /** Word in the title that gets the accent treatment. */
  accent?: string
  text: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  image: string
  /** Three short proof points under the hero. */
  badges: string[]
}

export interface TextImage {
  kicker: string
  title: string
  body: string[]
  image: string
  points?: string[]
}

export interface ServiceItem {
  icon: IconName
  title: string
  text: string
  /** "vanaf € 45" — shown when the sector is used to naming prices. */
  price?: string
}

export interface Services {
  kicker: string
  title: string
  intro: string
  items: ServiceItem[]
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface StatItem {
  value: string
  label: string
}

export interface SiteContent {
  business: Business
  nav: NavItem[]
  hero: Hero
  intro: TextImage
  services: Services
  feature: TextImage
  stats?: StatItem[]
  testimonials: Testimonial[]
  cta: { title: string; text: string; button: string }
}

/** Every icon the templates can name. Keeps content free of JSX. */
export type IconName =
  | 'scissors'
  | 'sparkle'
  | 'brush'
  | 'droplet'
  | 'flame'
  | 'wrench'
  | 'bolt'
  | 'shield'
  | 'leaf'
  | 'tree'
  | 'fence'
  | 'shovel'
  | 'plate'
  | 'coffee'
  | 'wine'
  | 'chef'
  | 'heart'
  | 'hand'
  | 'activity'
  | 'stethoscope'
  | 'chart'
  | 'briefcase'
  | 'calculator'
  | 'compass'
  | 'clock'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'check'
  | 'arrow'
  | 'star'

/** The visual identity of a template: colours and type, no layout. */
export interface TemplateTheme {
  /** Page background. */
  bg: string
  /** Body text. */
  ink: string
  /** Muted text. */
  muted: string
  /** Primary brand colour: buttons, links. */
  accent: string
  /** Text on top of the accent colour. */
  onAccent: string
  /** Quiet surface: cards, alternating sections. */
  surface: string
  /** Hairlines. */
  line: string
  /** Dark section background. */
  dark: string
  /** Text on the dark background. */
  onDark: string
  /** Google Fonts family for headings and for body. */
  headingFont: string
  bodyFont: string
  /** How round the corners are: sharp trades, soft care. */
  radius: string
}
