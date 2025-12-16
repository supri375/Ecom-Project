import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

// interface Order {
//   username: string;
//   phone: string;
//   address: string;
//   email: string;
//   postalCode: string;
//   paymentMethod: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   code: string;
//   size: string;
//   color: string;
//   price: number;
//   quantity: number;
//   total: number;
// }

// interface Props {
//   order: Order;
//   orderProduct: Product[];
// }

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

const ViewOrder = ({ order, orderProducts }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs} >
      <Head title="OrderDetails" />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Details Grid */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p className="font-medium">Username:</p>
              <p>{order.name}</p>

              <p className="font-medium">Phone:</p>
              <p>{order.contact}</p>

              <p className="font-medium">Address:</p>
              <p>{order.address}</p>

              <p className="font-medium">Email:</p>
              <p>{order.email}</p>

              <p className="font-medium">Postal Code:</p>
              <p>{order.postal_code}</p>

              <p className="font-medium">Payment Method:</p>
              <p>{order.payment_method}</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <div className="  flex items-center p-2 mb-4">
              <h2 className="text-xl font-semibold ">Ordered Products</h2>
              <span className="px-4 ml-2 py-2">
                Order Status :
              </span>
              <span className=" text-green-400 font-bold ">
                {order.order_status}
              </span>
            </div>
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Code</th>
                  <th className="px-4 py-2 border">Size</th>
                  <th className="px-4 py-2 border">Color</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{product.product_name}</td>
                    <td className="px-4 py-2 border">{product.product_code}</td>
                    <td className="px-4 py-2 border">{product.product_size}</td>
                    <td className="px-4 py-2 border">{product.product_color}</td>
                    <td className="px-4 py-2 border">${product.product_price}</td>
                    <td className="px-4 py-2 border">{product.product_quantity}</td>
                    <td className="px-4 py-2 border">${product.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex  p-4 shadow-lg border mt-4 w-2xl">
          <span className="px-4 py-2 ">
            Status Of Order
          </span>
          <select
            name="Order Status"
            // value={formData.paymentMethod}
            // onChange={handleChange}
            className="w-md border  text-green-400 font-bold p-2 mb-4 rounded hover:bg-gray-300 hover:text-green-500"
          >
            <option value="new" className="hover:text-green-500  hover:bg-gray-400">new</option>
            <option value="onTheWay" className="hover:text-green-500 hover:bg-gray-400">on the way</option>
            <option value="delivered" className="hover:text-green-500 hover:bg-gray-400">Delivered</option>
          </select>
        </div>
      </div>
    </AppLayout>
  );
};

export default ViewOrder;
