import React, { useEffect, useState } from "react";
import axios from "axios";
import { NoticeCard } from "./notice";
import { Skeleton } from "@/components/ui/skeleton"; // Optional for loading effect

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/get_news") // Adjust based on your API route
      .then((response) => {
        if (response.data.success) {
          // Set notices, ensuring only non-trashed ones (API already does this, but just in case)
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
        }
      })
      .catch((error) => console.error("Error fetching notices:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="lg:w-[80vw] mx-0 md:mx-0 sm:mx-auto w-full max-w-2xl flex flex-col items-center gap-4">
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-28 rounded-lg" />
        ))
      ) : notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard
            key={notice._id}
            title={notice.title}
            description={notice.content.replace(/<\/?[^>]+(>|$)/g, "")} // Strip HTML tags
            timestamp={new Date(notice.publishedIn).toLocaleString()}
            username={notice.username} // Correctly added username field
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
