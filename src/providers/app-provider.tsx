
'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import type { Product, CartItem, HeroSlide, SideBanner } from '@/lib/types';
import { initialProducts, initialHeroSlides, initialSideBanners } from '@/lib/data';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  heroSlides: HeroSlide[];
  sideBanners: SideBanner[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addHeroSlide: (slideData: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (slideId: string) => void;
  updateSideBanner: (banner: SideBanner) => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shopswift-cart');
      const storedWishlist = localStorage.getItem('shopswift-wishlist');
      const storedProducts = localStorage.getItem('shopswift-products');
      const storedHeroSlides = localStorage.getItem('shopswift-hero-slides');
      const storedSideBanners = localStorage.getItem('shopswift-side-banners');
      
      setProducts(storedProducts ? JSON.parse(storedProducts) : initialProducts);
      setHeroSlides(storedHeroSlides ? JSON.parse(storedHeroSlides) : initialHeroSlides);
      setSideBanners(storedSideBanners ? JSON.parse(storedSideBanners) : initialSideBanners);

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setProducts(initialProducts);
      setHeroSlides(initialHeroSlides);
      setSideBanners(initialSideBanners);
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
            localStorage.setItem('shopswift-products', JSON.stringify(products));
            localStorage.setItem('shopswift-cart', JSON.stringify(cart));
            localStorage.setItem('shopswift-wishlist', JSON.stringify(wishlist));
            localStorage.setItem('shopswift-hero-slides', JSON.stringify(heroSlides));
            localStorage.setItem('shopswift-side-banners', JSON.stringify(sideBanners));
        } catch (error) {
            console.error("Failed to save to localStorage", error);
        }
    }
  }, [products, cart, wishlist, heroSlides, sideBanners, isHydrated]);


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

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: new Date().getTime().toString(),
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
