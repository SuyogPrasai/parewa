import React, { Suspense } from 'react'
import { fetchNotices } from '@/lib/application/get-notices';
import PaginationControls from '@/components/shared/Pagination';
import CollectionsDateHeader from '@/components/shared/CollectionsDateHeader';
import NoticeSection from '@/components/notice/NoticeSection';

interface NoticesPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
    date?: string;
  }>;
}

export default async function NoticePage({ searchParams }: NoticesPageProps) {

  const SearchParams = await searchParams;

  const category = SearchParams.category || 'Literature';
  const page = Number(SearchParams.page || '1');
  const query = SearchParams.query || '';
  const date = SearchParams.date || '';

  const { notices, totalPages } = await fetchNotices({ category: category.toLocaleLowerCase(), page, query, date });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
          {category}
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 max-w-[750px]">
          <div className="flex-1 max-w-full lg:max-w-[950px] my-6 sm:my-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <CollectionsDateHeader
                  initialDate={date}
                  initialPage={page}
                  initialQuery={query}
                />
              </Suspense>

            </div>
            <div className="grid grid-cols-1 gap-4">
              <NoticeSection notices={notices} />
            </div>
            <div className="mt-6">
              <Suspense fallback={<div>Loading...</div>}>
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  category={category}
                  debouncedQuery={query}
                  selectedDate={new Date(date)}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
