'use client';

import { CarouselHome } from "@/components/app-carousel";

export default function Page() {
  const slides = [
    { id: 1, image: '/img1.jpg', title: 'Slide 1', author: 'Author 1' },
  ];

  return (
    <>
      <CarouselHome slides={slides} />
    </>
  );
}
