import { defineQuery } from 'next-sanity';

import { urlFor } from '@/sanity/image';
import { sanityFetch } from '@/sanity/live';
import { ArticlesResultSchema } from '@/schemas/backend_schemas/homePageSchema';

import MainStory from '../cards/MainStory';
import SideCalendar from '../cards/SideCalendar';

const MAIN_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(_createdAt desc)[0...3]{
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
`)

const ORIENTATIONS = ['left', 'right', 'left'] as const

async function Main() {

  const { data } = await sanityFetch({ query: MAIN_ARTICLES_QUERY });

  const safeParsedArticles = ArticlesResultSchema.safeParse({ total: data.length, articles: data });

  const stories = safeParsedArticles.success
    ? safeParsedArticles.data.articles.map((article, index) => {
      const firstTag = article.tags?.[0];

      return {
        slug: article.slug,
        featured_image: article.featuredImage
          ? urlFor(article.featuredImage).url()
          : 'https://placehold.co/960x640/png',
        title: article.title,
        author: article.author.displayName,
        one_liner: article.oneLiner ?? '',
        tag: typeof firstTag === 'string' ? firstTag : 'news',
        orientation: ORIENTATIONS[index % ORIENTATIONS.length],
      };
    })
    : [];

  return (
    <div className='pt-10 font-bold w-full'>
      <span className='text-4xl md:text-5xl font-heading'>
        Top Stories
      </span>

      <div className="flex justify-between my-6 gap-5 md:gap-0 flex-col md:flex-row">
        <div className='flex flex-col w-full xl:max-w-[55vw] gap-3'>
          {stories.map((story) => (
            <MainStory
              key={story.slug}
              slug={story.slug}
              featured_image={story.featured_image}
              title={story.title}
              author={story.author}
              one_liner={story.one_liner}
              tag={story.tag}
              orientation={story.orientation}
            />
          ))}
        </div>
        <SideCalendar />
      </div>
    </div>
  )
}

export default Main