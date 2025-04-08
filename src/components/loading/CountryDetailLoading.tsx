import { Skeleton } from "@/components/ui/skeleton"

export function CountryDetailLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Skeleton className="h-10 w-24" />

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Skeleton className="w-full aspect-video" />

        <div className="space-y-8">
          <Skeleton className="h-8 w-3/4" />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 