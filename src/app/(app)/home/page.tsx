'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Navbar } from '@/components/app-navbar';
import { Separator } from '@/components/ui/separator';
import MainSection from '@/components/app-main-section';
import ArticlesSection from '@/components/app-article-section';
// Make sure both types are correctly defined in articleSection.ts
import { ArticlesSectionProps, Article } from '@/types/articleSection';
import { NewsletterSignup } from '@/components/app-newsletter-section';
import Image from 'next/image';

import React from 'react';

export default function Page() {
    // articlesData should still be ArticlesSectionProps[] if /api/get_articles returns that structure
    const [articlesData, setArticlesData] = useState<ArticlesSectionProps[]>([]);
    // topArticlesData should now be Article[] because your API returns a flat array of articles
    const [topArticlesData, setTopArticlesData] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingTopArticles, setLoadingTopArticles] = useState(true);

    // Fetch main articles (assuming /api/get_articles returns ArticlesSectionProps[])
    useEffect(() => {
        setLoadingArticles(true);
        axios
            .get('/api/get_articles')
            .then((response) => {
                console.log('Response from /api/get_articles:', response.data);
                if (response.data.success) {
                    // Assuming this API returns { success: true, articles: ArticlesSectionProps[] }
                    setArticlesData(response.data.articles || []);
                } else {
                    console.error('API /api/get_articles returned success: false');
                    setArticlesData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching articles from /api/get_articles:', error);
                setArticlesData([]);
            })
            .finally(() => setLoadingArticles(false));
    }, []);

    // Fetch top articles (now correctly typed as Article[])
    useEffect(() => {
        setLoadingTopArticles(true);
        axios
            .get('/api/top_articles')
            .then((response) => {
                console.log('Response from /api/top_articles:', response.data);
                if (response.data.success) {
                    // DIRECTLY assign the array of articles, as your API returns it flat
                    setTopArticlesData(response.data.articles || []);
                } else {
                    console.error('API /api/top_articles returned success: false');
                    setTopArticlesData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching articles from /api/top_articles:', error);
                setTopArticlesData([]);
            })
            .finally(() => setLoadingTopArticles(false));
    }, []);

    const isLoading = loadingArticles || loadingTopArticles;

    return (
        <>
            <div className="relative">
                <Navbar />
                <Separator orientation="horizontal" className="" />

                <MainSection />
                <Separator orientation="horizontal" className="" />

                {isLoading ? (
                    <p className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">Loading articles...</p>
                ) : articlesData.length === 0 && topArticlesData.length === 0 ? ( // Check topArticlesData directly now
                    <p className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">No articles available.</p>
                ) : (
                    // Always map over articlesData, and place NewsletterSignup strategically
                    articlesData.map((section, index) => (
                        <React.Fragment key={section.category || `section-${index}`}>
                            {/* Render NewsletterSignup after the first section (index 0) of the main articles */}
                            {index === 1 && (
                                <div className="flex flex-col justify-center items-center pt-10 px-4">
                                    {/* Pass topArticlesData DIRECTLY, no need for flatMap */}
                                    <NewsletterSignup articles={topArticlesData} />
                                    <Separator orientation="horizontal" className="my-10" />
                                </div>
                            )}

                            <div>
                                <ArticlesSection category={section.category} articles={section.articles} />
                                <Separator orientation="horizontal" className="" />
                            </div>
                        </React.Fragment>
                    ))
                )}

                {/* This block is important if articlesData is empty but topArticlesData has content */}
                {!isLoading && articlesData.length === 0 && topArticlesData.length > 0 && (
                     <div className="flex flex-col justify-center items-center pt-10 px-4">
                        <NewsletterSignup articles={topArticlesData} />
                        <Separator orientation="horizontal" className="my-10" />
                    </div>
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