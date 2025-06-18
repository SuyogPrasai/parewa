import Article from "@/types/post_objects/article";

import { Card, CardContent } from "@/components/ui/card_newsletter";

import Link from "next/link";
import Image from "next/image";

export const ArticleRankings = ({ articles }: { articles: Article[] }) => {
    return (
        <div className="flex flex-col gap-6 lg:mr-5 max-w-[850px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                <div className="flex flex-col gap-6">
                    {articles.slice(0, 3).map((article, index) => (
                        <SideArticleCard key={article._id} article={article} rank={index + 1} />
                    ))}
                </div>
                <div className="flex flex-col gap-6">
                    {articles.slice(3, 6).map((article, index) => (
                        <SideArticleCard key={article._id} article={article} rank={index + 4} />
                    ))}
                </div>
            </div>
        </div>
    );
};

function SideArticleCard({ article, rank }: { article: Article; rank: number }) {
    return (
        <Card className="h-full overflow-hidden relative rounded w-full lg:w-[400px] flex">

            <Link href={article.link || "#"} className="flex flex-col md:flex-row h-full flex-1">
                <div className="relative w-full md:w-[50%] flex-shrink-0">
                    <Image src={article.featuredImage || ""} alt={article.title} fill className="object-cover" />
                </div>
                <CardContent className="px-4 pt-4 flex-1 bg-white relative">
                    <div className="relative bg-black w-[40%] rounded-lg h-[0.15rem] mb-2"></div>
                    <h3 className="text-sm font-bold hover:text-primary-block transition-colors duration-200 font-oswald tracking-wide">
                        {article.title.toUpperCase()}
                    </h3>
                    <span className="text-primary-block text-xs font-medium font-roboto">{article.author}</span>
                </CardContent>
            </Link>
            <div className={`flex items-center bg-[#ffffff] justify-center right-10 bottom-0 absolute w-16 bg-white-500 font-mono text-xl ${rank === 1 ? 'text-red-500' : rank === 2 ? 'text-orange-500' : rank === 3 ? 'text-green-500' : 'text-[#232323]'}`}>
                {rank.toString().padStart(2, '0')}
            </div>
        </Card>
    );
}