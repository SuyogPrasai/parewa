import { Suspense } from 'react';
import { fetchArticles } from '@/lib/actions/get-articles';
import SideArticleList from '@/components/articles/ArticleCollection';
import PaginationControls from '@/components/shared/Pagination';
import CollectionsDateHeader from '@/components/shared/CollectionsDateHeader';

interface ArticlesPageProps {
    searchParams: Promise<{
        category?: string;
        page?: string;
        query?: string;
        date?: string;
    }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {

    const SearchParams = await searchParams;

    const category = SearchParams.category || 'Literature';
    const page = Number(SearchParams.page || '1');
    const query = SearchParams.query || '';
    const date = SearchParams.date || '';

    const { articles, totalPages, error } = await fetchArticles({ category, page, query, date });


    return (
        <>
            <div className="min-h-screen flex flex-col">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald mt-4 sm:mt-5 ml-4 sm:ml-5">
                    {category}
                </h1>
                <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8">
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
                            <SideArticleList articles={articles} variant="detailed" />
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
    );
}