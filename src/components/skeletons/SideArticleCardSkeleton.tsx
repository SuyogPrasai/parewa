import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SideArticleCardSkeleton() {
  return (
    <Card className="h-full relative overflow-hidden rounded-lg z-10">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-40 flex-shrink-0">
          <Skeleton className="h-full w-full" />
        </div>
        <CardContent className="px-4 pt-4 flex-1 bg-white">
          <Skeleton className="h-2 w-1/2 mb-2" />
          <Skeleton className="h-6 w-[80%] mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </CardContent>
      </div>
    </Card>
  );
}