// components/NoticesClient.jsx
'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { Navbar } from '@/components/collections/CollectionNavbar';
import NoticeDetail from '@/components/notice/NoticeDetail';
import Notice from '@/types/post_objects/notice';

interface NoticesClientProps {
    notice: Notice;
    relatedNotices: Notice[];
    searchParams: any;
}

export default function NoticesClient({ notice, relatedNotices, searchParams } : NoticesClientProps) {
  const router = useRouter();

  const navLinks = useMemo(
    () => [
      { name: 'General', href: '#' },
      { name: 'Departments', href: '#' },
      { name: 'School', href: '#' },
      { name: 'Council', href: '#' },
      { name: 'Clubs', href: '#' },
    ],
    []
  );

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      router.push(`/notices?category=${newCategory}`);
    },
    [router]
  );

  return (
    <Suspense fallback={<div>Loading notice...</div>}>
      <div className="min-h-screen">
        <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-3 sm:mt-4 md:mt-10 ml-3 sm:ml-5 md:ml-10">
          NOTICE
        </h1>
        <div className="flex flex-row mt-5 lg:ml-5">
          {notice ? (
            <NoticeDetail Notice={notice} Articles={[]} Notices={relatedNotices} />
          ) : (
            <p>No notice found.</p>
          )}
        </div>
      </div>
    </Suspense>
  );
}