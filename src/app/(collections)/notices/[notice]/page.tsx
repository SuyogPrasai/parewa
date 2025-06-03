'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTopArticles } from '@/hooks/use-top-articles';

import ArticleRankings from '@/components/app-side-top-articles';
import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import { Notice } from '@/types/singleNotice';

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { articles, isLoading: isLoadingArticles } = useTopArticles();

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

  const [article, setArticle] = useState<Notice>({
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
    }
  });

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5 ml-5"></h1>
      <div className="flex flex-col md:flex-row">
        <div className="ml-5 my-8 flex-1">

        </div>
      </div>
    </div>
  );
}