/**
 * The content registry: the single source of truth for which texts and photos
 * on the site are editable, their human labels for the editor, and their
 * DEFAULT value (the exact text/photo that is on the site today).
 *
 * The database (site_content) only stores overrides. When nothing is published
 * for a key, the public site falls back to the default here, so the site looks
 * identical until something is actually changed and published.
 */

export type FieldKind = 'text' | 'multiline' | 'image'

export type ContentField = {
  /** Unique within the page, e.g. 'faq.items.0.question'. */
  key: string
  /** Label shown in the admin editor. */
  label: string
  kind: FieldKind
  /** Section grouping in the editor (e.g. 'FAQ', 'Footer'). */
  group: string
  /** The current live value, used as fallback and as the editor's starting point. */
  default: string
}

export type PageContent = {
  /** Stable page id, e.g. 'home'. */
  page: string
  /** Label shown in the admin overview. */
  title: string
  fields: ContentField[]
}
