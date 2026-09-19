import type { SiteContent } from '../types'
import { atelier } from './atelier'
import { kade } from './kade'
import { bloem } from './bloem'
import { praktijk } from './praktijk'
import { vakman } from './vakman'
import { noord } from './noord'

/** Demo content per template, used by the previews and the gallery shots. */
export const DEMO_CONTENT: Record<string, SiteContent> = {
  atelier,
  kade,
  bloem,
  praktijk,
  vakman,
  noord,
}
