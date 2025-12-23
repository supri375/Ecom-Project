import React from "react";
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Layout } from "lucide-react";
import Navbar from "@/components/frontend/navbar";

const UserProfile = ({ user, orders }) => {


    const handleCancel = (orderId, status) => {
        if (status === "processing" || status === "On The Way" || status === "delivered") {
            alert("This order cannot be cancelled as it is past processing stage.");
            return;
        }
        else {
            router.post(`/order/${orderId}/cancel`, {}, {
                onSuccess: () => {
                    console.log("Deleted Successfully");
                }
            });
        }
    };



    return (
        <div>
            <Head title="User Profile" />
            <div className="min-h-screen bg-gray-100 p-8">
                <header className="mb-6 w-full text-sm">
                    <nav className="">
                        <Navbar />
                    </nav>
                </header>
                {/* Profile Header */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6">
                    <img
                        src={user.image || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* User Info */}
                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <p><span className="font-medium">Address:</span> {user.address}</p>
                        <p><span className="font-medium">City:</span> {user.city}</p>
                        <p><span className="font-medium">State:</span> {user.state}</p>
                        <p><span className="font-medium">Postal Code:</span> {user.postal_code}</p>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                    <table className="w-full table-auto border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Order ID</th>
                                <th className="px-4 py-2 border">Product</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{order.id}</td>
                                    <td className="px-4 py-2 border">
                                        {order.orderproducts && order.orderproducts.length > 0 ? (
                                            order.orderproducts.map((product) => (
                                                <div key={product.id}>
                                                    {product.product_name} ({product.product_quantity}) - ${product.product_price}
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-gray-400">No products</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${order.order_status === "new"
                                                ? "bg-green-100 text-green-600"
                                                : order.order_status === "processing"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => handleCancel(order.id, order.order_status)}
                                            disabled={
                                                order.order_status === "processing" ||
                                                order.order_status === "On The Way" ||
                                                order.order_status === "delivered"
                                            }
                                            className={`px-3 py-1 rounded text-sm font-medium transition ${order.order_status === "new"
                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
