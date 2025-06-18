"use client";

import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useVote } from '@/hooks/useVote';
import { useRouter } from 'next/navigation';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { set } from 'mongoose';

interface VoteComponentProps {
	orientation?: 'vertical' | 'horizontal';
	post_id: string;
	post_type: string;
	voteCount: number;
}

export default function VoteComponent({
	orientation = 'vertical',
	post_id,
	post_type,
	voteCount
}: VoteComponentProps) {

	const router = useRouter();

	const { data: session, status } = useSession();

	const isVertical = orientation === 'vertical';

	const user_id = session?.user._id;

	const [isUpVoted, setIsUpVoted] = useState<boolean>(false);

	const [isDownVoted, setIsDownVoted] = useState<boolean>(false);

	const { netVotes, activeVote, handleVote } = useVote({
		post_id: post_id,
		user_id: user_id,
		post_type: post_type,
		vote_count: voteCount
	});


	const handleVoteClick = (voteType: 1 | 0 | -1) => {
		if (status === 'unauthenticated') {
			router.push('/api/auth/signin');
			return;
		}
		handleVote(voteType);
	};

	useEffect(() => {
		if (activeVote === 1) {
			setIsUpVoted(true);
			setIsDownVoted(false);
		} else if (activeVote === -1) {
			setIsUpVoted(false);
			setIsDownVoted(true);
		} else {
			setIsUpVoted(false);
			setIsDownVoted(false);
		}

	}, [activeVote])

	return (
		<div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center justify-center ${isVertical ? 'gap-1' : 'gap-2'}`}>
			<Button
				variant="ghost"
				size="icon"
				className={`
          h-9 w-9 rounded-md transition-all duration-200 ease-in-out 
          ${isUpVoted
						? 'bg-green-100 text-green-600 hover:bg-green-200 active:bg-green-100'
						: 'text-gray-500 hover:bg-gray-100 hover:text-green-500 active:bg-gray-100'
					}
        `}
				onClick={() => handleVoteClick(1)}
				aria-label="Upvote"
			>
				<ArrowUp className="h-5 w-5" />
			</Button>

			<span className="font-sans text-base font-medium text-gray-800 tabular-nums">
				{netVotes || 0}
			</span>

			<Button
				variant="ghost"
				size="icon"
				className={`
          h-9 w-9 rounded-md transition-all duration-200 ease-in-out
          ${isDownVoted
						? 'bg-red-100 text-red-600 hover:bg-red-200'
						: 'text-gray-500 hover:bg-gray-100 hover:text-red-500'
					}
        `}
				onClick={() => handleVoteClick(-1)}
				aria-label="Downvote"
			>
				<ArrowDown className="h-5 w-5" />
			</Button>
		</div>
	);
}