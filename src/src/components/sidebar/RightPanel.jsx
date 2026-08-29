/**
 * Right column — search box, trends, suggested follows.
 * Populated in Phase 5 (Explore module). Reserved here so the
 * three-column layout is correct from Phase 1 onward.
 */
export default function RightPanel() {
  return (
    <aside className="sticky top-6 hidden h-fit w-[320px] flex-col gap-4 xl:flex">
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display text-base font-semibold">What's happening</h2>
        <p className="mt-2 text-sm text-text-muted">
          Trending topics will appear here once the Explore module is built.
        </p>
      </div>
      <div className="glass rounded-2xl p-4">
        <h2 className="font-display text-base font-semibold">Who to follow</h2>
        <p className="mt-2 text-sm text-text-muted">
          Suggested accounts will appear here once profiles are wired up.
        </p>
      </div>
    </aside>
  );
}
