import { Notice } from "@/types/singleNotice"
import { ArticlesResponse, Article } from "@/types/articleSection"

import NoticeInfo from "./note_info"
import ArticleRankings from "./app-side-top-articles"
import NoticeSection from "./app-notice-section";

interface Notice_Multi {
    _id: string;
    title: string;
    content: string;
    publishedIn: string;
    postTags: string[];
    voteCount: number;
    author: string;
    trashed: boolean;
    link: string;
}

export default function NoticeDetail({ Notice, Articles, Notices }: { Notice: Notice, Articles: Article[], Notices: Notice_Multi[] }) {
    return (
        <div className="flex flex-col gap-4 mx-auto max-w-7xl px-2 lgplus:px-8 min-h-screen">
            <div className="flex flex-col lgplus:flex-row gap-6">
                <div className="w-full lgplus:w-2/3">
                    <div className="mb-4 sm:mb-5">
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