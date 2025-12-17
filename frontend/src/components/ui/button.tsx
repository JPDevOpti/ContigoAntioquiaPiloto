import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  asChild?: boolean
  icon?: boolean
}

export function Button({ className, variant = 'primary', asChild, icon, children, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'
  const styles: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-white hover:bg-primary-dark border border-primary-dark shadow-sm shadow-primary/30',
    secondary:
      'bg-white text-slate-800 border border-slate-200 hover:border-primary-light hover:text-primary-dark shadow-sm',
    ghost: 'bg-transparent text-slate-700 hover:text-primary-dark border border-transparent'
  }

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-60',
        icon && 'pl-4 pr-3',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

