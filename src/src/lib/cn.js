import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Usage: cn('px-2 py-1', isActive && 'bg-accent', className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
