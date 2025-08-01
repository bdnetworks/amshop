'use server';

import Mailjet from 'node-mailjet';
import type { CartItem } from './types';

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});

const senderEmail = process.env.SENDER_EMAIL;
const adminEmail = process.env.ADMIN_EMAIL;

if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
  console.warn('Mailjet API Key or Secret Key is not set in environment variables. Email functionality will be disabled.');
}
if (!senderEmail || !adminEmail) {
    console.warn('Sender or Admin email is not set in environment variables. Email functionality will be disabled.');
}


function generateOrderEmailHtml(data: {
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
    const shippingCost = 150.00;
    const grandTotal = data.total + shippingCost;
    const cartItemsHtml = data.cart.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product.name} (x${item.quantity})</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">$${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #333;">New Order Received!</h1>
        <p>A new order has been placed on ShopSwift.</p>
        
        <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Customer Details</h2>
        <p><strong>Name:</strong> ${data.customer.name}</p>
        <p><strong>Email:</strong> ${data.customer.email}</p>
        <p><strong>Mobile:</strong> ${data.customer.mobile}</p>
        <p><strong>Address:</strong> ${data.customer.address}, ${data.customer.district}</p>
        
        <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Product</th>
                    <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${cartItemsHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td style="padding: 10px; text-align: right;">Subtotal:</td>
                    <td style="padding: 10px; text-align: right;">$${data.total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: right;">Shipping:</td>
                    <td style="padding: 10px; text-align: right;">$${shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">Grand Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">$${grandTotal.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
      </div>
    `;
}

export async function sendOrderConfirmationEmail(data: {
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
  if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY || !senderEmail || !adminEmail) {
    throw new Error('Mailjet environment variables are not fully configured.');
  }

  const emailHtml = generateOrderEmailHtml(data);

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: senderEmail,
          Name: 'ShopSwift Orders',
        },
        To: [
          {
            Email: adminEmail,
            Name: 'ShopSwift Admin',
          },
        ],
        Subject: `New Order from ${data.customer.name}`,
        TextPart: `New order received. Customer: ${data.customer.name}, Email: ${data.customer.email}. Total: $${(data.total + 150).toFixed(2)}`,
        HTMLPart: emailHtml,
      },
    ],
  });

  try {
    const result = await request;
    console.log('Mailjet response:', JSON.stringify(result.body, null, 2));
    return result.body;
  } catch (err) {
    console.error('Mailjet API Error:', err);
    throw err;
  }
}
