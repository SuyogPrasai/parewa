'use client';

import { CarouselHome } from '@/components/app-carousel';
import { Navbar } from '@/components/app-navbar';
import MainSection from '@/components/app-main-section';
import { Separator } from '@/components/ui/separator';
import ArticlesSection from '@/components/app-article-section';
import { ArticlesSectionProps, Article } from '@/types/articleSection';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Page() {
  const slides = [
    { id: 1, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens.', author: 'Kahlil Gibran' },
  ];

  const [articlesData, setArticlesData] = useState<ArticlesSectionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/get_articles')
      .then((response) => {
        if (response.data.success) {
          setArticlesData(response.data.articles || []);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error))
      .finally(() => setLoading(false));
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <CarouselHome slides={slides} />
      <Separator orientation="horizontal" className="" />
      <Navbar />
      <Separator orientation="horizontal" className="" />
      <MainSection />
      <Separator orientation="horizontal" className="" />
      {loading ? (
        <p className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">Loading articles...</p>
      ) : articlesData.length === 0 ? (
        <p className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">No articles available.</p>
      ) : (
        articlesData.map((section, index) => (
          <div key={section.category || index}>
            <ArticlesSection category={section.category} articles={section.articles} />
            <Separator orientation="horizontal" className="" />
          </div>
        ))
      )}
    </>
  );
}