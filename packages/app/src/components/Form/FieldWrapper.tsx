import { FieldError } from 'react-hook-form'

type FieldWrapperProps = {
  label: string
  name: string
  error?: FieldError
  children: React.ReactNode
}

export const FieldWrapper = ({
  label,
  name,
  error,
  children,
}: FieldWrapperProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-bold">
        {label}
      </label>
      {children}
      {error?.message && (
        <p className="text-xs italic text-red-500">{error.message}</p>
      )}
    </div>
  )
}
