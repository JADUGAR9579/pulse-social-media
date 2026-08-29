/**
 * Full-page fallback for React.lazy/Suspense boundaries.
 * Skeleton screens for specific pages (feed, profile, etc.) are
 * added per-module in their respective phases.
 */
export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
