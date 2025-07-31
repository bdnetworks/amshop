import ProductForm from '@/components/admin/product-form';
import SalesChart from '@/components/admin/sales-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Add New Product</CardTitle>
              <CardDescription>
                Fill out the form to add a new product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductForm />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}
