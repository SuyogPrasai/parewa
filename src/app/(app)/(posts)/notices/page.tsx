import { fetchNotices } from '@/lib/actions/get-notices'; // Assume this is your data fetching function
import NoticesClient from '@/components/collections/Pages/NoticesCollection';
import { Suspense } from 'react';


interface NoticesPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
    date?: string;
  }>;
}


export default async function NoticesPage({ searchParams }: NoticesPageProps) {

  const SearchParams = await searchParams;

  const page = parseInt(SearchParams.page || '1', 10);
  const query = SearchParams.query || '';
  const date = SearchParams.date || '';
  const category = SearchParams.category || '';

  // Fetch notices on the server
  const { notices, totalPages, error } = await fetchNotices({ page, query, date, category });

  return (
    <>
      <Suspense fallback={''}>
        <NoticesClient
          initialNotices={notices}
          totalPages={totalPages}
          initialCategory={category}
        />
      </Suspense>
    </>
  );
}