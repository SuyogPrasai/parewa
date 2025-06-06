import React from 'react'
import Image from 'next/image';

import { Element } from '@/types/singleNotice';
import AuthorCard from './AuthorDetailsCard';
import VoteComponent from './VotingComponentArticle';
import { Badge } from './ui/badge';

interface NoticeInfo {
    title: string;
    date: string;
    publisher: string;
    tags: string[];
    content: Element[];
    featured_image?: string;
    urls?: string[];
    voteCount: number;
}

function NoticeInfo({
    title,
    date,
    publisher,
    tags,
    content,
    featured_image,
    urls,
    voteCount = 0,
}: NoticeInfo) {

    return (
        <>
            <div className="w-full max-w-3xl mx-auto bg-white p-3 sm:p-4 md:py-6 min-h-fit">
                <div className="p-2 sm:p-3 font-oswald text-xl sm:text-2xl md:text-3xl">{title}</div>

                <div className="flex flex-wrap items-center gap-2 mt-2 pl-2 sm:pl-3">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <div className="p-2 sm:p-3 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: content }}></div>
                {featured_image !== '' ? (
                    <div className="p-2 sm:p-3">
                        <Image
                            src={featured_image || ''}
                            alt="Featured Image"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto max-h-64 object-cover"
                        />
                    </div>
                ) : (
                    <div></div>
                )}

                <div className="p-2 sm:p-3 flex flex-col sm:flex-row justify-between gap-3">
                    <AuthorCard
                        name={publisher}
                        timestamp={date}
                        initials={publisher[0]}
                    />
                    <VoteComponent
                        orientation="horizontal"
                        netVotes={voteCount}
                        activeVote={null}
                        handleVote={() => { }}
                    />
                </div>
            </div>
        </>
    )
}

export default NoticeInfo