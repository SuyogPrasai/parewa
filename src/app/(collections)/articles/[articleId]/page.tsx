'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useTopArticles } from '@/hooks/use-top-articles';

import { Article } from '@/types/singleArticle';
import ArticleResponse from '@/types/singleArticle';

import { Navbar } from '@/components/collection-navbar';
import axios from 'axios';
import { Separator } from '@/components/ui/separator';
import AuthorCard from '@/components/author-details-card';
import VoteComponent from '@/components/voting-component-article';
import { useVote } from "@/hooks/use-vote";


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

    const { netVotes, activeVote, handleVote } = useVote(article.voteCount);

    return (
        <>
            <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
            <div className="flex flex-col py-2 pl-5">
                <h1 className="text-6xl font-oswald mt-5 max-w-[60%] underline underline-offset-4 leading-[105%] decoration-1 decoration-gray-200">{article.title.toUpperCase()}</h1>
                <div className='flex flex-col lg:max-w-[629px] mt-5 p-2'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam porro eveniet soluta explicabo. Ratione, itaque?</p>
                    <div className='flex flex-row justify-between py-2'>
                        <AuthorCard initials={article.author[0]} name={article.author} timestamp={`${article.publishedIn}`} />
                        <VoteComponent orientation='horizontal' handleVote={handleVote} netVotes={netVotes} activeVote={activeVote} />
                    </div>
                </div>
                <div className="flex">

                    <div className="flex flex-col lg:w-[629px] h-[100vh]">
                    </div>
                </div>
            </div>
        </>
    )
}