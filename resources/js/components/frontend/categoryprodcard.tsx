import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartContext } from "@/components/frontend/context/prodcontext";
interface products {
    prod: {
        id: number;
        name: string;
        price: number;
        image: string;
        rating: number;
        category: string;
    }
}

const CategoryProductCard = ({ prod,category }) => {

    return (
        <>
            <section className='relative flex flex-col'>
            <div key={prod.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between min-h-[320px]">
                <div>
                    <img src={`/storage/${prod.image}`} alt={prod.name} className="w-full h-36 object-cover rounded" />
                    <h3 className="mt-2 font-medium text-base">{prod.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{category.name}</p>
                    <p className="mt-1 text-sm text-green-500 italic font-semibold">{prod.price}</p>
                    <div className="flex items-center mt-1 space-x-1 text-sm">
                        {[1, 2, 3, 4, 5].map(i =>
                            i <= prod.rating ? (
                                <AiFillStar key={i} className="text-yellow-500" />
                            ) : (
                                <AiOutlineStar key={i} className="text-gray-300" />
                            )
                        )}
                    </div>
                </div>
                {/* <button onClick={() => handleAddProduct(prod)} className="mt-3 w-full py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-300 cursor-pointer">
                    Add to Cart
                </button> */}
            </div>
            </section>
        </>
    )
}
export default CategoryProductCard;