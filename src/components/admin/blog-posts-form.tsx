
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
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
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
      excerpt: '',
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
        excerpt: '',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: '',
      });
    }
  }, [editingPost, form]);

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
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="A short summary of the post..." {...field} />
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
