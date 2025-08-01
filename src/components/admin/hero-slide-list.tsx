
'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/providers/app-provider';
import type { HeroSlide } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroSlideListProps {
  onEditSlide: (slide: HeroSlide) => void;
}

export default function HeroSlideList({ onEditSlide }: HeroSlideListProps) {
  const { heroSlides, deleteHeroSlide } = useAppContext();
  const { toast } = useToast();

  const handleDelete = (slideId: string, slideTitle: string) => {
    deleteHeroSlide(slideId);
    toast({
      title: 'Slide Deleted',
      description: `The slide "${slideTitle}" has been removed.`,
      variant: 'destructive'
    });
  };

  return (
    <div className="border rounded-lg">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Supertitle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {heroSlides.map((slide) => (
            <TableRow key={slide.id}>
                <TableCell>
                <div className="relative h-12 w-12 bg-muted rounded-md">
                    <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="50px"
                    className="rounded-md object-contain"
                    />
                </div>
                </TableCell>
                <TableCell className="font-medium">{slide.title}</TableCell>
                <TableCell>{slide.supertitle}</TableCell>
                <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEditSlide(slide)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the slide
                            "{slide.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(slide.id, slide.title)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
