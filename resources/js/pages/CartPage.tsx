import { ProdProvider, useCartContext } from "@/components/frontend/context/prodcontext";
import Navbar from "@/components/frontend/navbar";
import { SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import React from "react";
const CartPage: React.FC = () => {
  const { auth } = usePage<SharedData>().props;
  const { carts, removeFromCart, clearTheCart } = useCartContext();

  const isCartEmpty = carts.length === 0

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deleteFunction = (id: string) => {
    removeFromCart(id);
  }

  const clearCart = () => {
    clearTheCart();
  }


  return (
    <>
      <Head title="Cart">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="w-full p-6 text-[#1b1b18] lg:justify-center lg:p-8 ">
        <header className="mb-6 w-full text-sm">
          <nav className="">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Dashboard
              </Link>
            ) : (
              <Navbar />
            )}
          </nav>
        </header>
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">🛒 Your Shopping Cart</h2>
          <button onClick={clearCart} className=" w-[80px] h-[40px] rounded-lg ml-6 border bg-red-500 text-white cursor-pointer hover:bg-red-400 active:bg-red-300 active:scale-105">Clear Cart</button>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Product Name</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {isCartEmpty ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No item added to cart
                    </td>
                  </tr>
                ) : (
                  carts.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border">{item.name}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={`storage/${item.image}`}
                          alt={item.name}
                          className="w-20 mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 border">${item.price}</td>
                      <td className="px-4 py-2 border">{item.quantity}</td>
                      <td className="px-4 py-2 border">
                        ${item.price * item.quantity}
                        <button onClick={() => deleteFunction(item.id)} className=" w-[80px] h-[40px] rounded-lg ml-6 border bg-red-500 text-white cursor-pointer hover:bg-red-400 active:bg-red-300 active:scale-105">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr className="font-bold bg-gray-100">
                  <td colSpan={4} className="px-4  py-2 border text-right">
                    Total
                  </td>
                  <td className="px-4 py-2 border text-center">${totalPrice}</td>
                </tr>
              </tfoot>
            </table>
            <Link href={route('order')}
              className='w-[120px] absolute right-0 rounded-lg font-bold bg-green-500 text-white text-center text-shadow-lg hover:scale-103 active:text-gray-700 hover:bg-green-400 active:scale-105  cursor-pointer' >
              Order
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default CartPage;