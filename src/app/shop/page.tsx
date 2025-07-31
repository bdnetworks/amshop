
'use client';

import { useState, useMemo } from 'react';
import { useAppContext } from '@/providers/app-provider';
import ProductCard from '@/components/product-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';

const categories = ['Clothes', 'Watches', 'Toys', 'Kitchen', 'Headsets', 'Gadgets', 'Gaming', 'Computer', 'Furniture', 'Baby'];

export default function ShopPage() {
  const { products } = useAppContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => product.name.toLowerCase().includes(cat.toLowerCase().slice(0, -1)));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      // Note: Rating is hardcoded on product card, so this filter is for demonstration.
      // A real implementation would have rating data on the product object.
      const ratingMatch = selectedRating === 0 || 4 >= selectedRating;

      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [products, selectedCategories, priceRange, selectedRating]);

  return (
    <div>
      <div className="relative bg-gray-900/40 text-white py-20 mb-12">
        <Image
            src="https://placehold.co/1600x400.png"
            alt="Products on display"
            fill
            className="object-cover -z-10"
            data-ai-hint="shopping retail"
        />
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight">Shop</h1>
            <p className="mt-4 text-xl text-white/90">
                Explore our collection of high-quality products.
            </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Filters</h2>
              <Accordion type="multiple" defaultValue={['categories', 'price', 'rating']} className="w-full">
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-lg font-semibold">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-lg font-semibold">Price Range</AccordionTrigger>
                  <AccordionContent>
                      <div className="p-2">
                          <Slider
                              defaultValue={[0, 200]}
                              max={500}
                              step={10}
                              onValueChange={(value) => setPriceRange(value as [number, number])}
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-2">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                          </div>
                      </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                  <AccordionTrigger className="text-lg font-semibold">Rating</AccordionTrigger>
                  <AccordionContent>
                      <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map(rating => (
                          <Button
                              key={rating}
                              variant={selectedRating === rating ? 'secondary' : 'ghost'}
                              className="w-full justify-start"
                              onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                          >
                              <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                  <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">and up</span>
                              </div>
                          </Button>
                          ))}
                      </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
               <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
               </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
