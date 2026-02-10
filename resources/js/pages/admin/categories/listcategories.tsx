import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

interface Category {
    id:number;
    name:string;
    image:string;
    slug:string;
}

interface Props {
  categories :Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];



const ListCategory = ({ categories }:Props) => {
    const handleDelete=(id)=>{
        router.get(route('categories.delete',id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="auto-rows-min gap-4">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Categories</h2>
                            <Link href="/admin/categories/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 active:scale-95 dark:bg-blue-400  ">
                                + New Category
                            </Link >
                        </div>

                        <table className="w-full table-auto border-collapse shadow-md">
                            <thead className="bg-gray-100 dark:bg-gray-900">
                                <tr>
                                    <th className="text-left dark:text-white px-4 py-2 border">#</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Image</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Name</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Slug</th>
                                    <th className="text-left  dark:text-white px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                        <td className="px-4 py-2 border">{index + 1}</td>
                                        <td className="px-4 py-2 border">
                                            <img
                                                src={`/storage/${category.image}`}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border">{category.name}</td>
                                        <td className="px-4 py-2 border">{category.slug}</td>
                                        <td className="px-4 py-2 border">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}/edit`}
                                                    className="bg-yellow-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-yellow-400"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={()=>handleDelete(category.id)}   
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
export default ListCategory;