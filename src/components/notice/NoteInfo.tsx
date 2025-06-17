import React from 'react'
import Image from 'next/image';

import Notice from '@/types/post_objects/notice';

import AuthorCard from '@/components/articles/AuthorDetailsCard';
import VoteComponent from '@/components/articles/VotingComponent';
import { Badge } from '@/components/ui/badge';

function NoticeInfo({
    _id,
    title,
    publishedIn,
    publisher,
    postTags,
    content,
    featuredImage,
    voteCount = 0,
}: Notice) {

    return (
        <>
            <div className="w-full max-w-[650px] mx-auto lgplus:mx-0 bg-white lgplus:p-2 sm:p-4 md:py-6 min-h-fit">
                <div className="p-2 sm:p-3 font-oswald text-xl sm:text-2xl md:text-3xl">{title}</div>

                <div className="flex flex-wrap items-center gap-2 mt-2 pl-2 sm:pl-3">
                    {postTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <div className="p-2 sm:p-3 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
                <div className="p-2 sm:p-3">
                    {featuredImage && (
                        <Image
                            src={featuredImage || ''}
                            alt="Featured Image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto max-h-64 object-cover"
                        />
                    )}
                </div>
                <div className="p-2 sm:p-3 flex flex-col sm:flex-row justify-between gap-3 bg-gray-50 mt-3">
                    {publisher && publishedIn && (
                        <AuthorCard
                            name={publisher[0].name}
                            timestamp={publishedIn.toString()}
                            initials={publisher[0].name[0].toUpperCase()}
                        />
                    )}
                    <VoteComponent orientation="horizontal" voteCount={voteCount} post_id={_id || ''} post_type={"notice"} />
                </div>
            </div>
        </>
    )
}

export default NoticeInfo