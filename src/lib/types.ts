export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type HeroSlide = {
  id: string;
  supertitle: string;
  title: string;
  image: string;
  imageHint: string;
  href: string;
};

export type SideBanner = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  imageHint: string;
  href: string;
};
