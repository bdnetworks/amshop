
'use client';

import * as React from 'react';
import { Shirt, Watch, ToyBrick, Utensils, Headset, Smartphone, Dices, Computer, Armchair, Baby } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const categories = [
    { name: 'Clothes', icon: <Shirt className="h-10 w-10 text-primary" /> },
    { name: 'Watches', icon: <Watch className="h-10 w-10 text-primary" /> },
    { name: 'Toys', icon: <ToyBrick className="h-10 w-10 text-primary" /> },
    { name: 'Kitchen', icon: <Utensils className="h-10 w-10 text-primary" /> },
    { name: 'Headsets', icon: <Headset className="h-10 w-10 text-primary" /> },
    { name: 'Gadgets', icon: <Smartphone className="h-10 w-10 text-primary" /> },
    { name: 'Gaming', icon: <Dices className="h-10 w-10 text-primary" /> },
    { name: 'Computer', icon: <Computer className="h-10 w-10 text-primary" /> },
    { name: 'Furniture', icon: <Armchair className="h-10 w-10 text-primary" /> },
    { name: 'Baby', icon: <Baby className="h-10 w-10 text-primary" /> },
];

export default function BrowseByCategory() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

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
            {categories.map((category, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6">
                 <div className="category-card cursor-pointer h-full">
                    {category.icon}
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
