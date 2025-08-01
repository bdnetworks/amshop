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

export type CategoryItem = {
  id: string;
  name: string;
  icon: string; // Lucide icon name
};

export type AdBannerContent = {
  supertitle?: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  href: string;
  image: string;
  imageHint: string;
}

export type AdBannerData = {
  largeBanner: AdBannerContent;
  smallBanners: [AdBannerContent, AdBannerContent];
};

export type AboutPageContent = {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  date: string;
};
