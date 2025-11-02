import { useRef } from 'react';
import HomeCard from './HomeCard';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
export function PopularProducts({popularProducts}) {
 const scrollRef = useRef(null);
 
   const scrollLeft = () => {
     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
   };
 
   const scrollRight = () => {
     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
   };
 
   return (
     <section className="bg-gray-50 px-6 relative">
       <h2 className="text-2xl mb-6">Popular Products</h2>
 
       {/* Scroll Arrows */}
       <button
         onClick={scrollLeft}
         className="absolute left-0 top-1/2 transform text-blue-400 text-3xl  -translate-y-1/2 bg-white h-24 shadow-md rounded-lg p-2 z-10 cursor-pointer hover:bg-gray-200 active:bg-gray-300"
       >
         <MdArrowLeft />
       </button>
       <button
         onClick={scrollRight}
         className="absolute right-0 top-1/2 transform text-blue-400 text-3xl -translate-y-1/2 bg-white h-24 shadow-md rounded-full p-2 z-10 cursor-pointer hover:bg-gray-200 active:bg-gray-300"
       >
         <MdArrowRight />
       </button>
 
       <div
         ref={scrollRef}
         className="flex overflow-x-auto space-x-6 whitespace-nowrap scrollbar-hide scroll-smooth"
       >
         {popularProducts.map((prod) => (
           <div key={prod.id} className="flex-shrink-0 w-64 mr-6">
             <HomeCard prod={prod} />
           </div>
         ))}
       </div>
     </section>
   );
}
