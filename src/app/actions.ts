
'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { sendOrderConfirmationEmail } from '@/lib/mailjet';
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
  try {
    await sendOrderConfirmationEmail(data);
    return { success: true, message: 'Order placed successfully!' };
  } catch (error) {
    console.error('Error submitting order via Mailjet:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to send confirmation email. ${errorMessage}` };
  }
}
