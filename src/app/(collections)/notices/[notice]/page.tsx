'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { useTopArticles } from '@/hooks/use-top-articles';

import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import NoticeDetail from '@/components/notice_detail';


import NoticeResponse, { Notice } from '@/types/singleNotice';

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const notice_id = useMemo(() => searchParams.get('id') || '', [searchParams]);
  const { articles: articles_, isLoading: isLoadingArticles } = useTopArticles();


  const [Notice, setNotice] = useState<Notice>({
    _id: '',
    title: '',
    content: [
      {
        type: '',
      }
    ],
    publishedIn: '',
    featuredImage: '', // URL
    voteCount: 0,
    postTags: [],
    publisher: {
      _id: '',
      name: '',
      username: '',
    },
    category: '',
  });

  const navLinks = [
    { name: "General", href: "#" },
    { name: "Departments", href: "#" },
    { name: "School", href: "#" },
    { name: "Council", href: "#" },
    { name: "Clubs", href: "#" },
  ];

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);

      router.push(`/notices?category=${newCategory}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const fetchNotice = async () => {
      const response = await axios.get<NoticeResponse>(`/api/get_notice/?id=${notice_id}`);
      setNotice(response.data.notice);
    };

    if (!notice_id) return;
    fetchNotice();
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />

      <h1 className="text-6xl font-oswald mt-5 ml-5">NOTICE</h1>
      <div className='flex flex-row p-2 mt-5 ml-5'>
        <NoticeDetail Notice={Notice} Articles={articles_} />
      </div>
    </div>
  );
}