import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getPublishedContent } from '@/lib/siteContent'
import { defaultsFor } from './registry'

/**
 * Provides the content resolver `c(key)` to a page's sections. Fetches the
 * published overrides once per page and merges them over the registry defaults.
 *
 * Until the fetch resolves (and whenever a key has no published override), `c`
 * returns the registry default, which is the exact current text. So the page
 * renders identically and only changes once an edit is actually published.
 */
type Resolver = (key: string) => string

const ContentContext = createContext<Resolver | null>(null)

export function SiteContentProvider({ page, children }: { page: string; children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({})

  useEffect(() => {
    let active = true
    getPublishedContent(page)
      .then((data) => active && setOverrides(data))
      .catch(() => {})
    return () => {
      active = false
    }
  }, [page])

  const resolver = useMemo<Resolver>(() => {
    const defaults = defaultsFor(page)
    return (key) => overrides[key] ?? defaults[key] ?? ''
  }, [page, overrides])

  return <ContentContext.Provider value={resolver}>{children}</ContentContext.Provider>
}

/**
 * Returns the resolver. Works without a provider too (falls back to '' so a
 * shared component used on a page without a provider never crashes); on the
 * homepage the provider supplies the real values.
 */
export function useContent(): Resolver {
  return useContext(ContentContext) ?? (() => '')
}
