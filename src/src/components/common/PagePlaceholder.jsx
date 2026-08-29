/**
 * Temporary placeholder for pages whose real implementation
 * lands in a later roadmap phase. Replaced module by module —
 * never left in the final build.
 */
export default function PagePlaceholder({ title, phase }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      <p className="max-w-sm text-sm text-text-muted">
        This module is built in {phase} of the roadmap. The route and layout are wired up
        and ready for that phase's components.
      </p>
    </div>
  );
}
