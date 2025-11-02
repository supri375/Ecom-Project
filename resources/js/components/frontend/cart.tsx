import { Link } from "@inertiajs/react";
import { useCartContext } from "./context/prodcontext";

const Cart = ({products}) => {
   const {  clearTheCart } = useCartContext();
    const clearCart = () => {
        clearTheCart();
    }
    return (

        <div id="cart" className='flex flex-col  z-1000  bg-white absolute right-[50px] w-[200px] p-2 border shadow-lg rounded-lg '>
            {products.map((product) => {
                return (
                    <div key={product.id} className='flex gap-[10px]'>
                        <img src={`/storage/${product.image}`} alt="SampleImage" className='ml-o w-[60px] h-[60px]' />
                        <div className="flex flex-col">
                            <h1 className='font-bold text-center text-green-500 text-sm'>Rs {product.price}x{product.quantity}</h1>
                        </div>
                    </div>
                )
            })}
            <div className='flex items-center'>
                <Link href={route('CartPage')}
                    className='w-[80px] h-[40px] pt-2 rounded-lg text-center hover:scale-103 active:text-gray-700 active:scale-105 border cursor-pointer' >
                    View Cart
                </Link>
                <button onClick={clearCart} className=" w-[80px] h-[40px] rounded-lg ml-6 border bg-red-500 text-white cursor-pointer hover:bg-red-400 active:bg-red-300 active:scale-105">Clear Cart</button>
            </div>
        </div>
    )
}
export default Cart;