
'use client';

import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { aboutPageContent } = useAppContext();

  if (!aboutPageContent) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-8 w-3/4 mx-auto mt-4" />
        <Skeleton className="h-[400px] w-full mt-12 rounded-lg" />
        <div className="space-y-4 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  const { title, description, imageUrl, imageHint } = aboutPageContent;

  return (
    <div>
      <div className="relative bg-primary/10 py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="prose lg:prose-xl max-w-none mx-auto text-muted-foreground">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-12">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              data-ai-hint={imageHint}
            />
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
