import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/providers/app-provider';
import { Header } from '@/components/header';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'ShopSwift',
  description: 'An elegant e-commerce experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{fontFamily: "'Poppins', sans-serif"}}>
        <div id="fb-root"></div>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=YOUR_FACEBOOK_APP_ID&autoLogAppEvents=1"
          nonce="L5A4nJ4j"
        />
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
