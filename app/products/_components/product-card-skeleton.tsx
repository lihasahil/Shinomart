"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProductSkeleton() {
  return (
    <Card className="flex flex-col bg-background p-4">
      <div className="flex justify-center p-4">
        <Skeleton className="h-30 w-30 rounded" />
      </div>
      <div className="space-y-3 flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
      <div className="flex justify-center mt-4">
        <Skeleton className="h-10 w-2/3 rounded" />
      </div>
    </Card>
  );
}
