
'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useAppContext } from '@/providers/app-provider';
import LucideIcon from './lucide-icon';
import { Skeleton } from './ui/skeleton';

export default function BrowseByCategory() {
  const { categories } = useAppContext();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  if (!categories || categories.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="section-title">Browse by Category</h2>
             <div className="flex gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-36 w-full rounded-lg" />
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-title">Browse by Category</h2>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/6">
                 <div className="category-card cursor-pointer h-full">
                    <LucideIcon name={category.icon} className="h-10 w-10 text-primary" />
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white shadow-md" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white shadow-md" />
        </Carousel>
    </div>
  )
}
