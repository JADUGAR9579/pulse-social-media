import { cn } from '../../lib/cn';

const VARIANTS = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-surface text-text-primary hover:bg-surface-hover border border-border',
  ghost: 'bg-transparent text-text-primary hover:bg-surface',
  danger: 'bg-danger text-white hover:opacity-90',
};

const SIZES = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

/**
 * Base button used across the app. Keep every interactive surface
 * funneled through this component so focus states, sizing, and
 * disabled handling stay consistent.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
