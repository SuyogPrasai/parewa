"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVote } from '@/hooks/useVote';

interface VoteComponentProps {
  orientation?: 'vertical' | 'horizontal';
  initial_votes: number;
  post_id: string;
  user_id: string;
  post_type: string;
}

export default function VoteComponent({ orientation = 'vertical', initial_votes, post_id, user_id, post_type }: VoteComponentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isVertical = orientation === 'vertical';
  const flexDirection = isVertical ? 'flex-col' : 'flex-row';
  const gapClass = isVertical ? 'gap-2' : 'gap-3';

  const { netVotes, activeVote, handleVote } = useVote(initial_votes, post_id, user_id, post_type);

  const isUpVoted = activeVote === 'up';
  const isDownVoted = activeVote === 'down';

  // Handle click events for upvote/downvote buttons
  const handleVoteClick = () => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
      return;
    }
    // Add your vote logic here (e.g., API call) for authenticated users
    console.log('Vote clicked');
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex ${flexDirection} items-center justify-center ${gapClass}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-accent/50 transition-colors"
        onClick={() => handleVote("up")}
      >
        <ArrowUp className="h-5 w-5 text-foreground/70 hover:text-green-500" />
      </Button>

      <span className="font-semibold text-foreground text-lg tabular-nums font-roboto">
        {netVotes}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-accent/50 transition-colors"
        onClick={() => handleVote("down")}
      >
        <ArrowDown className="h-5 w-5 text-foreground/70 hover:text-red-500" />
      </Button>
    </div>
  );
}