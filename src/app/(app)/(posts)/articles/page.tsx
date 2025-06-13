import { fetchArticles } from "@/lib/actions/get-articles";
import { fetchTopArticles } from "@/lib/actions/get-top-articles";
import ArticlesClient from "@/components/collections/Pages/ArticlesCollection";


interface ArticlesPageProps {
  searchParams: {
    category?: string;
    page?: string;
    query?: string;
    date?: string;
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const SearchParams = await searchParams;
  
  const category = await SearchParams.category || 'Literature';
  const page = Number(await SearchParams.page || '1');
  const query = await SearchParams.query || '';
  const date = await SearchParams.date || '';

  const { articles, totalPages, error } = await fetchArticles({category, page, query, date});

  return (
    <>
        <ArticlesClient initialArticles={articles} totalPages={totalPages} initialCategory={category} />
    </>
  )
}