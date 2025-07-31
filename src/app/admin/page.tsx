
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import ProductForm from '@/components/admin/product-form';
import SalesChart from '@/components/admin/sales-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
            <p>Redirecting to login...</p>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add New Product</CardTitle>
              <CardDescription>
                Fill out the form to add a new product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}
