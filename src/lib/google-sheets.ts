
'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { CartItem } from './types';

// Check if all required environment variables are present
if (
  !process.env.GOOGLE_SHEET_ID ||
  !process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL ||
  !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
) {
  throw new Error(
    'Missing Google Sheets API credentials in .env file. Please provide GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL, and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.'
  );
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

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

export async function appendOrderToSheet(data: OrderData) {
    try {
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsByTitle['Sheet1']

        const shippingCost = 150.00;
        const grandTotal = data.total + shippingCost;
        
        const itemsString = data.cart.map(item => `${item.product.name} (x${item.quantity})`).join(', ');

        const newRow = {
            OrderID: `ORDER-${Date.now()}`,
            Timestamp: new Date().toISOString(),
            CustomerName: data.customer.name,
            Email: data.customer.email,
            Mobile: data.customer.mobile,
            Address: data.customer.address,
            District: data.customer.district,
            TotalAmount: grandTotal.toFixed(2),
            Items: itemsString
        };

        await sheet.addRow(newRow);
        
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
        throw new Error('Could not connect to Google Sheets. Please check your credentials and sharing settings.');
    }
}
