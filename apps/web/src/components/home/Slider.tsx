"use client"

import Image from "next/image";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

interface Slide {
  title: string
  author: string
  image: string
}

function Slider({ slides }: { slides: Slide[] }) {
  const [autoplayPlugin] = useState(() =>
    Autoplay({ delay: 10000, stopOnInteraction: true })
  )

  return (
    <Carousel
      className="relative h-[50vh] w-full overflow-hidden md:h-[30rem]"
      plugins={[autoplayPlugin]}
      onMouseEnter={autoplayPlugin.stop}
      onMouseLeave={autoplayPlugin.reset}
    >
      <CarouselContent className="h-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative h-full w-full">
              <Image
                src={slide?.image}
                alt={slide.title || "Slider Image"}
                className="object-cover brightness-75"
                fill
                priority={index === 0}
              />
                <Card className="relative h-full rounded-none bg-transparent">
                <CardContent className="flex items-end md:justify-start p-8 md:p-12 h-full">
                  <div className="max-w-4xl md:pl-10">
                    <div className="text-5xl md:text-7xl font-extrabold text-primary-foreground font-heading">{slide.title.toUpperCase()}</div>
                    <div className="text-lg italic mt-3 text-primary-foreground font-sans pl-3"> {slide.author}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* 
      <CarouselPrevious />
      <CarouselNext /> 
      */}
    </Carousel>
  )
}

export default Slider