
'use client';

import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';

const bannerSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  originalPrice: z.coerce.number().positive('Original price must be a positive number'),
  image: z.string().url('Must be a valid image URL'),
  imageHint: z.string().min(1, 'Image hint is required'),
  href: z.string().min(1, 'Link is required (e.g., /shop)'),
});

const formSchema = z.object({
  banners: z.array(bannerSchema).length(2, 'There must be exactly two banners.'),
});

type BannerFormValues = z.infer<typeof formSchema>;

export default function SideBannerForm() {
  const { sideBanners, updateSideBanner } = useAppContext();
  const { toast } = useToast();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banners: [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'banners',
  });

  useEffect(() => {
    if (sideBanners && sideBanners.length > 0) {
      form.reset({ banners: sideBanners });
    }
  }, [sideBanners, form]);

  const onSubmit = (data: BannerFormValues) => {
    data.banners.forEach((bannerData, index) => {
        const bannerWithId = {
            ...sideBanners[index],
            ...bannerData
        };
        updateSideBanner(bannerWithId);
    });
    toast({
      title: 'Banners Updated!',
      description: 'The side banners have been successfully updated.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
            <div key={field.id}>
                <h3 className="font-semibold text-lg mb-4">Banner {index + 1}</h3>
                 <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name={`banners.${index}.title`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., iPhone 14 Pro Max" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name={`banners.${index}.price`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Discounted Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 999" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name={`banners.${index}.originalPrice`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Original Price</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 1200" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <FormField
                    control={form.control}
                    name={`banners.${index}.image`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com/image.png" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name={`banners.${index}.imageHint`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image AI Hint</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., purple iphone" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name={`banners.${index}.href`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                            <Input placeholder="/shop" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 {index < fields.length - 1 && <Separator className="my-6" />}
            </div>
        ))}
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
