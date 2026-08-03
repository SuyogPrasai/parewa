import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/image';
import { Article } from '@/schemas/backend_schemas/articleSchema';

type MostReadCardProps = {
  article: Article;
  className?: string;
};

function MostReadCard({ article, className }: MostReadCardProps) {
  const authorLabel = article.author.displayName;

  const imageUrl = article.featuredImage?.asset?._ref
    ? urlFor(article.featuredImage).width(200).height(200).url()
    : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn('group flex w-full flex-col gap-3 lg:max-w-[8em]', className)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted lg:aspect-square lg:w-20 xl:w-24">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            sizes="(min-width: 1280px) 96px, (min-width: 1024px) 80px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <h3 className="text-base font-extrabold leading-tight tracking-tight text-foreground group-hover:underline sm:text-lg">
        {article.title}
      </h3>

      <span className="text-sm font-medium text-primary hover:underline">
        {authorLabel}
      </span>
    </Link>
  );
}

export default MostReadCard;