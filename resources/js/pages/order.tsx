import { useCartContext } from "@/components/frontend/context/prodcontext";
import Navbar from "@/components/frontend/navbar";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { usePage } from '@inertiajs/react';

const Order = () => {
  const { carts } = useCartContext();

  const { auth, cartCount } = usePage().props;

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    name: "",
    paymentMethod:"cod",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/checkOut', formData, {
      onSuccess: () => {
        console.log("Order Successfully placed");
      }
    });
  };

  const totalPrice = cartCount?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div>
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
      </div>
      <div className="flex flex-col md:flex-row p-6 gap-8">
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 w-full bg-white shadow-md rounded p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Shipping Information
            <FaShippingFast />
          </h2>

          <label className="block mb-2">Your Full Name:</label>
          <input
            type="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <label className="block mb-2">Phone:</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <label className="block mb-2">Address:</label>
          <textarea
            name="address"
            required
            rows={4}
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />
          {/* <label className="block mb-2">City:</label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <label className="block mb-2">State:</label>
          <input
            type="text"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          />

          <label className="block mb-2">Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            required
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          /> */}

          <label className="block mb-2">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 mb-4 rounded"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:bg-blue-800"
          >
            Place Order
          </button>
        </form>
        <div className="md:w-1/2 w-full bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
          {carts.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
          ) : (
            <ul>
              {cartCount.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div>
                    <img
                      className="w-[50px] h-[50px]"
                      src={`storage/${item.product.image}`} />
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${item.price}</p>
                    <p className="text-sm font-semibold">
                      Subtotal: ${item.quantity * item.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <hr className="my-4" />
          <p className="text-lg font-semibold">Total: ${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
