'use client'
import { Navbar } from "@/components/collection-navbar"
import { Separator } from "@/components/ui/separator"
import NoticeSection from "@/components/app-notice-section"
import { useEffect } from "react";
import axios from "axios";
import Notice from "@/types/notice";
import { useState } from "react";
import ArticleRankings from "@/components/app-side-top-articles";
import { Article } from "@/types/articleSection";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function Page() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingTopArticles, setLoadingTopArticles] = useState(true);
  const [topArticlesData, setTopArticlesData] = useState<Article[]>([]);
  const [title, setTitle] = useState('General');

  useEffect(() => {
    axios
      .get("/api/get_news?category=General")
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
        }
      })
      .catch((error) => console.error("Error fetching notices:", error));
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

  const handleCategoryChange = (category: string) => {
    setTitle(category);
    axios
      .get(`/api/get_news?category=${category}`)
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
        }
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }

  return (
    <>
      <Navbar header_click={handleCategoryChange} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5">{title}</h1>
      <div className="flex">

        <div className="ml-5 my-8">
          <NoticeSection notices={notices} />
           <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
        </div>
        <div className="px-5">
          <ArticleRankings articles={topArticlesData} />

        </div>
      </div>
     

    </>
  )
}