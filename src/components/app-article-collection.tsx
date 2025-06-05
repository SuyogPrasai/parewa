import { format } from 'date-fns';

import { Article } from "@/types/articleSection";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card_newsletter";

interface SideArticleCardProps {
  article: Article;
  variant?: "simple" | "detailed"; // Add more variants as needed
}

// No changes needed for SideArticleCard, it's fine as is.
function SideArticleCard({ article, variant = "detailed" }: SideArticleCardProps) {
  const getFormattedDate = format(new Date(article.date), 'MMMM d');

  return (
    <Link href={article.link} className="flex">
      <Card className="h-full relative overflow-hidden transition-shadow duration-200 z-10 flex w-full">
        <div className="relative w-[50%] max-w-[400px] flex-shrink-0">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <CardContent className="pt-4 pl-10 pr-4 flex-1 bg-white flex flex-col">
          {variant === "simple" ? (
            <>
              <h3 className="text-2xl mb-3 leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-[80%] mt-0">
                {article.title}
              </h3>
              <span className="text-primary-block text-xs font-medium font-roboto tracking-widest mb-2">
                {article.author}
              </span>
              <span className="text-black text-[0.875rem] font-medium font-serif tracking-widest mb-2">
                {article.subtitle}
              </span>
            </>
          ) : (
            <div className="flex flex-row w-full">
              <div className="author-part w-[50%] flex flex-col">
                <h3 className="text-2xl mb-3 leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-[80%] mt-0">
                  {article.title}
                </h3>
                <div className="flex flex-row gap-3">
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
              <div className="description-part w-[50%]">
                <span className="text-black text-[0.875rem] font-medium font-serif tracking-widest mb-2">
                  {article.subtitle}
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
    <section className="w-full space-y-8">
      {articles.length > 0 ? (
        articles.map((article) => (
          <SideArticleCard key={article.link} article={article} variant={variant} />
        ))
      ) : (
        <p className="text-gray-500 text-center font-roboto">
          No articles available.
        </p>
      )}
    </section>
  );
}

export default SideArticleList;