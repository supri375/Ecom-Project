import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head,Link, router } from "@inertiajs/react";

interface Product {
    id:number;
    name:string;   
    image:string;
    category:string;
    rating:number;
    price:string;
    description:string;
    isDiscount:number;
    isFeatured:number;
    isPopular:number;
}

interface Props {
  products :Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];



const ListProduct = ({ products }:Props) => {
      const handleDelete=(id)=>{
            router.get(route('products.delete',id));
        }
    const truncate = (text, maxLength) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="auto-rows-min gap-4">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Products</h2>
                             <Link href="/admin/products/create" className="bg-green-600 text-white  px-4 py-2 rounded hover:bg-green-500 cursor-pointer active:scale-95 dark:bg-green-400">
                                + New Product
                            </Link >
                        </div>

                        <table className="w-full table-auto border-collapse shadow-md">
                            <thead className="bg-gray-100 dark:bg-gray-900">
                                <tr>
                                    <th className="text-left dark:text-white px-4 py-2 border">#</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Image</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Name</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">category</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">price</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">rating</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">description</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Discounted</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Featured</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Popular</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-950">
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border">{product.name}</td>
                                        <td className="px-4 py-2 border">{product.category.name}</td>
                                        <td className="px-4 py-2 border">{product.price}</td>
                                        <td className="px-4 py-2 border">{product.rating}</td>
                                        <td title={product.description} className="px-4 py-2 border">{truncate(product.description,25)}</td>
                                        <td className="px-4 py-2 border">{product.isDiscount === 1 ? 'Yes' : 'No'}</td>
                                        <td className="px-4 py-2 border">{product.isFeatured  === 1 ? 'Yes' : 'No'}</td>
                                        <td className="px-4 py-2 border">{product.isPopular  === 1 ? 'Yes' : 'No'}</td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex gap-2">
                                                <Link
                                                   href={`/admin/products/${product.id}/edit`}
                                                    className="bg-yellow-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-yellow-400"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={()=>handleDelete(product.id)}   
                                                    className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </AppLayout>
    )
}
export default ListProduct;