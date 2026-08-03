import { defineQuery } from "next-sanity";

import { urlFor } from "@/sanity/image";
import { sanityFetch } from "@/sanity/live";

import { SlideSchema } from "@/schemas/backend_schemas/homePageSchema";
import { CategoriesSchema, LinkSchema } from "@/schemas/backend_schemas/CategoriesSchema";

import ArticlesSection from "@/components/cards/ArticlesSection";
import Main from "@/components/home/Main";
import Slider from "@/components/home/Slider";
import { Header } from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "general"][0]{
    logoText,
    sliders[]->{
      title,
      author,
      image
    },
    categories[]->{
    _id,
    "slug": slug.current,
     title 
    },
    supportUs->{
      label,
      openInNewTab,
      url
    },
    about->{
      label,
      openInNewTab,
      url
    },
  }
`)

export default async function Home() {

  const { data: home } = await sanityFetch({ query: HOME_PAGE_QUERY });

  const slides = home?.sliders?.flatMap((slide) => {
    const parsed = SlideSchema.safeParse(slide);
    if (!parsed.success) return [];

    return [{
      title: parsed.data.title,
      author: parsed.data.author,
      image: slide.image ? urlFor(slide.image).url() : "https://placehold.co/1920x1080/png"
    }];
  }) || [];

  const categories = home?.categories?.flatMap((category) => {
    const parsed = CategoriesSchema.safeParse(category);
    if (!parsed.success) return [];

    return [{
      _id: parsed.data._id,
      slug: parsed.data.slug,
      title: parsed.data.title
    }];
  }) || [];

  const supportUsParsed = LinkSchema.safeParse(home?.supportUs);

  const aboutParsed = LinkSchema.safeParse(home?.about);

  const supportUs = supportUsParsed.success
    ? supportUsParsed.data
    : {
      label: "Support Us",
      openInNewTab: false,
      url: "/supportus",
    };

  const about = aboutParsed.success
    ? aboutParsed.data
    : {
      label: "About Us",
      openInNewTab: false,
      url: "/about",
    };

  return (
    <div className="h-full">
      <Header title={home?.logoText ?? ""} />

      <Slider slides={slides} />

      <div className="px-2 md:px-[5%] xl:px-[9%]">
        <Navbar
          categories={categories}
          supportUs={supportUs}
          about={about}
          className="3xl:mx-auto max-w-7xl"
        />
        <div className="px-5">
          <Main />

          {categories.slice(0, 4).map((category) => (
            <ArticlesSection key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}