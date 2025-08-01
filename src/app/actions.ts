
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
    console.error('Google Form action URL is not defined in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    const cartItemsString = data.cart
      .map(item => `${item.product.name} (x${item.quantity})`)
      .join(', ');
    const shippingCost = 150.00;
    const grandTotal = data.total + shippingCost;

    const formData = new FormData();
    formData.append(process.env.GOOGLE_FORM_ENTRY_NAME || 'entry.name', data.customer.name);
    formData.append(process.env.GOOGLE_FORM_ENTRY_EMAIL || 'entry.email', data.customer.email);
    formData.append(process.env.GOOGLE_FORM_ENTRY_MOBILE || 'entry.mobile', data.customer.mobile);
    formData.append(process.env.GOOGLE_FORM_ENTRY_ADDRESS || 'entry.address', data.customer.address);
    formData.append(process.env.GOOGLE_FORM_ENTRY_DISTRICT || 'entry.district', data.customer.district);
    formData.append(process.env.GOOGLE_FORM_ENTRY_TOTAL || 'entry.total', grandTotal.toFixed(2));
    formData.append(process.env.GOOGLE_FORM_ENTRY_CART || 'entry.cart', cartItemsString);

    await fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // Important: This prevents CORS errors since we don't need to read the response.
    });

    return { success: true, message: 'Order submitted successfully via Google Form.' };
  } catch (error) {
    console.error('Error submitting order to Google Form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred while submitting the order.';
    return { success: false, error: `Failed to submit order. ${errorMessage}` };
  }
}
