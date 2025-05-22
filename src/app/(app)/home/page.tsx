'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { CarouselHome } from '@/components/app-carousel';
import { Navbar } from '@/components/app-navbar';
import { Separator } from '@/components/ui/separator';
import MainSection from '@/components/app-main-section';
import ArticlesSection from '@/components/app-article-section';
import { ArticlesSectionProps, Article } from '@/types/articleSection'; // Ensure Article is imported if used elsewhere
import { NewsletterSignup } from '@/components/app-newsletter-section';
import Footer from '@/components/footer';

import React from 'react';

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
  }, []);

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
          <React.Fragment key={section.category || index}> {/* Use React.Fragment for multiple top-level elements */}
            {/* Render NewsletterSignup after the first section (index 0), if desired */}
            {index === 1 && ( // Changed from index === 1 to index === 0 to place it after the first ArticleSection
              <div className="flex justify-center items-center py-10 px-4">
                <NewsletterSignup articles={section.articles}/>
              </div>
            )}

            <div>
              <ArticlesSection category={section.category} articles={section.articles} />
              <Separator orientation="horizontal" className="" />
            </div>
          </React.Fragment>
        ))
      )}

      <Footer />
    </>
  );
}