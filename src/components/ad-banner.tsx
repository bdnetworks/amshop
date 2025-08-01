
'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAppContext } from '@/providers/app-provider';
import { Skeleton } from './ui/skeleton';

export default function AdBanner() {
  const { adBanners } = useAppContext();

  if (!adBanners) {
    return (
       <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
             <Skeleton className="h-64 w-full" />
             <Skeleton className="h-64 w-full" />
          </div>
       </div>
    )
  }

  const { largeBanner, smallBanners } = adBanners;

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-lg overflow-hidden h-64 bg-slate-100 p-8 flex items-center">
          <div className="z-10">
            {largeBanner.supertitle && <h3 className='text-muted-foreground font-semibold'>{largeBanner.supertitle}</h3>}
            <h2 className="text-black text-3xl font-bold max-w-sm mt-2">
              {largeBanner.title}
            </h2>
            {largeBanner.subtitle && <p className='text-muted-foreground mt-2'>{largeBanner.subtitle}</p>}
            <Button asChild size="lg" className="mt-6">
              <Link href={largeBanner.href}>{largeBanner.buttonText}</Link>
            </Button>
          </div>
          <div className='absolute right-0 top-0 h-full w-1/2'>
            <Image
              src={largeBanner.image}
              alt={largeBanner.title}
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-contain"
              data-ai-hint={largeBanner.imageHint}
            />
          </div>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
         <div className="relative rounded-lg overflow-hidden h-64 bg-emerald-50 p-6 flex flex-col justify-center items-center text-center">
            {smallBanners[0].subtitle && <h3 className='font-bold text-lg'>{smallBanners[0].subtitle}</h3>}
            <h2 className="text-emerald-600 text-2xl font-bold my-2">
              {smallBanners[0].title}
            </h2>
            <Button asChild className="mt-4 bg-emerald-500 hover:bg-emerald-600">
              <Link href={smallBanners[0].href}>{smallBanners[0].buttonText}</Link>
            </Button>
            <div className='absolute -bottom-4 right-0 h-3/5 w-2/5'>
              <Image
                src={smallBanners[0].image}
                alt={smallBanners[0].title}
                fill
                sizes="150px"
                className="object-contain"
                data-ai-hint={smallBanners[0].imageHint}
              />
            </div>
        </div>
         <div className="relative rounded-lg overflow-hidden h-64 bg-amber-50 p-6 flex flex-col justify-center items-center text-center">
            {smallBanners[1].subtitle && <h3 className='font-bold text-lg'>{smallBanners[1].subtitle}</h3>}
            <h2 className="text-amber-600 text-2xl font-bold my-2">
              {smallBanners[1].title}
            </h2>
            <Button asChild className="mt-4 bg-amber-500 hover:bg-amber-600">
              <Link href={smallBanners[1].href}>{smallBanners[1].buttonText}</Link>
            </Button>
            <div className='absolute -bottom-2 right-0 h-2/3 w-2/5'>
              <Image
                src={smallBanners[1].image}
                alt={smallBanners[1].title}
                fill
                sizes="150px"
                className="object-contain"
                data-ai-hint={smallBanners[1].imageHint}
              />
            </div>
        </div>
       </div>
    </div>
  );
}
