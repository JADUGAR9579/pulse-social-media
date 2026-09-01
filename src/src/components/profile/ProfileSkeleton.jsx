function Bone({ className }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-surface ${className}`}
      aria-hidden="true"
    />
  );
}

export default function ProfileSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading profile">
      {/* Cover */}
      <div className="h-36 w-full animate-pulse bg-surface sm:h-48" />

      {/* Avatar + action row */}
      <div className="relative px-4">
        <div className="-mt-10 h-20 w-20 rounded-full border-4 border-bg bg-surface sm:-mt-14 sm:h-28 sm:w-28" />
        <div className="mt-3 flex flex-col gap-2.5">
          <Bone className="h-5 w-36" />
          <Bone className="h-3.5 w-24" />
          <Bone className="h-3.5 w-full" />
          <Bone className="h-3.5 w-3/4" />
          <div className="flex gap-4">
            <Bone className="h-3.5 w-20" />
            <Bone className="h-3.5 w-20" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-border">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-1 justify-center py-4">
            <Bone className="h-3.5 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
