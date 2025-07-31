export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
