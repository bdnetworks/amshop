'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface FacebookCommentsProps {
  productId: string;
}

export default function FacebookComments({ productId }: FacebookCommentsProps) {
  const pathname = usePathname();
  const url = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '';

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [productId]); // Re-parse when product changes

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-bold mb-4">Customer Comments</h3>
      <div
        className="fb-comments"
        data-href={url} // Use the full URL of the product page
        data-width="100%"
        data-numposts="5"
        data-adapt-container-width="true"
      ></div>
    </div>
  );
}
