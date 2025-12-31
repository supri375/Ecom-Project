import { useRef } from "react";
import HomeCard from "./HomeCard";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export function FeaturedProducts({ featuredProducts }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Featured Products
        </h2>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 
                           items-center justify-center w-10 h-10 rounded-full 
                           bg-white shadow hover:bg-gray-100 transition"
      >
        <MdArrowLeft size={22} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 
                           items-center justify-center w-10 h-10 rounded-full 
                           bg-white shadow hover:bg-gray-100 transition"
      >
        <MdArrowRight size={22} />
      </button>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2"
      >
        {featuredProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex-shrink-0 w-[260px]"
          >
            <HomeCard prod={prod} />
          </div>
        ))}
      </div>
    </section>
  );
}
