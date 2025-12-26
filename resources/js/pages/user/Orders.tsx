import { Link, router } from "@inertiajs/react";
import React from "react";
import UserDashboard from "./DashBoard";

const UserOrders = ({ orders, user }) => {

  const handleCancel = (orderId, status) => {
    // if (status !== "new" || "processing") return;

    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    router.post(`/user/order/${orderId}/cancel`, {}, {
      preserveScroll: true,
    });
  };


  return (
    <UserDashboard user={user} orders={orders}>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{order.id}</td>

                <td className="px-4 py-2 border">
                  {order.name}
                </td>

                <td className="px-4 py-2 border">
                  {order.contact}
                </td>

                <td className="px-4 py-2 border">
                  <div>{order.payment_method}</div>
                  <span
                    className={`text-sm font-semibold ${order.payment_status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    {order.payment_status}
                  </span>
                </td>

                <td className="px-4 py-2 border">
                  ${order.grandtotal}
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

                <td className="px-4 py-2 border flex gap-2 justify-center">
                  <Link
                    href={`/user/orders/${order.id}/view`}
                    className="px-3 py-1 rounded bg-yellow-500 text-white text-sm"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleCancel(order.id, order.order_status)}
                    disabled={
                      order.order_status === "processing" ||
                      order.order_status === "On The Way" ||
                      order.order_status === "delivered"
                    }
                    className={`px-3 py-1 rounded text-sm font-medium ${order.order_status === "new"
                        ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
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
    </UserDashboard>
  );
};

export default UserOrders;
