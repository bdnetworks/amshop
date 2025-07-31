'use client';

import { useParams } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import ProductList from '@/components/product-list';
import { Card, CardContent } from '@/components/ui/card';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart } = useAppContext();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your shopping cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative aspect-square bg-muted rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-sm text-muted-foreground">(4.0)</span>
              </div>
              <p className="text-3xl font-bold text-primary my-4">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              
              <Separator className="my-6" />

              <div className="flex items-center gap-4">
                <Button size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-16">
        <h2 className="section-title">Related Products</h2>
        <ProductList />
      </div>
    </div>
  );
}
