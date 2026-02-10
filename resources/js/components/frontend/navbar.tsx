import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import Cart from "./cart";
import { useCartContext } from "./context/prodcontext";

const Navbar = () => {
    const { cartCount, auth } = usePage().props;
    const { carts } = useCartContext();

    const [cartC, setCartC] = useState<any[]>([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        if (auth.user) {
            setCartC(cartCount || []);
        }
    }, [auth, cartCount]);

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-black/30">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href={route("home")}
                    className="flex items-center gap-2 text-xl font-bold tracking-tight text-black dark:text-white"
                >
                    <GiClothes className="text-2xl" />
                    <span>FashionStore</span>
                </Link>

                {/* Search */}
                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full px-4 py-2 text-sm rounded-lg 
                        bg-gray-100 dark:bg-gray-800 
                        text-black dark:text-white 
                        placeholder-gray-400 
                        focus:bg-white dark:focus:bg-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 
                        transition"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">

                    {/* Links */}
                    <Link
                        href={route("home")}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                    >
                        Home
                    </Link>

                    <Link
                        href={route("products")}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                    >
                        Products
                    </Link>

                    {/* Cart */}
                    <div className="relative">
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="relative p-2 rounded-full 
                            hover:bg-gray-100 dark:hover:bg-gray-800 
                            text-black dark:text-white 
                            transition"
                        >
                            <AiOutlineShoppingCart size={22} />

                            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[11px] 
                            bg-red-500 text-white rounded-full 
                            flex items-center justify-center">
                                {auth.user
                                    ? cartC?.length || 0
                                    : carts?.length || 0}
                            </span>
                        </button>

                        {showCart && (
                            <div className="absolute right-0 top-full mt-2 z-50">
                                <div className="dark:bg-gray-900 bg-white rounded-lg shadow-lg">
                                    <Cart products={auth.user ? cartC : carts} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User */}
                    {auth.user ? (
                        <Link
                            href={
                                auth.user.role === "admin"
                                    ? "/admin/dashboard"
                                    : `/user/profile/${auth.user.id}`
                            }
                            className="block"
                        >
                            <img
                                src={
                                    auth.user.image
                                        ? `/storage/${auth.user.image}`
                                        : "https://i.pinimg.com/736x/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg"
                                }
                                alt="Profile"
                                className="w-9 h-9 rounded-full object-cover 
                                ring-2 ring-transparent 
                                hover:ring-black/10 dark:hover:ring-white/20 
                                transition"
                            />
                        </Link>
                    ) : (
                        <Link
                            href={route("login")}
                            className="px-4 py-2 text-sm font-medium 
                            text-white bg-black dark:bg-white dark:text-black 
                            rounded-lg hover:bg-gray-900 dark:hover:bg-gray-200 
                            transition"
                        >
                            Log in
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
