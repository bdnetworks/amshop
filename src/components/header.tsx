
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Search, Heart, Phone, LogIn, LogOut, Menu, User, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/cart';
import { useAppContext } from '@/providers/app-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wishlist } from './wishlist';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';

const categories = ['Clothes', 'Watches', 'Toys', 'Kitchen', 'Headsets', 'Gadgets', 'Gaming', 'Computer', 'Furniture', 'Baby'];

export function Header() {
  const { cartCount, cartTotal, wishlistCount, isAuthenticated, logout } = useAppContext();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);


  return (
    <header className="bg-background shadow-sm">
      {/* Top Bar - This will be sticky */}
      <div className={cn(
        "sticky top-0 z-50 transition-transform duration-300 bg-background",
        !isVisible && "-translate-y-full"
    )}>
        <div className="border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-24">
                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                        <SheetHeader>
                            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <Package className="h-8 w-8 text-primary" />
                                <span className="font-bold text-2xl">ShopSwift</span>
                            </Link>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 p-4">
                            {['Home', 'Shop', 'Contact', 'Admin'].map((item) => (
                                <Link
                                key={item}
                                href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                                className={cn(
                                    "font-semibold transition-colors hover:text-primary",
                                    pathname === `/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}` ? "text-primary" : "text-foreground"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                                >
                                {item}
                                </Link>
                            ))}
                            <Separator />
                            {isAuthenticated ? (
                                <Button variant="ghost" onClick={() => {logout(); setIsMobileMenuOpen(false);}} className="justify-start gap-2"><LogOut size={16} /> Logout</Button>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 font-semibold hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><LogIn size={16} /> Login</Link>
                            )}
                        </nav>
                        </SheetContent>
                    </Sheet>
                    </div>
                    
                    {/* Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:left-0 lg:translate-x-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Package className="h-8 w-8 text-primary" />
                            <span className="font-bold text-2xl">ShopSwift</span>
                        </Link>
                    </div>
                    
                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 max-w-xl mx-8">
                        <div className="flex w-full items-center rounded-md border border-input">
                            <Input 
                                type="search" 
                                placeholder="I am shopping for..." 
                                className="flex-1 border-0 rounded-r-none focus-visible:ring-0"
                            />
                            <Button type="submit" size="icon" className="rounded-l-none">
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center justify-end gap-4">
                        <div className="hidden lg:flex items-center gap-4 border-r pr-4">
                            <Phone className="text-primary h-8 w-8" />
                            <div>
                                <p className='text-xs text-muted-foreground'>24/7 Support</p>
                                <p className='text-sm font-semibold'>(+965) 7492-3477</p>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            {isAuthenticated ? (
                            <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
                                <LogOut size={18} /> Logout
                            </Button>
                            ) : (
                            <Link href="/login" className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
                                <User size={18} /> Login
                            </Link>
                            )}
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
                                <div className="hidden lg:block">
                                    <span className="text-xs text-muted-foreground">CART</span>
                                    <p className="text-sm font-semibold">${cartTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
         {/* Mobile Search */}
        <div className="lg:hidden container mx-auto px-4 sm:px-6 lg:px-8 py-2 border-t">
          <div className="flex w-full items-center rounded-md border border-input">
              <Input 
                  type="search" 
                  placeholder="I am shopping for..." 
                  className="flex-1 border-0 rounded-r-none focus-visible:ring-0"
              />
              <Button type="submit" size="icon" className="rounded-l-none">
                  <Search className="h-5 w-5" />
              </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar - This will scroll with the page */}
      <div className="hidden lg:block border-b">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                           <LayoutGrid className="mr-2 h-5 w-5" />
                           All Categories
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {categories.map(category => (
                             <DropdownMenuItem key={category} asChild>
                                <Link href="/shop">{category}</Link>
                             </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/" className={cn("hover:text-primary", pathname === '/' && 'text-primary')}>Home</Link>
                    <Link href="/shop" className={cn("hover:text-primary", pathname === '/shop' && 'text-primary')}>Shop</Link>
                    <Link href="/contact" className={cn("hover:text-primary", pathname === '/contact' && 'text-primary')}>Contact</Link>
                    <Link href="/admin" className={cn("hover:text-primary", pathname === '/admin' && 'text-primary')}>Admin</Link>
                </nav>
                 <div className="flex items-center gap-4">
                    <Wishlist>
                       <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                           <Heart className="h-5 w-5" />
                           <span className="text-sm font-medium">Wishlist ({wishlistCount})</span>
                       </div>
                    </Wishlist>
                </div>
            </div>
         </div>
      </div>
    </header>
  );
}
