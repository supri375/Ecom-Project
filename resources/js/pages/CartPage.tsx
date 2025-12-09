import { ProdProvider, useCartContext } from "@/components/frontend/context/prodcontext";
import Layout from "@/components/frontend/Layout";
import { SharedData } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
const CartPage: React.FC = () => {

  const { auth , cartCount } = usePage<SharedData>().props;
  const { carts, removeFromCart, clearTheCart } = useCartContext();

  // const {updateQty  , setUpdateQty} = useState(cartCount.quantity);

  const isCartEmpty = cartCount.length === 0

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

  // const addQuantity = () => {
  //   setUpdateQty( updateQty + 1);
  // }

  // const subtractQuantity = () => {
  //   setUpdateQty( updateQty -1);
  // }

  const updateQty = (id , quantity , price) => {
    router.post(`/updateCart/${id}`, {quantity : quantity ,
      price : price ,
    } , {
      onSuccess : () => {
        console.log("Quantity updated successfully");
        router.reload();
      }
    })
  }
  return (
    <>
      <Head title="Products" >
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head >
      <Layout>
        <div className="p-6 relative">
          <h2 className="text-2xl font-bold text-center mb-6">🛒 Your Shopping Cart</h2>
          <button onClick={clearCart} className=" w-[80px] h-[40px] mb-4 rounded-lg ml-6 border bg-red-500 text-white cursor-pointer hover:bg-red-400 active:bg-red-300 active:scale-105">Clear Cart</button>
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
                  cartCount?.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border">{item.product.name}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={`storage/${item.product.image}`}
                          alt={item.name}
                          className="w-20 mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 border">${item.price}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={()=>updateQty(item.product_id , item.quantity + 1 , item.price )}  className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 active:bg-gray-100">+</button>
                          <span>{item.quantity}</span>
                          <button onClick={()=>updateQty(item.product_id , item.quantity - 1 , item.price)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 active:bg-gray-100">-</button>
                        </div>
                      </td>
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
              className='w-[100px] mr-4 mt-4 absolute right-0 rounded-lg font-bold bg-green-500 text-white text-center text-shadow-lg hover:scale-103 active:text-gray-700 hover:bg-green-400 active:scale-105  cursor-pointer' >
              Order
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;