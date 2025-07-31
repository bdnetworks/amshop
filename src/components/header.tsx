
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, User, Search, Heart, Phone, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/cart';
import { useAppContext } from '@/providers/app-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Wishlist } from './wishlist';

export function Header() {
  const { cartCount, cartTotal, wishlistCount, isAuthenticated, logout } = useAppContext();
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      
      if (currentScrollY > 150) {
        setIsMenuBarVisible(false);
      } else {
        setIsMenuBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={cn("sticky top-0 z-50 transition-transform duration-300", isHidden && '-translate-y-full')}>
      {/* Main Header */}
      <div className="border-b py-4 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3">
                    <Link href="/" className="flex items-center space-x-2">
                        <Package className="h-8 w-8 text-primary" />
                        <span className="font-bold text-2xl">ShopSwift</span>
                    </Link>
                </div>
                <div className="col-span-5">
                    <div className="flex w-full items-center rounded-md border border-input">
                        <Select defaultValue='all'>
                            <SelectTrigger className="w-[150px] border-0 rounded-r-none focus:ring-0">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="clothes">Clothes</SelectItem>
                                <SelectItem value="watches">Watches</SelectItem>
                                <SelectItem value="toys">Toys</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input 
                            type="search" 
                            placeholder="I am shopping for..." 
                            className="flex-1 border-0 border-l rounded-l-none focus-visible:ring-0"
                        />
                        <Button type="submit" size="icon" className="rounded-l-none">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <div className="col-span-4 flex items-center justify-end gap-4">
                     <div className="flex items-center gap-2">
                        <Phone size={24} className="text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">24/7 SUPPORT</p>
                            <p className="text-sm font-semibold">(+965) 7492-3477</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <User className="h-7 w-7 text-muted-foreground"/>
                        <div>
                            <span className="text-xs text-muted-foreground">ACCOUNT</span>
                            <p className="text-sm font-semibold">Sign In</p>
                        </div>
                    </div>
                     <Cart>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="relative">
                                <ShoppingCart className="h-7 w-7 text-muted-foreground" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                    {cartCount}
                                    </span>
                                )}
                            </div>
                            <div>
                                <span className="text-xs text-muted-foreground">CART</span>
                                <p className="text-sm font-semibold">${cartTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </Cart>
                </div>
            </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
       <div className={cn("w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300", !isMenuBarVisible && "hidden")}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <nav className="flex items-center gap-6">
              {['Popular', 'Shop', 'Contact'].map((item) => (
                  <Link
                  key={item}
                  href={item === 'Popular' ? '/' : `/${item.toLowerCase()}`}
                  className={cn(
                      "text-sm font-semibold transition-colors hover:text-primary py-4",
                      pathname === (item === 'Popular' ? '/' : `/${item.toLowerCase()}`) ? "text-primary" : "text-foreground"
                  )}
                  >
                  {item}
                  </Link>
              ))}
              <Link
                  href="#"
                  className="flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary py-4"
                  >
                  Pages <ChevronDown size={16} />
              </Link>
              <Link
                  href="#"
                  className="flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary py-4"
                  >
                  Blogs <ChevronDown size={16} />
              </Link>
              <Link
                  href="/admin"
                  className={cn(
                      "text-sm font-semibold transition-colors hover:text-primary py-4",
                      pathname === "/admin" ? "text-primary" : "text-foreground"
                  )}
                  >
                  Admin
                  </Link>
            </nav>
            <div className="flex items-center gap-6">
              <Link href="#" className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
                <Search size={16} /> Recently Viewed
              </Link>
              <Wishlist>
                <div className="flex items-center gap-2 text-sm font-semibold hover:text-primary relative cursor-pointer">
                  <Heart size={16} /> Wishlist
                  {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {wishlistCount}
                      </span>
                  )}
                </div>
              </Wishlist>
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
                  <LogOut size={16} /> Logout
                </Button>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
                  <LogIn size={16} /> Login
                </Link>
              )}
            </div>
        </div>
       </div>
    </header>
  );
}
