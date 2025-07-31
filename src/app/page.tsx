import ProductList from '@/components/product-list';
import HeroSlider from '@/components/hero-slider';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Featured Products</h1>
          <p className="mt-2 text-muted-foreground">Check out our collection of high-quality products.</p>
        </div>
        <ProductList />
      </div>
    </>
  );
}
