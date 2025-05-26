'use client';
import { Navbar } from "@/components/collection-navbar";
import { Separator } from "@/components/ui/separator";
import NoticeSection from "@/components/app-notice-section";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Notice from "@/types/notice";
import ArticleRankings from "@/components/app-side-top-articles";
import { Article } from "@/types/articleSection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8; // Define how many notices per page

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loadingTopArticles, setLoadingTopArticles] = useState(true);
  const [topArticlesData, setTopArticlesData] = useState<Article[]>([]);
  const [title, setTitle] = useState('General');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch notices
  const fetchNotices = (category: string, page: number) => {
    axios
      .get(`/api/get_news?category=${category}&page=${page}&limit=${ITEMS_PER_PAGE}`)
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice: Notice) => !notice.trashed));
          setTotalPages(response.data.totalPages);
        } else {
          setNotices([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setNotices([]);
        setTotalPages(1);
      });
  };

  // Set title and fetch notices based on query parameter and page
  useEffect(() => {
    const category = searchParams.get('category') || 'General';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setTitle(category);
    setCurrentPage(page);
    fetchNotices(category, page);
  }, [searchParams]); // Re-run when searchParams change

  // Fetch top articles
  useEffect(() => {
    setLoadingTopArticles(true);
    axios
      .get('/api/top_articles')
      .then((response) => {
        console.log('Response from /api/top_articles:', response.data);
        if (response.data.success) {
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
    setCurrentPage(1); // Reset to first page on category change
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const category = searchParams.get('category') || 'General';
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  // Generate pagination links
  const renderPaginationLinks = () => {
    const links = [];
    const maxPagesToShow = 5; // Number of page links to display directly

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      links.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)} className="cursor-pointer">1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        links.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={i === currentPage} className="cursor-pointer">
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        links.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
      }
      links.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)} className="cursor-pointer">{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <>
      <Navbar header_click={handleCategoryChange} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5">{title}</h1>
      <div className="flex">
        <div className="ml-5 my-8">
          <NoticeSection notices={notices} />
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : undefined}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {renderPaginationLinks()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : undefined}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="px-5">
          <ArticleRankings articles={topArticlesData} />
        </div>
      </div>
    </>
  );
}