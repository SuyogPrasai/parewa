'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import NoticeSection from '@/components/app-notice-section';
import ArticleRankings from '@/components/app-side-top-articles';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Notice from '@/types/notice';
import { Article } from '@/types/articleSection';
import { Input } from '@/components/ui/input';
import { TagSearch } from '@/components/tag-search';
import { DatePicker } from '@/components/date-picker';
import { Search } from 'lucide-react';
import { useDebounceValue } from "usehooks-ts";


const ITEMS_PER_PAGE = 8;
const MAX_PAGES_TO_SHOW = 5;

interface NoticesResponse {
  success: boolean;
  notices: Notice[];
  totalPages: number;
}

interface ArticlesResponse {
  success: boolean;
  articles: Article[];
}

const useNotices = (category: string, page: number) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<NoticesResponse>(
          `/api/get_news?category=${category}&page=${page}&limit=${ITEMS_PER_PAGE}`
        );
        if (response.data.success) {
          setNotices(response.data.notices.filter((notice) => !notice.trashed));
          setTotalPages(response.data.totalPages);
        } else {
          setNotices([]);
          setTotalPages(1);
          setError('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices([]);
        setTotalPages(1);
        setError('Error fetching notices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [category, page]);

  return { notices, totalPages, isLoading, error };
};

const useTopArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ArticlesResponse>('/api/top_articles');
        if (response.data.success) {
          setArticles(response.data.articles || []);
        } else {
          setError('Failed to fetch top articles');
          setArticles([]);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
        setError('Error fetching articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
};

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPaginationLinks = useCallback(() => {
    const links: JSX.Element[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

    if (endPage - startPage + 1 < MAX_PAGES_TO_SHOW) {
      startPage = Math.max(1, endPage - MAX_PAGES_TO_SHOW + 1);
    }

    if (startPage > 1) {
      links.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => onPageChange(1)} className="cursor-pointer">
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        links.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={i === currentPage}
            className="cursor-pointer"
          >
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
          <PaginationLink onClick={() => onPageChange(totalPages)} className="cursor-pointer">
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return links;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
          {renderPaginationLinks()}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = useMemo(() => searchParams.get('category') || 'General', [searchParams]);
  const page = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams]);
  const { notices, totalPages, isLoading, error } = useNotices(category, page);
  const { articles, isLoading: isLoadingArticles } = useTopArticles();

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('category', newCategory);
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const [search, setSearch] = useState('');
  const [query] = useDebounceValue(search, 500);

  useEffect(() => {
      
  }, [ query ]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('category', category);
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams, category]
  );

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5 ml-5">{category}</h1>

      <div className="flex flex-col md:flex-row">

        <div className="ml-5 my-8 flex-1">
          {isLoading ? (
            <p>Loading notices...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="flex w-[97.5%] mb-2 justify-between py-2 rounded-sm">
                <div className="relative w-[50%] flex items-center">
                  <Search className="absolute left-3 h-5 w-5 text-gray-500" />
                  <Input
                    value={search}
                    type="email"
                    placeholder="Search </>"
                    className="pl-10 w-full" // Add padding to avoid icon overlap
                  />
                </div>                
                <div className="flex">
                  <DatePicker />
                </div>
              </div>
              <NoticeSection notices={notices} />
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <div className="px-5">
          {isLoadingArticles ? (
            <p>Loading articles...</p>
          ) : (
            <ArticleRankings articles={articles} />
          )}
        </div>
      </div>
    </div>
  );
}