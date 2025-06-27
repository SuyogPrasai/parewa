import React from "react";

import Notice from "@/types/post_objects/notice";

import { NoticeCard } from "./Notice";

export default function NoticeSection({ notices } : { notices: Notice[] }) {

  return (
    <div className=" mx-0  md:mx-auto lg:mx-0 w-full max-w-2xl flex flex-col items-center ">
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
            published_for={notice.published_for || ""}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No notices found.</p>
      )}
    </div>
  );
}