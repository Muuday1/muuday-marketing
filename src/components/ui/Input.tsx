import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-brand-dark">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-2 text-brand-dark',
          'focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none',
          'transition-colors',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-brand-slate/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
