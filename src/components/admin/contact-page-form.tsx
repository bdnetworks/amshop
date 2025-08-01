
'use client';

import { useEffect } from 'react';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Address is required'),
  email: z.string().email('A valid email is required'),
  phone: z.string().min(5, 'Phone number is required'),
  whatsappNumber: z.string().min(10, 'A valid WhatsApp number with country code is required'),
  mapUrl: z.string().url('A valid Google Maps embed URL is required'),
});

type ContactPageFormValues = z.infer<typeof formSchema>;

export default function ContactPageForm() {
  const { contactPageContent, updateContactPageContent } = useAppContext();
  const { toast } = useToast();

  const form = useForm<ContactPageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      email: '',
      phone: '',
      whatsappNumber: '',
      mapUrl: '',
    },
  });

  useEffect(() => {
    if (contactPageContent) {
      form.reset(contactPageContent);
    }
  }, [contactPageContent, form]);

  const onSubmit = (data: ContactPageFormValues) => {
    updateContactPageContent(data);
    toast({
      title: 'Contact Page Updated!',
      description: 'The "Contact Us" page has been successfully saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Contact Us" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Description</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="e.g., We'd love to hear from you!" {...field} />
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
                <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
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
                <Input placeholder="e.g., support@shopswift.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., (123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., +11234567890" {...field} />
              </FormControl>
               <FormDescription>
                Include the country code. This number will be used for the "Send on WhatsApp" button.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="mapUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Maps Embed URL</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Paste the embed URL from Google Maps here" {...field} />
              </FormControl>
               <FormDescription>
                Go to Google Maps, find your location, click "Share", then "Embed a map", and copy the src="..." URL.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
