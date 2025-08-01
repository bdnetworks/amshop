
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/providers/app-provider';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '../ui/separator';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '../ui/switch';

const categories = ['all', 'Clothes', 'Watches', 'Toys', 'Kitchen', 'Headsets', 'Gadgets', 'Gaming', 'Computer', 'Furniture', 'Baby'];

const sectionSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  limit: z.coerce.number().min(1, 'Limit must be at least 1').max(20, 'Limit cannot exceed 20'),
  enabled: z.boolean(),
});

const formSchema = z.object({
  sections: z.array(sectionSchema),
});

type HomepageSectionsFormValues = z.infer<typeof formSchema>;

export default function HomepageSectionsForm() {
  const { homepageSections, updateHomepageSections } = useAppContext();
  const { toast } = useToast();

  const form = useForm<HomepageSectionsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sections: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'sections',
  });

  useEffect(() => {
    if (homepageSections) {
      form.reset({ sections: homepageSections });
    }
  }, [homepageSections, form]);

  const onSubmit = (data: HomepageSectionsFormValues) => {
    updateHomepageSections(data.sections);
    toast({
      title: 'Homepage Updated!',
      description: 'The homepage sections have been successfully saved.',
    });
  };

  const addSection = () => {
    append({
        id: new Date().getTime().toString(),
        title: 'New Section',
        category: 'all',
        limit: 5,
        enabled: true,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
            {fields.map((field, index) => (
                <Card key={field.id} className="relative p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-4">
                             <FormField
                                control={form.control}
                                name={`sections.${index}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Section Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Best Sellers" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name={`sections.${index}.category`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(category => (
                                            <SelectItem key={category} value={category}>
                                                {category === 'all' ? 'All Categories' : category}
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
                            name={`sections.${index}.limit`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Product Limit</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 5" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`sections.${index}.enabled`}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Enabled</FormLabel>
                                    <div className="flex items-center space-x-2 pt-2">
                                         <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <span className="text-sm text-muted-foreground">
                                            {field.value ? 'Visible' : 'Hidden'}
                                        </span>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="flex items-end">
                             <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
        
        <div className="flex justify-between items-center mt-6">
            <Button type="button" variant="outline" onClick={addSection}>
                Add New Section
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
