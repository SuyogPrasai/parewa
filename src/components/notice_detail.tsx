import { Notice } from "@/types/singleNotice"
import { ArticlesResponse, Article } from "@/types/articleSection"

import NoticeInfo from "./note_info"
import ArticleRankings from "./app-side-top-articles"


export default function NoticeDetail ({ Notice, Articles } : { Notice: Notice , Articles: Article[]}) {

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-2">
                <div className="w-full">
                    <NoticeInfo 
                        title={Notice.title}
                        date={Notice.publishedIn}
                        publisher={Notice.publisher.name}
                        tags={Notice.postTags}
                        content={Notice.content}
                        featured_image={Notice.featuredImage}
                        voteCount={Notice.voteCount}
                    />
                </div>
                <div className="w-full ">
                    <ArticleRankings articles={Articles} />
                </div>
            </div>
        </>
    )
}