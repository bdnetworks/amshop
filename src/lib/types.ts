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

export type GoogleFormSettings = {
  formUrl: string;
  entryName: string;
  entryEmail: string;
  entryMobile: string;
  entryAddress: string;
  entryDistrict: string;
  entryTotal: string;
  entryCart: string;
};

export type HomepageSection = {
  id: string;
  title: string;
  category: string; // 'all' or a specific category name
  limit: number;
  enabled: boolean;
};
