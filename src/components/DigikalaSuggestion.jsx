import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Navigation } from "swiper";
import Image from "next/image";
import Link from "next/link";

export default function DigiSuggestion({ product }) {
  const suggestionLenght = product.filter((products) => products.isSuggest == true).lenght
  return (
    product &&
    <>
    <h5 className="text-center py-5 text-xl font-semibold">
          پیشنهاد دیجی‌کالا
        </h5>
    <div className="w-full h-80 cursor-pointer mb-5">
      <Swiper
        slidesPerView="auto"
        breakpoints={{
          0: {
            slidesPerView: 3,
            grid: {
              rows: 2,
            },
          },
          640: {
            slidesPerView: 5,
            grid: {
              rows: 2,
            },
          },
          1200: {
            slidesPerView: 6,
            grid: {
              rows: 2,
            },
          },
        }}
        navigation={true}
        modules={[Grid, Navigation]}
        className="suggestion w-full h-full rounded-2xl border"
      >
        {product
          .filter((products) => products.isSuggest == true)
          .slice(0, 14)
          .map((product) => {
            return (
              <SwiperSlide>
                  <Link href={`/product/${product.slug}`} passHref>
                  <div className="flex flex-col justify-center items-center w-full text-center border ">
                    <Image
                      src={product.thumbnail}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                    <span className="font-bold lg:text-xs line-clamp-1">{product.name}</span>
                  </div>
              </Link>
                </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
    </>
  );
}