import { notFound } from 'next/navigation';
import { defineQuery } from 'next-sanity'

import CategoryArticlesSection from '@/components/cards/CategoryArticles';
import ArticlesPagination from '@/components/misc/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/site-config';
import { sanityFetch } from '@/sanity/live';
import { ArticlesResultSchema } from '@/schemas/backend_schemas/homePageSchema'

interface Props {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

const ARTICLES_QUERY = defineQuery(`
  {
    "total": count(*[
      _type == "article" &&
      ($category == "" || category->slug.current == $category) &&
      publishedAt >= $startDate &&
      publishedAt < $endDate &&
      (
        $search_string == "" ||
        title match $searchPattern ||
        oneLiner match $searchPattern ||
        pt::text(content) match $searchPattern ||
        category->title match $searchPattern ||
        count(tags[@ match $searchPattern]) > 0
      )
    ]),
    "articles": *[
      _type == "article" &&
      ($category == "" || category->slug.current == $category) &&
      publishedAt >= $startDate &&
      publishedAt < $endDate &&
      (
        $search_string == "" ||
        title match $searchPattern ||
        oneLiner match $searchPattern ||
        pt::text(content) match $searchPattern ||
        category->title match $searchPattern ||
        count(tags[@ match $searchPattern]) > 0
      )
    ] | order(publishedAt desc) [$start...$end] {
      _id,
      "slug": slug.current,
      title,
      oneLiner,
      featuredImage,
      publishedAt,
      tags,
      "category": category->{
        _id,
        title,
        "slug": slug.current
      },
      author->{
        ...,
        "role": role->title,
        "position": position->title,
        "department": department->title,
        "house": house->title,
        "displayName": select(
          _type == "student" => roll + " " + fullName,
          _type == "teacher" => fullName,
          _type == "alumni" => roll + " " + fullName,
          fullName
        )
      }
    }
  }
`)

async function Page({ searchParams }: Props) {

  const SearchParams = await searchParams;

  const category = (SearchParams.category || '').trim();
  const currentPage = Math.max(1, Number.parseInt(SearchParams.page || '1', 10) || 1);
  const search_string = (SearchParams.query || '').trim();
  const startDate = SearchParams.startDate || '1970-01-01';
  const endDate = SearchParams.endDate || '9999-12-01';

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const searchPattern = `*${search_string}*`;

  const { data } = await sanityFetch({
    query: ARTICLES_QUERY,
    params: {
      category,
      search_string,
      searchPattern,
      startDate,
      endDate,
      start,
      end,
    },
  });

  const result = ArticlesResultSchema.safeParse(data)

  if (!result.success) {
    console.error("Failed to parse articles result:", result.error);
    notFound();
  }

  const totalArticles = result.data.total;

  const articles = result.data.articles;

  const totalPages = Math.max(1, Math.ceil(totalArticles / ITEMS_PER_PAGE));

  const safeCurrentPage = Math.min(currentPage, totalPages)

  return (
    <div className='min-h-screen px-10 mt-4'>
      <div className="font-heading text-6xl">
        {(category || 'all articles').toUpperCase().replaceAll('-', ' ')}
      </div>
      <div className="mt-6 space-y-4 max-w-250">
        {articles.map((article) => (
          <CategoryArticlesSection key={article._id} article={article} />
        ))}
      </div>

      <div className="m-5 mt-8 mx-auto">
        <ArticlesPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          category={category}
          query={search_string}
          startDate={SearchParams.startDate}
          endDate={SearchParams.endDate}
        />
      </div>
    </div>
  )
}

export default Page