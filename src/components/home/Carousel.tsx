'use client';

import * as React from 'react';

import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, } from '@/components/ui/carousel';
import Image from 'next/image';

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
  <Card className="overflow-hidden w-full h-[30vh] md:h-[60vh] relative rounded-none border-none">
    <CardContent className="p-0 w-full h-full relative">
      {/* Optimized Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority // Use priority for above-the-fold images
        sizes="100vw"
        quality={85} // Slightly reduce quality for better performance
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Text Content */}
      <div className="absolute bottom-4 left-4 md:bottom-10 md:left-12 lg:ml-10 max-w-3xl text-white space-y-2">
        <h1 className="text-3xl lg:text-7xl font-bold leading-tight font-bebas_neue">
          {title.toUpperCase()}
        </h1>
        <p className="text-xs md:text-sm lg:text-base italic text-gray-300">
          {author}
        </p>
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