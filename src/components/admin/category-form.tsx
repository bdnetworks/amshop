
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
import { Trash2 } from 'lucide-react';
import { iconList } from '../lucide-icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Category name is required'),
  icon: z.string().min(1, 'Icon is required'),
});

const formSchema = z.object({
  categories: z.array(categorySchema),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export default function CategoryForm() {
  const { categories, updateCategories } = useAppContext();
  const { toast } = useToast();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'categories',
  });

  useEffect(() => {
    if (categories) {
      form.reset({ categories });
    }
  }, [categories, form]);

  const onSubmit = (data: CategoryFormValues) => {
    updateCategories(data.categories);
    toast({
      title: 'Categories Updated!',
      description: 'The category list has been successfully saved.',
    });
  };

  const addCategory = () => {
    append({
        id: new Date().getTime().toString(),
        name: 'New Category',
        icon: 'Package',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <FormField
                  control={form.control}
                  name={`categories.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Clothes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`categories.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {iconList.map(iconName => (
                            <SelectItem key={iconName} value={iconName}>
                              {iconName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <Button type="button" variant="outline" onClick={addCategory}>
            Add New Category
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
