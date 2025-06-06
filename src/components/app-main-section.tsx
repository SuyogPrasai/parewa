'use client'
import NoticeSection from "./app-notice-section";
import SideCalendar from "./app-side-calendar";
import Notice from "../types/notice";


export default function MainSection({ notices } : { notices: Notice[] }) {
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