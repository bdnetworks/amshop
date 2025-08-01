
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

export default function GoogleFormInstructions() {
  const codeSnippet = `// This function will run automatically whenever a new order is submitted.
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
                                    .map(item => \`<li>\${item.trim()}</li>\`)
                                    .join('');

  const subject = \`🛍️ New Order Received from \${customerName}\`;
  const body = \`
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4A90E2;">New Order Details</h2>
        <p>You have received a new order from your Auto Management Shop store.</p>
        <hr>
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> \${customerName}</li>
          <li><strong>Email:</strong> \${customerEmail}</li>
          <li><strong>Mobile:</strong> \${mobile}</li>
          <li><strong>Address:</strong> \${address}</li>
          <li><strong>District:</strong> \${district}</li>
        </ul>
        <h3>Order Summary:</h3>
        <ul>
          \${cartItemsHtml}
        </ul>
        <hr>
        <h3 style="color: #D0021B;">Total Amount: \${totalAmount}</h3>
      </body>
    </html>
  \`;

  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    htmlBody: body,
    name: 'Auto Management Shop Store' // This will be the sender's name
  });
}
`;

  return (
    <Card>
        <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to integrate your Google Form.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step-1">
                    <AccordionTrigger>Step 1: Create the Google Form</AccordionTrigger>
                    <AccordionContent>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>Go to <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">forms.google.com</a> and create a new, blank form.</li>
                            <li>Add the following **7 questions**. All questions should be of the **"Short answer"** type:
                                <ul className="list-disc list-inside pl-6 mt-2 bg-muted/50 p-3 rounded-md">
                                    <li>Full Name</li>
                                    <li>Email</li>
                                    <li>Mobile</li>
                                    <li>Address</li>
                                    <li>District</li>
                                    <li>Total Amount</li>
                                    <li>Cart Items</li>
                                </ul>
                            </li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step-2">
                    <AccordionTrigger>Step 2: Get the Form URL and Entry IDs</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                         <ol className="list-decimal list-inside space-y-2">
                            <li>While on your form editor, click the **three-dot menu (⋮)** in the top-right and select **"Get pre-filled link"**.</li>
                            <li>A new tab will open. Fill in some sample text in **every field** (e.g., "test").</li>
                            <li>Click **"Get link"** at the bottom, then **"Copy link"**.</li>
                            <li>Paste this long link into a text editor. It will look something like this:
                                <Alert className="mt-2">
                                  <Terminal className="h-4 w-4" />
                                  <AlertDescription className="text-xs break-all">
                                    https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?usp=pp_url&entry.123=test&entry.456=test&...
                                  </AlertDescription>
                                </Alert>
                            </li>
                            <li>From this link, you need two things:
                                <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                                    <li>**Form Action URL**: The part before `/viewform`, ending with `/formResponse`.
                                      <br /> 
                                      Example: `https://docs.google.com/forms/d/e/1FAIpQLS.../formResponse`
                                    </li>
                                    <li>**Entry IDs**: The `entry.xxxxxxxx` numbers for each field.</li>
                                </ul>
                            </li>
                             <li>Paste the **Form Action URL** and the **7 Entry IDs** into the corresponding fields on the left.</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="step-3">
                    <AccordionTrigger>Step 3 (Optional): Get Email Notifications</AccordionTrigger>
                    <AccordionContent>
                        <ol className="list-decimal list-inside space-y-3">
                            <li>Open the **Google Sheet** connected to your form.</li>
                            <li>Go to **`Extensions > Apps Script`**.</li>
                            <li>In the script editor, replace any existing code with the following script. **Important:** Change `"your-email@example.com"` to your actual email.
                                <Alert variant="default" className="mt-2">
                                  <Terminal className="h-4 w-4" />
                                  <AlertTitle>Apps Script Code</AlertTitle>
                                  <AlertDescription>
                                    <pre className="text-xs whitespace-pre-wrap font-mono bg-muted/50 p-3 rounded-md mt-1">
                                      {codeSnippet}
                                    </pre>
                                  </AlertDescription>
                                </Alert>
                            </li>
                            <li>Save the script (💾 icon).</li>
                            <li>In the left sidebar, click on **Triggers (⏰)**, click **`+ Add Trigger`**, and configure it to run `onFormSubmit` with the event type `On form submit`.</li>
                             <li>Save and authorize the script. Now you'll get an email for every new order.</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  );
}
