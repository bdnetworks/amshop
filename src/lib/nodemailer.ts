
'use server';

import type { CartItem } from './types';
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY is not set. Emails will not be sent.');
}

interface OrderData {
  cart: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    mobile: string;
    address: string;
    district: string;
  };
}

function generateOrderEmailHtml(data: OrderData): string {
  const shippingCost = 150.00;
  const grandTotal = data.total + shippingCost;

  const itemsHtml = data.cart
    .map(
      (item) => `
    <tr>
      <td>${item.product.name} (x${item.quantity})</td>
      <td style="text-align: right;">$${(item.product.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">New Order Received!</h1>
      <p>You have received a new order on ShopSwift.</p>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> ORDER-${Date.now()}</p>
      <p><strong>Customer Name:</strong> ${data.customer.name}</p>
      <p><strong>Customer Email:</strong> ${data.customer.email}</p>
      <p><strong>Mobile:</strong> ${data.customer.mobile}</p>
      <p><strong>Address:</strong> ${data.customer.address}, ${data.customer.district}</p>
      <hr>
      <h2>Items</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
            <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <hr>
      <table style="width: 100%; margin-top: 20px;">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td style="text-align: right;">$${data.total.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td style="text-align: right;">$${shippingCost.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Grand Total:</td>
            <td style="text-align: right; font-weight: bold;">$${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export async function sendOrderConfirmationEmail(data: OrderData) {
  if (!SENDGRID_API_KEY || !ADMIN_EMAIL) {
    const errorMessage = 'SendGrid API Key or Admin Email is not configured in .env file.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const msg = {
    to: ADMIN_EMAIL, // The email address that receives the order notification
    from: ADMIN_EMAIL, // This MUST be a verified sender in your SendGrid account
    subject: `New Order from ${data.customer.name} - ShopSwift`,
    html: generateOrderEmailHtml(data),
  };

  try {
    await sgMail.send(msg);
    console.log('Order confirmation email sent successfully to:', ADMIN_EMAIL);
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);

    // More detailed error logging for SendGrid
    if ((error as any).response) {
      console.error((error as any).response.body)
    }
    
    throw new Error('Failed to send order confirmation email.');
  }
}
