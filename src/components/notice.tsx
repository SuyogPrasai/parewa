import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVote } from "@/hooks/use-vote";

import VoteComponent from "./voting-component-article";
import Link from "next/link";

interface NoticeCardProps {
  title: string;
  description: string;
  timestamp: string;
  username: string;
  tags: string[];
  initialVotes: number;
  id: string;
}

export function NoticeCard({
  title,
  description,
  timestamp,
  username,
  tags,
  initialVotes,
  id
}: NoticeCardProps) {

  const { netVotes, activeVote, handleVote } = useVote(initialVotes);

  return (

    <Card className="w-[100%] p-4 bg-background shadow-sm hover:shadow-md transition-shadow mb-3">

      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <Link href={"/notices/notice?id=" + id}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            </div>

            <p className="text-xs text-muted-foreground mb-2 cursor-pointer hover:underline">
              @{username}
            </p>

            <p className="text-sm text-foreground leading-snug mb-2">{description}</p>

            <div className="flex items-center gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-medium px-1.5 py-0.5">
                  #{tag}
                </Badge>
              ))}
            </div>

          </Link>
        </div>
        <VoteComponent netVotes={netVotes} activeVote={activeVote} handleVote={handleVote} />
      </div>
    </Card>
  );
}
