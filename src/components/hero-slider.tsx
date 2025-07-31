'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

const sliderItems = [
  {
    image: 'https://placehold.co/1200x600.png',
    title: 'Your Style, Your Story',
    description: 'Discover the latest trends and express yourself with our new collection.',
    hint: 'fashion model',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
  },
  {
    image: 'https://placehold.co/1200x600.png',
    title: 'Accessorize Your Life',
    description: 'Find the perfect pieces to complete your look. Quality accessories for every occasion.',
    hint: 'stylish accessories',
    buttonText: 'Explore Collection',
    buttonLink: '/shop',
  },
  {
    image: 'https://placehold.co/1200x600.png',
    title: 'Unleash Your Confidence',
    description: 'Elegant and modern, our apparel is designed to make you feel your best.',
    hint: 'confident woman',
    buttonText: 'Learn More',
    buttonLink: '/about',
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  data-ai-hint={item.hint}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h2>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">{item.description}</p>
                    <Button asChild size="lg">
                      <Link href={item.buttonLink}>{item.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
      </Carousel>
    </div>
  );
}
