
'use server';

import type { CartItem } from './types';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

if (!resend) {
  console.warn('RESEND_API_KEY is not set. Emails will not be sent.');
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
  if (!resend || !ADMIN_EMAIL) {
    const errorMessage = 'Resend API Key or Admin Email is not configured in .env file.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    await resend.emails.send({
      from: `ShopSwift <no-reply@yourverifieddomain.com>`, // This needs to be a verified domain in Resend
      to: ADMIN_EMAIL,
      subject: `New Order from ${data.customer.name} - ShopSwift`,
      html: generateOrderEmailHtml(data),
    });
    console.log('Order confirmation email sent successfully to:', ADMIN_EMAIL);
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    throw new Error('Failed to send order confirmation email.');
  }
}
