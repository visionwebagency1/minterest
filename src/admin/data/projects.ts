import { getSupabase } from '@/lib/supabase'
import type { Project } from '@/lib/projects'

/** Admin CRUD for portfolio projects. Public reads live in src/lib/projects.ts. */

export type { Project }
export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>

/** URL-safe slug from a title. */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, 'en')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await getSupabase()
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as Project[]
}

export async function fetchProject(id: string): Promise<Project | null> {
  const { data, error } = await getSupabase().from('projects').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return (data as Project) ?? null
}

/**
 * If a write fails because a column is not in the schema (PGRST204, e.g. an
 * optional field like before_image on a DB that has not run that migration),
 * return the offending column name so we can drop it and retry. This keeps the
 * admin working across schema versions instead of hard-failing the whole save.
 */
function missingColumn(error: unknown): string | null {
  const e = error as { code?: string; message?: string } | null
  if (e && e.code === 'PGRST204' && typeof e.message === 'string') {
    const m = e.message.match(/Could not find the '([^']+)' column/)
    if (m) return m[1]
  }
  return null
}

export async function createProject(input: ProjectInput): Promise<Project> {
  let body: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() }
  for (let attempt = 0; attempt < 6; attempt++) {
    const { data, error } = await getSupabase().from('projects').insert(body).select('*').single()
    if (!error) return data as Project
    const col = missingColumn(error)
    if (!col || !(col in body)) throw error
    delete body[col]
  }
  throw new Error('Opslaan mislukt.')
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  let body: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() }
  for (let attempt = 0; attempt < 6; attempt++) {
    const { error } = await getSupabase().from('projects').update(body).eq('id', id)
    if (!error) return
    const col = missingColumn(error)
    if (!col || !(col in body)) throw error
    delete body[col]
  }
  throw new Error('Opslaan mislukt.')
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await getSupabase().from('projects').delete().eq('id', id)
  if (error) throw error
}

/** Upload a project image to the public site-images bucket, return its URL. */
export async function uploadProjectImage(file: File): Promise<string> {
  const supabase = getSupabase()
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('site-images').upload(path, file, { cacheControl: '3600' })
  if (error) throw error
  return supabase.storage.from('site-images').getPublicUrl(path).data.publicUrl
}
