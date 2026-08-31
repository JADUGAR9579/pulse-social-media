/**
 * Format a raw count into a compact display string.
 * 142       → "142"
 * 1420      → "1.4K"
 * 1_200_000 → "1.2M"
 */
export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

/**
 * Relative time label — delegates to dayjs.
 * Imported lazily so this util stays backend-agnostic.
 */
export function relativeTime(iso) {
  // Lazy import to avoid adding dayjs to the critical bundle
  const dayjs = window.__dayjs__;
  if (dayjs) return dayjs(iso).fromNow();
  // Fallback: basic diff
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
