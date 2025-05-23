import React, { useEffect, useState } from "react";
import axios from "axios";
import { NoticeCard } from "./notice";

interface Notice {
  _id: string;
  title: string;
  content: string;
  publishedIn: string;
  postTags: string[];
  voteCount: number;
  username: string;
  trashed: boolean;
}

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    axios
      .get("/api/get_news")
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
        }
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="lg:w-[80vw] mx-0  md:mx-auto lg:mx-0 w-full max-w-2xl flex flex-col items-center gap-4">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard
            key={notice._id}
            title={notice.title}
            description={notice.content.replace(/<\/?[^>]+(>|$)/g, "")}
            timestamp={new Date(notice.publishedIn).toLocaleString()}
            username={notice.username}
            tags={notice.postTags}
            initialVotes={notice.voteCount}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No notices found.</p>
      )}
    </div>
  );
}