import { Link } from "@inertiajs/react";

interface products {
    prod: {
        id: number;
        name: string;
        price: number;
        image: string;
        rating: number;
        category: {
            name:string;
        };
    }
}

const HomeCard = ({ prod }: products) => {
    return (
        <>
            <Link href={`/products/${prod.id}`}>
            <div key={prod.id} className=" p-4 m-2 rounded-lg cursor-pointer mb-4 transition flex flex-col justify-between w-64 h-xl
            outline outline-2 outline-transparent hover:outline-offset-2  hover:outline-red-200 hover:bg-gray-100 transition">
                <div className="border border-black-xl rounded-xl ">
                    <img src={`/storage/${prod.image}`} alt={prod.name} className="w-full h-48 object-contain " />
                </div>
                    <h3 className=" font-medium text-base">{prod.name}</h3>
                    <p className=" text-sm text-gray-500">{prod.category?.name ?? "Uncategorized"}</p> 
                    <p className=" text-sm text-green-500 italic font-semibold">{prod.price}</p>
            </div>
            </Link>
        </>
    )
}
export default HomeCard;