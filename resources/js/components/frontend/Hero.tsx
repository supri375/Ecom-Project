import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay } from 'swiper/modules';
import 'swiper/css';
export function Hero({heroes}) {
  return (
    <Swiper modules={[Autoplay]} spaceBetween={50} slidesPerView={1} autoplay={{delay:3000}} loop={true}>
    {heroes.map((hero)=>(
    <SwiperSlide>
    <section
      className="h-[80vh] w-full bg-cover bg-center  flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(/storage/${hero.image})`,
      }}
    >
      <div className="bg-black/50 p-8 rounded-lg">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">{hero.name}
        </h1>
      </div>
    </section>
    </SwiperSlide>
    ))}
    </Swiper>
  );
}