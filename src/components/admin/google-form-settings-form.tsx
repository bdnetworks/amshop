
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
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import type { GoogleFormSettings } from '@/lib/types';

const formSettingsSchema = z.object({
  formUrl: z.string().url('Must be a valid URL for the form response.'),
  entryName: z.string().min(1, 'Entry ID is required'),
  entryEmail: z.string().min(1, 'Entry ID is required'),
  entryMobile: z.string().min(1, 'Entry ID is required'),
  entryAddress: z.string().min(1, 'Entry ID is required'),
  entryDistrict: z.string().min(1, 'Entry ID is required'),
  entryTotal: z.string().min(1, 'Entry ID is required'),
  entryCart: z.string().min(1, 'Entry ID is required'),
});

type FormSettingsValues = z.infer<typeof formSettingsSchema>;

export default function GoogleFormSettingsForm() {
  const { googleFormSettings, updateGoogleFormSettings } = useAppContext();
  const { toast } = useToast();

  const form = useForm<FormSettingsValues>({
    resolver: zodResolver(formSettingsSchema),
    defaultValues: googleFormSettings,
  });

  useEffect(() => {
    form.reset(googleFormSettings);
  }, [googleFormSettings, form]);

  const onSubmit = (data: FormSettingsValues) => {
    updateGoogleFormSettings(data);
    toast({
      title: 'Settings Updated!',
      description: 'The Google Form settings have been successfully saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="formUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Form Action URL</FormLabel>
              <FormControl>
                <Input placeholder="https://docs.google.com/forms/d/e/.../formResponse" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL from your Google Form's "Get pre-filled link" action.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="entryName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryEmail"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryMobile"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mobile Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryAddress"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Address Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryDistrict"
            render={({ field }) => (
                <FormItem>
                <FormLabel>District Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryTotal"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Total Amount Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="entryCart"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Cart Items Entry ID</FormLabel>
                <FormControl>
                    <Input placeholder="entry.12345678" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Form>
  );
}
