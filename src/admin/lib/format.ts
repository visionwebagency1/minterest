/** Shared formatting helpers for the admin panel (Dutch locale). */

const dateTime = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const dateOnly = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '-'
  return dateTime.format(new Date(value))
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return '-'
  return dateOnly.format(new Date(value))
}

/** "2 uur geleden" style relative time, kept simple and Dutch. */
export function timeAgo(value: string | null | undefined): string {
  if (!value) return ''
  const diff = Date.now() - new Date(value).getTime()
  const min = Math.round(diff / 60000)
  if (min < 1) return 'zojuist'
  if (min < 60) return `${min} min geleden`
  const hours = Math.round(min / 60)
  if (hours < 24) return `${hours} uur geleden`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'dag' : 'dagen'} geleden`
  return formatDate(value)
}
