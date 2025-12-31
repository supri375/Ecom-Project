import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface CardProps {
    prod: {
        id: number;
        name: string;
        price: number;
        image: string;
        rating: number;
        description: string;
        category: {
            name: string;
        };
    };
}

const Card: React.FC<CardProps> = ({ prod }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 group">

            {/* Image */}
            <div className="relative aspect-square bg-gray-50">
                <img
                    src={`storage/${prod.image}`}
                    alt={prod.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">

                {/* Category */}
                <p className="text-xs uppercase tracking-wide text-gray-400">
                    {prod.category.name}
                </p>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 truncate">
                    {prod.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                    {[1, 2, 3, 4, 5].map((i) =>
                        i <= prod.rating ? (
                            <AiFillStar
                                key={i}
                                className="text-yellow-400"
                            />
                        ) : (
                            <AiOutlineStar
                                key={i}
                                className="text-gray-300"
                            />
                        )
                    )}
                    <span className="ml-1 text-xs text-gray-500">
                        ({prod.rating})
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2">
                    {prod.description}
                </p>

                {/* Price */}
                <div className="pt-2">
                    <span className="text-lg font-bold text-gray-900">
                        ${prod.price}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
