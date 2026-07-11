/**
 * Vercel serverless function: e-mail a quote or invoice to one or more people.
 *
 * Called from the admin panel ("E-mailen"). The request must carry the admin's
 * Supabase access token (Authorization: Bearer ...); we validate it against
 * Supabase Auth so only a logged-in admin can trigger a send (the panel is
 * invite-only, so any valid user is an admin).
 *
 * Sends a branded e-mail with a big button to the online document. The Resend
 * key lives only in the server env (RESEND_API_KEY). Outside `src`, so the app's
 * TypeScript build ignores it and Vercel builds it as a Node function.
 */

const BRAND = { teal: '#008081', tealDeep: '#013F40', mint: '#42C28C', ink: '#0A1512', cream: '#F4F4F4' }

const esc = (v: unknown): string =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const asText = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() !== '' ? v.trim() : null

/** Split a free-text recipients field into a list of valid e-mail addresses. */
function parseRecipients(input: unknown): string[] {
  const raw = Array.isArray(input) ? input.join(',') : String(input ?? '')
  const seen = new Set<string>()
  return raw
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter((s) => /.+@.+\..+/.test(s))
    .filter((s) => (seen.has(s.toLowerCase()) ? false : (seen.add(s.toLowerCase()), true)))
}

type Row = { label: string; value: string }

function emailHtml(opts: {
  heading: string
  intro: string
  ctaLabel: string
  ctaUrl: string
  rows: Row[]
}): string {
  const rows = opts.rows
    .map(
      (r) => `<tr>
        <td style="padding:7px 0;color:${BRAND.ink};opacity:.5;font-size:13px;width:150px;vertical-align:top;">${esc(r.label)}</td>
        <td style="padding:7px 0;color:${BRAND.ink};font-size:14px;vertical-align:top;">${esc(r.value)}</td>
      </tr>`,
    )
    .join('')
  return `<!doctype html><html><body style="margin:0;background:#eef2f1;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
    <div style="background:linear-gradient(120deg,${BRAND.tealDeep} 0%,${BRAND.teal} 55%,${BRAND.mint} 100%);border-radius:16px 16px 0 0;padding:26px 28px;">
      <div style="color:${BRAND.cream};font-size:20px;font-weight:700;">Minterest</div>
      <div style="color:rgba(244,244,244,.85);font-size:13px;margin-top:2px;">Where interest becomes your growth</div>
    </div>
    <div style="background:#fff;border-radius:0 0 16px 16px;padding:28px;">
      <h1 style="margin:0 0 10px;color:${BRAND.ink};font-size:20px;">${esc(opts.heading)}</h1>
      <p style="margin:0 0 20px;color:${BRAND.ink};opacity:.75;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(opts.intro)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
        <tr><td style="border-radius:12px;background:linear-gradient(120deg,${BRAND.teal},${BRAND.mint});">
          <a href="${esc(opts.ctaUrl)}" style="display:inline-block;padding:13px 26px;color:${BRAND.ink};font-size:15px;font-weight:700;text-decoration:none;">${esc(opts.ctaLabel)}</a>
        </td></tr>
      </table>
      ${rows.length ? `<table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(1,63,64,.1);">${rows}</table>` : ''}
      <p style="margin:22px 0 0;padding-top:16px;border-top:1px solid rgba(1,63,64,.1);color:${BRAND.ink};opacity:.55;font-size:12px;line-height:1.6;">
        Werkt de knop niet? Kopieer deze link in je browser:<br><span style="color:${BRAND.teal};">${esc(opts.ctaUrl)}</span>
      </p>
      <div style="margin-top:18px;padding-top:16px;border-top:1px solid rgba(1,63,64,.08);color:${BRAND.ink};opacity:.5;font-size:12px;">
        Minterest &nbsp;·&nbsp; info@minterest.nl &nbsp;·&nbsp; minterest.nl &nbsp;·&nbsp; KvK 83955526
      </div>
    </div>
  </div></body></html>`
}

async function validateAdmin(token: string): Promise<boolean> {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anon) return false
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/auth/v1/user`, {
      headers: { apikey: anon, Authorization: `Bearer ${token}` },
    })
    return res.ok
  } catch {
    return false
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'RESEND_API_KEY not set' })
    return
  }

  const auth = String(req.headers?.authorization || '')
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token || !(await validateAdmin(token))) {
    res.status(401).json({ ok: false, error: 'Niet gemachtigd' })
    return
  }

  let body: Record<string, unknown> = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
  } catch {
    body = {}
  }

  const kind = body.kind === 'factuur' ? 'factuur' : 'offerte'
  const number = asText(body.number) || ''
  const link = asText(body.link) || ''
  const recipients = parseRecipients(body.to)
  const greetingName = asText(body.greetingName)
  const amount = asText(body.amount)
  const personal = asText(body.message)

  if (!link || recipients.length === 0) {
    res.status(400).json({ ok: false, error: 'Ontbrekende link of geldige ontvanger(s)' })
    return
  }

  const from = process.env.MAIL_FROM || 'Minterest <info@minterest.nl>'
  const internalTo = process.env.MAIL_TO_INTERNAL || 'info@minterest.nl'
  const label = kind === 'factuur' ? 'factuur' : 'offerte'

  const greeting = greetingName ? `Beste ${greetingName},` : 'Beste,'
  const defaultBody =
    kind === 'factuur'
      ? `hierbij je factuur van Minterest. Je kunt hem online bekijken en downloaden via de knop hieronder.`
      : `hierbij je offerte van Minterest. Je kunt hem online bekijken en direct goedkeuren via de knop hieronder.`
  const intro = `${greeting}\n\n${personal || defaultBody}`

  const rows: Row[] = []
  if (number) rows.push({ label: kind === 'factuur' ? 'Factuurnummer' : 'Offertenummer', value: number })
  if (amount) rows.push({ label: 'Bedrag', value: amount })

  const html = emailHtml({
    heading: kind === 'factuur' ? 'Je factuur staat klaar' : 'Je offerte staat klaar',
    intro,
    ctaLabel: kind === 'factuur' ? 'Bekijk je factuur' : 'Bekijk & keur je offerte',
    ctaUrl: link,
    rows,
  })

  const results: Array<{ to: string; ok: boolean; error?: string }> = []
  for (const to of recipients) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          subject: `Je ${label} van Minterest${number ? ` (${number})` : ''}`,
          html,
          reply_to: internalTo,
        }),
      })
      if (r.ok) results.push({ to, ok: true })
      else results.push({ to, ok: false, error: `Resend ${r.status}: ${(await r.text().catch(() => '')).slice(0, 200)}` })
    } catch (e) {
      results.push({ to, ok: false, error: e instanceof Error ? e.message : 'send failed' })
    }
  }

  const sent = results.filter((r) => r.ok).map((r) => r.to)
  const failed = results.filter((r) => !r.ok)
  res.status(failed.length && !sent.length ? 502 : 200).json({ ok: sent.length > 0, sent, failed })
}
