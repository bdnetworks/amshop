
'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import type { CartItem } from '@/lib/types';
import { appendOrderToSheet } from '@/lib/google-sheets';

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
  try {
    await appendOrderToSheet(data);
    return { success: true, message: 'Order placed successfully and saved to Google Sheet!' };
  } catch (error) {
    console.error('Error submitting order to Google Sheet:', error);
    return { success: false, error: 'Failed to save order.' };
  }
}
