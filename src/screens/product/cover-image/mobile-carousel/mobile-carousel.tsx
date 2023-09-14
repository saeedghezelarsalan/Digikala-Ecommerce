import React, {useState, useRef, Fragment} from "react";
import "swiper/css";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//@ts-ignore
import {EffectFade, Pagination, FreeMode, Navigation, Thumbs, Lazy,} from "swiper";
import Image from "@/components/image";

const MobileCarousel = ({modalMobileSwiper, setModalMobileSwiper, product}: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeSlider, setActiveSlider] = useState<any>(0);
  const productImageLength = product.productImage.length;
  const productVideoLength = product.productVideo.filter((a: any) => a.video != "").length;
  const videoRef = useRef<any>(null);

  const modalImageHandler = () => {
    setModalMobileSwiper(true);
  };
  const closeSlider = () => {
    setModalMobileSwiper(false);
    videoRef?.current?.pause();
  };
  return (
    <div className="w-full h-auto block lg:hidden">
      <Swiper
        slidesPerView="auto"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        lazy={true}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Pagination, Lazy]}
        className=" cursor-pointer lg:hidden w-full  h-auto "
      >
        {product.productImage.map((image: any, index: any) => {
          return (
            <Fragment key={index}>
              <SwiperSlide onClick={modalImageHandler}>
                <div key={index} className="relative aspect-w-16 aspect-h-1 bg-white">
                  <Image
                    src={image.image}
                    alt=""
                    layout="responsive"
                    objectFit="contain"
                  />
                </div>
              </SwiperSlide>
            </Fragment>
          );
        })}
      </Swiper>

      <div
        className={`bg-white w-full  left-0 bottom-0 z-50  fixed transition-all duration-300 lg:hidden flex flex-col max-h-screen ${
          modalMobileSwiper
            ? "translate-y-0  h-screen "
            : "translate-y-full h-0 "
        }`}
      >
        <div className="flex items-center  border-4 border-t-0 border-r-0 border-l-0  w-auto mx-6 border-[#ef394e]">
          <div className="w-full h-auto text-center pt-2 pb-2 rounded-tr-lg rounded-tl-lg overflow-y-hidden">
            تصاویر رسمی
          </div>

          <svg
            onClick={closeSlider}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-auto scale-110 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* main thumb swiper */}
        <div className="flex flex-col justify-between h-full w-full mt-2">
          <Swiper
            style={{
              //@ts-ignore
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            thumbs={{swiper: thumbsSwiper}}
            modules={[FreeMode, Navigation, Thumbs, Pagination]}
            onSwiper={(swiper) => {
              setActiveSlider(swiper.activeIndex + 1);
            }}
            onSlideChange={(swiper) => {
              videoRef?.current?.pause();
              setActiveSlider(swiper.activeIndex + 1);
            }}
            className="w-full h-auto pb-4"
          >
            {productVideoLength > 0 &&
              product.productVideo.map((video: any, index: any) => {
                return (
                  <Fragment key={index}>
                    <SwiperSlide>
                      <video
                        ref={videoRef}
                        key={index}
                        className=" w-full h-[420px] object-center object-contain bg-white"
                        controls
                      >
                        <source
                          className="w-full h-full bg-white"
                          src={video.video}
                        />
                      </video>
                    </SwiperSlide>
                  </Fragment>
                );
              })}

            {product?.productImage?.map((image: any, index: any) => {
              return (
                <Fragment key={index}>
                  <SwiperSlide onClick={modalImageHandler}>
                    <div
                      key={index}
                      className="relative bg-white cursor-pointer w-full h-[360px]"
                    >
                      <Image
                        src={image.image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </SwiperSlide>
                </Fragment>
              );
            })}
          </Swiper>

          {/* thumb swiper */}
          <div>
            <div className="text-center">
              {productImageLength + productVideoLength} / {activeSlider}
            </div>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={5}
              slidesPerView={8}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="w-full flex h-fit mb-12 mt-auto myswipers gap-x-10 space-x-6 thumb-swiper"
            >
              {productVideoLength > 0 &&
                product.productVideo.map((video: any, index: any) => {
                  return (
                    <Fragment key={index}>
                      <SwiperSlide>
                        <div className="relative bg-white cursor-pointer rounded-lg">
                          <div className=" rounded-md overflow-hidden blur-[1px]">
                            <Image
                              src={product.thumbnail}
                              alt=""
                              height={64}
                              width={64}
                              fill={false}
                              layout="responsive"
                              objectFit="contain"
                            />
                          </div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                            <SlideshowIcon className="w-6 h-6 fill-[#424750]"/>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Fragment>
                  );
                })}

              {product?.productImage?.map((image: any, index: any) => {
                return (
                  <Fragment key={index}>
                    <SwiperSlide onClick={modalImageHandler}>
                      <div className=" rounded-md overflow-hidden cursor-pointer ">
                        <Image
                          src={image.image}
                          alt=""
                          height={64}
                          width={64}
                          fill={false}
                          layout="responsive"
                          objectFit="contain"
                        />
                      </div>
                    </SwiperSlide>
                  </Fragment>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCarousel;