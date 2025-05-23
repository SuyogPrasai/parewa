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
import Image from 'next/image';

import React from 'react';

export default function Page() {


  const [articlesData, setArticlesData] = useState<ArticlesSectionProps[]>([]);
  const [topArticlesData, setTopArticlesData] = useState<ArticlesSectionProps[]>([]);
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
  useEffect(() => {
    axios
      .get('/api/top_articles')
      .then((response) => {
        if (response.data.success) {
          setTopArticlesData(response.data.articles || []);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error))
      .finally(() => setLoading(false));
  }, []);


  return (
    <>
      <div className="relative">

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
                <div className="flex flex-col justify-center items-center pt-10 px-4">
                  <NewsletterSignup articles={topArticlesData} />
                  <Separator orientation="horizontal" className="" />

                  
                </div>

              )}

              <div>
                <ArticlesSection category={section.category} articles={section.articles} />
                <Separator orientation="horizontal" className="" />
              </div>
            </React.Fragment>
          ))
        )}
        <Image
          src="/lightning - reversed.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain absolute bottom-0 left-[3%] w-[20%] min-w-[250px] max-w-[300px]"
        />

      </div>

    </>
  );
}