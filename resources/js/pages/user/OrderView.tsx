import React from "react";
import { Link } from "@inertiajs/react";
import UserDashboard from "./DashBoard";

const OrderView = ({ orderProducts, orderId,  user }) => {
    return (
        <UserDashboard  user={user}>
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">

                <h2 className="text-2xl font-semibold mb-6">
                    Products in Order #{orderId}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orderProducts.length > 0 ? (
                        orderProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                            >
                                {/* Product Image */}
                                <div className="h-48 bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={`/storage/${product.product.image}`}
                                        alt={product.product_name}
                                        className="h-full object-contain"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {product.product_name}
                                    </h3>

                                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                                        <p>
                                            Price:{" "}
                                            <span className="font-medium">
                                                ${product.product_price}
                                            </span>
                                        </p>
                                        <p>
                                            Quantity:{" "}
                                            <span className="font-medium">
                                                {product.product_quantity}
                                            </span>
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            Subtotal: $
                                            {product.product_price * product.product_quantity}
                                        </p>
                                    </div>

                                    {/* View Product Button */}
                                    <Link
                                        href={`/products/${product.product_id}`}
                                        className="inline-block w-full text-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No products found for this order.</p>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href={`/user/orders/${user.id}`}
                        className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ← Back to Orders
                    </Link>
                </div>
            </div>
        </UserDashboard>
    );
};

export default OrderView;
