
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
import { Separator } from '../ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const menuItemSchema = z.object({
  id: z.string(),
  label: z.string().min(1, 'Label is required'),
  href: z.string().min(1, 'Link URL is required'),
});

const linkSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  links: z.array(menuItemSchema),
});

const socialLinkSchema = z.object({
  id: z.string(),
  name: z.enum(['Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Youtube']),
  href: z.string().url('Must be a valid URL'),
});

const formSchema = z.object({
  about: z.object({
    description: z.string().min(1, 'Description is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Must be a valid email'),
  }),
  companyLinks: linkSectionSchema,
  infoLinks: linkSectionSchema,
  socialLinks: z.array(socialLinkSchema),
  newsletter: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    placeholder: z.string().min(1, 'Placeholder is required'),
    buttonText: z.string().min(1, 'Button text is required'),
  }),
  copyright: z.string().min(1, 'Copyright text is required'),
  paymentImageUrl: z.string().url('Must be a valid URL'),
});

type FooterFormValues = z.infer<typeof formSchema>;

export default function FooterForm() {
  const { footerData, updateFooterData } = useAppContext();
  const { toast } = useToast();

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: footerData,
  });

  const { fields: companyLinkFields, append: appendCompanyLink, remove: removeCompanyLink } = useFieldArray({
    control: form.control,
    name: 'companyLinks.links'
  });
  const { fields: infoLinkFields, append: appendInfoLink, remove: removeInfoLink } = useFieldArray({
    control: form.control,
    name: 'infoLinks.links'
  });
  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({
    control: form.control,
    name: 'socialLinks'
  });

  useEffect(() => {
    if (footerData) {
      form.reset(footerData);
    }
  }, [footerData, form]);

  const onSubmit = (data: FooterFormValues) => {
    updateFooterData(data);
    toast({
      title: 'Footer Updated!',
      description: 'The footer content has been successfully saved.',
    });
  };
  
  const socialIcons: z.infer<typeof socialLinkSchema>['name'][] = ['Facebook', 'Twitter', 'Instagram', 'Linkedin', 'Youtube'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* About Section */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">About Section</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="about.description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="about.address" render={({ field }) => (
                <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="about.phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="about.email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
          </div>
        </div>

        {/* Company Links */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Company Links Column</h3>
           <FormField control={form.control} name="companyLinks.title" render={({ field }) => (
                <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <Separator className="my-4" />
          <div className="space-y-2">
            {companyLinkFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField control={form.control} name={`companyLinks.links.${index}.label`} render={({ field }) => (
                    <FormItem className="flex-1"><FormControl><Input placeholder="Label" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name={`companyLinks.links.${index}.href`} render={({ field }) => (
                    <FormItem className="flex-1"><FormControl><Input placeholder="URL" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeCompanyLink(index)}><Trash2/></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendCompanyLink({id: Date.now().toString(), label: '', href: ''})} className="mt-2"><Plus className="mr-2"/>Add Link</Button>
        </div>
        
        {/* Info Links */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Information Links Column</h3>
           <FormField control={form.control} name="infoLinks.title" render={({ field }) => (
                <FormItem><FormLabel>Section Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <Separator className="my-4" />
          <div className="space-y-2">
            {infoLinkFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField control={form.control} name={`infoLinks.links.${index}.label`} render={({ field }) => (
                    <FormItem className="flex-1"><FormControl><Input placeholder="Label" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name={`infoLinks.links.${index}.href`} render={({ field }) => (
                    <FormItem className="flex-1"><FormControl><Input placeholder="URL" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeInfoLink(index)}><Trash2/></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendInfoLink({id: Date.now().toString(), label: '', href: ''})} className="mt-2"><Plus className="mr-2"/>Add Link</Button>
        </div>

        {/* Social Links */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Social Media Links</h3>
          <div className="space-y-2">
            {socialLinkFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField control={form.control} name={`socialLinks.${index}.name`} render={({ field }) => (
                    <FormItem className="w-32"><Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                        <SelectContent>{socialIcons.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}</SelectContent>
                    </Select><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name={`socialLinks.${index}.href`} render={({ field }) => (
                    <FormItem className="flex-1"><FormControl><Input placeholder="Full URL" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeSocialLink(index)}><Trash2/></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendSocialLink({id: Date.now().toString(), name: 'Facebook', href: 'https://facebook.com'})} className="mt-2"><Plus className="mr-2"/>Add Social Link</Button>
        </div>

        {/* Newsletter Section */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Newsletter Section</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="newsletter.title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="newsletter.description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="newsletter.placeholder" render={({ field }) => (
                <FormItem><FormLabel>Input Placeholder</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
             <FormField control={form.control} name="newsletter.buttonText" render={({ field }) => (
                <FormItem><FormLabel>Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
          </div>
        </div>
        
        {/* Other settings */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Other Settings</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="copyright" render={({ field }) => (
                <FormItem><FormLabel>Copyright Text</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Use {`{new Date().getFullYear()}`} to automatically display the current year.</FormDescription><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="paymentImageUrl" render={({ field }) => (
                <FormItem><FormLabel>Payment Methods Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Footer Settings'}
        </Button>
      </form>
    </Form>
  );
}
