import { Link } from "@inertiajs/react";

const HomeCard = ({ prod }) => {
    return (
        <Link href={`/products/${prod.id}`} className="group block w-[260px]">
            <div
                className="
          bg-white rounded-2xl overflow-hidden
          shadow-sm hover:shadow-xl transition
          border border-gray-100
        "
            >
                {/* Image */}
                <div className="relative bg-gray-50 h-[220px] flex items-center justify-center">
                    <img
                        src={`/storage/${prod.image}`}
                        alt={prod.name}
                        className="h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-gray-900 leading-tight line-clamp-1">
                        {prod.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {prod.category?.name ?? "Uncategorized"}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-green-600">
                            Rs {prod.price}
                        </span>

                        <span className="text-xs text-gray-400 group-hover:text-black transition">
                            View →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HomeCard;
