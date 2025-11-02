import { Head, Link, usePage } from "@inertiajs/react";
import { type SharedData } from '@/types';
import { useState } from "react";
import Navbar from "@/components/frontend/navbar";
import CategoryProductCard from "@/components/frontend/categoryprodcard";
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category_id: string;
    description: string;
}
interface Category {
  id: number;
  name: string;
  image: string;
}
interface Props{
    products:Product,
    categories:Category,
    category:Category,
}
const CategoryPage: React.FC<Props> = ({ products, categories,category }) => {
    const { auth, id } = usePage<SharedData & { id: string }>().props;
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(900.00);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };
    const filteredProducts = products.filter((product:Product) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category_id);
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });
    return (
        <>

            <Head title="Products">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="w-full p-6 text-[#1b1b18] lg:justify-center lg:p-8 ">
                <header className="mb-6 w-full text-sm">
                    <nav className="">
                            <Navbar />
                    </nav>
                </header>

                <div className=" w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="flex flex-col md:flex-row min-h-screen">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 bg-gray-100 p-6 border-b md:border-r border-gray-300">
                            <h2 className="text-xl font-semibold mb-4">Filters</h2>

                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Categories</h3>
                                {categories.map((category) => (
                                    <label key={category.id} className="block mb-2 text-sm">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedCategories.includes((category.id))}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                        {category.name}
                                    </label>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h3 className="font-medium mb-2">
                                    Max Price: <span className="font-bold">${maxPrice}</span>
                                </h3>
                                <input
                                    type="range"
                                    min={0}
                                    max={900}
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full"
                                />
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <main className="flex-1 p-6">
                            <h2 className="text-2xl font-bold mb-6">{category.name}/Products</h2>

                            {filteredProducts.length === 0 ? (
                                <p className="text-gray-500">No products match the selected filters.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <Link href={`/products/${product.id}`}>
                                        <CategoryProductCard prod={product} key={product.id} 
                                        category={category}/>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    )
}
export default CategoryPage;