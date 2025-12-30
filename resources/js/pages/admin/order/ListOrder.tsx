import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];



const ListOrder = ({ orders, orderProducts }) => {

    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="auto-rows-min gap-4">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Orders</h2>
                        </div>

                        <table className="w-full table-auto border-collapse shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-2 border">Order_id</th>
                                    <th className="text-left px-4 py-2 border">UserName</th>
                                    <th className="text-left px-4 py-2 border">Products</th>
                                    <th className="text-left px-4 py-2 border">OrderDate</th>
                                    <th className="text-left px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedOrders.map((order, index) => {


                                    const prodForOrder = orderProducts.filter(orderProduct => orderProduct.order_id == order.id);
                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            {/* <td className="px-4 py-2 border">{index + 1}</td> */}
                                            <td className="px-4 py-2 border">{order.id}</td>
                                            <td className="px-4 py-2 border">{order.name}</td>
                                            <td className="px-4 py-2 border">{prodForOrder.map((product,idx) => (
                                                <span key={idx} className="px-4 px-2 text-green-600 flex no-wrap">{product.product_name}({product.product_quantity})</span>
                                        ))
                                            }
                                            </td>
                                            <td className="px-4 py-2 border">{new Date(order.created_at).toISOString().split("T")[0]}</td>
                                            <td className="px-4 py-2 border">
                                                <div className="flex gap-2">
                                                    <Link
                                                   href={`/admin/order/${order.id}/view`}
                                                    className="bg-yellow-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-yellow-400"
                                                >
                                                    View
                                                </Link>
                                                    <button
                                                        className="bg-red-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </AppLayout>
    )
}
export default ListOrder;