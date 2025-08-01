'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import type { CartItem, GoogleFormSettings } from '@/lib/types';

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
  settings: GoogleFormSettings;
}) {
  const formUrl = data.settings.formUrl;
  if (!formUrl) {
    console.error('Google Form action URL is not defined in settings.');
    return { success: false, error: 'Server configuration error: Form URL is missing.' };
  }

  try {
    // Format each cart item to include name, quantity, and price.
    const cartItemsString = data.cart
      .map(
        (item) =>
          `${item.product.name} (x${item.quantity}) - $${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join('; ');

    const shippingCost = 150.00;
    const grandTotal = data.total + shippingCost;
    const totalAmountString = `$${grandTotal.toFixed(
      2
    )} (includes $${shippingCost.toFixed(2)} shipping)`;

    const formData = new FormData();
    formData.append(data.settings.entryName, data.customer.name);
    formData.append(data.settings.entryEmail, data.customer.email);
    formData.append(data.settings.entryMobile, data.customer.mobile);
    formData.append(data.settings.entryAddress, data.customer.address);
    formData.append(data.settings.entryDistrict, data.customer.district);
    formData.append(data.settings.entryTotal, totalAmountString);
    formData.append(data.settings.entryCart, cartItemsString);

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