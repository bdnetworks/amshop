import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { CartItem } from './types';

// Ensure environment variables are loaded
import 'dotenv/config';

// Validate that the required environment variables are set
if (
  !process.env.GOOGLE_SHEET_ID ||
  !process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL ||
  !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
) {
  throw new Error('Missing required Google Sheets API credentials in .env file');
}

// Initialize the JWT auth client
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Initialize the Google Spreadsheet document
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

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
 * Appends a new order to the Google Sheet.
 * @param data The order data to append.
 */
export async function appendOrderToSheet(data: OrderData) {
  try {
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    const orderId = `ORDER-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const itemsString = data.cart.map(item => `${item.product.name} (x${item.quantity})`).join(', ');
    const shippingCost = 150.00;
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

    await sheet.addRow(newRow);
    console.log(`Successfully appended order ${orderId} to the sheet.`);
  } catch (error) {
    console.error('Error appending order to Google Sheet:', error);
    // Re-throw the error to be handled by the caller
    throw new Error('Failed to save order to Google Sheet.');
  }
}
