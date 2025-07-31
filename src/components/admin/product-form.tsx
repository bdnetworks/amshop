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
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import { enhanceDescriptionAction } from '@/app/actions';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  image: z.string().url('Must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm() {
  const { addProduct } = useAppContext();
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      image: 'https://placehold.co/600x400.png',
      description: '',
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    addProduct(data);
    toast({
      title: 'Product Added!',
      description: `${data.name} has been successfully added to the store.`,
    });
    form.reset();
  };

  const handleEnhanceDescription = async () => {
    const basicDescription = form.getValues('description');
    if (!basicDescription || basicDescription.length < 10) {
      form.setError('description', {
        type: 'manual',
        message: 'Please enter a basic description of at least 10 characters first.',
      });
      return;
    }
    
    setIsEnhancing(true);
    form.clearErrors('description');
    
    const result = await enhanceDescriptionAction(basicDescription);
    
    if (result.success && result.enhancedDescription) {
      form.setValue('description', result.enhancedDescription, { shouldValidate: true });
      toast({
        title: 'Description Enhanced!',
        description: 'The AI has worked its magic.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Enhancement Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
    
    setIsEnhancing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Classic Leather Wallet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="e.g., 75.00" {...field} />
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder="Describe the product..."
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 text-primary"
                  onClick={handleEnhanceDescription}
                  disabled={isEnhancing}
                  aria-label="Enhance with AI"
                >
                  {isEnhancing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
