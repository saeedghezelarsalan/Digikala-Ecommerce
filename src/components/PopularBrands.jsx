import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import Image from "next/image";

export default function PopularBrands({ brands }) {
  const brandsLength = brands.map((a) => a).length;
  return (
    brandsLength > 0 && (
      <div className=" rounded-lg mb-10 mt-10 py-2 border">
        <h5 className="text-center text-lg font-semibold py-3 ">
          محبوب ترین برند ها
        </h5>
        <Swiper
          slidesPerView="auto"
          breakpoints={{
            0: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 8,
            },
          }}
          lazy={true}
          spaceBetween={3}
          navigation={true}
          modules={[Navigation]}
          className="w-full h-auto !px-6 !py-4"
        >
          {brands.map((brand, index) => {
            return (
              <SwiperSlide>
                <div
                  key={index}
                  className="relative w-[110px] h-[110px] border border-t-0 border-r-0 border-b-0 cursor-pointer"
                >
                  <Image
                    src={brand.thumbnail}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    )
  );
}