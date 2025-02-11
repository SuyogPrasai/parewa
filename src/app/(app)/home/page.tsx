'use client';

import { CarouselHome } from "@/components/app-carousel";
import { Navbar } from "@/components/app-navbar";
import MainSection from "@/components/app-main-section";
import { Separator } from "@/components/ui/separator";
import ArticlesSection from "@/components/app-article-section";

export default function Page() {
  const slides = [
    { id: 1, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens. ', author: 'Kahlil Gibran' },
  ];

  return (
    <>
      <CarouselHome slides={slides} />
      <Separator orientation="horizontal" className="" /> 
      <Navbar />
      <Separator orientation="horizontal" className="" /> 
      <MainSection />
      <Separator orientation="horizontal" className="" /> 
      <ArticlesSection />
      <Separator orientation="horizontal" className="" /> 
      <ArticlesSection />
      <Separator orientation="horizontal" className="" /> 
      <ArticlesSection />
      <Separator orientation="horizontal" className="" /> 

    </>
  );
}
