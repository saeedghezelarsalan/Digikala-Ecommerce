import React, { useRef, useEffect } from "react";
import "swiper/css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { Autoplay, EffectFade, Navigation, Pagination,Lazy } from "swiper";
import Image from "next/image";

export default function HomeSlider({carousel}) {

  const swiperRef = useRef(null);

  useEffect(() => {
      swiperRef.current.swiper.navigation.nextEl.style.opacity = '0'
      swiperRef.current.swiper.navigation.prevEl.style.opacity = '0'
  }, [])
  

const enterT =()=>{
  swiperRef.current.swiper.navigation.nextEl.style.transition = '0.4s'
  swiperRef.current.swiper.navigation.prevEl.style.transition = '0.4s'
  swiperRef.current.swiper.navigation.nextEl.style.opacity = '1'
  swiperRef.current.swiper.navigation.prevEl.style.opacity = '1'

}

const outT =() =>{
  swiperRef.current.swiper.navigation.nextEl.style.transition = '0.4s'
  swiperRef.current.swiper.navigation.prevEl.style.transition = '0.4s'
  swiperRef.current.swiper.navigation.nextEl.style.opacity = 0
  swiperRef.current.swiper.navigation.prevEl.style.opacity = '0'
}

  return (
    <div className="homeSlider h-full max-w-[2200px] mx-auto"
    onMouseEnter={enterT}
    onMouseLeave={outT}
    dir="rtl"
    >
    <div id="previousButton" />
    <div id="nextButton"  />
      <Swiper
       preloadImages= {false}
       lazy= {true}
        ref={swiperRef}
        slidesPerView="auto"
       breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 30,
        }
      }}
        effect={"fade"}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        onLazyImageLoad={true}
        modules={[Autoplay, EffectFade, Navigation, Pagination,Lazy]}
        className="mySwiper cursor-pointer h-full w-full"
        dir="ltr"
      >
        {carousel.map(carousel=>{
return(
          <SwiperSlide >
        <Link href={`/`}>
          <div  className={`relative h-full aspect-w-2 aspect-h-1 md:aspect-w-4 md:aspect-h-1  object-cover`}>
            <Image
              src={carousel.image}
              alt=""
              layout='fill'
              objectFit="cover"
            />
          </div>
        </Link>
          </SwiperSlide>
)
        })}
      </Swiper>
    </div>
  );
}