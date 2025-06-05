'use client';

import { useEffect, useMemo, useCallback, JSX, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Search } from 'lucide-react';
import getFormattedDate from '@/helpers/getDateInFormat'; // Assuming this helper exists
import { useTopArticles } from '@/hooks/use-top-articles';
import { useArticles } from '@/hooks/use-articles';

import ArticleRankings from '@/components/app-side-top-articles';
import { Navbar } from '@/components/collection-navbar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/date-picker';
import { useDebounceValue } from "usehooks-ts";
import PaginationControls from '@/components/pagination';
import SideArticleList from '@/components/app-article-collection';

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

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate); // Allow null for no date filter

  const [search, setSearch] = useState(searchParams.get('query') || ''); // Initialize search from URL
  const [debouncedQuery] = useDebounceValue(search, 500);

  // Pass query and selectedDate to Articles
  const { articles, totalPages, isLoading, error } = useArticles(category, page, debouncedQuery, selectedDate);
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
  console.log( articles)
  return (
    <div className="min-h-screen">
      <Navbar header_click={handleCategoryChange} navLinks={navLinks} />
      <Separator />
      <h1 className="text-6xl font-oswald mt-5 ml-5">{category}</h1>

      <div className="flex flex-col md:flex-row">

        <div className="ml-5 my-8 flex-1 max-w-[950px]">
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
            <p>Loading articles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <SideArticleList articles={articles} variant='detailed' /> {/* Pass articles directly */}
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}