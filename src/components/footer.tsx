
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/providers/app-provider';
import { Skeleton } from './ui/skeleton';

export function Footer() {
  const { footerData } = useAppContext();

  if (!footerData) {
    return (
      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
             <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
             <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
             <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  const { about, companyLinks, infoLinks, newsletter, copyright, socialLinks, paymentImageUrl } = footerData;

  const socialIconMap: { [key: string]: React.ComponentType<{ size: number }> } = {
    Facebook, Twitter, Instagram, Linkedin, Youtube
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">Auto Management Shop</span>
            </Link>
            <p className="text-sm">
                {about.description}
            </p>
            <div className="space-y-2 text-sm">
                <p><strong>Add:</strong> {about.address}</p>
                <p><strong>Tel:</strong> {about.phone}</p>
                <p><strong>Email:</strong> {about.email}</p>
            </div>
            <div className="flex space-x-4">
                {socialLinks.map(social => {
                  const Icon = socialIconMap[social.name];
                  return (
                    <Link key={social.id} href={social.href} className="text-muted-foreground hover:text-primary">
                      {Icon ? <Icon size={20} /> : null}
                    </Link>
                  )
                })}
            </div>
          </div>

          {/* Company Links Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{companyLinks.title}</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.links.map(link => (
                <li key={link.id}><Link href={link.href} className="hover:text-primary">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          
          {/* Information Links Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{infoLinks.title}</h3>
            <ul className="space-y-2 text-sm">
              {infoLinks.links.map(link => (
                <li key={link.id}><Link href={link.href} className="hover:text-primary">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">{newsletter.title}</h3>
            <p className="text-sm">{newsletter.description}</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder={newsletter.placeholder} />
              <Button type="submit">{newsletter.buttonText}</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>{copyright.replace('{new Date().getFullYear()}', new Date().getFullYear().toString())}</p>
            <div className="mt-4 md:mt-0">
                <Image 
                    src={paymentImageUrl}
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
