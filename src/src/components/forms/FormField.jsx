import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * Accessible form field: label → input → error message.
 * Registered with React Hook Form via the ref forwarded from register().
 */
const FormField = forwardRef(function FormField(
  {
    label,
    id,
    error,
    className,
    type = 'text',
    hint,
    rightElement,
    ...props
  },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-muted"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            'h-11 w-full rounded-xl border bg-bg px-3 text-sm text-text-primary placeholder:text-text-faint',
            'outline-none transition-colors',
            'focus-visible:border-accent',
            error
              ? 'border-danger focus-visible:border-danger'
              : 'border-border',
            rightElement && 'pr-10',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text-faint">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
