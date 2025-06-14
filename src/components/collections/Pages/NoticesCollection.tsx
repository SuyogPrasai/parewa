'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import getFormattedDate from '@/helpers/get-date-in-format'; // Assume this helper exists
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/shared/DatePicker';
import PaginationControls from '@/components/shared/Pagination';
import NoticeSection from '@/components/notice/NoticeSection'; // Your NoticeSection component
import Notice from '@/types/post_objects/notice'; // Assume this is your Notice type
import { Suspense } from 'react';

interface NoticesClientProps {
  initialNotices: Notice[];
  totalPages: number;
  initialCategory?: string;
}

export default function NoticesClient({
  initialNotices,
  totalPages,
  initialCategory = 'General', // Default category
}: NoticesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from searchParams using useMemo
  const category = useMemo(
    () => searchParams.get('category') || initialCategory,
    [searchParams, initialCategory]
  );
  const page = useMemo(() => parseInt(searchParams.get('page') || '1', 10), [searchParams]);
  const initialDate = useMemo(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      const [year, month, day] = dateParam.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return null;
  }, [searchParams]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [debouncedQuery] = useDebounceValue(search, 500);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle category change
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

  // Update URL based on state changes
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
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, selectedDate, category, page]);

  // Handle page change
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
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, category, debouncedQuery, selectedDate]
  );

  // Filter notices based on search, date, and category
  useEffect(() => {
    setIsLoading(true);
    try {
      let filteredNotices = initialNotices;
      if (debouncedQuery) {
        filteredNotices = filteredNotices.filter((notice) =>
          notice.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
      }
      if (selectedDate) {
        filteredNotices = filteredNotices.filter((notice) => {
          const noticeDate = new Date(notice.publishedIn); // Adjust field name as per your Notice type
          return (
            noticeDate.getFullYear() === selectedDate.getFullYear() &&
            noticeDate.getMonth() === selectedDate.getMonth() &&
            noticeDate.getDate() === selectedDate.getDate()
          );
        });
      }
      if (category) {
        filteredNotices = filteredNotices.filter((notice) => notice.category === category);
      }
      setNotices(filteredNotices);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to filter notices');
      setIsLoading(false);
    }
  }, [debouncedQuery, selectedDate, category, initialNotices]);

  return (
    <Suspense >

      <div className="min-h-screen flex flex-col">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
          {category}
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex-1 max-w-full lg:max-w-[670px] my-6 sm:my-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 w-full">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search notices..."
                  className="pl-10 w-full text-sm sm:text-base"
                  defaultValue={search}
                />
              </div>
              <div className="flex justify-center md:justify-end">
                <DatePicker date={selectedDate} setDate={setSelectedDate} />
              </div>
            </div>
            {isLoading ? (
              <p className="text-center text-sm sm:text-base">Loading notices...</p>
            ) : error ? (
              <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <NoticeSection notices={notices} />
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
    </Suspense>
  );
}