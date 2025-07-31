'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export function Wishlist({ children }: { children: React.ReactNode }) {
  const { wishlist, removeFromWishlist, wishlistCount, addToCart } = useAppContext();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been moved to your shopping cart.`,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Wishlist ({wishlistCount})</SheetTitle>
        </SheetHeader>
        {wishlist.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto pr-4 -mr-4">
              <div className="flex flex-col gap-4">
                {wishlist.map((product) => (
                  <div key={product.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Heart className="h-20 w-20 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Your wishlist is empty</p>
            <p className="text-muted-foreground mt-1">Add items to see them here.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
