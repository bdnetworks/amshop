

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
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
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  date: string;
};

export type ContactPageContent = {
  title: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  mapUrl: string;
};

export type MenuItem = {
  id: string;
  label: string;
  href: string;
};

export type HeaderMenu = {
  links: MenuItem[];
};

export type LinkSection = {
  title: string;
  links: MenuItem[];
};

export type SocialLink = {
  id: string;
  name: 'Facebook' | 'Twitter' | 'Instagram' | 'Linkedin' | 'Youtube';
  href: string;
}

export type FooterData = {
  about: {
    description: string;
    address: string;
    phone: string;
    email: string;
  };
  companyLinks: LinkSection;
  infoLinks: LinkSection;
  socialLinks: SocialLink[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  copyright: string;
  paymentImageUrl: string;
}
