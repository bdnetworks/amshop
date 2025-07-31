
'use client';

import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const productHints: { [key: string]: string } = {
  '1': 'leather wallet',
  '2': 'wrist watch',
  '3': 'canvas backpack',
  '4': 'coffee beans',
  '5': 'wireless earbuds',
  '6': 'scented candle',
};


export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useAppContext();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your shopping cart.`,
    });
  };
  
  return (
    <Card className="group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square bg-muted/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={productHints[product.id] || 'product image'}
          />
           <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             <Button variant="outline" size="icon" className="bg-white hover:bg-primary hover:text-white rounded-full">
                <Heart className="h-5 w-5" />
             </Button>
             <Button variant="outline" size="icon" className="bg-white hover:bg-primary hover:text-white rounded-full">
                <Eye className="h-5 w-5" />
             </Button>
           </div>
           <Button 
            onClick={handleAddToCart} 
            className="absolute bottom-0 w-full rounded-t-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      <CardContent className="p-4 text-left">
        <h3 className="text-sm font-semibold text-foreground truncate h-5">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
