'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export default function AdBanner() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative rounded-lg overflow-hidden h-64 bg-slate-100 p-8 flex items-center">
          <div className="z-10">
            <h3 className='text-muted-foreground font-semibold'>UP TO 30% OFF</h3>
            <h2 className="text-black text-3xl font-bold max-w-sm mt-2">
              Apple iPhone 14 Pro
            </h2>
            <p className='text-muted-foreground mt-2'>Now available on monthly installments.</p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/shop">Shop Now</Link>
            </Button>
          </div>
          <div className='absolute right-0 top-0 h-full w-1/2'>
            <Image
              src="https://placehold.co/300x300.png"
              alt="iPhone 14 Pro"
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-contain"
              data-ai-hint="iphone hand"
            />
          </div>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
         <div className="relative rounded-lg overflow-hidden h-64 bg-emerald-50 p-6 flex flex-col justify-center items-center text-center">
            <h3 className='font-bold text-lg'>Flexible VSSL treadmil</h3>
            <h2 className="text-emerald-600 text-2xl font-bold my-2">
              Workout At Home
            </h2>
            <Button asChild className="mt-4 bg-emerald-500 hover:bg-emerald-600">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <div className='absolute -bottom-4 right-0 h-3/5 w-2/5'>
              <Image
                src="https://placehold.co/150x150.png"
                alt="Treadmill"
                fill
                sizes="150px"
                className="object-contain"
                data-ai-hint="treadmill"
              />
            </div>
        </div>
         <div className="relative rounded-lg overflow-hidden h-64 bg-amber-50 p-6 flex flex-col justify-center items-center text-center">
            <h3 className='font-bold text-lg'>Apple Watch Ultra</h3>
            <h2 className="text-amber-600 text-2xl font-bold my-2">
              Up to 40% off
            </h2>
            <Button asChild className="mt-4 bg-amber-500 hover:bg-amber-600">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <div className='absolute -bottom-2 right-0 h-2/3 w-2/5'>
              <Image
                src="https://placehold.co/150x150.png"
                alt="Apple Watch"
                fill
                sizes="150px"
                className="object-contain"
                data-ai-hint="smart watch"
              />
            </div>
        </div>
       </div>
    </div>
  );
}
