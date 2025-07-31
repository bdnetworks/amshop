import { Shirt, Watch, ToyBrick, Utensils, Headset, Smartphone } from 'lucide-react';

const categories = [
    { name: 'Clothes', icon: <Shirt className="h-10 w-10 text-primary" /> },
    { name: 'Watches', icon: <Watch className="h-10 w-10 text-primary" /> },
    { name: 'Toys', icon: <ToyBrick className="h-10 w-10 text-primary" /> },
    { name: 'Kitchen', icon: <Utensils className="h-10 w-10 text-primary" /> },
    { name: 'Headsets', icon: <Headset className="h-10 w-10 text-primary" /> },
    { name: 'Gadgets', icon: <Smartphone className="h-10 w-10 text-primary" /> },
];

export default function BrowseByCategory() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-title">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
                <div key={category.name} className="category-card cursor-pointer">
                    {category.icon}
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}
