import nodemailer from 'nodemailer';
import type { CartItem } from './types';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface OrderData {
  cart: CartItem[];
  total: number;
  customer: { name: string; email: string };
}

export async function sendOrderConfirmationEmail(orderData: OrderData) {
  const { cart, total, customer } = orderData;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error('ADMIN_EMAIL environment variable is not set.');
    // Silently fail in production if admin email is not configured
    return;
  }

  const itemsHtml = cart
    .map(
      (item) => `
    <tr>
      <td>${item.product.name}</td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">$${item.product.price.toFixed(2)}</td>
      <td style="text-align: right;">$${(item.product.price * item.quantity).toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">New Order Received!</h1>
      <p>A new order has been placed on ShopSwift.</p>
      <h2>Order Details</h2>
      <p><strong>Customer Name:</strong> ${customer.name}</p>
      <p><strong>Customer Email:</strong> ${customer.email}</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Product</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Quantity</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Price</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">Grand Total:</td>
            <td style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="margin-top: 20px;">Thank you,</p>
      <p>The ShopSwift Team</p>
    </div>
  `;

  const mailOptions = {
    from: `"ShopSwift" <${process.env.EMAIL_SERVER_USER}>`,
    to: adminEmail,
    subject: `New Order Notification - ${new Date().toLocaleDateString()}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // In a real app, you might want to throw an error or handle it differently
    // For this prototype, we'll log it and let the process continue.
  }
}
