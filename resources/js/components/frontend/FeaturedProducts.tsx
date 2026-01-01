import { useRef } from "react";
import HomeCard from "./HomeCard";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export function FeaturedProducts({ featuredProducts }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-14">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Featured Products
        </h2>
      </div>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                   w-11 h-11 items-center justify-center rounded-full
                   bg-white/90 backdrop-blur cursor-pointer shadow-lg
                   hover:scale-105 transition hover:bg-gray-100 acive:bg-gray-200 "
      >
        <MdArrowLeft size={22} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                   w-11 h-11 items-center justify-center rounded-full
                   bg-white/90 backdrop-blur cursor-pointer shadow-lg
                   hover:scale-105 transition hover:bg-gray-100 acive:bg-gray-200 "
      >
        <MdArrowRight size={22} />
      </button>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          no-scrollbar pb-4
        "
      >
        {featuredProducts.map((prod) => (
          <div key={prod.id} className="snap-start shrink-0">
            <HomeCard prod={prod} />
          </div>
        ))}
      </div>
    </section>
  );
}
