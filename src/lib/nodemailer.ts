
import sgMail from '@sendgrid/mail';
import type { CartItem } from './types';

// Set SendGrid API Key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

export async function sendOrderConfirmationEmail(orderData: OrderData) {
  const { cart, total, customer } = orderData;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY is not set. Email not sent.');
    // Silently fail in production if API key is not configured
    return;
  }
  
  if (!adminEmail) {
    console.error('ADMIN_EMAIL environment variable is not set. Email not sent.');
    // Silently fail in production if admin email is not configured
    return;
  }
  
  if (!fromEmail) {
    console.error('SENDGRID_FROM_EMAIL environment variable is not set. Email not sent.');
    // Silently fail in production if from email is not configured
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
      
      <h2>Customer Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 4px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 4px; border: 1px solid #ddd;">${customer.name}</td></tr>
        <tr><td style="padding: 4px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 4px; border: 1px solid #ddd;">${customer.email}</td></tr>
        <tr><td style="padding: 4px; border: 1px solid #ddd;"><strong>Mobile:</strong></td><td style="padding: 4px; border: 1px solid #ddd;">${customer.mobile}</td></tr>
        <tr><td style="padding: 4px; border: 1px solid #ddd;"><strong>Address:</strong></td><td style="padding: 4px; border: 1px solid #ddd;">${customer.address}</td></tr>
        <tr><td style="padding: 4px; border: 1px solid #ddd;"><strong>District:</strong></td><td style="padding: 4px; border: 1px solid #ddd;">${customer.district}</td></tr>
      </table>

      <h2>Order Details</h2>
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
            <td colspan="3" style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">Subtotal:</td>
            <td style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">$${orderData.total.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold; padding: 8px;">Shipping:</td>
            <td style="text-align: right; font-weight: bold; padding: 8px;">$150.00</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">Grand Total:</td>
            <td style="text-align: right; font-weight: bold; padding: 8px; border-top: 2px solid #333;">$${(total + 150).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="margin-top: 20px;">Thank you,</p>
      <p>The ShopSwift Team</p>
    </div>
  `;

  const msg = {
    to: adminEmail,
    from: fromEmail,
    subject: `New Order Notification - ${new Date().toLocaleDateString()}`,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log('Order confirmation email sent successfully via SendGrid.');
  } catch (error) {
    console.error('Error sending order confirmation email via SendGrid:', error);
    if (error.response) {
      console.error(error.response.body)
    }
