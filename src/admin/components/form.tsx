import type { ReactNode, TextareaHTMLAttributes, InputHTMLAttributes } from 'react'

/** Shared form controls for the admin panel: labelled inputs and buttons. */

const baseField =
  'w-full rounded-xl border border-emerald-deep/15 bg-white px-3.5 py-2.5 font-sans text-sm text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-emerald'

export function TextField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-sm font-semibold text-near-black">
        {label}
        {!props.required && <span className="ml-1 font-normal text-near-black/35">optioneel</span>}
      </span>
      <input {...props} className={baseField} />
      {hint && <span className="font-sans text-xs text-near-black/45">{hint}</span>}
    </label>
  )
}

export function TextAreaField({
  label,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-sm font-semibold text-near-black">
        {label}
        {!props.required && <span className="ml-1 font-normal text-near-black/35">optioneel</span>}
      </span>
      <textarea {...props} className={`${baseField} min-h-[6rem] resize-y`} />
    </label>
  )
}

export function PrimaryButton({
  children,
  ...props
}: { children: ReactNode } & InputHTMLAttributes<HTMLButtonElement> & { type?: 'button' | 'submit' }) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-md shadow-emerald/20 transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      {children}
    </button>
  )
}

export function GhostButton({
  children,
  ...props
}: { children: ReactNode } & InputHTMLAttributes<HTMLButtonElement> & { type?: 'button' | 'submit' }) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-deep/15 bg-white px-5 py-2.5 font-sans text-sm font-semibold text-near-black/70 transition-colors hover:border-emerald/40 hover:text-near-black disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  )
}
