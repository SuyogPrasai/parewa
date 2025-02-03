'use client';

import { CarouselHome } from "@/components/app-carousel";
import { Navbar } from "@/components/app-navbar";

export default function Page() {
  const slides = [
    { id: 1, image: '/carousel_background_2.jpg', title: 'Sadness is but a wall between two gardens. ', author: 'Kahlil Gibran' },
  ];

  return (
    <>
      <CarouselHome slides={slides} />
      <Navbar />
    </>
  );
}
