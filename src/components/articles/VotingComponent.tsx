import React from 'react';

import { Button } from './ui/button';
import { ArrowUp, ArrowDown } from "lucide-react";

// Define the props type for the VoteComponent
interface VoteComponentProps {
  orientation?: 'vertical' | 'horizontal';
  handleVote: (vote: 'up' | 'down') => void;
  activeVote?: 'up' | 'down' | null;
  netVotes: number;
}

const VoteComponent: React.FC<VoteComponentProps> = ({ 
  orientation = 'vertical', 
  handleVote, 
  activeVote = null, 
  netVotes 
}) => {
  const isVertical = orientation === 'vertical';
  const flexDirection = isVertical ? 'flex-col' : 'flex-row';
  const gapClass = isVertical ? 'gap-1' : 'gap-2';

  return (
    <div className={`flex ${flexDirection} items-center ${gapClass}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote("up")}
        className={`h-8 w-8 ${activeVote === "up" ? "text-green-600 bg-green-50" : "text-muted-foreground"}`}
      >
        <ArrowUp className="h-4 w-4" />
      </Button>

      <span className="font-medium text-foreground text-base">{netVotes}</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote("down")}
        className={`h-8 w-8 ${activeVote === "down" ? "text-red-600 bg-red-50" : "text-muted-foreground"}`}
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VoteComponent;