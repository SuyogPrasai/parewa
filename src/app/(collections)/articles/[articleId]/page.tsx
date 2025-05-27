'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTopArticles } from '@/hooks/use-top-articles';

import { Article } from '@/types/singleArticle';
import ArticleResponse from '@/types/singleArticle';

import { Navbar } from '@/components/collection-navbar';
import ArticleRankings from '@/components/app-side-top-articles';
import axios from 'axios';


export default function ArticlesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = useMemo(() => searchParams.get('category') || 'Literature', [searchParams]);
    const article_id = useMemo(() => searchParams.get('id') || '', [searchParams]);

    const { articles: articles_, isLoading: isLoadingArticles } = useTopArticles();


    const navLinks = [
        { name: "Politics", href: "#" },
        { name: "Literature", href: "#" },
        { name: "Economy", href: "#" },
        { name: "Culture", href: "#" },
        { name: "History", href: "#" },
    ];

    const handleCategoryChange = useCallback(
        (newCategory: string) => {
            const params = new URLSearchParams(searchParams);

            router.push(`/articles?category=${newCategory}`);
        },
        [router, searchParams]
    );

    const [article, setArticle] = useState<Article>({
        _id: '',
        title: '',
        content: '',
        publishedIn: '',
        featuredImage: '', // URL
        voteCount: 0,
        postTags: [],
        author: '',
        publisher: {
            _id: '',
            name: '',
            username: '',
        }
    });

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await axios.get<ArticleResponse>(`/api/get_article/?id=${article_id}`);
            setArticle(response.data.article);
        };

        if (article_id) fetchArticle();
    }, [searchParams]);


    return (
        <>
            <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
            <div className="flex flex-col">
                <h1 className="text-3xl">{article.title}</h1>
            </div>
            <div className="px-5">
                {isLoadingArticles ? (
                    <p>Loading articles...</p>
                ) : (
                    <ArticleRankings articles={articles_} />
                )}
            </div>
        </>
    )
}