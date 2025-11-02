export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category:string; //1-5
}

export const CartData: Product[] = [
  { id: 1, name: 'Leather Jacket', price: 120, image: './img/leather.jpg', category:'men',     rating: 5 },
];