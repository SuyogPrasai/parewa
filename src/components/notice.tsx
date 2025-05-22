import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import UserHoverCard from "./ui/user-hover";

interface NoticeCardProps {
  title: string;
  description: string;
  timestamp: string;
  username: string;
  tags: string[];
  initialVotes: number;
}

export function NoticeCard({
  title,
  description,
  timestamp,
  username,
  tags,
  initialVotes,
}: NoticeCardProps) {
  const [netVotes, setNetVotes] = useState(initialVotes);
  const [activeVote, setActiveVote] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (activeVote === type) {
      setNetVotes((prev) => prev + (type === "up" ? -1 : 1));
      setActiveVote(null);
    } else {
      const newValue =
        netVotes +
        (type === "up" ? 1 : -1) +
        (activeVote ? (activeVote === "up" ? -1 : 1) : 0);
      setNetVotes(newValue);
      setActiveVote(type);
    }
  };

  return (
    <Card className="w-[100%] p-4 bg-background shadow-sm hover:shadow-md transition-shadow mb-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>

          <UserHoverCard username={username} />

          <p className="text-sm text-foreground leading-snug mb-2">{description}</p>

          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-medium px-1.5 py-0.5">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleVote("up")}
            className={`h-8 w-8 ${
              activeVote === "up" ? "text-green-600 bg-green-50" : "text-muted-foreground"
            }`}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>

          <span className="font-medium text-foreground text-base">{netVotes}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleVote("down")}
            className={`h-8 w-8 ${
              activeVote === "down" ? "text-red-600 bg-red-50" : "text-muted-foreground"
            }`}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
