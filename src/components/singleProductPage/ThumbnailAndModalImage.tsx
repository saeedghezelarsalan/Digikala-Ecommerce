import Image from "next/image";
import React, {useState, useRef, Fragment} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

// import required modules
//@ts-ignore
import {EffectFade, Pagination, Navigation, Lazy} from "swiper";

// icon
import SlideshowIcon from "@mui/icons-material/Slideshow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ThumbnailAndModalImage = ({product}: any) => {
  // ref
  const swiperRef = useRef();

  // useState
  const [slideShow, setSlideShow] = useState<any>(0);
  const [openSlideShow, setOpenSlideShow] = useState<any>(false);
  const [swipers, setSwipers] = useState<any>("");
  const videoRef = useRef<any>(null);

  const firstImage = product.productImage[0];
  const secondImage = product.productImage[1];
  const thirdImage = product.productImage[2];
  const fourImage = product.productImage[3];
  const fiveImage = product.productImage[4];

  const productVideoLength = product.productVideo.filter((a: any) => a.video != "").length;

  const clickFirstVideo = () => {
    setSlideShow(1);
    setOpenSlideShow(true);
    swipers.slideTo(0);
  };
  const clickFirstImage = () => {
    setSlideShow(productVideoLength + 1);
    setOpenSlideShow(true);
    swipers.slideTo(productVideoLength);
  };

  const clickSecondImage = () => {
    setSlideShow(productVideoLength + 2);
    setOpenSlideShow(true);
    swipers.slideTo(productVideoLength + 1);
  };

  const clickThirdImage = () => {
    setSlideShow(productVideoLength + 3);
    setOpenSlideShow(true);
    swipers.slideTo(productVideoLength + 2);
  };

  const clickFourthImage = () => {
    setSlideShow(productVideoLength + 4);
    setOpenSlideShow(true);
    swipers.slideTo(productVideoLength + 3);
  };

  const clickFifthImage = () => {
    setSlideShow(productVideoLength + 5);
    setOpenSlideShow(true);
    swipers.slideTo(productVideoLength + 4);
  };

  const clickLastSmallImage = () => {
    setSlideShow(1);
    setOpenSlideShow(true);
    swipers.slideTo(0);
  };

  const smallModalImage = (index: any) => {
    setSlideShow(index + productVideoLength + 1);
    swipers.slideTo(index + productVideoLength);
  };

  return (
    <div>
      {/* small thumbnails */}
      <div className="hidden lg:flex items-center w-auto h-auto  py-2 px-2 z-[4]">
        {/* video */}
        {productVideoLength > 0 && (
          <div
            onClick={clickFirstVideo}
            className="relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2]"
          >
            <div className="relative opacity-50 blur-sm">
              <Image
                src={product.thumbnail}
                alt=""
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <SlideshowIcon className="w-6 h-6 fill-[#424750]"/>
            </div>
          </div>
        )}

        {/* first images */}

        {firstImage && (
          <div
            onClick={clickFirstImage}
            className="relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2]"
          >
            <Image
              src={firstImage.image}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}

        {/* second images */}

        {secondImage && (
          <div
            onClick={clickSecondImage}
            className="relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2]"
          >
            <Image
              src={secondImage.image}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}

        {/* third images */}

        {thirdImage && (
          <div
            onClick={clickThirdImage}
            className={`relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1  border border-[#e0e0e2] ${
              productVideoLength > 0 ? "hidden xl:block" : "hidden lg:block"
            } `}
          >
            <Image
              src={thirdImage.image}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}

        {/* four images */}

        {fourImage && (
          <div
            onClick={clickFourthImage}
            className={`relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2] ${
              productVideoLength > 0 ? "hidden 2xl:block" : "hidden xl:block"
            } `}
          >
            <Image
              src={fourImage.image}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}

        {/* five images */}

        {productVideoLength == 0 && fiveImage && (
          <div
            onClick={clickFifthImage}
            className={`relative bg-white w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2] ${
              productVideoLength > 0 ? "hidden" : "hidden 2xl:block"
            } `}
          >
            <Image
              src={fiveImage.image}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
        )}

        {/* last thumbnail */}

        <div
          onClick={clickLastSmallImage}
          className="relative w-[80px] h-[80px] cursor-pointer rounded-lg ml-2 px-1 py-1 border border-[#e0e0e2]"
        >
          <div className="opacity-50 blur-sm">
            <Image
              src={product.thumbnail}
              alt=""
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <MoreHorizIcon className="w-6 h-6 fill-[#424750]"/>
          </div>
        </div>
      </div>

      {/* modal slide show */}

      <div
        className={`w-full top-0 left-0 h-full transition-all duration-500 flex items-center justify-center z-[12] ${
          openSlideShow ? "fixed" : "hidden"
        }`}
      >
        <div
          onClick={() => setOpenSlideShow(false)}
          className="absolute w-full h-full bg-[#0000004d] opacity-15"
        ></div>

        <div className="max-h-[80vh] max-w-[1024px] w-full h-full rounded-lg bg-white z-20 flex flex-col">
          <div className="flex items-center w-auto mx-6 border border-t-0 border-r-0 border-l-0   border-[#e0e0e2]">
            <div className="relative w-fit h-auto text-center pt-2 pb-2 overflow-y-hidden">
              <p className="font-bold">تصاویر رسمی</p>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-[#ef394e] rounded-tr-2xl rounded-tl-2xl"></div>
            </div>

            <svg
              onClick={() => setOpenSlideShow(false)}
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

          <div className="flex flex-row w-full h-full  ">
            <div className=" w-3/5 bg-white h-full border border-r-0 border-b-0 border-t-0 modalSlideShow">
              <Swiper
                ref={swiperRef}
                slidesPerView="auto"
                observer={true}
                observeParents={true}
                parallax={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                }}
                navigation={true}
                loop={false}
                loopFillGroupWithBlank={true}
                onSwiper={(swiper) => {
                  setSwipers(swiper);
                }}
                onSlideChange={() => {
                  videoRef?.current?.pause();
                }}
                onActiveIndexChange={(index) => {
                  setSlideShow(index.activeIndex + 1);
                }}
                lazy={true}
                preloadImages={false}
                //@ts-ignore
                onLazyImageLoad={true}
                modules={[EffectFade, Pagination, Navigation, Lazy]}
                className=" relative cursor-pointer  w-full  h-full "
              >
                {productVideoLength > 0 &&
                  product.productVideo.map((video: any, index: any) => {
                    return (
                      <Fragment key={index}>
                        <SwiperSlide>
                          {video.video && (
                            <div className="flex justify-center items-center">
                              <video
                                ref={videoRef}
                                key={index}
                                className="w-full h-[500px] bg-white"
                                controls
                              >
                                <source
                                  className="w-full  bg-white"
                                  src={video.video}
                                />
                              </video>
                            </div>
                          )}
                        </SwiperSlide>
                      </Fragment>
                    );
                  })}

                {product.productImage.map((image: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <SwiperSlide>
                        <Image
                          src={image.image}
                          alt=""
                          layout="responsive"
                          objectFit="contain"
                        />
                      </SwiperSlide>
                    </Fragment>
                  );
                })}
              </Swiper>
            </div>

            {/* left side */}

            <div className="w-2/5 flex overflow-y-scroll scrollCustomer flex-col h-full bg-white px-4 py-4">
              <p className="text-base font-bold text-[#0c0c0c] mb-4 leading-5">
                {product.name}
              </p>
              <div className="flex flex-wrap w-full">
                {productVideoLength > 0 &&
                  product.productVideo.map((image: any, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          smallModalImage(index - productVideoLength)
                        }
                        className={`w-[62px] h-[62px] bg-white rounded-lg  ml-2 mb-4 ${
                          slideShow == index + 1
                            ? "border-[2px] border-[#19bfd3]"
                            : "border-[2px] border-[#e0e0e2]"
                        }`}
                      >
                        <div className="relative rounded-lg cursor-pointer overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            layout="responsive"
                            objectFit="contain"
                            alt={''}
                          />
                        </div>
                      </div>
                    );
                  })}

                {product.productImage.map((image: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => smallModalImage(index)}
                      className={`w-[62px] h-[62px] bg-white rounded-lg  ml-2 mb-4 ${
                        slideShow == index + productVideoLength + 1
                          ? "border-[2px] border-[#19bfd3]"
                          : "border-[2px] border-[#e0e0e2]"
                      }`}
                    >
                      <div className="relative rounded-lg cursor-pointer overflow-hidden">
                        <Image
                          src={image.image}
                          layout="responsive"
                          objectFit="contain"
                          alt={''}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailAndModalImage;
