
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">
        Thank You for Your Order!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Your order has been placed successfully. You will receive an email confirmation shortly.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
