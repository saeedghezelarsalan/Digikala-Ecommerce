import { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { Navigation, Lazy } from "swiper";
import Link from "next/link";
import aks from "../../public/assets/svg/aks.svg";

export default function AmazingOfferSlider({ color, product, key }) {
  const swiperColor = useRef();

  useEffect(() => {
    swiperColor.current.style.background = color;
  }, []);

  return (
    product && (
      <div
        key={key}
        ref={swiperColor}
        className="rounded-lg py-5 px-2 mb-4 mt-4"
      >
        <Swiper
          slidesPerView="auto"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            420: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 7,
            },
          }}
          preloadImages={false}
          lazy={true}
          spaceBetween={3}
          navigation={true}
          modules={[Navigation, Lazy]}
          className={`w-full h-auto bg-transparent amazingOffer`}
        >
          <SwiperSlide>
            <div className="h-full text-center text-lg bg-transparent flex flex-col justify-evenly items-center cursor-pointer">
              <Image src={aks} width={92} height={77} />
              <Image
                src="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                width={75}
                height={75}
              />
              <div>
                <span className="text-base text-white">مشاهده همه</span>
                <ArrowBackIosNewIcon className="fill-white h-3 w-3" />
              </div>
            </div>
          </SwiperSlide>

          {product.slice(0, 8).map((offerProduct) => {
            return (
              <SwiperSlide>
                <Link href={`/product/${offerProduct.slug}`}>
                  <a>
                    <div className="bg-white h-full flex flex-col justify-between px-2 py-6 cursor-pointer">
                      <Image
                        src={offerProduct.thumbnail}
                        alt=""
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                      />

                      <div className="flex flex-col gap-y-1 items-end mb-1">
                        <div className="w-full mt-3 flex flex-wrap items-center justify-between">
                          <span className="bg-[#ef394e]  text-xs text-white rounded-xl  py-0 px-1">
                            {offerProduct.offer}%
                          </span>
                          <div className="flex flex-wrap items-center">
                            <span className="text-sm lg:text-base text-[#424750] font-bold">
                              {Math.round(
                                (Number(offerProduct.price) *
                                  (100 - Number(offerProduct.offer))) /
                                  100
                              ).toLocaleString("fa-IR")}
                            </span>

                            <span className="text-[8px] text-[#424750] font-bold mr-1">
                              تومان
                            </span>
                          </div>
                        </div>
                        <div>
                          <del className="text-xs lg:text-sm text-gray-400 ml-2 mt-1">
                            {Number(offerProduct.price).toLocaleString("fa-IR")}
                          </del>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </SwiperSlide>
            );
          })}
          <SwiperSlide>
            <Link href="/">
              <a>
                <div className="h-full text-center text-lg bg-white rounded-tl-lg rounded-bl-lg w-full flex flex-col justify-center items-center cursor-pointer">
                  <div className="w-12 h-12 border rounded-full mt-6 mb-4  flex justify-center items-center">
                    <ArrowBackIosNewIcon className="w-6 h-6 fill-[#19bfd3]" />
                  </div>
                  <span className="text-xs lg:text-sm text-[#424750]">
                    مشاهده همه
                  </span>
                </div>
              </a>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    )
  );
}
