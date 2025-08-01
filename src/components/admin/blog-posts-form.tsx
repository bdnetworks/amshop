
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
import type { BlogPost } from '@/lib/types';

const postSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Full content must be at least 50 characters'),
  imageUrl: z.string().url('A valid image URL is required'),
  imageHint: z.string().min(1, 'Image hint is required'),
});

type PostFormValues = z.infer<typeof postSchema>;

interface BlogPostsFormProps {
    editingPost: BlogPost | null;
    onFinishEditing: () => void;
}

export default function BlogPostsForm({ editingPost, onFinishEditing }: BlogPostsFormProps) {
  const { addBlogPost, updateBlogPost } = useAppContext();
  const { toast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: 'https://placehold.co/600x400.png',
      imageHint: '',
    },
  });

  useEffect(() => {
    if (editingPost) {
      form.reset(editingPost);
    } else {
      form.reset({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: '',
      });
    }
  }, [editingPost, form]);
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove special chars
      .trim()
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .slice(0, 50); // limit length
  };
  
  // Watch title field to auto-generate slug
  const titleValue = form.watch("title");
  useEffect(() => {
    if (titleValue && !form.getValues("slug")) { // Only if slug is empty
      const slug = generateSlug(titleValue);
      form.setValue("slug", slug);
    }
  }, [titleValue, form]);


  const onSubmit = (data: PostFormValues) => {
    if (editingPost) {
      updateBlogPost({ ...editingPost, ...data });
       toast({
        title: 'Post Updated!',
        description: `The blog post has been successfully updated.`,
      });
    } else {
        addBlogPost(data);
        toast({
        title: 'Post Added!',
        description: `The new blog post has been successfully added.`,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Future of E-commerce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., the-future-of-ecommerce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (Short Summary)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="A short summary of the post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="The full content of the blog post..." {...field} />
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
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
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
                <Input placeholder="e.g., person writing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
            {editingPost && (
                <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>
                    Cancel
                </Button>
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (editingPost ? 'Saving...' : 'Adding...') : (editingPost ? 'Save Changes' : 'Add Post')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
