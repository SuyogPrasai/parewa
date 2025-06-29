import Link from "next/link";
import { format } from 'date-fns';

import Article  from "@/types/post_objects/article";
import { Card } from "@/components/ui/card_newsletter";
import { Badge } from "@/components/ui/badge";

function ArticleRankings({ articles }: { articles: Article[] }) {
    return (
        <div className="w-full flex flex-col gap-4 lg:mr-4 justify-center md:w-full max-w-full px-1 sm:px-2 lg:px-0">
            <div className="relative flex items-center justify-center group w-full max-w-[280px] mx-auto cursor-pointer mb-3 sm:max-w-[320px] lg:max-w-[360px]">
                <div className="absolute bg-gradient-to-r from-pink-200 to-pink-300 transform -skew-x-12 px-4 py-2 w-full h-full -translate-x-1 translate-y-1 shadow-lg transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 z-0"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-oswald text-base sm:text-lg md:text-xl lg:text-2xl px-5 py-2.5 transform -skew-x-12 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 z-10 flex items-center justify-center">
                    ARTICLE RANKINGS
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {articles.slice(0, 6).map((article, i) => (
                    <SideArticleCard
                        key={article._id}
                        article={article}
                        rank={i + 1}
                    />
                ))}
            </div>
        </div>
    );
}

const SideArticleCard = ({ article, rank }: { article: Article; rank: number }) => {
    let formattedDate = "Invalid date";
    console.log(article.publishedIn)
    try {
        if (article.publishedIn) {
            formattedDate = format(new Date(article.publishedIn), 'MMMM d, h:mm a');
        }
    } catch (error) {
        console.error("Error formatting date:", error);
    }

    return (
        <Card className="h-[75px] sm:h-[85px] rounded-lg flex lgplus:max-w-[320px] border border-gray-200 p-2 py-3 items-center transition-all duration-300 ease-in-out hover:shadow-md">
            <Link href={article.link || "#"} className="flex flex-row justify-start w-full overflow-hidden">
                <span
                    className={`text-base sm:text-lg p-2 mr-2 font-lato ${rank === 1
                        ? 'text-red-600'
                        : rank === 2
                            ? 'text-yellow-500'
                            : rank === 3
                                ? 'text-green-600'
                                : 'text-gray-600'
                        }`}
                >
                    {rank.toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col overflow-hidden w-full gap-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm md:text-[14px] lg:text-[15px] font-bold font-sans truncate whitespace-nowrap overflow-hidden w-full hover:text-blue-600 transition-colors duration-300 max-w-[80%]">
                            {article.title}
                        </h3>
                    </div>
                    <h3 className="text-[10px] sm:text-xs text-gray-500 truncate">
                        {formattedDate}
                    </h3>
                    <div className="flex items-center pl-2">
                        <Badge variant="secondary" className="text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5">
                            #{article.category}
                        </Badge>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default ArticleRankings;