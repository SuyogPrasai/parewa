'use client';

import { Search } from 'lucide-react';

import getFormattedDate from '@/helpers/get-date-in-format'; // Assuming this helper exists
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useMemo, useCallback, useState } from 'react';
import { useTopArticles } from '@/hooks/useTopArticles';
import { useArticles } from '@/hooks/useArticles';

import ArticleRankings from '@/components/articles/TopArticles';
import { Navbar } from '@/components/collections/CollectionNavbar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/shared/DatePicker';
import { useDebounceValue } from 'usehooks-ts';
import PaginationControls from '@/components/shared/Pagination';
import SideArticleList from '@/components/articles/ArticleCollection';

export default function ArticlesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = useMemo(() => searchParams.get('category') || 'Literature', [searchParams]);
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

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [debouncedQuery] = useDebounceValue(search, 500);

  // Pass query and selectedDate to Articles
  const { articles, totalPages, isLoading, error } = useArticles(category, page, debouncedQuery, selectedDate);
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
      params.set('category', newCategory);
      params.set('page', '1');
      params.delete('query');
      params.delete('date');
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
      params.delete('query');
    }
    if (selectedDate) {
      params.set('date', getFormattedDate(selectedDate));
    } else {
      params.delete('date');
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
    <div className="min-h-screen flex flex-col">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
      <Separator />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
        {category}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 max-w-full lg:max-w-[950px] my-6 sm:my-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 w-full">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full text-sm sm:text-base"
                defaultValue={search}
              />
            </div>
            <div className="flex justify-center md:justify-end">
              <DatePicker date={selectedDate} setDate={setSelectedDate} />
            </div>
          </div>
          {isLoading ? (
            <p className="text-center text-sm sm:text-base">Loading articles...</p>
          ) : error ? (
            <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                <SideArticleList articles={articles} variant="detailed" />
              </div>
              <div className="mt-6">
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}``