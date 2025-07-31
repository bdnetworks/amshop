'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl">ShopSwift</span>
            </Link>
            <p className="text-sm">
                The most powerful and creative eCommerce HTML template.
            </p>
            <div className="space-y-2 text-sm">
                <p><strong>Add:</strong> 123 Main St, Anytown, USA</p>
                <p><strong>Tel:</strong> (123) 456-7890</p>
                <p><strong>Email:</strong> support@shopswift.com</p>
            </div>
            <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Delivery Information</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Support Center</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Search</Link></li>
              <li><Link href="#" className="hover:text-primary">Help</Link></li>
              <li><Link href="#" className="hover:text-primary">Information</Link></li>
              <li><Link href="#" className="hover:text-primary">Shipping Details</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Sign Up For Our Newsletter</h3>
            <p className="text-sm">
                Get email updates about our latest shop and special offers.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} ShopSwift. All Rights Reserved.</p>
            <div className="mt-4 md:mt-0">
                <Image 
                    src="https://nextjs-two-navy-66.vercel.app/_next/image?url=%2Fpayment.png&w=256&q=75"
                    alt="Payment methods"
                    width={250}
                    height={25}
                />
            </div>
        </div>
      </div>
    </footer>
  );
}
