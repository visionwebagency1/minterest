/**
 * Predefined quote posts based on the six Minterest services and their
 * sub-services. Adding one drops a ready-made line (description + a "vanaf"
 * starting price) into a quote, which you can then adjust per line.
 *
 * The prices here are editable starting points. Change them to match your own
 * standard rates; they only seed a new line, nothing more.
 */

export type CatalogItem = { name: string; price: number }
export type CatalogGroup = { group: string; items: CatalogItem[] }

export const SERVICE_CATALOG: CatalogGroup[] = [
  {
    group: 'Branding voor groei',
    items: [
      { name: 'Visuele identiteit (incl. logo)', price: 950 },
      { name: 'Packaging ontwerp', price: 750 },
      { name: 'Social Media Visual System', price: 650 },
      { name: 'Complete Branding', price: 2500 },
    ],
  },
  {
    group: 'Web Development',
    items: [
      { name: 'Website', price: 1500 },
      { name: 'Webshop', price: 2500 },
      { name: 'Applicatie', price: 3500 },
      { name: 'Maatwerk software', price: 4500 },
    ],
  },
  {
    group: 'Video & Fotografie',
    items: [
      { name: 'Short video content', price: 500 },
      { name: 'AI Video content', price: 450 },
      { name: 'Fotoshoot', price: 600 },
    ],
  },
  {
    group: 'Social Media Groei',
    items: [
      { name: 'Influencer Marketing', price: 750 },
      { name: 'Meta Ads (per maand)', price: 650 },
      { name: 'TikTok Ads (per maand)', price: 650 },
    ],
  },
  {
    group: 'SEO & SEA',
    items: [
      { name: 'SEO (per maand)', price: 600 },
      { name: 'Google Ads (per maand)', price: 600 },
    ],
  },
  {
    group: 'Extra groeidiensten',
    items: [
      { name: 'AI Agents', price: 1200 },
      { name: 'Administratie', price: 400 },
      { name: 'Sourcing', price: 500 },
      { name: 'Detachering', price: 0 },
    ],
  },
]
