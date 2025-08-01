
'use client';

import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const { blogPosts } = useAppContext();

  return (
    <div>
        <div className="relative bg-primary/10 py-20 mb-12">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-foreground">Our Blog</h1>
                <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto">
                    Stay updated with our latest news, articles, and stories.
                </p>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {!blogPosts ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i}>
                            <Skeleton className="h-56 w-full" />
                            <CardContent className="p-6">
                                <Skeleton className="h-4 w-1/4 mb-2" />
                                <Skeleton className="h-6 w-full mb-4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full mt-2" />
                                <Skeleton className="h-10 w-32 mt-6" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                        <div className="relative h-56 w-full">
                            <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint={post.imageHint}
                            />
                        </div>
                        <CardHeader>
                            <p className="text-sm text-muted-foreground">{post.date}</p>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription>{post.excerpt}</CardDescription>
                        </CardContent>
                        <div className="p-6 pt-0">
                           <Button asChild>
                             {/* Note: This link is a placeholder, as individual blog post pages aren't implemented yet */}
                             <Link href="#">Read More</Link>
                           </Button>
                        </div>
                    </Card>
                ))}
                </div>
            )}
        </div>
    </div>
  );
}
