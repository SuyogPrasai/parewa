'use client';

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ArticlesSectionProps } from '@/types/utilities';
import Article from '@/types/post_objects/article';
import Notice from '@/types/post_objects/notice';
import { ArticlesResponse } from '@/types/api-responses';
import { NoticesResponse } from '@/types/api-responses';

import Image from 'next/image';

import MainSection from '@/components/home/MainSection';
import ArticlesSection from '@/components/articles/ArticleSection';
import { Navbar } from '@/components/layout/Navbar';
import { Separator } from '@/components/ui/separator';
import { NewsletterSignup } from '@/components/home/NewsletterSection';

export default function Page() {
    const [articlesData, setArticlesData] = useState<ArticlesSectionProps[]>([]);
    const [topArticlesData, setTopArticlesData] = useState<Article[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);

    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingTopArticles, setLoadingTopArticles] = useState(true);

    useEffect(() => {
        setLoadingArticles(true);

        // TODO: Category Listing
        const categories = ['Literature', 'Politics', 'Economy'];

        const requests = categories.map((category) =>
            axios.get<ArticlesResponse>('/api/get_articles', {
                params: {
                    query: '',
                    category,
                    page: 1,
                    limit: 4,
                },
            })
        );

        // Wait for all requests to complete
        Promise.all(requests)
            .then((responses) => {
                const formattedArticles = responses.map((response, index) => {
                    if (response.data.success && !(response.data.articles.length === 0)) {
                        return {
                            category: categories[index],
                            articles: response.data.articles || [],
                        };
                    } else {
                        return {
                            category: categories[index],
                            articles: [],
                        };
                    }
                });
                setArticlesData(formattedArticles);
            })
            .catch((error) => {
                console.error('Error fetching articles:', error);
                setArticlesData([]);
            })
            .finally(() => setLoadingArticles(false));
    }, []);

    // Fetch top articles 
    useEffect(() => {
        setLoadingTopArticles(true);
        axios
            .get<ArticlesResponse>('/api/get_articles?top_articles=true')
            .then((response) => {
                console.log('Response from /api/get_articles?top_articles=true:', response.data);
                if (response.data.success) {
                    // DIRECTLY assign the array of articles, as your API returns it flat
                    setTopArticlesData(response.data.articles);
                } else {
                    console.error('API /api/get_articles?top_articles=true returned success: false');
                    setTopArticlesData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching articles from /api/get_articles?top_articles=true:', error);
            })
            .finally(() => setLoadingTopArticles(false));
    }, []);


    useEffect(() => {
        axios
            .get<NoticesResponse>("/api/get_news?category=General&number=4&limit=4")
            .then((response) => {
                if (response.data.success) {
                    setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
                }
            })
            .catch((error) => console.error("Error fetching notices:", error));
    }, []);

    const updateNotices = (heading: string) => {
        axios
            .get("/api/get_news?category=" + heading + "&number=4&limit=4")
            .then((response) => {
                if (response.data.success) {
                    setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
                }
            })
            .catch((error) => console.error("Error fetching notices:", error));
    }

    const isLoading = loadingArticles || loadingTopArticles;

    return (
        <>
            <div className="relative">
                <Navbar header_click={updateNotices} />
                <Separator orientation="horizontal" className="" />

                <MainSection notices={notices} isLoading={isLoading} />
                <Separator orientation="horizontal" className="" />

                {
                    // Always map over articlesData, and place NewsletterSignup strategically
                    articlesData.map((section, index) => (
                        <React.Fragment key={section.category || `section-${index}`}>
                            {index === 1 && (
                                <div className="flex flex-col items-center pt-10 px-4">
                                    <NewsletterSignup articles={topArticlesData} />
                                    <Separator orientation="horizontal" className="mt-10" />
                                </div>
                            )}
                            <div>
                                <ArticlesSection category={section.category} articles={section.articles} isLoading={isLoading} />
                                <Separator orientation="horizontal" className="" />
                            </div>
                        </React.Fragment>
                    ))
                }

                <Image
                    src="/lightning - reversed.png"
                    alt="Lightning Reversed"
                    width={150}
                    height={150}
                    className="object-contain absolute bottom-0 left-[3%] w-[20%] min-w-[250px] max-w-[300px]"
                />
            </div>
        </>
    );
}