import { useState } from 'react'
import { submitLead, type LeadPayload } from './submitLead'

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Shared form state machine for the lead forms (contact / start / audit).
 * Handles the submitting → success | error transitions and surfaces an error message.
 */
export function useLeadForm(formType: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(data: LeadPayload) {
    setStatus('submitting')
    setError(null)
    try {
      await submitLead(formType, data)
      setStatus('success')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Er ging iets mis. Probeer het opnieuw.')
    }
  }

  return { status, error, submit, isSubmitting: status === 'submitting', isSuccess: status === 'success' }
}
