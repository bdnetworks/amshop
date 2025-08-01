
'use client';

import { useMemo } from 'react';
import ProductList from '@/components/product-list';
import HeroSection from '@/components/hero-section';
import AdBanner from '@/components/ad-banner';
import BrowseByCategory from '@/components/browse-by-category';
import NewProducts from '@/components/new-products';
import { Separator } from '@/components/ui/separator';
import FeaturesSection from '@/components/features-section';
import { useAppContext } from '@/providers/app-provider';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicProductList = ({ category, limit }: { category: string, limit: number }) => {
  const { products } = useAppContext();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const prods = category === 'all'
      ? products
      : products.filter(p => p.category === category);
    return prods.slice(0, limit);
  }, [products, category, limit]);

  if (!products) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
            {Array.from({ length: limit }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return <ProductList products={filteredProducts} />;
};


export default function Home() {
  const { homepageSections } = useAppContext();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BrowseByCategory />
      <NewProducts />
      <AdBanner />
      
      {homepageSections.filter(s => s.enabled).map((section, index) => (
        <div key={section.id}>
            <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="section-title">{section.title}</h1>
                <DynamicProductList category={section.category} limit={section.limit} />
            </div>
            {index < homepageSections.filter(s => s.enabled).length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </>
  );
}
