
'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import type { CartItem } from '@/lib/types';
import { sendOrderConfirmationEmail } from '@/lib/nodemailer';

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
    await sendOrderConfirmationEmail(data);
    return { success: true, message: 'Order placed successfully! Check your email for confirmation.' };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, error: 'Failed to save order.' };
  }
}
