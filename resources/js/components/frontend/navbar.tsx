import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import Cart from "./cart";
import { useCartContext } from "./context/prodcontext";
import { usePage } from "@inertiajs/react";


const Navbar = () => {
    const { cartCount, auth } = usePage().props;
    const [cartC, setCartC] = useState(null);

    useEffect(
        () => {
            if (auth.user) {
                setCartC(cartCount);
            }
        },
        [auth]
    )
    const [showCart, setShowCart] = useState(false);
    const PopupCart = () => {
        if (showCart) {
            setShowCart(false)
        }
        else {
            setShowCart(true);
        }
    }
    const { carts } = useCartContext();
    return (
        <div className="relative w-full p-4 mt-0 flex h-[60px] items-center border justify-between gap-4">
            <div className="flex p-4  text-2xl ml-4 font-bold italic  text-shadow-lg text-red-500"> <GiClothes />
                FashionStore</div>
            <div className="hidden ml-[20px] md:flex items-center border rounded-lg overflow-hidden">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4  py-2 "
                />
            </div>
            <div className="mr-0 flex items-center">
                <Link
                    href={route('home')}
                    className="inline-block ml-[20px]  px-4 py-2 text-sm font-medium text-white bg-red-400 hover:border hover:border-[#19140035] rounded transition "
                >
                    Home
                </Link>
                <Link
                    href={route('products')}
                    className="inline-block ml-[20px] px-4 py-2 text-sm font-medium text-white bg-red-400 hover:border hover:border-[#19140035] rounded transition "
                >
                    Products
                </Link>
                <div className="inline-block ml-[20px] align-middle">
                    <button
                        onClick={PopupCart}
                        className="relative flex items-center justify-center px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-400 hover:border hover:border-[#19140035] rounded transition"
                    >
                        <AiOutlineShoppingCart size={20} className="align-middle" />
                        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center">
                            {cartC?.length > 0 ? cartC.length : 0}
                        </span>
                    </button>

                    {showCart && (
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg z-50">
                            <Cart products={auth.user ? cartC : carts} />
                        </div>
                    )}

                </div>
                {
                    auth.user ? (
                        <Link
                            href={`user/profile/${auth.user.id}`}
                            className="inline-block items-center justify-center ml-[20px] rounded-full shadow-md transition duration-200 ease-in-out"
                        >
                            <img
                                src={auth.user.image ? `/storage/${auth.user.image}` : "https://via.placeholder.com/40"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border border-gray-200 object-cover hover:scale-105 transition-transform duration-200"
                            />
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="inline-block ml-[20px] px-4 py-2 text-sm font-medium 
        text-white bg-red-400 hover:bg-red-500 
        rounded-md shadow-sm transition duration-200 ease-in-out"
                        >
                            Log in
                        </Link>
                    )
                }

                {/* <Link
                    href={route('register')}
                    className="inline-block m-[20px] px-4 py-2 text-sm font-medium text-white bg-red-400 hover:border hover:border-[#19140035] rounded transition"
                >
                    Register
                </Link> */}
            </div>
        </div>
    )
}
export default Navbar;