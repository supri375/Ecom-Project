export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Leather Jacket',
    price: 120,
    image: '/leather.jpg',
    category: 'men',
    rating: 5,
    description: 'A rugged leather jacket built for timeless style and all-weather toughness.'
  },
  {
    id: 2,
    name: 'Denim Jeans',
    price: 80,
    image: '/jeans.jpg',
    category: 'men',
    rating: 4,
    description: 'Classic-fit denim jeans crafted for comfort, flexibility, and a modern cut.'
  },
  {
    id: 3,
    name: 'Sneakers',
    price: 95,
    image: '/sneakers.jpg',
    category: 'men',
    rating: 4,
    description: 'Street-ready sneakers designed for all-day movement and maximum breathability.'
  },
  {
    id: 4,
    name: 'Sun Hat',
    price: 40,
    image: '/sunhat.jpg',
    category: 'men',
    rating: 3,
    description: 'Lightweight woven sun hat for cool coverage on sunny strolls and beach trips.'
  },
  {
    id: 5,
    name: 'Tshirt',
    price: 70,
    image: '/shirt.jpg',
    category: 'men',
    rating: 3,
    description: 'Soft cotton crew-neck tee for everyday wear and casual confidence.'
  },
  {
    id: 6,
    name: 'Leather Jacket',
    price: 120,
    image: '/leatherw.jpg',
    category: 'women',
    rating: 5,
    description: 'Fierce and fabulous women’s leather jacket with a slim flattering silhouette.'
  },
  {
    id: 7,
    name: 'Denim Jeans',
    price: 80,
    image: '/jeansw.jpg',
    category: 'women',
    rating: 4,
    description: 'High-rise denim jeans that hug your curves and elevate any outfit.'
  },
  {
    id: 8,
    name: 'Sneakers',
    price: 95,
    image: '/sneakersw.jpg',
    category: 'women',
    rating: 4,
    description: 'Sporty sneakers for the woman on the move—sleek, supportive, and stylish.'
  },
  {
    id: 9,
    name: 'Sun Hat',
    price: 30,
    image: '/sunhatw.jpg',
    category: 'women',
    rating: 3,
    description: 'Chic woven sun hat with a wide brim for elegant shade on sunny days.'
  },
  {
    id: 10,
    name: 'Tshirt',
    price: 50,
    image: '/shirtw.jpg',
    category: 'women',
    rating: 5,
    description: 'Premium cotton tee with a soft feel, flattering cut, and effortless style.'
  },
  {
    id: 11,
    name: 'Bag',
    price: 60,
    image: '/bag.jpg',
    category: 'accessories',
    rating: 5,
    description: 'Durable fashion-forward handbag with room for essentials and flair to spare.'
  },
  {
    id: 12,
    name: 'Watch',
    price: 500,
    image: '/watch.jpg',
    category: 'accessories',
    rating: 4,
    description: 'Luxury timepiece with sleek design and precision movement to elevate your look.'
  },
  {
    id: 13,
    name: 'Glasses',
    price: 100,
    image: '/glasses.png',
    category: 'accessories',
    rating: 3,
    description: 'Bold and functional eyewear to boost clarity and style in equal measure.'
  },
  {
    id: 14,
    name: 'Necklace',
    price: 50,
    image: '/necklace.jpg',
    category: 'accessories',
    rating: 4,
    description: 'Delicate gold necklace with an understated charm for timeless elegance.'
  },
  {
    id: 15,
    name: 'Socks',
    price: 20,
    image: '/socks.jpg',
    category: 'accessories',
    rating: 3,
    description: 'Comfort-knit cotton socks with breathable texture and minimalistic appeal.'
  },
  {
    id: 16,
    name: 'Lipstick',
    price: 30,
    image: '/lipstick.jpg',
    category: 'accessories',
    rating: 3,
    description: 'Bold matte lipstick in radiant red—smooth, long-lasting color for confident wear.'
  },
];
