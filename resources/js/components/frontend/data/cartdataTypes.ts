export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
}
export interface CartItem extends Product {
    quantity: number;
}

export interface CartContextType {
    carts: CartItem[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: string) => void;
    clearTheCart:()=>void;
    totalItem:number;
};