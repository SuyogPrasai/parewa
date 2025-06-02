import {
    Card,
    CardContent,
} from "@/components/ui/card_newsletter";
import Link from "next/link";
import { Article } from "@/types/articleSection";


const ArticleRankings = ({ articles }: { articles: Article[] }) => (
    <div className="flex flex-col gap-4 lg:mr-5">
        <h2 className="text-black text-4xl font-bold font-oswald ml-2">Rankings</h2>
        <div className="flex flex-col gap-2">
            {articles.slice(0, 6).map((article, i) => (
                <SideArticleCard key={article.link} article={article} rank={i + 1} />
            ))}
        </div>
    </div>
);

const SideArticleCard = ({ article, rank }: { article: Article; rank: number }) => (
    <Card className="h-[75px] overflow-hidden rounded-lg flex w-full lg:w-[300px] border border-gray-200 p-2">
        <div className="flex items-center gap-2">
            <div className="w-7 flex items-center justify-end font-sans text-xl text-[#232323]">
                {rank.toString().padStart(2, '0')}
            </div>
        </div>
        <Link href={article.link} className="flex-1 h-full">
            <CardContent className="px-4 py-3 h-full relative bg-white flex flex-col justify-center">
                <div className="absolute w-[2px] h-[40px] bg-primary"></div>
                <div className="pl-2">

                <h3 className="text-md mt-2 font-bold font-oswald hover:text-primary-block transition-colors  pl-3">
                    {article.title.toUpperCase()}
                </h3>
                <span className="text-xs font-medium font-roboto text-primary-block pl-2 my-2">
                    {article.author}
                </span>
                </div>
            </CardContent>
        </Link>
    </Card>
);



export default ArticleRankings;
