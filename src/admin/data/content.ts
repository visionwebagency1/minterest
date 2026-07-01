import { getSupabase } from '@/lib/supabase'

/**
 * Admin data access for website content. Reads/writes the site_content
 * overrides, handles the draft -> published flow and image uploads to Storage.
 */

export type ContentRow = {
  page: string
  key: string
  draft: string | null
  published: string | null
  published_at: string | null
  updated_at: string
}

/** Number of unpublished drafts + last publish time for a page (overview). */
export function pageDraftState(overrides: Record<string, ContentRow>): {
  draftCount: number
  lastPublished: string | null
} {
  let draftCount = 0
  let lastPublished: string | null = null
  for (const row of Object.values(overrides)) {
    if (row.draft !== null) draftCount += 1
    if (row.published_at && (!lastPublished || row.published_at > lastPublished)) {
      lastPublished = row.published_at
    }
  }
  return { draftCount, lastPublished }
}

/** Overrides for a page, keyed by content key. */
export async function fetchPageOverrides(page: string): Promise<Record<string, ContentRow>> {
  const { data, error } = await getSupabase()
    .from('site_content')
    .select('page, key, draft, published, published_at, updated_at')
    .eq('page', page)
  if (error) throw error
  const out: Record<string, ContentRow> = {}
  for (const row of (data ?? []) as ContentRow[]) out[row.key] = row
  return out
}

/** Save (or clear) a draft for one field. Passing null clears the draft. */
export async function saveDraft(page: string, key: string, value: string | null): Promise<void> {
  const { error } = await getSupabase()
    .from('site_content')
    .upsert(
      { page, key, draft: value, updated_at: new Date().toISOString() },
      { onConflict: 'page,key' },
    )
  if (error) throw error
}

/** Discard the draft for one field (revert to the published value). */
export async function discardField(page: string, key: string): Promise<void> {
  const { error } = await getSupabase()
    .from('site_content')
    .update({ draft: null, updated_at: new Date().toISOString() })
    .eq('page', page)
    .eq('key', key)
  if (error) throw error
}

/** Discard all drafts on a page. */
export async function discardPage(page: string): Promise<void> {
  const { error } = await getSupabase()
    .from('site_content')
    .update({ draft: null, updated_at: new Date().toISOString() })
    .eq('page', page)
    .not('draft', 'is', null)
  if (error) throw error
}

/** Publish: move every draft on the page to its published value (admin RPC). */
export async function publishPage(page: string): Promise<void> {
  const { error } = await getSupabase().rpc('publish_content', { p_page: page })
  if (error) throw error
}

/** Upload an image to the public site-images bucket and return its public URL. */
export async function uploadImage(file: File, page: string): Promise<string> {
  const supabase = getSupabase()
  const ext = file.name.split('.').pop() || 'jpg'
  const safe = `${page}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('site-images').upload(safe, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from('site-images').getPublicUrl(safe)
  return data.publicUrl
}
