import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Card from "@/components/frontend/card";
import Navbar from "@/components/frontend/navbar";

const Products: React.FC<Props> = ({ products, categories }) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(900);

    const handleCategoryChange = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(Number(product.category_id));

        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });

    return (
        <>
            <Head title="Products" />

            <Navbar />

            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">

                    {/* FILTERS */}
                    <aside className="w-72 shrink-0 sticky top-24 h-fit">
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                            <h2 className="text-lg font-semibold">Filters</h2>

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-3">
                                    Categories
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => {
                                        const active = selectedCategories.includes(category.id);

                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`
                        px-4 py-2 rounded-full text-sm font-medium transition
                        ${active
                                                        ? "bg-black text-white shadow"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }
                    `}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-4">
                                    Max Price
                                </h3>

                                {/* Price Display */}
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">$0</span>
                                    <span className="font-semibold text-gray-900">${maxPrice}</span>
                                    <span className="text-gray-500">$900</span>
                                </div>

                                {/* Custom Slider */}
                                <div className="relative">
                                    <div className="h-2 rounded-full bg-gray-200" />

                                    <div
                                        className="absolute top-0 h-2 rounded-full bg-black"
                                        style={{ width: `${(maxPrice / 900) * 100}%` }}
                                    />

                                    <input
                                        type="range"
                                        min={0}
                                        max={900}
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* PRODUCTS */}
                    <main className="flex-1">
                        <h1 className="text-2xl font-bold mb-6">
                            Products
                        </h1>

                        {filteredProducts.length === 0 ? (
                            <p className="text-gray-500">
                                No products match your filters.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                    >
                                        <Card prod={product} />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Products;
