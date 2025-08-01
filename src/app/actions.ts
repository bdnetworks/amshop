
'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import type { CartItem } from '@/lib/types';

export async function enhanceDescriptionAction(basicDescription: string) {
  try {
    const result = await generateProductDescription({ basicDescription });
    return { success: true, enhancedDescription: result.enhancedDescription };
  } catch (error) {
    console.error('Error enhancing description:', error);
    return { success: false, error: 'Failed to enhance description.' };
  }
}

export async function submitOrderAction(data: {
  cart: CartItem[];
  total: number;
  customer: { 
    name: string; 
    email: string;
    mobile: string;
    address: string;
    district: string;
  };
}) {
  const formUrl = process.env.GOOGLE_FORM_ACTION_URL;
  if (!formUrl) {
    console.error('Google Form URL is not configured.');
    return { success: false, error: 'Order submission is not configured.' };
  }

  const shippingCost = 150.00;
  const grandTotal = data.total + shippingCost;
  const cartItemsString = data.cart
    .map(item => `${item.product.name} (x${item.quantity})`)
    .join(', ');

  const formData = new URLSearchParams();
  formData.append(process.env.GOOGLE_FORM_ENTRY_NAME!, data.customer.name);
  formData.append(process.env.GOOGLE_FORM_ENTRY_EMAIL!, data.customer.email);
  formData.append(process.env.GOOGLE_FORM_ENTRY_MOBILE!, data.customer.mobile);
  formData.append(process.env.GOOGLE_FORM_ENTRY_ADDRESS!, data.customer.address);
  formData.append(process.env.GOOGLE_FORM_ENTRY_DISTRICT!, data.customer.district);
  formData.append(process.env.GOOGLE_FORM_ENTRY_TOTAL!, grandTotal.toFixed(2));
  formData.append(process.env.GOOGLE_FORM_ENTRY_CART!, cartItemsString);

  try {
    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'no-cors', 
    });
    
    // With no-cors, we can't inspect the response. We assume success if the request doesn't throw an error.
    return { success: true, message: 'Order placed successfully!' };

  } catch (error) {
    console.error('Error submitting order to Google Form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
