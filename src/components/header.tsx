
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, Search, Heart, Phone, ChevronDown, LogIn, LogOut, Menu, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/cart';
import { useAppContext } from '@/providers/app-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Wishlist } from './wishlist';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';

export function Header() {
  const { cartCount, cartTotal, wishlistCount, isAuthenticated, logout } = useAppContext();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      {/* Top Bar */}
      <div className="bg-secondary/30 text-xs text-secondary-foreground py-2 border-b">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <p>The most powerful and creative eCommerce HTML template.</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="hidden md:flex items-center gap-2">
                  <Phone size={14} />
                  <span>(+965) 7492-3477</span>
               </div>
            </div>
         </div>
      </div>

      {/* Main Header */}
      <div className="border-b py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 items-center gap-4">
                {/* Mobile Menu Trigger */}
                <div className="lg:hidden col-span-2">
                  <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                       <Button variant="ghost" size="icon">
                          <Menu className="h-6 w-6" />
                       </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                       <nav className="flex flex-col gap-4 p-4">
                          {[ 'Shop', 'Contact'].map((item) => (
                              <Link
                              key={item}
                              href={`/${item.toLowerCase()}`}
                              className={cn(
                                  "font-semibold transition-colors hover:text-primary",
                                  pathname === `/${item.toLowerCase()}` ? "text-primary" : "text-foreground"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                              >
                              {item}
                              </Link>
                          ))}
                           <Link href="/admin" className={cn("font-semibold transition-colors hover:text-primary", pathname === "/admin" && "text-primary")} onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
                           <Separator />
                           {isAuthenticated ? (
                             <Button variant="ghost" onClick={() => {logout(); setIsMobileMenuOpen(false);}} className="justify-start"><LogOut size={16} /> Logout</Button>
                           ) : (
                             <Link href="/login" className="flex items-center gap-2 font-semibold hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}><LogIn size={16} /> Login</Link>
                           )}
                       </nav>
                    </SheetContent>
                  </Sheet>
                </div>
                
                <div className="col-span-8 lg:col-span-3 text-center lg:text-left">
                    <Link href="/" className="flex items-center justify-center lg:justify-start space-x-2">
                        <Package className="h-8 w-8 text-primary" />
                        <span className="font-bold text-2xl">ShopSwift</span>
                    </Link>
                </div>
                
                {/* Search Bar - Hidden on mobile */}
                <div className="hidden lg:block col-span-5">
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

                <div className="col-span-2 lg:col-span-4 flex items-center justify-end gap-4">
                     <Wishlist>
                        <div className="relative cursor-pointer hidden lg:block">
                            <Heart className="h-7 w-7 text-muted-foreground" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                {wishlistCount}
                                </span>
                            )}
                        </div>
                      </Wishlist>
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
      
      {/* Bottom Navigation - Hidden on mobile */}
       <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <nav className="flex items-center gap-6">
              <Link
                  href="/"
                  className={cn(
                      "text-sm font-semibold transition-colors hover:text-primary py-4",
                      pathname === "/" ? "text-primary" : "text-foreground"
                  )}
                  >
                  Home
               </Link>
              <Link
                  href="/shop"
                  className={cn(
                      "text-sm font-semibold transition-colors hover:text-primary py-4",
                      pathname === "/shop" ? "text-primary" : "text-foreground"
                  )}
                  >
                  Shop
              </Link>
              <Link
                  href="/contact"
                  className={cn(
                      "text-sm font-semibold transition-colors hover:text-primary py-4",
                      pathname === "/contact" ? "text-primary" : "text-foreground"
                  )}
                  >
                  Contact
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
