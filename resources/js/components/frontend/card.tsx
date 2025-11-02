import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartContext } from "@/components/frontend/context/prodcontext";
interface products {
    prod: {
        id: number;
        name: string;
        price: number;
        image: string;
        rating: number;
        description:string;
        category: string;
    }
}

const Card = ({ prod }: products) => {

    return (
        <>
            <div key={prod.id} className="relative bg-white p-2 border-2 flex flex-row rounded-lg mb-4 shadow hover:shadow-lg  min-h-[320px]">
                <img src={`storage/${prod.image}`} alt={prod.name} className="w-64 h-64 left-0 h-36 object-contain rounded" />
                <div className='m-4'>
                    <h3 className="mt-2 text-[25px] font-bold text-base">{prod.name}</h3>
                    <p className="mt-1 text-[20px ]text-gray-500">{prod.category.name}</p>
                    <p className="mt-1 text-[20px] text-green-500 italic font-semibold">{prod.price}</p>
                    <div className="flex items-center mt-1 space-x-1 text-[15px]">
                        {[1, 2, 3, 4, 5].map(i =>
                            i <= prod.rating ? (
                                <AiFillStar key={i} className="text-yellow-500" />
                            ) : (
                                <AiOutlineStar key={i} className="text-gray-300" />
                            )
                        )}
                    </div>
                    <p className='mt-1 text-md text-gray-500 italic'>{prod.description}</p>
                </div>
            </div>
        </>
    )
}
export default Card;