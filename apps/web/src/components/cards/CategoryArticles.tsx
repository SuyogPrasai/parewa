import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/image";
import { type Article } from "@/schemas/backend_schemas/articleSchema";

import { Card } from "../ui/card";
import { CardContent } from "../ui/card";

type CategoryArticlesSectionProps = {
  article: Article;
};

function CategoryArticlesSection({ article }: CategoryArticlesSectionProps) {
  const formattedDate = article.publishedAt
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(new Date(article.publishedAt))
    : "Recently";

  const authorLabel = article.author.displayName;

  const imageUrl = article.featuredImage?.asset?._ref ? urlFor(article.featuredImage).width(800).height(520).url() : null;

  return (
    <Link href={`/articles/${article.slug}`} className="group flex w-full">
      <Card className="h-full relative overflow-hidden transition-shadow duration-200 z-10 flex flex-col sm:flex-row w-full py-0 bg-card text-card-foreground rounded-none ring-0">
        <div className="mx-auto relative w-full sm:w-[50%] shrink-0 h-48 sm:h-auto min-h-48 bg-muted/20">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted/30 via-background to-muted/50 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              No image available
            </div>
          )}
        </div>
        <CardContent className="pt-4 pl-4 sm:pl-6 lg:pl-10 pr-4 flex-1 bg-card flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="author-part w-full sm:w-[50%] flex flex-col">
              <h3 className="font-heading text-xl sm:text-2xl mb-3 leading-tight font-bold transition-colors duration-200 w-full sm:w-[80%] mt-0 group-hover:text-primary">
                {article.title}
              </h3>
              <div className="flex flex-row gap-2 sm:gap-3">
                <span className="text-primary text-xs font-medium font-mono tracking-widest mb-2">
                  {authorLabel}
                </span>
                <span className="text-primary text-xs font-medium font-secondary tracking-widest mb-2">
                  {' - '}
                </span>
                <span className="text-muted-foreground text-xs font-medium font-secondary tracking-widest mb-2">
                  {formattedDate}
                </span>
              </div>
            </div>
            <div className="description-part w-full sm:w-[50%]">
              <span className="text-foreground text-sm sm:text-[0.875rem] font-medium font-serif tracking-widest line-clamp-4">
                {article.oneLiner}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryArticlesSection