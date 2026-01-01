import { Link, usePage } from "@inertiajs/react";
import { useCartContext } from "./context/prodcontext";

const Cart = ({ products }) => {
    const { clearTheCart } = useCartContext();
    const { auth } = usePage().props;

    const getImageSrc = (product) => {
        // logged in → image stored in localStorage
        if (auth?.user) {
            return `/storage/${product.product.image}`;
        }
        return `/storage/${product.image}`

        // guest → backend storage
    };

    return (
        <div
            id="cart"
            className=" top-4 w-[260px] bg-white border rounded-xl shadow-xl z-[1000]
                       animate-fade-in"
        >
            <div className="max-h-[260px] overflow-y-auto p-3 space-y-3">
                {products.length === 0 && (
                    <p className="text-center text-gray-400 text-sm">
                        Cart is empty
                    </p>
                )}

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-lg
                                   hover:bg-gray-100 transition cursor-pointer"
                    >
                        <img
                            src={getImageSrc(product)}
                            alt="Product"
                            className="w-[55px] h-[55px] rounded-md object-cover border"
                        />

                        <div className="flex flex-col text-sm">
                            <span className="font-semibold text-gray-700">
                                Rs {product.price}
                            </span>
                            <span className="text-green-500 font-medium">
                                Qty: {product.quantity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 p-3 border-t">
                <Link
                    href={route("CartPage")}
                    className="flex-1 text-center py-2 rounded-lg border
                               hover:bg-gray-100 transition font-medium"
                >
                    View Cart
                </Link>

                <button
                    onClick={clearTheCart}
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white
                               hover:bg-red-400 active:scale-95 transition font-medium"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Cart;
