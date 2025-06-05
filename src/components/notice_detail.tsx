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

export default function NoticeDetail ({ Notice, Articles, Notices } : { Notice: Notice , Articles: Article[], Notices: Notice_Multi[] }) {

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
                    <NoticeSection notices={Notices} />
                </div>
                <div className="w-full ">
                    <ArticleRankings articles={Articles} />
                </div>
            </div>
        </>
    )
}