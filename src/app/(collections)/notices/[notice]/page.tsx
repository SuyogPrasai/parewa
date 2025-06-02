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
import Image from 'next/image';
import ArticleRankings from '@/components/app-side-top-articles';
import PublisherCard from '@/components/publisher-card';
import SideArticleList from '@/components/app-article-collection';


export default function ArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = useMemo(() => searchParams.get('category') || 'Literature', [searchParams]);
  const article_id = useMemo(() => searchParams.get('id') || '', [searchParams]);

  const [articles, setArticles] = useState([]);

  const { articles: articles_, isLoading: isLoadingArticles } = useTopArticles();



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

      router.push(`/articles?category=${newCategory}`);
    },
    [router, searchParams]
  );

  const [article, setArticle] = useState<Article>({
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/get_articles?limit=2&category=${category}`);
        if (response.data.success) {
          setArticles(response.data.articles);
        } else {
          console.error('Error fetching articles:', response.data.message);
        }
      } catch (error: any) {
        console.error('Request failed:', error.message);
      }
    };

    fetchArticles();
  }, []);

  const { netVotes, activeVote, handleVote } = useVote(article.voteCount);

  return (
    <>
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />

      <div className="flex flex-row justify-left">
        <div className="flex flex-col py-2 pl-5 max-w-[900px]">
          <h1 className="text-6xl font-oswald mt-5 max-w-[60%] underline underline-offset-4 leading-[105%] decoration-1 decoration-gray-200">{article.title.toUpperCase()}</h1>
          <div className='flex flex-col lg:max-w-[650px] mt-5 p-2'>
            <div className='flex flex-row justify-between py-2'>
              <AuthorCard initials={article.author[0]} name={article.author} timestamp={`${article.publishedIn}`} />
              <VoteComponent orientation='horizontal' handleVote={handleVote} netVotes={netVotes} activeVote={activeVote} />
            </div>
            <Separator className="my-4" />
            <div>
              {article.featuredImage && article.featuredImage !== "" ? (
                <Image
                  src={article.featuredImage}
                  alt="Featured Image"
                  layout="responsive"
                  width={16}
                  height={9}
                  className="object-cover w-full aspect-[16/9]"
                />
              ) : (
                <div className="bg-gray-200 w-full aspect-[16/9]"></div>
              )}
            </div>
            {article.featuredImage && article.featuredImage !== "" ? (
              <div className="mb-10" dangerouslySetInnerHTML={{ __html: article.content }}></div>

            ) : (
              <div className="mb-10"></div>
            )}
          </div>
        </div>
        <div className='absolute right-[100px] top-[300px] '>

          <ArticleRankings articles={articles_} />
        </div>


      </div>
    </>
  )
}