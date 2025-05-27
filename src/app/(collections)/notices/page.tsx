'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import axios from 'axios';
import { Search } from 'lucide-react';

import Notice from '@/types/notice';
import { Article } from '@/types/articleSection';
import { ArticlesResponse } from '@/types/articlesResponse';
import getFormattedDate from '@/helpers/getDateInFormat'; // Assuming this helper exists

import NoticeSection from '@/components/app-notice-section';
import ArticleRankings from '@/components/app-side-top-articles';
import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/date-picker';
import { useDebounceValue } from "usehooks-ts";
import PaginationControls from '@/components/pagination';

import { ITEMS_PER_PAGE, MAX_PAGES_TO_SHOW } from '@/config/site-config';

interface NoticesResponse {
  success: boolean;
  notices: Notice[];
  totalPages: number;
}

// Modified useNotices hook to include query and date
const useNotices = (category: string, page: number, query: string, date: Date | null) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('category', category);
        params.set('page', page.toString());
        params.set('limit', ITEMS_PER_PAGE.toString());
        if (query) {
          params.set('query', query);
        }
        // Only add date parameter if a date is selected
        if (date) {
          params.set('date', getFormattedDate(date)); // Ensure date is formatted correctly for API
        }

        const response = await axios.get<NoticesResponse>(
          `/api/get_news?${params.toString()}`
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
  }, [category, page, query, date]); // Add query and date to dependencies

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

export default function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = useMemo(() => searchParams.get('category') || 'General', [searchParams]);
  const page = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams]);

  // Initialize selectedDate from URL or null if not present
  const initialDate = useMemo(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      const [year, month, day] = dateParam.split('-').map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed
    }
    return null; // Set to null if no date param is found
  }, [searchParams]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate); // Allow null for no date filter

  const [search, setSearch] = useState(searchParams.get('query') || ''); // Initialize search from URL
  const [debouncedQuery] = useDebounceValue(search, 500);

  // Pass query and selectedDate to useNotices
  const { notices, totalPages, isLoading, error } = useNotices(category, page, debouncedQuery, selectedDate);
  const { articles, isLoading: isLoadingArticles } = useTopArticles();

  const handleCategoryChange = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('category', newCategory);
      params.set('page', '1');
      // Reset search and date when category changes, or keep them if desired
      params.delete('query');
      params.delete('date'); // Clear date param
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('page', page.toString());
    if (debouncedQuery) {
      params.set('query', debouncedQuery);
    } else {
      params.delete('query'); // Clean up URL if query is empty
    }
    // Only add date to URL if selectedDate is not null
    if (selectedDate) {
      params.set('date', getFormattedDate(selectedDate));
    } else {
      params.delete('date'); // Clean up URL if date is null
    }
    router.push(`?${params.toString()}`);
  }, [debouncedQuery, router, selectedDate, category, page]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('category', category);
      params.set('page', newPage.toString());
      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }
      if (selectedDate) {
        params.set('date', getFormattedDate(selectedDate));
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams, category, debouncedQuery, selectedDate]
  );

  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5 ml-5">{category}</h1>

      <div className="flex flex-col md:flex-row">

        <div className="ml-5 my-8 flex-1">
          <div className="flex w-[97.5%] mb-2 justify-between py-2 rounded-sm">
            <div className="relative w-[50%] flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-gray-500" />
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search </>"
                className="pl-10 w-full"
                defaultValue={search}
              />
            </div>
            <div className="flex">
              {/* Pass null to setDate to clear the date filter */}
              <DatePicker date={selectedDate} setDate={setSelectedDate} />
            </div>
          </div>
          {isLoading ? (
            <p>Loading notices...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
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