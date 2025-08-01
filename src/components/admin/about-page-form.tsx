
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
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('A valid image URL is required'),
  imageHint: z.string().min(1, 'Image hint is required'),
});

type AboutPageFormValues = z.infer<typeof formSchema>;

export default function AboutPageForm() {
  const { aboutPageContent, updateAboutPageContent } = useAppContext();
  const { toast } = useToast();

  const form = useForm<AboutPageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  useEffect(() => {
    if (aboutPageContent) {
      form.reset(aboutPageContent);
    }
  }, [aboutPageContent, form]);

  const onSubmit = (data: AboutPageFormValues) => {
    updateAboutPageContent(data);
    toast({
      title: 'About Page Updated!',
      description: 'The "About Us" page has been successfully saved.',
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
                <Input placeholder="e.g., About Our Company" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="Tell your company's story..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/1200x600.png" {...field} />
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
                <Input placeholder="e.g., team working" {...field} />
              </FormControl>
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
