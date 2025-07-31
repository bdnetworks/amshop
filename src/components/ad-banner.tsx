'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export default function AdBanner() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative rounded-lg overflow-hidden h-64">
        <Image
          src="https://nextjs-two-navy-66.vercel.app/_next/image?url=%2Fadd-banner-2.png&w=1920&q=75"
          alt="Ad Banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-8 md:p-12">
          <h2 className="text-white text-3xl md:text-4xl font-bold max-w-md">
            Enhance Your Music Experience
          </h2>
          <Button asChild size="lg" className="mt-6">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
