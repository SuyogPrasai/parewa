'use client';

import axios from 'axios';
import { Suspense } from 'react'; // Import Suspense
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTopArticles } from '@/hooks/useTopArticles';
import Notice from '@/types/post_objects/notice';
import { NoticeResponse } from '@/types/api-responses';
import { Navbar } from '@/components/collections/CollectionNavbar';
import NoticeDetail from '@/components/notice/NoticeDetail';
import NoticeSection from '@/components/notice/NoticeSection';

export default function NewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsPageContent />
    </Suspense>
  );
}

function NewsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noticeId = useMemo(() => searchParams.get('id') || '', [searchParams]);
  const { articles: topArticles, isLoading: isLoadingTopArticles } = useTopArticles();
  const [notice, setNotice] = useState<Notice>();
  const [relatedNotices, setRelatedNotices] = useState<Notice[]>([]);

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

  useEffect(() => {
    async function fetchNotice() {
      if (!noticeId) {
        return;
      }
      try {
        const response = await axios.get<NoticeResponse>(`/api/get_notice/?id=${noticeId}`);
        setNotice(response.data.notice);
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    }
    fetchNotice();
  }, [noticeId]);

  useEffect(() => {
    const fetchRelatedNotices = async () => {
      try {
        const response = await axios.get(`/api/get_news?category=${notice?.category}&limit=3`);
        if (response.data.success) {
          setRelatedNotices(response.data.notices);
        }
      } catch (error) {
        console.error('Error fetching related notices:', error);
      }
    };

    if (notice?.category) {
      fetchRelatedNotices();
    }
  }, [notice?.category]);

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-3 sm:mt-4 md:mt-10 ml-3 sm:ml-5 md:ml-10">
        NOTICE
      </h1>
      <div className="flex flex-row mt-5 lg:ml-5">
        {notice && relatedNotices && (
          <NoticeDetail
            Notice={notice}
            Articles={topArticles}
            Notices={relatedNotices}
          />
        )}
      </div>
    </div>
  );
}