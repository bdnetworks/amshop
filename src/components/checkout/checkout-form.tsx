
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { submitOrderAction } from '@/app/actions';
import { Loader2 } from 'lucide-react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'A valid mobile number is required'),
  address: z.string().min(5, 'Address is required'),
  district: z.string().min(3, 'District is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const { cart, cartTotal, clearCart, googleFormSettings } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
      district: '',
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    if (!googleFormSettings || !googleFormSettings.formUrl) {
        toast({
            variant: 'destructive',
            title: 'Configuration Error',
            description: 'Google Form settings are not configured. Please contact support.',
        });
        setIsSubmitting(false);
        return;
    }

    const orderData = {
      cart,
      total: cartTotal,
      customer: data,
      settings: googleFormSettings,
    };
    
    const result = await submitOrderAction(orderData);
    
    if (result.success) {
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. A confirmation has been logged.',
      });
      clearCart();
      router.push('/thank-you');
    } else {
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: result.error || 'There was a problem placing your order.',
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                <Input placeholder="e.g., 01234567890" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                <Input placeholder="123 Main Street" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
            <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                <Input placeholder="e.g., Dhaka" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </Form>
  );
}
