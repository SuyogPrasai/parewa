import { Article } from "@/types/articleSection";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card_newsletter";

// No changes needed for SideArticleCard, it's fine as is.
function SideArticleCard({ article }: { article: Article }) {
  return (
    <Link href={article.link} className="flex">
      <Card className="h-full relative overflow-hidden transition-shadow duration-200 z-10 flex w-full">
        <div className="relative w-[50%]  flex-shrink-0">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        <CardContent className=" pt-4 pl-10 pr-4 flex-1 bg-white flex flex-col"> {/* Removed justify-center for more control */}

          <h3 className="text-2xl mb-3 leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-[80%] mt-0"> {/* Added mt-0 */}
            {article.title}
          </h3>

          {/* If the author name is also too far, ensure it doesn't have unnecessary top margin/padding */}
          <span className="text-primary-block text-xs font-medium font-roboto tracking-widest mb-2">
            {article.author}
          </span>
          <span className="text-black text-[0.875rem] font-medium font-serif tracking-widest mb-2">
            {article.subtitle}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

interface SideArticleListProps {
  articles: Article[];
}

function SideArticleList({ articles }: SideArticleListProps) {
  // Defensive check: Ensure articles is an array, or default to an empty array.
  const articlesToRender = articles || [];

  return (
    <section className="w-full space-y-8">
      {articlesToRender.length > 0 ? (
        articlesToRender.map((article) => (
          <SideArticleCard key={article.link} article={article} />
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