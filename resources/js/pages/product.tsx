import Card from "@/components/frontend/card";
import { useCartContext } from "@/components/frontend/context/prodcontext";
import HomeCard from "@/components/frontend/HomeCard";
import Layout from "@/components/frontend/Layout";
import Reviews from "@/components/frontend/Reviews";
import { SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category_id: string;
    category: {
        name: string;
    }
    description: string;
}

interface Props {
    product: Product,
    products: Product[],
}




const Product: React.FC<Props> = ({ product, products }) => {
    const { auth, id } = usePage<SharedData & { id: string }>().props;
    if (!product) {
        return <div className="text-center mt-20 text-red-500">Product not found 🛠️</div>;
    }
    const { addToCart } = useCartContext();

    const handleAddProduct = (product) => {
        addToCart(product);
    }
    const relatedItems = products.filter(p => p.category_id === product.category_id && p.id != product.id)

    return (
        <div>

            <Head title="Products" >
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head >
            <Layout>
                <div className="max-w-4xl mx-auto p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <img src={`/storage/${product?.image}`} alt={product.name} className="w-full md:w-1/2 object-cover rounded-lg shadow-md" />
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                            <h2 className="text-3xl font-bold mb-4">{product.category.name}</h2>
                            <p className="text-xl  text-green-400 mb-4">${product.price}</p>
                            <div className="flex items-center mt-2">
                                {[1, 2, 3, 4, 5].map(i =>
                                    i <= product.rating ? (
                                        <AiFillStar key={i} className="text-yellow-500" />
                                    ) : (
                                        <AiOutlineStar key={i} className="text-gray-300" />
                                    )
                                )}
                            </div>
                            <label htmlFor="quantity" className="text-md p-4 font-medium text-gray-700">Quantity:</label>
                            <input
                                id="quantity"
                                type="number"
                                min={1}
                                className="w-16 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div>
                                <label htmlFor="size" className="text-xl mb-8 ">Sizes : </label>
                                <select
                                    id="size"
                                    name="size"
                                    className="mt-2 mb-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="xs" >Xs</option>
                                    <option value="s" >s</option>
                                    <option value="m" >M</option>
                                    <option value="xl" >XL</option>
                                    <option value="2xl" >2Xl</option>
                                </select>
                            </div>
                            <button onClick={() => handleAddProduct(product)} className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg cursor-pointer active:scale-105 active:bg-red-300 hover:scale-103  hover:bg-red-400">
                                Add to Cart
                            </button>
                            <button className="mt-4 w-full py-2 bg-gray-100 border border-red-500 text-red-500 rounded-lg cursor-pointer active:scale-105 active:bg-gray-300 hover:scale-103 hover:bg-gray-200">
                                Buy it Now
                            </button>
                            <button className="mt-4 w-full py-2  bg-gray-100 border border-red-500 text-red-500 rounded-lg cursor-pointer active:scale-105 active:bg-gray-300 hover:scale-103 hover:bg-gray-200">
                                Add to watchlist
                            </button>
                        </div>
                    </div>
                    <div className="p-2 mt-8 border">
                        <h1 className="text-xl font-bold">About This Item : </h1>
                        <p className="text-md font-bold p-4">Product Description</p>
                        <p className="text-md font-bold p-4">{product.description}</p>
                    </div>
                  <Reviews />
                    <div className="p-2 mt-8">
                        <h1 className="text-xl font-bold">Related Products</h1>
                        <div className="flex ">
                            {relatedItems.map((item) => (
                                <div key={item.id} className="flex-shrink-0">
                                    <HomeCard prod={item}></HomeCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>

    );
};

export default Product;
