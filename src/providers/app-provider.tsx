

'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Product, CartItem, HeroSlide, SideBanner, GoogleFormSettings, HomepageSection, CategoryItem, AdBannerData, AboutPageContent, BlogPost, ContactPageContent, HeaderMenu, FooterData, PageBannerSettings } from '@/lib/types';
import { initialProducts, initialHeroSlides, initialSideBanners, initialGoogleFormSettings, initialHomepageSections, initialCategories, initialAdBanners, initialAboutPageContent, initialBlogPosts, initialContactPageContent, initialHeaderMenu, initialFooterData, initialPageBannerSettings } from '@/lib/data';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  heroSlides: HeroSlide[];
  sideBanners: SideBanner[];
  googleFormSettings: GoogleFormSettings;
  homepageSections: HomepageSection[];
  categories: CategoryItem[];
  adBanners: AdBannerData;
  aboutPageContent: AboutPageContent;
  blogPosts: BlogPost[];
  contactPageContent: ContactPageContent;
  headerMenu: HeaderMenu;
  footerData: FooterData;
  pageBannerSettings: PageBannerSettings;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'timesAddedToCart'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addHeroSlide: (slideData: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (slideId: string) => void;
  updateSideBanner: (banner: SideBanner) => void;
  updateGoogleFormSettings: (settings: GoogleFormSettings) => void;
  updateHomepageSections: (sections: HomepageSection[]) => void;
  updateCategories: (categories: CategoryItem[]) => void;
  updateAdBanners: (banners: AdBannerData) => void;
  updateAboutPageContent: (content: AboutPageContent) => void;
  addBlogPost: (postData: Omit<BlogPost, 'id' | 'date'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (postId: string) => void;
  updateContactPageContent: (content: ContactPageContent) => void;
  updateHeaderMenu: (menu: HeaderMenu) => void;
  updateFooterData: (data: FooterData) => void;
  updatePageBannerSettings: (settings: PageBannerSettings) => void;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [sideBanners, setSideBanners] = useState<SideBanner[]>([]);
  const [googleFormSettings, setGoogleFormSettings] = useState<GoogleFormSettings>(initialGoogleFormSettings);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [adBanners, setAdBanners] = useState<AdBannerData | null>(null);
  const [aboutPageContent, setAboutPageContent] = useState<AboutPageContent | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactPageContent, setContactPageContent] = useState<ContactPageContent | null>(null);
  const [headerMenu, setHeaderMenu] = useState<HeaderMenu | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [pageBannerSettings, setPageBannerSettings] = useState<PageBannerSettings | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('auto-management-shop-cart');
      const storedWishlist = localStorage.getItem('auto-management-shop-wishlist');
      const storedProducts = localStorage.getItem('auto-management-shop-products');
      const storedHeroSlides = localStorage.getItem('auto-management-shop-hero-slides');
      const storedSideBanners = localStorage.getItem('auto-management-shop-side-banners');
      const storedFormSettings = localStorage.getItem('auto-management-shop-form-settings');
      const storedHomepageSections = localStorage.getItem('auto-management-shop-homepage-sections');
      const storedCategories = localStorage.getItem('auto-management-shop-categories');
      const storedAdBanners = localStorage.getItem('auto-management-shop-ad-banners');
      const storedAboutContent = localStorage.getItem('auto-management-shop-about-content');
      const storedBlogPosts = localStorage.getItem('auto-management-shop-blog-posts');
      const storedContactContent = localStorage.getItem('auto-management-shop-contact-content');
      const storedHeaderMenu = localStorage.getItem('auto-management-shop-header-menu');
      const storedFooterData = localStorage.getItem('auto-management-shop-footer-data');
      const storedPageBanners = localStorage.getItem('auto-management-shop-page-banners');
      
      setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
      setHeroSlides(storedHeroSlides ? JSON.parse(storedHeroSlides) : initialHeroSlides);
      setSideBanners(storedSideBanners ? JSON.parse(storedSideBanners) : initialSideBanners);
      setGoogleFormSettings(storedFormSettings ? JSON.parse(storedFormSettings) : initialGoogleFormSettings);
      setHomepageSections(storedHomepageSections ? JSON.parse(storedHomepageSections) : initialHomepageSections);
      setCategories(storedCategories ? JSON.parse(storedCategories) : initialCategories);
      setAdBanners(storedAdBanners ? JSON.parse(storedAdBanners) : initialAdBanners);
      setAboutPageContent(storedAboutContent ? JSON.parse(storedAboutContent) : initialAboutPageContent);
      setBlogPosts(storedBlogPosts ? JSON.parse(storedBlogPosts) : initialBlogPosts);
      setContactPageContent(storedContactContent ? JSON.parse(storedContactContent) : initialContactPageContent);
      setHeaderMenu(storedHeaderMenu ? JSON.parse(storedHeaderMenu) : initialHeaderMenu);
      setFooterData(storedFooterData ? JSON.parse(storedFooterData) : initialFooterData);
      setPageBannerSettings(storedPageBanners ? JSON.parse(storedPageBanners) : initialPageBannerSettings);

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setProducts(initialProducts);
      setHeroSlides(initialHeroSlides);
      setSideBanners(initialSideBanners);
      setGoogleFormSettings(initialGoogleFormSettings);
      setHomepageSections(initialHomepageSections);
      setCategories(initialCategories);
      setAdBanners(initialAdBanners);
      setAboutPageContent(initialAboutPageContent);
      setBlogPosts(initialBlogPosts);
      setContactPageContent(initialContactPageContent);
      setHeaderMenu(initialHeaderMenu);
      setFooterData(initialFooterData);
      setPageBannerSettings(initialPageBannerSettings);
    }
    
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
        try {
            localStorage.setItem('auto-management-shop-products', JSON.stringify(products));
            localStorage.setItem('auto-management-shop-cart', JSON.stringify(cart));
            localStorage.setItem('auto-management-shop-wishlist', JSON.stringify(wishlist));
            localStorage.setItem('auto-management-shop-hero-slides', JSON.stringify(heroSlides));
            localStorage.setItem('auto-management-shop-side-banners', JSON.stringify(sideBanners));
            localStorage.setItem('auto-management-shop-form-settings', JSON.stringify(googleFormSettings));
            localStorage.setItem('auto-management-shop-homepage-sections', JSON.stringify(homepageSections));
            localStorage.setItem('auto-management-shop-categories', JSON.stringify(categories));
            if (adBanners) localStorage.setItem('auto-management-shop-ad-banners', JSON.stringify(adBanners));
            if (aboutPageContent) localStorage.setItem('auto-management-shop-about-content', JSON.stringify(aboutPageContent));
            localStorage.setItem('auto-management-shop-blog-posts', JSON.stringify(blogPosts));
            if (contactPageContent) localStorage.setItem('auto-management-shop-contact-content', JSON.stringify(contactPageContent));
            if (headerMenu) localStorage.setItem('auto-management-shop-header-menu', JSON.stringify(headerMenu));
            if (footerData) localStorage.setItem('auto-management-shop-footer-data', JSON.stringify(footerData));
            if (pageBannerSettings) localStorage.setItem('auto-management-shop-page-banners', JSON.stringify(pageBannerSettings));
        } catch (error) {
            console.error("Failed to save to localStorage", error);
        }
    }
  }, [products, cart, wishlist, heroSlides, sideBanners, googleFormSettings, homepageSections, categories, adBanners, aboutPageContent, blogPosts, contactPageContent, headerMenu, footerData, pageBannerSettings, isHydrated]);


  const login = async (password: string): Promise<boolean> => {
    if (password === 'password123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'timesAddedToCart'>) => {
    const newProduct: Product = {
      ...productData,
      id: new Date().getTime().toString(),
      rating: 2,
      timesAddedToCart: 0,
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slideData,
      id: new Date().getTime().toString(),
    };
    setHeroSlides(prev => [newSlide, ...prev]);
  };

  const updateHeroSlide = (updatedSlide: HeroSlide) => {
    setHeroSlides(prev => 
      prev.map(s => s.id === updatedSlide.id ? updatedSlide : s)
    );
  };

  const deleteHeroSlide = (slideId: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== slideId));
  }

  const updateSideBanner = (updatedBanner: SideBanner) => {
    setSideBanners(prev =>
      prev.map(b => b.id === updatedBanner.id ? updatedBanner : b)
    );
  };

  const updateGoogleFormSettings = (settings: GoogleFormSettings) => {
    setGoogleFormSettings(settings);
  };

  const updateHomepageSections = (sections: HomepageSection[]) => {
    setHomepageSections(sections);
  };

  const updateCategories = (updatedCategories: CategoryItem[]) => {
    setCategories(updatedCategories);
  }

  const updateAdBanners = (banners: AdBannerData) => {
    setAdBanners(banners);
  };

  const updateAboutPageContent = (content: AboutPageContent) => {
    setAboutPageContent(content);
  };

  const addBlogPost = (postData: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: new Date().getTime().toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => 
      prev.map(p => p.id === updatedPost.id ? updatedPost : p)
    );
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  }

  const updateContactPageContent = (content: ContactPageContent) => {
    setContactPageContent(content);
  }

  const updateHeaderMenu = (menu: HeaderMenu) => {
    setHeaderMenu(menu);
  }

  const updateFooterData = (data: FooterData) => {
    setFooterData(data);
  }

  const updatePageBannerSettings = (settings: PageBannerSettings) => {
    setPageBannerSettings(settings);
  };

  const addToCart = (product: Product, quantity = 1) => {
    // Update cart
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  
    // Update product rating
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === product.id) {
          const newTimesAddedToCart = p.timesAddedToCart + 1;
          
          // Rating logic: Start at 2, max out at 5.
          // Increase by 0.5 for every 10 adds.
          const ratingIncrease = Math.floor(newTimesAddedToCart / 10) * 0.5;
          let newRating = 2 + ratingIncrease;
          newRating = Math.min(newRating, 5); // Cap rating at 5
          
          return { ...p, timesAddedToCart: newTimesAddedToCart, rating: newRating };
        }
        return p;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const existingItem = prevWishlist.find(item => item.id === product.id);
      if (existingItem) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  if (!isHydrated) {
    // Render a skeleton or loading state on the server
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        heroSlides,
        sideBanners,
        googleFormSettings,
        homepageSections,
        categories,
        adBanners: adBanners!,
        aboutPageContent: aboutPageContent!,
        blogPosts,
        contactPageContent: contactPageContent!,
        headerMenu: headerMenu!,
        footerData: footerData!,
        pageBannerSettings: pageBannerSettings!,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        updateSideBanner,
        updateGoogleFormSettings,
        updateHomepageSections,
        updateCategories,
        updateAdBanners,
        updateAboutPageContent,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        updateContactPageContent,
        updateHeaderMenu,
        updateFooterData,
        updatePageBannerSettings,
        cartTotal,
        cartCount,
        wishlistCount,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
