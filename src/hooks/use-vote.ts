import { useState } from "react";

export function useVote(initialVotes: number) {
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

  return { netVotes, activeVote, handleVote };
}