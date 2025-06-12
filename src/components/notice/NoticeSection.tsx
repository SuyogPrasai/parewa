import React from "react";

import Notice from "@/types/post_objects/notice";

import { NoticeCard } from "./Notice";

export default function NoticeSection({ notices } : { notices: Notice[] }) {

  return (
    <div className="lg:w-[80vw] mx-0  md:mx-auto lg:mx-0 w-full max-w-2xl flex flex-col items-center gap-4">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard
            key={notice._id}
            title={notice.title}
            description={(notice.content ?? "").replace(/<\/?[^>]+(>|$)/g, "")}
            timestamp={new Date(notice.publishedIn).toLocaleString()}
            username={notice.publisher?.[0]?.username || ""}
            tags={notice.postTags}
            initialVotes={notice.voteCount || 0}
            id={notice._id || ""}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No notices found.</p>
      )}
    </div>
  );
}