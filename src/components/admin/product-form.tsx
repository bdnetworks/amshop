
'use client';

import { useState, useEffect } from 'react';
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Trash2 } from 'lucide-react';
import { enhanceDescriptionAction } from '@/app/actions';
import type { Product } from '@/lib/types';

const categories = ['Clothes', 'Watches', 'Toys', 'Kitchen', 'Headsets', 'Gadgets', 'Gaming', 'Computer', 'Furniture', 'Baby'];

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  images: z.array(z.object({ url: z.string().url('Please enter a valid URL.') })).min(1, 'At least one image is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    editingProduct: Product | null;
    onFinishEditing: () => void;
}

export default function ProductForm({ editingProduct, onFinishEditing }: ProductFormProps) {
  const { addProduct, updateProduct } = useAppContext();
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      images: [{ url: 'https://placehold.co/600x400.png' }],
      description: '',
      category: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        ...editingProduct,
        images: editingProduct.images.map(img => ({ url: img })),
      });
    } else {
      form.reset({
        name: '',
        price: 0,
        images: [{ url: 'https://placehold.co/600x400.png' }],
        description: '',
        category: '',
      });
    }
  }, [editingProduct, form]);

  const onSubmit = (data: ProductFormValues) => {
    const imagesArray = data.images.map(img => img.url);

    if (editingProduct) {
      const productData = {
          ...editingProduct,
          ...data,
          images: imagesArray,
      };
      updateProduct(productData);
       toast({
        title: 'Product Updated!',
        description: `${data.name} has been successfully updated.`,
      });
    } else {
      const productData = {
          ...data,
          images: imagesArray,
      };
        addProduct(productData);
        toast({
        title: 'Product Added!',
        description: `${data.name} has been successfully added to the store.`,
        });
    }
    form.reset();
    onFinishEditing();
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
  
  const handleCancelEdit = () => {
      form.reset();
      onFinishEditing();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="category"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {categories.map(category => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
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
        
        <div>
          <FormLabel>Image URLs</FormLabel>
          <FormDescription>The first URL will be the main thumbnail.</FormDescription>
          <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`images.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ url: '' })}
          >
            Add Image
          </Button>
        </div>

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
                    rows={4}
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
        <div className="flex gap-2">
            {editingProduct && (
                <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>
                    Cancel
                </Button>
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (editingProduct ? 'Saving...' : 'Adding...') : (editingProduct ? 'Save Changes' : 'Add Product')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
