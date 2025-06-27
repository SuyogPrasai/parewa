'use client'

import { useState } from "react";
import axios from "axios";

import { Navbar } from "../layout/Navbar";
import Notice from "@/types/post_objects/notice";
import NoticeSection from "@/components/notice/NoticeSection";
import SideCalendar from "@/components/layout/sidebar/SideCalendar";

export default function MainSection({ notices, wordpress_ip }: { notices: Notice[], wordpress_ip: string }) {
  const [notices_, setNotices] = useState<Notice[]>(notices);

  const updateNotices = (heading: string) => {
    let url = "/api/get_news?number=4&limit=4";
    
    if (heading.toLowerCase() !== "general") {
      url += "&category=" + heading.toLowerCase();
    }

    axios
      .get(url)
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
        }
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }
  return (

    <>
      <Navbar header_click={updateNotices} wordpress_ip={wordpress_ip} />
      <div className="flex flex-col mb-10 w-full pt-10  relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-5 justify-center">
          {/* Main content section */}
          <NoticeSection notices={notices_} />

          {/* Calendar Sidebar - Fixed width on larger screens */}
          <SideCalendar />
        </div>

      </div>
    </>
  );
}