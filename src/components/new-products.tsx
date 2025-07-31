'use client';

import { useAppContext } from '@/providers/app-provider';
import ProductCard from '@/components/product-card';
import { Skeleton } from './ui/skeleton';

export default function NewProducts() {
  const { products } = useAppContext();

  // For demonstration, we'll just show the same products.
  // In a real app, you would fetch new products separately.
  const newProducts = products.slice(0,5);

  if (!products) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">New Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="section-title">New Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
      </div>
    </div>
  );
}
