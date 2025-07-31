
'use client';

import { useAppContext } from '@/providers/app-provider';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function OrderSummary() {
  const { cart, cartTotal } = useAppContext();
  const shippingCost = 150.00; // Updated fixed shipping cost
  const total = cartTotal + shippingCost;

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{item.product.name}</p>
            </div>
            <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>${shippingCost.toFixed(2)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
