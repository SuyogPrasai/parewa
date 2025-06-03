import React from 'react'
import Image from 'next/image';

import { Element } from '@/types/singleNotice';
import AuthorCard from './author-details-card';
import VoteComponent from './voting-component-article';
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
            <div className="w-[600px] bg- h-[100%] p-2">
                <div className="p-2 font-oswald text-3xl">{title}</div>

                <div className="flex items-center gap-2 mt-2 pl-2">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs font-medium px-1.5 py-0.5">
                            #{tag}
                        </Badge>
                    ))}
                </div>
                <div className="p-2" dangerouslySetInnerHTML={{ __html: content }}></div>
                {featured_image !== '' ? (
                    <div className="p-2">
                        <Image
                            src={featured_image || ''}
                            alt="Featured Image"
                            width={100}
                            height={100}
                        />
                    </div>
                ) : (
                    <div></div>
                )}

                <div className="p-2 flex justify-between">
                    <AuthorCard
                        name={publisher}
                        timestamp={date}
                        initials={publisher[0]}
                    />
                    <VoteComponent orientation='horizontal' netVotes={voteCount} activeVote={null} handleVote={() => { }} />
                </div>
            </div>
        </>
    )
}

export default NoticeInfo