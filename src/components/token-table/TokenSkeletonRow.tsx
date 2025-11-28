import { Skeleton } from "@/components/ui/skeleton";

export function TokenSkeletonRow() {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 py-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-14" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}
