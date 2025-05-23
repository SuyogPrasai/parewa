'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Define the type for a slide
interface Slide {
  id: number;
  image: string;
  title: string;
  author: string;
}

// Define the props type for the Carousel component
interface CarouselHomeProps {
  slides: Slide[];
}

// Slide component for reusability
const SlideContent: React.FC<Slide> = ({ image, title, author }) => (
  <Card className="overflow-hidden w-full h-[50vh] md:h-[60vh] relative rounded-none border-none"> {/* Removed rounded corners and border */}
    <CardContent className="p-0 w-full h-full relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {/* Text Content */}
      <div className="lg:ml-10 absolute bottom-4 left-4 md:bottom-10 md:left-12 max-w-2xl text-white space-y-2">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold leading-tight">{title.toUpperCase()}</h1>
        <p className="text-xs md:text-sm lg:text-base italic text-primary">{author}</p>
      </div>
    </CardContent>
  </Card>
);

export function CarouselHome({ slides }: CarouselHomeProps) {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 10000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[autoplayPlugin.current]}
      className=""
      onMouseEnter={autoplayPlugin.current.stop}
      onMouseLeave={autoplayPlugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id} className="relative w-full h-full">
            <SlideContent {...slide} />
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  );
}