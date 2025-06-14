import Article from "@/types/post_objects/article";

import { ArticleRankings as TopArticlesRankingsCompact } from "@/components/articles/TopArticles";
import ArticleRankingsFull from "@/components/collections/CollectionsTopArticles";
import NewsletterSignupCard from "./NewsletterSignupCard";

export default async function NewsletterSignup({ articles }: { articles: Article[] }) {




    return (
        <>
            <div className="flex flex-col justify-center">

                <h2 className="md:mx-30 max-w-[800px] mx-auto lgplus:ml-[80px] text-black text-2xl sm:text-3xl lg:text-4xl font-bold pr-4 sm:pr-5 font-oswald mb-8 sm:mb-10 ">
                    Article Rankings for the Month
                </h2>

                <div className="flex lgplus:flex-row flex-col justify-center">
                    <div className="w-full lg:w-auto lg:min-w-[300px] xl:min-w-[350px] lg:ml-5">
                        {/* Show compact version on large screens (lg and above) */}
                        <div className="hidden lg:flex lg:justify-center">
                            <TopArticlesRankingsCompact articles={articles} />
                        </div>
                        {/* Show full version on smaller screens */}
                        <div className="lg:hidden">
                            <ArticleRankingsFull articles={articles} />
                        </div>
                    </div>

                    <NewsletterSignupCard />
                </div>

            </div>
        </>
    )
}