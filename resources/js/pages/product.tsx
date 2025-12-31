import { Head } from "@inertiajs/react";
import Layout from "@/components/frontend/Layout";
import Reviews from "@/components/frontend/Reviews";
import HomeCard from "@/components/frontend/HomeCard";
import { useCartContext } from "@/components/frontend/context/prodcontext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Product = ({ product, products }) => {
    const { addToCart } = useCartContext();

    if (!product) {
        return (
            <div className="text-center mt-24 text-gray-500">
                Product not found
            </div>
        );
    }

    const relatedItems = products.filter(
        (p) => p.category_id === product.category_id && p.id !== product.id
    );

    return (
        <>
            <Head title={product.name} />

            <Layout>
                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* MAIN SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* IMAGE */}
                        <div className="bg-gray-50 rounded-xl p-6 group">
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="w-full h-[420px] object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* INFO */}
                        <div className="space-y-6 sticky top-24 self-start">

                            <div>
                                <p className="text-sm uppercase tracking-wide text-gray-400">
                                    {product.category.name}
                                </p>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((i) =>
                                    i <= product.rating ? (
                                        <AiFillStar key={i} className="text-yellow-400" />
                                    ) : (
                                        <AiOutlineStar key={i} className="text-gray-300" />
                                    )
                                )}
                                <span className="text-sm text-gray-500">
                                    ({product.rating})
                                </span>
                            </div>

                            {/* Price */}
                            <p className="text-3xl font-semibold text-gray-900">
                                ${product.price}
                            </p>

                            {/* Size Selector */}
                            <div>
                                <p className="text-sm font-medium mb-2">Size</p>
                                <div className="flex gap-2">
                                    {["XS", "S", "M", "XL", "2XL"].map((size) => (
                                        <button
                                            key={size}
                                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:border-black transition"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <p className="text-sm font-medium mb-2">Quantity</p>
                                <div className="inline-flex items-center border rounded-lg overflow-hidden">
                                    <button className="px-3 py-2 hover:bg-gray-100">−</button>
                                    <input
                                        type="number"
                                        min={1}
                                        defaultValue={1}
                                        className="w-12 text-center outline-none"
                                    />
                                    <button className="px-3 py-2 hover:bg-gray-100">+</button>
                                </div>
                            </div>

                            {/* Stock */}
                            <p className="text-sm text-gray-500">
                                {product.stock > 0
                                    ? `${product.stock} items in stock`
                                    : "Out of stock"}
                            </p>

                            {/* ACTIONS */}
                            <div className="space-y-3">
                                {product.stock > 0 ? (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-3 bg-black cursor-pointer  text-white rounded-xl hover:bg-gray-900 transition"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl cursor-not-allowed"
                                    >
                                        Out of Stock
                                    </button>
                                )}

                                <button className="w-full py-3 border b cursor-pointer order-gray-300 rounded-xl hover:bg-gray-100 transition">
                                    Buy it now
                                </button>

                                <button className="w-full py-3 text-sm  cursor-pointer text-gray-500 hover:underline">
                                    Add to wishlist
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-xl font-semibold mb-4">
                            About this product
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* REVIEWS */}
                    <div className="mt-12">
                        <Reviews productId={product.id} reviewData={product.reviews} />
                    </div>

                    {/* RELATED */}
                    <div className="mt-16">
                        <h2 className="text-xl font-semibold mb-6">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedItems.map((item) => (
                                <HomeCard key={item.id} prod={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Product;
