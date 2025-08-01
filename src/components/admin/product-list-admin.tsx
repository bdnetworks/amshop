
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
import type { Product } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductListAdminProps {
  onEditProduct: (product: Product) => void;
}

export default function ProductListAdmin({ onEditProduct }: ProductListAdminProps) {
  const { products, deleteProduct } = useAppContext();
  const { toast } = useToast();

  const handleDelete = (productId: string, productName: string) => {
    deleteProduct(productId);
    toast({
      title: 'Product Deleted',
      description: `${productName} has been removed from the store.`,
      variant: 'destructive'
    });
  };

  return (
    <div className="border rounded-lg">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product) => (
            <TableRow key={product.id}>
                <TableCell>
                <div className="relative h-12 w-12">
                    <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="50px"
                    className="rounded-md object-cover"
                    />
                </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEditProduct(product)}>
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
                            This action cannot be undone. This will permanently delete the product
                            "{product.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id, product.name)}
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
