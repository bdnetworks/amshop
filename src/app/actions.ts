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
  customer: { name: string; email: string };
}) {
  try {
    // Log the order to the console
    console.log('--- NEW ORDER SUBMITTED ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Customer:', data.customer);
    console.log('Total Amount: $', data.total.toFixed(2));
    console.log('Items:');
    data.cart.forEach(item => {
      console.log(`  - Product: ${item.product.name}`);
      console.log(`    Quantity: ${item.quantity}`);
      console.log(`    Price: $${item.product.price.toFixed(2)}`);
    });
    console.log('--- END OF ORDER ---');

    // Send email notification
    await sendOrderConfirmationEmail(data);

    return { success: true, message: 'Order placed successfully!' };
  } catch (error) {
    console.error('Error submitting order:', error);
    return { success: false, error: 'Failed to place order.' };
  }
}
