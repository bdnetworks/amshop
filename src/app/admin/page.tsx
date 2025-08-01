
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import ProductForm from '@/components/admin/product-form';
import ProductListAdmin from '@/components/admin/product-list-admin';
import HeroSlideForm from '@/components/admin/hero-slide-form';
import HeroSlideList from '@/components/admin/hero-slide-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Product, type HeroSlide } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

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

  const handleFinishEditingProduct = () => {
    setEditingProduct(null);
  }

  const handleEditSlide = (slide: HeroSlide) => {
    setEditingSlide(slide);
    window.scrollTo(0, 0);
  };

  const handleFinishEditingSlide = () => {
    setEditingSlide(null);
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Manage Products</TabsTrigger>
            <TabsTrigger value="slides">Manage Hero Slides</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
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
                        onFinishEditing={handleFinishEditingProduct}
                    />
                    </CardContent>
                </Card>
                </div>
                <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Product List</CardTitle>
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
        </TabsContent>
        <TabsContent value="slides">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                    <CardTitle className="text-2xl">{editingSlide ? 'Edit Slide' : 'Add New Slide'}</CardTitle>
                    <CardDescription>
                        {editingSlide ? 'Update the details for this hero slide.' : 'Fill out the form to add a new slide.'}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <HeroSlideForm 
                        editingSlide={editingSlide}
                        onFinishEditing={handleFinishEditingSlide}
                    />
                    </CardContent>
                </Card>
                </div>
                <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Slide List</CardTitle>
                        <CardDescription>
                            Edit or delete existing hero slides from your homepage.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HeroSlideList onEditSlide={handleEditSlide} />
                    </CardContent>
                </Card>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
