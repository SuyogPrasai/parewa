'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArticlesSectionProps } from '@/types/utilities';
import Article from '@/types/post_objects/article';

import { Card, CardContent } from '@/components/ui/card';

export default function ArticlesSection({ category, articles }: ArticlesSectionProps) {

  if (!articles || articles.length === 0) {
    return <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">No articles available.</section>;
  }

  return (
    <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-8 max-w-[1350px]">
      <Link href={"/articles?category=" + category}>
        <h2 className="text-5xl font-bold mb-6 md:text-10xl text-gray-900 font-oswald">{category}</h2>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">

        <MainArticleCard article={articles[0]} />

        <div className="flex flex-col gap-6 md:col-span-1">
          {articles.slice(1).map((article) => (
            <SideArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MainArticleCard({ article }: { article: Article }) {
  return (
    <article className="md:col-span-2 z-10">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden">
        <Link href={article.link || "#"} className="block relative h-56 md:h-72 lg:h-80">
          <Image
            src={article.featuredImage || ""}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 50vw"
            className="object-cover rounded-t-lg"
            priority
          />
        </Link>
        <CardContent className="p-6 bg-white">
          <h3 className="text-lg font-bold mb-2 md:text-xl">
            <Link href={article.link || "#"} className="hover:text-primary-block transition-colors duration-20 font-oswald text-3xl ">
              {article.title.toUpperCase()}
            </Link>
          </h3>
          {article.oneLiner && <p className="text-sm text-gray-600 mb-2">{article.oneLiner}</p>}
          <span className="text-primary-block text-sm  font-roboto tracking-widest">{article.author}</span>
        </CardContent>
      </Card>
    </article>
  );
}

function SideArticleCard({ article }: { article: Article }) {
  return (
    <Card className="h-full relative overflow-hidden hover:shadow-md transition-shadow duration-200 rounded-lg z-10">
      <Link href={article.link || "#"} className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-40 flex-shrink-0">
          <Image src={article.featuredImage || ""} alt={article.title} fill className="object-cover" />
        </div>
        <CardContent className="px-4 pt-4 flex-1 bg-white">
          <div className="relative bg-black w-[70%] rounded-lg h-[0.15rem] mb-2"></div>
          <h3 className="text-lg leading-tight font-bold hover:text-primary-block transition-colors duration-200 font-oswald w-[80%]">
            {article.title}
          </h3>
          <span className="text-primary-block text-xs font-medium font-roboto tracking-widest">{article.author}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
