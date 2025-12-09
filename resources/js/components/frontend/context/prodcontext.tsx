import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { CartContextType, CartItem, Product } from "../data/cartdataTypes";
import { router } from "@inertiajs/react";
const cartContext = createContext<CartContextType | undefined>(undefined);
export const ProdProvider = ({ children }: { children: ReactNode }) => {
    const [carts, setCarts] = useState<CartItem[]>([]);
    const [totalItem, setTotalItem] = useState(0);
    const addToCart = (item: Product, quantity: number = 1) => {
        
        router.post("/addToCart", item, {
                onSuccess: () => {
                    console.log("Item Added To Cart");
                }
            });
        setCarts(prevCart => {
            const existProduct = prevCart.find((product) => product.id === item.id);
            let updatedCart;
            if (existProduct) {
                updatedCart = prevCart.map(p =>
                    item.id === p.id
                        ? { ...p, quantity: p.quantity + quantity }
                        : p
                );
            } else {
                updatedCart = [...prevCart, { ...item, quantity }];
            }            
            return updatedCart;
        });
    };

    useEffect(() => {
        const storedCart = localStorage.getItem("carts");
        if (storedCart) {
            setCarts(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("carts", JSON.stringify(carts));
    }, [carts]);

    const removeFromCart = (id: string) => {
        setCarts(prev => prev.filter(product => product.id !== id));
    };

    const clearTheCart = () => {
        setCarts([]);
    }
    return (
        <cartContext.Provider value={{ carts, addToCart, removeFromCart, clearTheCart, totalItem }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a ProdProvider");
    }
    return context;
}
