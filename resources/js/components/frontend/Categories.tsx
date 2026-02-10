import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export function Categories({ cats }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>


      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10 dark:from-gray-900 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10 dark:from-gray-900 to-transparent z-10" />
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                   w-11 h-11 items-center justify-center rounded-full
                   bg-white/90 dark:bg-gray-800/90 backdrop-blur
                   text-black dark:text-white
                   cursor-pointer shadow-lg dark:shadow-black/40
                   hover:scale-105 transition
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   active:bg-gray-200 dark:active:bg-gray-600 "
      >
        <MdArrowLeft size={22} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                   w-11 h-11 items-center justify-center rounded-full
                   bg-white/90 dark:bg-gray-800/90 backdrop-blur
                   text-black dark:text-white
                   cursor-pointer shadow-lg dark:shadow-black/40
                   hover:scale-105 transition
                   hover:bg-gray-100 dark:hover:bg-gray-700
                   active:bg-gray-200 dark:active:bg-gray-600"
      >
        <MdArrowRight size={22} />
      </button>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar "
      >
        {cats.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.slug}`}>
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group transition-transform hover:scale-105">
              <img
                src={`/storage/${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">{cat.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
