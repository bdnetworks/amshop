'use client';

import Link from 'next/link';
import { Package, Home, ShoppingCart, UserCog, Info, Phone, Search, Heart, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Cart } from '@/components/cart';
import { useAppContext } from '@/providers/app-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Header() {
  const { cartCount, cartTotal } = useAppContext();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home'},
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="border-b">
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10 text-xs">
          <div className="flex items-center gap-4">
            <p>24/7 SUPPORT: (+965) 7492-3477</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary">Recently Viewed</Link>
            <Link href="#" className="hover:text-primary">Wishlist</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3">
                    <Link href="/" className="flex items-center space-x-2">
                        <Package className="h-8 w-8 text-primary" />
                        <span className="font-bold text-2xl">ShopSwift</span>
                    </Link>
                </div>
                <div className="col-span-6">
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
                <div className="col-span-3 flex items-center justify-end gap-4">
                    <div className="flex items-center gap-2">
                        <User className="h-7 w-7 text-muted-foreground"/>
                        <div>
                            <span className="text-xs text-muted-foreground">Sign In</span>
                            <p className="text-sm font-semibold">Account</p>
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
                                <span className="text-xs text-muted-foreground">Cart</span>
                                <p className="text-sm font-semibold">${cartTotal.toFixed(2)}</p>
                            </div>
                        </div>
                    </Cart>
                </div>
            </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
       <div className="sticky top-0 z-50 w-full border-t border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "text-sm font-semibold transition-colors hover:text-primary py-4",
                    pathname === link.href ? "text-primary" : "text-foreground"
                )}
                >
                {link.label}
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
            </nav>
        </div>
       </div>
    </header>
  );
}
