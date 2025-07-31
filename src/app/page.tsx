import ProductList from '@/components/product-list';
import HeroSlider from '@/components/hero-slider';
import AdBanner from '@/components/ad-banner';
import BrowseByCategory from '@/components/browse-by-category';
import NewProducts from '@/components/new-products';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AdBanner />
      <BrowseByCategory />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="section-title">Best Sale</h1>
        <ProductList />
      </div>
      <NewProducts />
    </>
  );
}
