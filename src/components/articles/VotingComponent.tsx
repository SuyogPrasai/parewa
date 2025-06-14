import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoteComponentProps {
  orientation?: 'vertical' | 'horizontal';
}

export default function VoteComponent({ orientation = 'vertical' }: VoteComponentProps) {
  const isVertical = orientation === 'vertical';
  const flexDirection = isVertical ? 'flex-col' : 'flex-row';
  const gapClass = isVertical ? 'gap-2' : 'gap-3';

  const netVotes = 0;

  return (
    <div className={`flex ${flexDirection} items-center justify-center ${gapClass}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full hover:bg-accent/50 transition-colors"
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
      >
        <ArrowDown className="h-5 w-5 text-foreground/70 hover:text-red-500" />
      </Button>
    </div>
  );
}