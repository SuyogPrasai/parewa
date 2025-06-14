import React from 'react'
import { fetchNotices } from '@/lib/actions/get-notices';
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

  const { notices, totalPages, error } = await fetchNotices({ category, page, query, date });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
          {category}
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 max-w-[750px]">
          <div className="flex-1 max-w-full lg:max-w-[950px] my-6 sm:my-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 w-full">
              <CollectionsDateHeader
                initialDate={date}
                initialPage={page}
                initialQuery={query}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <NoticeSection notices={notices} />
            </div>
            <div className="mt-6">
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                category={category}
                debouncedQuery={query}
                selectedDate={new Date(date)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
