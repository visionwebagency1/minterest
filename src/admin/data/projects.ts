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

export async function createProject(input: ProjectInput): Promise<Project> {
  const { data, error } = await getSupabase()
    .from('projects')
    .insert({ ...input, updated_at: new Date().toISOString() })
    .select('*')
    .single()
  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  const { error } = await getSupabase()
    .from('projects')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
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
