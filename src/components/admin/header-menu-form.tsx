
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
import { Plus, Trash2 } from 'lucide-react';

const menuItemSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'Link URL is required'),
});

const formSchema = z.object({
  links: z.array(menuItemSchema),
});

type HeaderMenuFormValues = z.infer<typeof formSchema>;

export default function HeaderMenuForm() {
  const { headerMenu, updateHeaderMenu } = useAppContext();
  const { toast } = useToast();

  const form = useForm<HeaderMenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  useEffect(() => {
    if (headerMenu) {
      form.reset(headerMenu);
    }
  }, [headerMenu, form]);

  const onSubmit = (data: HeaderMenuFormValues) => {
    updateHeaderMenu(data);
    toast({
      title: 'Header Menu Updated!',
      description: 'The header navigation links have been successfully saved.',
    });
  };

  const addLink = () => {
    append({
        id: new Date().getTime().toString(),
        label: 'New Link',
        href: '#',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2 p-4 border rounded-lg">
                <div className="grid grid-cols-2 gap-4 flex-1">
                    <FormField
                    control={form.control}
                    name={`links.${index}.label`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Home" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name={`links.${index}.href`}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Link URL</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., / or /about" {...field} />
                        </FormControl>
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
          <Button type="button" variant="outline" onClick={addLink}>
            <Plus className="mr-2"/>
            Add New Link
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Menu'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
