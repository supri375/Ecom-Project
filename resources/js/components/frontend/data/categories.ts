export interface Category {
  id: number;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: 1, name: 'men',        image: './images/men.webp' },
  { id: 2, name: 'women',      image: './images/women.jpg' },
  { id: 3, name: 'accessories',image: './images/accessories.webp' },
];
