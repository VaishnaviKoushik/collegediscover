import { Skeleton } from "./skeleton";

export function CollegeCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-14 rounded-lg" />
        <Skeleton className="h-14 rounded-lg" />
      </div>
      <Skeleton className="h-4 w-24" />
      <div className="flex gap-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

const GRID_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
const STAT_KEYS = ["s1", "s2", "s3", "s4"];

export function CollegeGridSkeleton({ count = 9 }: { count?: number }) {
  const keys = GRID_KEYS.slice(0, Math.min(count, GRID_KEYS.length));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {keys.map((k) => (
        <CollegeCardSkeleton key={k} />
      ))}
    </div>
  );
}

export function CollegeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_KEYS.map((k) => (
            <Skeleton key={k} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
      <Skeleton className="h-40 rounded-xl" />
      <Skeleton className="h-60 rounded-xl" />
    </div>
  );
}

export function FilterPanelSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
    </div>
  );
}
