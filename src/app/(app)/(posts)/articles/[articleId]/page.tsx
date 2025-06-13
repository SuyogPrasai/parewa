'use client';

import axios from 'axios';
import { Suspense } from 'react'; // Import Suspense
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTopArticles } from '@/hooks/useTopArticles';
import Article from '@/types/post_objects/article';
import { ArticleResponse } from '@/types/api-responses';
import { useVote } from '@/hooks/useVote';
import Image from 'next/image';
import { Navbar } from '@/components/collections/CollectionNavbar';
import { Separator } from '@/components/ui/separator';
import ArticleRankings from '@/components/collections/CollectionsTopArticles';
import VoteComponent from '@/components/articles/VotingComponent';
import AuthorCard from '@/components/articles/AuthorDetailsCard';
import PublisherCard from '@/components/shared/PublisherCard';
import SideArticleList from '@/components/articles/ArticleCollection';

export default function ArticlesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticlesPageContent />
    </Suspense>
  );
}

function ArticlesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const article_id = useMemo(() => searchParams.get('id') || '', [searchParams]);
  const [articles, setArticles] = useState([]);
  const { articles: articles_, isLoading: isLoadingArticles } = useTopArticles();

  const navLinks = [
    { name: 'Politics', href: '#' },
    { name: 'Literature', href: '#' },
    { name: 'Economy', href: '#' },
    { name: 'Culture', href: '#' },
    { name: 'History', href: '#' },
  ];

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);
      router.push(`/articles?category=${newCategory}`);
    },
    [router, searchParams]
  );

  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get<ArticleResponse>(`/api/get_article/?id=${article_id}`);
        setArticle(response.data.article);
      } catch (error: any) {
        console.error('Error fetching article:', error.message);
      }
    };

    if (article_id) fetchArticle();
  }, [article_id]);

  const category = article?.category || '';

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

    if (category) fetchArticles();
  }, [category]);

  const { netVotes, activeVote, handleVote } = useVote(article?.voteCount ?? 0);

  return (
    <div className="min-h-screen bg-white">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col py-4 sm:py-6">
          {article && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-oswald font-bold uppercase mt-4 sm:mt-6 max-w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[90%] underline underline-offset-4 decoration-1 decoration-gray-200 leading-tight">
              {article.title}
            </h1>
          )}
          <div className="flex flex-col mt-4 sm:mt-6 max-w-[1400px]">
            <div className="details-card w-full md:max-w-2xl lg:max-w-2xl">
              <p className="text-gray-600 font-roboto text-base sm:text-lg md:text-xl leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam porro eveniet soluta explicabo. Ratione, itaque?
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between py-3 sm:py-4 gap-4">
                {article && (
                  <AuthorCard initials={article.author[0]} name={article.author} timestamp={`${article.publishedIn}`} />
                )}
                <VoteComponent orientation="horizontal" handleVote={handleVote} netVotes={netVotes} activeVote={activeVote} />
              </div>
            </div>
            <div className="flex flex-col lgplus:flex-row gap-5 lg:gap-10 lgplus:w-[110%] mt-6 lg:max-w-[1400px]">
              <div className="content-component w-full ">
                <Separator className="my-4" />
                <div className="relative w-full aspect-[16/9]">
                  {article?.featuredImage && article.featuredImage !== '' ? (
                    <Image
                      src={article.featuredImage}
                      alt="Featured Image"
                      fill
                      className="object-cover w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full"></div>
                  )}
                </div>
                <div
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-4 mb-8 sm:mb-10"
                  dangerouslySetInnerHTML={{ __html: article?.content || '' }}
                ></div>
              </div>
              <div>
                <ArticleRankings articles={articles_} />
              </div>
            </div>
          </div>
        </div>
        <div className="publisher mt-6 sm:mt-8">
          {article && article.publisher && (
            <PublisherCard
              initials={article.publisher[0].name[0]}
              name={article.publisher[0].name}
              established={article.publishedIn.toString()}
            />
          )}
        </div>
        <div className="mb-8 mt-8 sm:mt-10 max-w-full md:max-w-2xl lg:max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-bold uppercase text-gray-900 underline underline-offset-8 decoration-gray-200 decoration-1 mb-4 sm:mb-6">
            {article && `Some Latest Articles in ${article.category}`}
          </h2>
          <SideArticleList articles={articles} variant="simple" />
        </div>
      </div>
    </div>
  );
}