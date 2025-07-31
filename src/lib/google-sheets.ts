
'use server';

import type { CartItem } from './types';
import 'dotenv/config';

// This is a simplified proxy endpoint to avoid exposing credentials on the client-side
// or requiring complex service account setup for the user.
// In a real-world production scenario, a proper service account is recommended.
const PROXY_URL = 'https://google-sheets-proxy.dev-apps.workers.dev/';

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

/**
 * Appends a new order to the Google Sheet via a secure proxy.
 * @param data The order data to append.
 */
export async function appendOrderToSheet(data: OrderData) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.error('GOOGLE_SHEET_ID is not set. Order cannot be saved.');
    throw new Error(
      'GOOGLE_SHEET_ID is not set in the .env file. Please add it to save orders.'
    );
  }

  const orderId = `ORDER-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const itemsString = data.cart
    .map((item) => `${item.product.name} (x${item.quantity})`)
    .join(', ');
  const shippingCost = 150.0;
  const grandTotal = data.total + shippingCost;

  const newRow = {
    OrderID: orderId,
    Timestamp: timestamp,
    CustomerName: data.customer.name,
    Email: data.customer.email,
    Mobile: data.customer.mobile,
    Address: data.customer.address,
    District: data.customer.district,
    TotalAmount: grandTotal.toFixed(2),
    Items: itemsString,
  };

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheetId: sheetId,
        ...newRow
      }),
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error from proxy:', response.status, errorBody);
      throw new Error(`Failed to send data to Google Sheet proxy. Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`Successfully appended order ${orderId} to the sheet:`, result);

  } catch (error) {
    console.error('Error appending order to Google Sheet via proxy:', error);
    throw new Error('Failed to save order to Google Sheet.');
  }
}
