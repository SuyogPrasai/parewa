"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SidebarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({ query: trimmed });
    router.push(`/articles?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 group">
      <button
        type="submit"
        aria-label="Search"
        className="shrink-0 text-accent-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <Search size={22} />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full bg-transparent text-base font-mono text-foreground placeholder:text-muted-foreground/60 border-b border-border focus:border-foreground focus:outline-none transition-colors py-0.5"
      />
    </form>
  );
}
