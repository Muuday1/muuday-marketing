import { cn } from '@/lib/utils/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-brand-dark">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full rounded-lg border bg-white px-4 py-2 text-brand-dark',
          'focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none',
          'transition-colors resize-y min-h-[100px]',
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
