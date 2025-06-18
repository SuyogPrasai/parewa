import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';

import Article from "@/types/post_objects/article";

import { Card, CardContent } from "@/components/ui/card_newsletter";

interface SideArticleCardProps {
  article: Article;
  variant?: "simple" | "detailed";
}

function SideArticleCard({ article, variant = "detailed" }: SideArticleCardProps) {
  const getFormattedDate = format(article.publishedIn, 'MMMM d');

  return (
    <Link href={article.link || "#"} className="flex">
      <Card className="h-full relative overflow-hidden transition-shadow duration-200 z-10 flex flex-col sm:flex-row w-full">
        <div className="mx-auto relative w-full sm:w-[50%] max-w-[400px] flex-shrink-0 h-48 sm:h-auto">
          <Image 
            src={article.featuredImage || ""} 
            alt={article.title} 
            fill 
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>

        <CardContent className="pt-4 pl-4 sm:pl-6 lg:pl-10 pr-4 flex-1 bg-white flex flex-col">
          {variant === "simple" ? (
            <>
              <h3 className="text-2xl sm:text-2xl mb-3 leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-full sm:w-[80%] mt-0">
                {article.title}
              </h3>
              <span className="text-primary-block text-xs font-medium font-roboto tracking-widest mb-2">
                {article.author}
              </span>
              <span className="text-black text-sm sm:text-[0.875rem] font-medium font-serif tracking-widest mb-2 line-clamp-2">
                {article.oneLiner}
              </span>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="author-part w-full sm:w-[50%] flex flex-col">
                <h3 className="text-xl sm:text-2xl mb-3 leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-full sm:w-[80%] mt-0">
                  {article.title}
                </h3>
                <div className="flex flex-row gap-2 sm:gap-3">
                  <span className="text-primary-block text-xs font-medium font-roboto tracking-widest mb-2">
                    {article.author}
                  </span>
                  <span className="text-primary-block text-xs font-medium font-roboto tracking-widest mb-2">
                    {" - "}
                  </span>
                  <span className="text-gray-400 text-xs font-medium font-roboto tracking-widest mb-2">
                    {getFormattedDate}
                  </span>
                </div>
              </div>
              <div className="description-part w-full sm:w-[50%]">
                <span className="text-black text-sm sm:text-[0.875rem] font-medium tracking-widest font-serif mb-2 line-clamp-4 ">
                  {article.oneLiner}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

interface SideArticleListProps {
  articles: Article[];
  variant?: "simple" | "detailed";
}

function SideArticleList({ articles = [], variant = "detailed" }: SideArticleListProps) {
  return (
    <section className="w-full space-y-6 sm:space-y-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <SideArticleCard key={article._id} article={article} variant={variant} />
        ))
      ) : (
        <p className="text-gray-500 text-center font-roboto text-sm sm:text-base">
          No articles available.
        </p>
      )}
    </section>
  );
}

export default SideArticleList;