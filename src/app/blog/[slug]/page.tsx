
'use client';

import { useParams } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { blogPosts } = useAppContext();

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-[400px] w-full mt-8 rounded-lg" />
          <div className="space-y-4 mt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <div className="relative w-full aspect-video">
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.imageHint}
            />
        </div>
        <div className="p-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By Admin</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
            </div>
            <div 
              className="prose lg:prose-xl max-w-none text-foreground/80"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
        </div>
      </Card>
    </div>
  );
}
