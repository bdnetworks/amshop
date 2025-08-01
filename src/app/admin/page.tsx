
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/providers/app-provider';
import ProductForm from '@/components/admin/product-form';
import ProductListAdmin from '@/components/admin/product-list-admin';
import HeroSlideForm from '@/components/admin/hero-slide-form';
import HeroSlideList from '@/components/admin/hero-slide-list';
import SideBannerForm from '@/components/admin/side-banner-form';
import GoogleFormSettingsForm from '@/components/admin/google-form-settings-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product, type HeroSlide, BlogPost } from '@/lib/types';
import GoogleFormInstructions from '@/components/admin/google-form-instructions';
import HomepageSectionsForm from '@/components/admin/homepage-sections-form';
import CategoryForm from '@/components/admin/category-form';
import AdBannerForm from '@/components/admin/ad-banner-form';
import AboutPageForm from '@/components/admin/about-page-form';
import BlogPostsForm from '@/components/admin/blog-posts-form';
import { Button } from '@/components/ui/button';
import BlogPostList from '@/components/admin/blog-post-list';
import ContactPageForm from '@/components/admin/contact-page-form';
import HeaderMenuForm from '@/components/admin/header-menu-form';
import FooterForm from '@/components/admin/footer-form';
import PageBannerForm from '@/components/admin/page-banner-form';

const adminViews = [
  { id: 'products', label: 'Manage Products' },
  { id: 'slides', label: 'Manage Hero Slides' },
  { id: 'banners', label: 'Manage Side Banners' },
  { id: 'categories', label: 'Manage Categories' },
  { id: 'ad-banners', label: 'Manage Ad Banners' },
  { id: 'page-banners', label: 'Manage Page Banners' },
  { id: 'homepage', label: 'Homepage Sections' },
  { id: 'header', label: 'Manage Header Menu' },
  { id: 'footer', label: 'Manage Footer' },
  { id: 'about', label: 'Manage About Page' },
  { id: 'blog', label: 'Manage Blog Posts' },
  { id: 'contact', label: 'Manage Contact Page' },
  { id: 'google-form', label: 'Google Form' },
];

export default function AdminPage() {
  const { isAuthenticated } = useAppContext();
  const router = useRouter();
  const [activeView, setActiveView] = useState('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

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
    );
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

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    window.scrollTo(0, 0);
  };

  const handleFinishEditingPost = () => {
    setEditingPost(null);
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap gap-2 mb-8">
        {adminViews.map(view => (
            <Button
                key={view.id}
                variant={activeView === view.id ? 'default' : 'outline'}
                onClick={() => setActiveView(view.id)}
            >
                {view.label}
            </Button>
        ))}
      </div>

      <div>
        {activeView === 'products' && (
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
        )}

        {activeView === 'slides' && (
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
        )}
        
        {activeView === 'banners' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Edit Side Banners</CardTitle>
                      <CardDescription>
                          Update the details for the two side banners on the homepage.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <SideBannerForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}
        
        {activeView === 'categories' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Categories</CardTitle>
                      <CardDescription>
                          Add, edit, or remove categories from the "Browse by Category" section.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CategoryForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'ad-banners' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Ad Banners</CardTitle>
                      <CardDescription>
                          Update the content and images for the three ad banners on the homepage.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdBannerForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'page-banners' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Page Banners</CardTitle>
                      <CardDescription>
                          Update the headers for main pages like the Shop page.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <PageBannerForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'homepage' && (
           <div className="grid grid-cols-1 gap-8 mt-6">
                <div className="col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Homepage Sections</CardTitle>
                      <CardDescription>
                          Control which product sections appear on the homepage.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <HomepageSectionsForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'header' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Header Menu</CardTitle>
                      <CardDescription>
                          Update the navigation links in the main header.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <HeaderMenuForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'footer' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Footer</CardTitle>
                      <CardDescription>
                          Update the content and links in the site footer.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FooterForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}
        
        {activeView === 'about' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage About Page</CardTitle>
                      <CardDescription>
                          Update the content and image for the "About Us" page.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AboutPageForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'blog' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                    <CardTitle className="text-2xl">{editingPost ? 'Edit Post' : 'Add New Post'}</CardTitle>
                    <CardDescription>
                        {editingPost ? 'Update the details for this blog post.' : 'Fill out the form to add a new post.'}
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <BlogPostsForm 
                        editingPost={editingPost}
                        onFinishEditing={handleFinishEditingPost}
                    />
                    </CardContent>
                </Card>
                </div>
                <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Blog Post List</CardTitle>
                        <CardDescription>
                            Edit or delete existing blog posts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <BlogPostList onEditPost={handleEditPost} />
                    </CardContent>
                </Card>
                </div>
            </div>
        )}

        {activeView === 'contact' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Manage Contact Page</CardTitle>
                      <CardDescription>
                          Update the information displayed on the "Contact Us" page.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ContactPageForm />
                      </CardContent>
                  </Card>
                </div>
            </div>
        )}

        {activeView === 'google-form' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                <div className="lg:col-span-1">
                  <Card>
                      <CardHeader>
                      <CardTitle className="text-2xl">Google Form Settings</CardTitle>
                      <CardDescription>
                          Update the Action URL and field Entry IDs for your checkout form.
                      </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <GoogleFormSettingsForm />
                      </CardContent>
                  </Card>
                </div>
                 <div className="lg:col-span-1">
                    <GoogleFormInstructions />
                 </div>
            </div>
        )}
      </div>
    </div>
  );
}
