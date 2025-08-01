
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import ProductForm from '@/components/admin/product-form';
import ProductListAdmin from '@/components/admin/product-list-admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Product } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default function AdminPage() {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleFinishEditing = () => {
    setEditingProduct(null);
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
              <CardDescription>
                {editingProduct ? 'Update the details for this product.' : 'Fill out the form to add a new product.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm 
                editingProduct={editingProduct}
                onFinishEditing={handleFinishEditing}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
             <CardHeader>
                <CardTitle>Manage Products</CardTitle>
                <CardDescription>
                    Edit or delete existing products from your store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProductListAdmin onEditProduct={handleEditProduct} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
