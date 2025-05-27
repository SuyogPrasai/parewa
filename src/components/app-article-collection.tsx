import { Article } from "@/types/articleSection";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

// No changes needed for SideArticleCard, it's fine as is.
function SideArticleCard({ article }: { article: Article }) {
  return (
    <Card className="h-full relative overflow-hidden hover:shadow-md transition-shadow duration-200 rounded-lg z-10">
      <Link href={article.link} className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-40 flex-shrink-0">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>
        <CardContent className="px-4 pt-4 flex-1 bg-white">
          <div className="relative bg-black w-[70%] rounded-lg h-[0.15rem] mb-2"></div>
          <h3 className="text-lg leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-[80%]">
            {article.title}
          </h3>
          <span className="text-primary-block text-xs font-medium font-roboto tracking-widest">{article.author}</span>
        </CardContent>
      </Link>
    </Card>
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