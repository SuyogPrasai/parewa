'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { useTopArticles } from '@/hooks/use-top-articles';

import ArticleRankings from '@/components/app-side-top-articles';
import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

import NoticeResponse, { Notice } from '@/types/singleNotice';

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const notice_id = useMemo(() => searchParams.get('id') || '', [searchParams]);

  const [articles, setArticles] = useState([]);

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!Notice.category) return;
        const response = await axios.get(`/api/get_articles?limit=2&category=${Notice.category}`);
        if (response.data.success) {
          setArticles(response.data.articles);
        } else {
          console.error('Error fetching articles:', response.data.message);
        }
      } catch (error: any) {
        console.error('Request failed:', error.message);
      }
    };

    fetchArticles();
  }, [Notice.category]);

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5 ml-5">NOTICE</h1>
      <div className="flex flex-col md:flex-row mt-5 ">
        
      </div>
    </div>
  );
}