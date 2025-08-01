
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useAppContext } from '@/providers/app-provider';
import { Skeleton } from './ui/skeleton';

const HeroSection = () => {
    const { heroSlides, sideBanners } = useAppContext();
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    if (!heroSlides || heroSlides.length === 0 || !sideBanners || sideBanners.length === 0) {
        return (
            <div className="bg-secondary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                     <Skeleton className="h-[400px] w-full rounded-lg" />
                </div>
            </div>
        )
    }

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 items-center py-8">
          {/* Main Banner */}
          <div className="col-span-12 lg:col-span-8">
            <Carousel 
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{ loop: true }}
            >
              <CarouselContent>
                {heroSlides.map((slide) => (
                  <CarouselItem key={slide.id}>
                    <div className="relative rounded-lg overflow-hidden h-[400px] bg-primary/10 flex items-center">
                      <div className="p-8 md:p-12 z-10">
                        <h3 className="text-primary font-bold">
                          {slide.supertitle}
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground my-4 max-w-sm leading-tight">
                          {slide.title}
                        </h2>
                        <Button asChild size="lg">
                          <Link href={slide.href}>Shop Now</Link>
                        </Button>
                      </div>
                      <div className="absolute right-0 bottom-0 w-3/5 h-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                          className="object-contain"
                          data-ai-hint={slide.imageHint}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white shadow-md" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white/80 hover:bg-white shadow-md" />
            </Carousel>
          </div>
          {/* Side Banners */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {sideBanners.map((banner) => (
              <div key={banner.id} className="relative rounded-lg overflow-hidden h-[188px] bg-white border flex items-center justify-between p-6">
                <div className="z-10">
                  <h3 className="font-bold text-lg text-foreground">
                    {banner.title}
                  </h3>
                  <div className="my-2">
                    <span className="font-bold text-primary text-xl">${banner.price}</span>
                    <span className="text-muted-foreground line-through ml-2">
                      ${banner.originalPrice}
                    </span>
                  </div>
                  <Button asChild size="sm">
                    <Link href={banner.href}>Shop Now</Link>
                  </Button>
                </div>
                <div className="relative w-28 h-28">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    sizes="150px"
                    className="object-contain"
                    data-ai-hint={banner.imageHint}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

