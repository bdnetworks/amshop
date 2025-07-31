import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6 items-center py-8">
          {/* Main Banner */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative rounded-lg overflow-hidden h-[400px] bg-primary/10 flex items-center">
              <div className="p-8 md:p-12 z-10">
                <h3 className="text-primary font-bold">30% <span className="font-light">SALE OFF</span></h3>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground my-4 max-w-sm leading-tight">
                  True Wireless Noise Cancelling Headphone
                </h2>
                <Button asChild size="lg">
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-3/5 h-full">
                 <Image
                    src="https://placehold.co/400x400.png"
                    alt="Headphones"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                    className="object-contain"
                    data-ai-hint="blue headphones"
                  />
              </div>
            </div>
          </div>
          {/* Side Banners */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="relative rounded-lg overflow-hidden h-[188px] bg-white flex items-center justify-between p-6">
                <div>
                    <h3 className="font-bold text-lg text-foreground">iPhone 14 Pro Max</h3>
                    <div className="my-2">
                        <span className="font-bold text-primary text-xl">$999</span>
                        <span className="text-muted-foreground line-through ml-2">$1200</span>
                    </div>
                    <Button asChild variant="link" className="p-0">
                        <Link href="/shop">Shop Now</Link>
                    </Button>
                </div>
                <div className="relative w-24 h-full">
                    <Image
                        src="https://placehold.co/150x150.png"
                        alt="iPhone 14 Pro Max"
                        fill
                        sizes="150px"
                        className="object-contain"
                        data-ai-hint="purple iphone"
                    />
                </div>
            </div>
             <div className="relative rounded-lg overflow-hidden h-[188px] bg-white flex items-center justify-between p-6">
                <div>
                    <h3 className="font-bold text-lg text-foreground">Wireless Headphone</h3>
                     <div className="my-2">
                        <span className="font-bold text-primary text-xl">$599</span>
                        <span className="text-muted-foreground line-through ml-2">$799</span>
                    </div>
                    <Button asChild variant="link" className="p-0">
                        <Link href="/shop">Shop Now</Link>
                    </Button>
                </div>
                 <div className="relative w-24 h-full">
                    <Image
                        src="https://placehold.co/150x150.png"
                        alt="Wireless Headphone"
                        fill
                        sizes="150px"
                        className="object-contain"
                        data-ai-hint="blue headphones"
                    />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
