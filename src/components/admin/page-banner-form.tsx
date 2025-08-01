
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

const pageBannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Image URL is required'),
  imageHint: z.string().min(1, 'Image hint is required'),
});

const formSchema = z.object({
  shop: pageBannerSchema,
});

type PageBannerFormValues = z.infer<typeof formSchema>;

export default function PageBannerForm() {
  const { pageBannerSettings, updatePageBannerSettings } = useAppContext();
  const { toast } = useToast();

  const form = useForm<PageBannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shop: undefined,
    },
  });

  useEffect(() => {
    if (pageBannerSettings) {
      form.reset(pageBannerSettings);
    }
  }, [pageBannerSettings, form]);

  const onSubmit = (data: PageBannerFormValues) => {
    updatePageBannerSettings(data);
    toast({
      title: 'Page Banners Updated!',
      description: 'The page banner settings have been successfully saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Shop Page Banner</h3>
          <div className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name="shop.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Shop" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shop.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Explore our collection..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shop.imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/1600x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shop.imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., shopping retail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
