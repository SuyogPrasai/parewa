import Article from "@/types/post_objects/article"
import { ArticlesResponse } from "@/types/api-responses"
import Notice from "@/types/post_objects/notice"

import NoticeInfo from "@/components/notice/NoteInfo"
import { ArticleRankings } from "@/components/articles/TopArticles"
import NoticeSection from "@/components/notice/NoticeSection";


export default function NoticeDetail({ Notice, Articles, Notices }: { Notice: Notice, Articles: Article[], Notices: Notice[] }) {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-7xl px-2 lgplus:px-8 min-h-screen">
            <div className="flex flex-col lgplus:flex-row gap-6">
                <div className="w-full lgplus:w-2/3">
                    <div className="mb-4 sm:mb-5">
                        {Notice.publisher && Notice.voteCount && Notice && (
                            <NoticeInfo {...Notice} />
                        )}
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-5 my-8 sm:my-10">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-oswald ml-10">SIMILAR NOTICES</h1>
                        <NoticeSection notices={Notices} />
                    </div>
                </div>
                <div className="w-full lgplus:w-1/3 lgplus:ml-4 lg:plus:mt-6 lgplus:mt-0 mb-10">
                    <ArticleRankings articles={Articles} />
                </div>
            </div>
        </div>
    )
}