/**
 * Animated skeleton card shown while tweets are loading.
 * Matches the exact layout of TweetCard so there's no layout shift.
 */
function Bone({ className }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-surface ${className}`}
      aria-hidden="true"
    />
  );
}

function TweetSkeletonItem() {
  return (
    <div className="flex gap-3 border-b border-border px-4 py-4">
      <Bone className="h-10 w-10 flex-shrink-0 !rounded-full" />
      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex gap-2">
          <Bone className="h-3.5 w-24" />
          <Bone className="h-3.5 w-16" />
        </div>
        <Bone className="h-3.5 w-full" />
        <Bone className="h-3.5 w-4/5" />
        <Bone className="h-3.5 w-2/3" />
        <div className="mt-1 flex gap-6">
          <Bone className="h-3 w-8" />
          <Bone className="h-3 w-8" />
          <Bone className="h-3 w-8" />
          <Bone className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}

export default function TweetSkeleton({ count = 5 }) {
  return (
    <div aria-busy="true" aria-label="Loading tweets">
      {Array.from({ length: count }).map((_, i) => (
        <TweetSkeletonItem key={i} />
      ))}
    </div>
  );
}
