
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
import type { HeroSlide } from '@/lib/types';

const slideSchema = z.object({
  supertitle: z.string().min(1, 'Supertitle is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  image: z.string().url('Must be a valid image URL'),
  imageHint: z.string().min(1, 'Image hint is required'),
  href: z.string().min(1, 'Link is required (e.g., /shop)'),
});

type SlideFormValues = z.infer<typeof slideSchema>;

interface HeroSlideFormProps {
    editingSlide: HeroSlide | null;
    onFinishEditing: () => void;
}

export default function HeroSlideForm({ editingSlide, onFinishEditing }: HeroSlideFormProps) {
  const { addHeroSlide, updateHeroSlide } = useAppContext();
  const { toast } = useToast();

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      supertitle: '',
      title: '',
      image: 'https://placehold.co/400x400.png',
      imageHint: '',
      href: '/shop',
    },
  });

  useEffect(() => {
    if (editingSlide) {
      form.reset(editingSlide);
    } else {
      form.reset({
        supertitle: '',
        title: '',
        image: 'https://placehold.co/400x400.png',
        imageHint: '',
        href: '/shop',
      });
    }
  }, [editingSlide, form]);

  const onSubmit = (data: SlideFormValues) => {
    if (editingSlide) {
      updateHeroSlide({ ...editingSlide, ...data });
       toast({
        title: 'Slide Updated!',
        description: `The slide has been successfully updated.`,
      });
    } else {
        addHeroSlide(data);
        toast({
        title: 'Slide Added!',
        description: `The new slide has been successfully added.`,
        });
    }
    form.reset();
    onFinishEditing();
  };
  
  const handleCancelEdit = () => {
      form.reset();
      onFinishEditing();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="supertitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supertitle</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 30% SALE OFF" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., True Wireless Headphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
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
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image AI Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g., blue headphones" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="href"
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
        <div className="flex gap-2">
            {editingSlide && (
                <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>
                    Cancel
                </Button>
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (editingSlide ? 'Saving...' : 'Adding...') : (editingSlide ? 'Save Changes' : 'Add Slide')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
