
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
import { Separator } from '../ui/separator';

const adBannerContentSchema = z.object({
  supertitle: z.string().optional(),
  title: z.string().min(3, 'Title is required'),
  subtitle: z.string().optional(),
  buttonText: z.string().min(1, 'Button text is required'),
  href: z.string().min(1, 'Link is required'),
  image: z.string().url('Image URL is required'),
  imageHint: z.string().min(1, 'Image hint is required'),
});

const formSchema = z.object({
  largeBanner: adBannerContentSchema,
  smallBanners: z.array(adBannerContentSchema).length(2, 'There must be two small banners'),
});

type AdBannerFormValues = z.infer<typeof formSchema>;

export default function AdBannerForm() {
  const { adBanners, updateAdBanners } = useAppContext();
  const { toast } = useToast();

  const form = useForm<AdBannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      largeBanner: undefined,
      smallBanners: [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "smallBanners",
  });

  useEffect(() => {
    if (adBanners) {
      form.reset(adBanners);
    }
  }, [adBanners, form]);

  const onSubmit = (data: AdBannerFormValues) => {
    updateAdBanners(data);
    toast({
      title: 'Ad Banners Updated!',
      description: 'The homepage ad banners have been successfully saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Large Banner</h3>
          <div className="space-y-4 p-4 border rounded-lg">
            <FormField
              control={form.control}
              name="largeBanner.supertitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supertitle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., UP TO 30% OFF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largeBanner.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Apple iPhone 14 Pro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largeBanner.subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Now available on monthly installments." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="largeBanner.buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Shop Now" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="largeBanner.href"
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
             <FormField
              control={form.control}
              name="largeBanner.image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/300x300.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="largeBanner.imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image AI Hint</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., iphone hand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
           <h3 className="font-semibold text-lg mb-4">Small Banners</h3>
           <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg">
                        <h4 className="font-medium text-md mb-2">Small Banner {index + 1}</h4>
                         <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name={`smallBanners.${index}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Workout At Home" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name={`smallBanners.${index}.subtitle`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Subtitle (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Flexible VSSL treadmil" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                             <FormField
                                control={form.control}
                                name={`smallBanners.${index}.buttonText`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Button Text</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Shop Now" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name={`smallBanners.${index}.href`}
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
                            <FormField
                                control={form.control}
                                name={`smallBanners.${index}.image`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://placehold.co/150x150.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name={`smallBanners.${index}.imageHint`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Image AI Hint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., treadmill" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                         </div>
                    </div>
                ))}
           </div>
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
