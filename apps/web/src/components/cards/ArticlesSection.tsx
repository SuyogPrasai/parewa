import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";

import { urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";
import { type Article } from "@/schemas/backend_schemas/articleSchema";
import { ArticlesResultSchema } from "@/schemas/backend_schemas/homePageSchema";

import { Separator } from "../ui/separator";

const ARTICLES_CARD_QUERY = defineQuery(`
  *[_type == "article" && category->slug.current == $category]
  | order(publishedAt desc)[0...3] {
    _id,
    "slug": slug.current,
    title,
    oneLiner,
    featuredImage,
    publishedAt,
    tags,
    category->{
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
        _type == "guest" => fullName,
        fullName
      )
    }
  }
`);

async function ArticlesSection({ category }: { category: { slug: string; title: string } }) {

  const { data: main } = await sanityFetch({
    query: ARTICLES_CARD_QUERY,
    params: { category: category.slug },
  });

  const safeParsedMain = ArticlesResultSchema.safeParse({ total: main.length, articles: main });

  const validatedMain = safeParsedMain.success ? safeParsedMain.data.articles : [];

  return (
    <div className="w-full my-5 py-5">
      <Link href={`/articles?category=${category.slug}`} className="category font-heading text-6xl mb-8 transition-colors block">
        {category.title}
      </Link>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          <Separator />
          {validatedMain[0] && <MainArticleCard article={validatedMain[0]} />}
        </div>
        <div className="flex flex-col gap-6 w-full lg:w-1/2 h-full">
          {validatedMain.slice(1).map((article) => (
            <div key={article._id}>
              <Separator />
              <SideArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArticlesSection

function MainArticleCard({ article }: { article: Article }) {
  const featuredImage = article.featuredImage

  return (
    <Link className="group" href={`/articles/${article.slug}`}>
      <div className="relative w-full aspect-video overflow-hidden rounded-none">
        {featuredImage?.asset?._ref ? (
          <Image
            src={urlFor(featuredImage).url()}
            alt={article.title}
            fill
            className="object-cover transition-transform"
          />
        ) : null}
      </div>
      <div className="mt-3 font-heading text-4xl group-hover:text-primary">
        {article.title}
      </div>
      <div className="author font-extralight text-base text-primary mt-1 font-mono">
        {article.author.displayName}
      </div>
      <div className="author w-full font-serif text-base font-light text-foreground group-hover:text-primary sm:w-[80%]">
        {article.oneLiner}
      </div>
    </Link>
  )
}

function SideArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group flex gap-3 mt-3">
      <div className="relative h-[14.5rem] w-44 shrink-0 overflow-hidden rounded-none">
        {article.featuredImage?.asset?._ref && (
          <Image
            src={urlFor(article.featuredImage)
              .width(352)
              .height(464)
              .fit("crop")
              .quality(80)
              .auto("format")
              .url()}
            alt={article.title}
            fill
            sizes="176px"
            className="object-cover transition-transform"
          />
        )}
      </div>
      <div>
        {article.tags?.[0] && (
          <div className="tag text-base font-semibold text-primary">
            {article.tags[0].replace("#", "").charAt(0).toUpperCase() +
              article.tags[0].replace("#", "").slice(1)}
          </div>
        )}

        <h3 className="font-heading text-xl line-clamp-2 group-hover:text-primary">
          {article.title}
        </h3>
        <div className="author font-extralight text-base text-primary mt-1 font-mono">
          {article.author.displayName}
        </div>
        <div className="author w-full font-serif text-base font-light text-foreground group-hover:text-primary sm:w-[80%] line-clamp-3">
          {article.oneLiner}
        </div>
      </div>
    </Link>
  )
}