'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTopArticles } from '@/hooks/use-top-articles';

import { Navbar } from '@/components/collection-navbar';
import ArticleRankings from '@/components/app-side-top-articles';


export default function ArticlesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const category = useMemo(() => searchParams.get('category') || 'Literature', [searchParams]);

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

    return (
        <>
            <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
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