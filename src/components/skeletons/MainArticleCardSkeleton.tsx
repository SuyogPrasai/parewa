import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MainArticleCardSkeleton() {
  return (
    <article className="md:col-span-2 z-10">
      <Card className="h-full rounded-lg overflow-hidden">
        <div className="relative h-56 md:h-72 lg:h-80">
          <Skeleton className="h-full w-full rounded-t-lg" />
        </div>
        <CardContent className="p-6 bg-white">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    </article>
  );
}