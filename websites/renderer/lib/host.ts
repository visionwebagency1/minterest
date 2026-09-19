import { headers } from 'next/headers'

import { RENDERER_HOST } from './env'

/** De header die de proxy zet met het opgeschoonde host-domein. */
export const SITE_HOST_HEADER = 'x-site-host'

/** Host zonder poort, zonder www, in kleine letters. */
export function normalizeHost(raw: string | null | undefined): string {
  if (!raw) return ''
  return raw.trim().toLowerCase().split(':')[0].replace(/^www\./, '')
}

/** Het host-domein van het huidige verzoek, zoals de proxy het doorgaf. */
export async function currentHost(): Promise<string> {
  const store = await headers()
  return normalizeHost(store.get(SITE_HOST_HEADER) ?? store.get('host'))
}

/**
 * True wanneer het verzoek op de renderer zelf binnenkomt (of op een
 * Vercel-preview-URL) en dus niet bij een klant-site hoort.
 */
export function isPlatformHost(host: string): boolean {
  if (!host) return true
  if (host === normalizeHost(RENDERER_HOST)) return true
  if (host === 'localhost' || host.endsWith('.localhost')) return true
  if (host.endsWith('.vercel.app')) return true
  return false
}
