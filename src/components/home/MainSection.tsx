'use client'

import Notice from "@/types/post_objects/notice";

import NoticeSection from "@/components/notice/NoticeSection";
import SideCalendar from "@/components/layout/sidebar/SideCalendar";

export default function MainSection({ notices, isLoading } : { notices: Notice[], isLoading: boolean }) {
  return (
    <div className="flex flex-col mb-10 w-full pt-10  relative">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center">
        {/* Main content section */}
        <NoticeSection  notices={notices}/>

        {/* Calendar Sidebar - Fixed width on larger screens */}
        <SideCalendar />
      </div>
      
    </div>
  );
}