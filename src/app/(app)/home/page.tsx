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

      <Navbar />
      <Separator orientation="horizontal" className="" />
      <div className="min-w-[150px]">
        <Image
          src="/lightning.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain absolute left-[5%] top-[60%] w-[20%] z-[-1]"
        />
      </div>
   
      <div className="min-w-[150px]">
        <Image
          src="/bolt.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain absolute right-[5%] top-[300%] w-[20%] z-[-1]"
        />
      </div>

      <div className="min-w-[150px]">
        <Image
          src="/eagle_image.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain absolute right-[5%] top-[125%] w-[20%]"
        />
      </div>
      <div className="min-w-[150px]">
        <Image
          src="/lightning.png"
          alt="Eagle Logo"
          width={150}
          height={150}
          className="object-contain rotate-180 absolute left-[5%] top-[470%] w-[20%] z-[-1]"

        />
      </div>
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
                <NewsletterSignup articles={section.articles} />
              </div>
            )}

            <div>
              <ArticlesSection category={section.category} articles={section.articles} />
              <Separator orientation="horizontal" className="" />
            </div>
          </React.Fragment>
        ))
      )}


    </>
  );
}