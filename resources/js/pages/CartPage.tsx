import Layout from "@/components/frontend/Layout";
import { SharedData } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useCartContext } from "@/components/frontend/context/prodcontext";

const CartPage = () => {
  const { auth, cartCount } = usePage<SharedData>().props;
  const { carts, clearTheCart } = useCartContext();

  const cartItems = auth.user ? cartCount : carts;
  const isCartEmpty = cartItems.length === 0;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const updateQty = (id, quantity, price) => {
    if (!auth.user) return;

    router.post(`/updateCart/${id}`, { quantity, price }, {
      preserveScroll: true,
    });
  };

  const deleteCart = (id) => {
    auth.user
      ? router.get(route("delete.cart", id))
      : null;
  };

  return (
    <>
      <Head title="Your Cart" />

      <Layout>
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>

            {isCartEmpty && (
              <div className="p-6 text-center bg-gray-50 rounded-xl">
                Your cart is empty 🛒
              </div>
            )}

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 bg-white border rounded-xl hover:shadow-md transition"
              >
                <img
                  src={auth.user ? `/storage/${item.product.image}` : `/storage/${item.image}`}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {auth.user ? item.product.name : item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Rs {item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQty(item.product_id, item.quantity - 1, item.price)
                      }
                      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.product_id, item.quantity + 1, item.price)
                      }
                      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="font-bold">
                    Rs {item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => deleteCart(item.product.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="sticky top-20 h-fit p-6 bg-gray-50 rounded-xl border">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs {totalPrice}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>Rs {totalPrice}</span>
            </div>
            {
              auth.user ? 
              (
            <Link
              href={route("order")}
              className="block mt-6 text-center py-3 rounded-xl bg-green-500 text-white font-semibold
                           hover:bg-green-400 transition"
            >
              Place Order
            </Link>
              )
              :
              (
                  <Link
                    href={route("login")}
                    className="block mt-6 text-center py-3 rounded-xl bg-green-500 text-white font-semibold
                             hover:bg-green-400 transition"
                  >
                    Login To Order
                  </Link>
              )
            }


            <button
              onClick={clearTheCart}
              className="w-full mt-3 py-2 rounded-xl border text-sm hover:bg-white transition"
            >
              Clear Cart
            </button>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default CartPage;
