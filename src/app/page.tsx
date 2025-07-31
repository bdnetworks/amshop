import ProductList from '@/components/product-list';
import HeroSection from '@/components/hero-section';
import AdBanner from '@/components/ad-banner';
import BrowseByCategory from '@/components/browse-by-category';
import NewProducts from '@/components/new-products';
import { Separator } from '@/components/ui/separator';
import FeaturesSection from '@/components/features-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BrowseByCategory />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">New Arrivals</h1>
        <NewProducts />
      </div>
      <AdBanner />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">Best Sellers</h1>
        <ProductList />
      </div>
       <Separator className="my-16" />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">Featured Products</h1>
        <ProductList />
      </div>
      <Separator className="my-16" />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">Organic Products</h1>
        <ProductList />
      </div>
    </>
  );
}
