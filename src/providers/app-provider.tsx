
'use client';

import { createContext, useContext, useState, type ReactNode, useEffect, useCallback } from 'react';
import type { AllData, Product, CartItem, HeroSlide, SideBanner, GoogleFormSettings, HomepageSection, CategoryItem, AdBannerData, AboutPageContent, BlogPost, ContactPageContent, HeaderMenu, FooterData, PageBannerSettings } from '@/lib/types';
import { initialProducts, initialHeroSlides, initialSideBanners, initialGoogleFormSettings, initialHomepageSections, initialCategories, initialAdBanners, initialAboutPageContent, initialBlogPosts, initialContactPageContent, initialHeaderMenu, initialFooterData, initialPageBannerSettings } from '@/lib/data';
import { getData, saveData } from '@/services/firestore';

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

const initialData: AllData = {
    products: initialProducts,
    heroSlides: initialHeroSlides,
    sideBanners: initialSideBanners,
    googleFormSettings: initialGoogleFormSettings,
    homepageSections: initialHomepageSections,
    categories: initialCategories,
    adBanners: initialAdBanners,
    aboutPageContent: initialAboutPageContent,
    blogPosts: initialBlogPosts,
    contactPageContent: initialContactPageContent,
    headerMenu: initialHeaderMenu,
    footerData: initialFooterData,
    pageBannerSettings: initialPageBannerSettings,
};


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appData, setAppData] = useState<AllData | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const saveDataToFirestore = useCallback(async (data: AllData) => {
    try {
      await saveData(data);
    } catch (error) {
      console.error("Failed to save data to Firestore:", error);
    }
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
        try {
            let data = await getData();
            if (!data) {
                console.log("No data found in Firestore, seeding with initial data.");
                await saveData(initialData);
                data = initialData;
            }
            setAppData(data);

            const storedCart = localStorage.getItem('auto-management-shop-cart');
            const storedWishlist = localStorage.getItem('auto-management-shop-wishlist');
            if (storedCart) setCart(JSON.parse(storedCart));
            if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
            console.error("Error initializing app data:", error);
            setAppData(initialData); // Fallback to initial data on error
        }

        const authStatus = sessionStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
        setIsHydrated(true);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isHydrated) {
        try {
            localStorage.setItem('auto-management-shop-cart', JSON.stringify(cart));
            localStorage.setItem('auto-management-shop-wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error("Failed to save cart/wishlist to localStorage", error);
        }
    }
  }, [cart, wishlist, isHydrated]);


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

  const updateAndSave = (updater: (prevData: AllData) => AllData) => {
    setAppData(prevData => {
        if (!prevData) return null;
        const newData = updater(prevData);
        saveDataToFirestore(newData);
        return newData;
    });
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'timesAddedToCart'>) => {
    const newProduct: Product = {
      ...productData,
      id: new Date().getTime().toString(),
      rating: 2,
      timesAddedToCart: 0,
    };
    updateAndSave(prev => ({ ...prev, products: [newProduct, ...prev.products] }));
  };

  const updateProduct = (updatedProduct: Product) => {
    updateAndSave(prev => ({ ...prev, products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p) }));
  };

  const deleteProduct = (productId: string) => {
    updateAndSave(prev => ({ ...prev, products: prev.products.filter(p => p.id !== productId) }));
  }

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slideData,
      id: new Date().getTime().toString(),
    };
    updateAndSave(prev => ({ ...prev, heroSlides: [newSlide, ...prev.heroSlides] }));
  };

  const updateHeroSlide = (updatedSlide: HeroSlide) => {
    updateAndSave(prev => ({ ...prev, heroSlides: prev.heroSlides.map(s => s.id === updatedSlide.id ? updatedSlide : s) }));
  };

  const deleteHeroSlide = (slideId: string) => {
    updateAndSave(prev => ({ ...prev, heroSlides: prev.heroSlides.filter(s => s.id !== slideId) }));
  }

  const updateSideBanner = (updatedBanner: SideBanner) => {
    updateAndSave(prev => ({ ...prev, sideBanners: prev.sideBanners.map(b => b.id === updatedBanner.id ? updatedBanner : b) }));
  };

  const updateGoogleFormSettings = (settings: GoogleFormSettings) => {
    updateAndSave(prev => ({ ...prev, googleFormSettings: settings }));
  };

  const updateHomepageSections = (sections: HomepageSection[]) => {
    updateAndSave(prev => ({ ...prev, homepageSections: sections }));
  };

  const updateCategories = (updatedCategories: CategoryItem[]) => {
    updateAndSave(prev => ({ ...prev, categories: updatedCategories }));
  }

  const updateAdBanners = (banners: AdBannerData) => {
    updateAndSave(prev => ({ ...prev, adBanners: banners }));
  };

  const updateAboutPageContent = (content: AboutPageContent) => {
    updateAndSave(prev => ({ ...prev, aboutPageContent: content }));
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
    updateAndSave(prev => ({ ...prev, blogPosts: [newPost, ...prev.blogPosts] }));
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    updateAndSave(prev => ({ ...prev, blogPosts: prev.blogPosts.map(p => p.id === updatedPost.id ? updatedPost : p) }));
  };

  const deleteBlogPost = (postId: string) => {
    updateAndSave(prev => ({ ...prev, blogPosts: prev.blogPosts.filter(p => p.id !== postId) }));
  }

  const updateContactPageContent = (content: ContactPageContent) => {
    updateAndSave(prev => ({ ...prev, contactPageContent: content }));
  }

  const updateHeaderMenu = (menu: HeaderMenu) => {
    updateAndSave(prev => ({ ...prev, headerMenu: menu }));
  }

  const updateFooterData = (data: FooterData) => {
    updateAndSave(prev => ({ ...prev, footerData: data }));
  }

  const updatePageBannerSettings = (settings: PageBannerSettings) => {
    updateAndSave(prev => ({ ...prev, pageBannerSettings: settings }));
  };

  const addToCart = (product: Product, quantity = 1) => {
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
  
    updateAndSave(prev => {
        const newProducts = prev.products.map(p => {
             if (p.id === product.id) {
                const newTimesAddedToCart = p.timesAddedToCart + 1;
                const ratingIncrease = Math.floor(newTimesAddedToCart / 10) * 0.5;
                let newRating = 2 + ratingIncrease;
                newRating = Math.min(newRating, 5);
                return { ...p, timesAddedToCart: newTimesAddedToCart, rating: newRating };
            }
            return p;
        });
        return { ...prev, products: newProducts };
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

  if (!isHydrated || !appData) {
    return null; // Or a loading spinner
  }

  const contextValue: AppContextType = {
      ...appData,
      cart,
      wishlist,
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
  };

  return (
    <AppContext.Provider value={contextValue}>
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
