import {
    Card,
    CardContent,
} from "@/components/ui/card_newsletter";
import Link from "next/link";
import { Article } from "@/types/articleSection";
import { Badge } from "./ui/badge";
import { format } from 'date-fns';

function ArticleRankings({ articles }: { articles: Article[] }) {
    return (
        <div className="flex flex-col gap-4 lg:mr-5 justify-center">
            <div className="relative flex items-center justify-center group w-[265px] mx-auto cursor-pointer mb-3">
                <div className="absolute bg-gradient-to-r from-pink-200 to-pink-300  transform -skew-x-12 px-4 py-2 w-full h-full -translate-x-1 translate-y-1 shadow-lg transition-all duration-300 group-hover:-translate-x-2 group-hover:translate-y-2 z-0"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white font-oswald text-lg md:text-xl lg:text-2xl px-6 py-3 transform -skew-x-12 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 z-10 flex items-center justify-center">
                    ARTICLE RANKINGS
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {articles.slice(0, 6).map((article, i) => (
                    <SideArticleCard
                        key={article.link}
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
    console.log(article.date)
    try {
        if (article.date) {
            formattedDate = format(new Date(article.date), 'MMMM d, h:mm a');
        }
    } catch (error) {
        console.error("Error formatting date:", error);
    }

    return (
        // Add transition for smooth hover effects
        <Card className="h-[75px] overflow-hidden rounded-lg flex w-full max-w-[275px] border border-gray-200 p-2 py-3 items-center
                       transition-all duration-300 ease-in-out hover:shadow-md"> {/* Hover shadow effect */}
            <Link href={article.link} className="flex flex-row justify-start w-full overflow-hidden">
                <span
                    className={`text-xl p-2 mr-2 font-lato ${rank === 1
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
                        <h3 className="text-sm font-bold font-sans truncate whitespace-nowrap overflow-hidden w-full
                                       hover:text-blue-600 transition-colors duration-300"> {/* Blue title on hover */}
                            {article.title}
                        </h3>
                    </div>
                    <h3 className="text-xs text-gray-500 truncate">
                        {formattedDate}
                    </h3>
                    <div className="flex items-center pl-2">
                        <Badge variant="secondary" className="text-xs font-medium px-1.5 py-0.5">
                            #{article.category}
                        </Badge>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default ArticleRankings;