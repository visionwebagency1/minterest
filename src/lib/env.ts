/**
 * Sanitized Supabase environment values, shared by the admin client and the
 * public (anon) REST helpers. Pure strings only — safe in the public bundle.
 *
 * Why sanitize: when configuring Vercel it is easy to paste a whole `.env` line
 * ("VITE_SUPABASE_URL=https://...") or a quoted value into the value field. That
 * would make `createClient` throw on an invalid URL and (without an error
 * boundary) blank the whole app. We strip those mistakes so a small config slip
 * does not take the site down.
 */

/** Trim, drop an accidental "KEY=" prefix, and strip surrounding quotes. */
function clean(value: string | undefined): string | undefined {
  if (!value) return undefined
  let s = value.trim()
  // A pasted "VITE_SUPABASE_URL=..." line: keep only the part after the key.
  const prefixed = s.match(/^[A-Z0-9_]+=(.*)$/s)
  if (prefixed) s = prefixed[1].trim()
  // Surrounding single or double quotes.
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim()
  }
  return s || undefined
}

/** Clean a URL: add https:// if missing and validate; undefined if unusable. */
function cleanUrl(value: string | undefined): string | undefined {
  const s = clean(value)
  if (!s) return undefined
  const withProtocol = /^https?:\/\//i.test(s) ? s : `https://${s}`
  try {
    return new URL(withProtocol).origin
  } catch {
    return undefined
  }
}

export const SUPABASE_URL = cleanUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined)
export const SUPABASE_ANON_KEY = clean(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)

/** True only when both values are present and the URL is valid. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
