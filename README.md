# Auto Management Shop

This is a Next.js e-commerce application called Auto Management Shop, built with Firebase Studio.

## Core Features

- **Product Catalog**: Browse a list of available products.
- **Product Upload**: An admin page to add new products to the catalog.
- **AI-Powered Descriptions**: Use AI to enhance product descriptions for better appeal.
- **Shopping Cart**: Add products to a cart and manage them.
- **Checkout**: A streamlined process to finalize and submit orders.
- **Dynamic Homepage**: Manage hero slides and promotional banners directly from the admin panel.
- **Google Form Integration**: Order submissions are sent directly to a Google Sheet for easy management.

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

- The main product catalog is at `/`.
- The admin page for uploading products is at `/admin`.

---

## Setup for New Users (Using Your Own Database)

If you want to use this project template with your own separate database, follow these steps.

### Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2.  Click **"Add project"** and give your project a name.
3.  Once the project is created, go to the **"Build"** section in the left sidebar and click on **"Firestore Database"**.
4.  Click **"Create database"** and start in **production mode**. Choose a location and click **"Enable"**.

### Step 2: Get Your Firebase Configuration

1.  In your Firebase project's dashboard, click the **Gear icon (⚙️)** next to "Project Overview" and select **"Project settings"**.
2.  In the "Your apps" card, click on the **web icon (</>)** to create a new web app.
3.  Give your app a nickname and click **"Register app"**.
4.  Firebase will provide you with a `firebaseConfig` object. It looks like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project.appspot.com",
      messagingSenderId: "12345...",
      appId: "1:12345..."
    };
    ```
5.  You will need these values for the next step.

### Step 3: Configure Environment Variables

1.  In the project's code, find the `src/.env.example` file.
2.  Create a copy of this file in the same `src` directory and rename it to `src/.env`.
3.  Open the new `src/.env` file.
4.  Copy the values from your `firebaseConfig` object and paste them into the corresponding variables in the `src/.env` file.
5.  **Important for Deployment:** When you deploy this project to a hosting service like Vercel, you must also add these same key-value pairs to the **Environment Variables** section in your Vercel project settings.

---

## Google Form Integration for Orders

This application uses a Google Form to handle order submissions. This allows you to easily collect and manage orders in a Google Sheet without a complex backend. Follow these steps to set it up.

### Step 1: Create the Google Form

1.  Go to [forms.google.com](https://forms.google.com) and create a new, blank form.
2.  Add the following **7 questions** to your form. All questions should be of the **"Short answer"** type.
    *   `Full Name`
    *   `Email`
    *   `Mobile`
    *   `Address`
    *   `District`
    *   `Total Amount`
    *   `Cart Items`
3.  Your form should look like this:
    

### Step 2: Get the Form Response URL and Entry IDs

1.  While on your form editor, click the **three-dot menu (⋮)** in the top-right corner and select **"Get pre-filled link"**.
2.  A new tab will open with your form. Fill in some sample text in **every field** (e.g., "test").
3.  Click the **"Get link"** button at the bottom.
4.  In the pop-up, click **"Copy link"**.
5.  Paste this very long link into a text editor. It will look something like this:
    ```
    https://docs.google.com/forms/d/e/1FAIpQLSfHOg.../viewform?usp=pp_url&entry.671218297=test&entry.371021705=test&...
    ```
6.  From this link, you need two things:
    *   **Form Action URL**: This is the part of the URL before `/viewform`. It must end with `/formResponse`.
      *   Example: `https://docs.google.com/forms/d/e/1FAIpQLSfHOg.../formResponse`
    *   **Entry IDs**: These are the `entry.xxxxxxxx` numbers. Each question has a unique ID.
      *   Example: `entry.671218297` (for Full Name), `entry.371021705` (for Email), and so on for all 7 fields.

### Step 3: Configure in the Admin Panel

1.  Go to the `/admin` page in your application.
2.  Click on the **"Google Form"** tab.
3.  Paste the **Form Action URL** and the **7 Entry IDs** into their corresponding fields in the form.
4.  Click **"Save Settings"**.

### Step 4 (Optional): Get Email Notifications for New Orders

You can set up an Apps Script to automatically send an email to you whenever a new order is submitted.

1.  Open the **Google Sheet** that is connected to your form.
2.  Go to **`Extensions` > `Apps Script`**.
3.  In the script editor, replace any existing code in `Code.gs` with the following code.
4.  **Important:** Change `"your-email@example.com"` on line 3 to your actual email address.

    ```javascript
    // This function will run automatically whenever a new order is submitted.
    function onFormSubmit(e) {
      const adminEmail = "your-email@example.com"; 
      
      const values = e.namedValues;
      const customerName = values['Full Name'] ? values['Full Name'][0] : 'N/A';
      const customerEmail = values['Email'] ? values['Email'][0] : 'N/A';
      const mobile = values['Mobile'] ? values['Mobile'][0] : 'N/A';
      const address = values['Address'] ? values['Address'][0] : 'N/A';
      const district = values['District'] ? values['District'][0] : 'N/A';
      const totalAmount = values['Total Amount'] ? values['Total Amount'][0] : 'N/A';
      const cartItemsRaw = values['Cart Items'] ? values['Cart Items'][0] : '';

      const cartItemsHtml = cartItemsRaw.split(';')
                                        .map(item => `<li>${item.trim()}</li>`)
                                        .join('');

      const subject = `🛍️ New Order Received from ${customerName}`;
      const body = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #4A90E2;">New Order Details</h2>
            <p>You have received a new order from your Auto Management Shop store.</p>
            <hr>
            <h3>Customer Information:</h3>
            <ul>
              <li><strong>Name:</strong> ${customerName}</li>
              <li><strong>Email:</strong> ${customerEmail}</li>
              <li><strong>Mobile:</strong> ${mobile}</li>
              <li><strong>Address:</strong> ${address}</li>
              <li><strong>District:</strong> ${district}</li>
            </ul>
            <h3>Order Summary:</h3>
            <ul>
              ${cartItemsHtml}
            </ul>
            <hr>
            <h3 style="color: #D0021B;">Total Amount: ${totalAmount}</h3>
          </body>
        </html>
      `;

      MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        htmlBody: body,
        name: 'Auto Management Shop Store' // This will be the sender's name
      });
    }
    ```
5.  Save the project (💾 icon).
6.  In the left sidebar, click on **Triggers (⏰ icon)**.
7.  Click **`+ Add Trigger`** and configure it as follows:
    *   **Function to run:** `onFormSubmit`
    *   **Deployment:** `Head`
    *   **Event source:** `From spreadsheet`
    *   **Event type:** `On form submit`
8.  Click **Save**. You will be asked to authorize the script. Allow the permissions.

Now, every new order will be saved to your sheet and you will receive a formatted email notification.
