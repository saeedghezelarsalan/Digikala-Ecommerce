import React, {Fragment, useEffect, useRef} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
//@ts-ignore
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

// import required modules
//@ts-ignore
import {Pagination, Navigation, Lazy} from "swiper";
//@ts-ignore
import {Swiper, SwiperSlide} from "swiper/react";

const SimilarProduct = ({products}: any) => {
  const router = useRouter();
  const smoothScrollToTopRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log(products)
  }, []);
  // when go to the clicked related product page url with smoothy scroll to top
  useEffect(() => {
    smoothScrollToTopRef?.current?.childNodes.forEach((items: ChildNode) => {
      items.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
      })
    })

    return () => {
      smoothScrollToTopRef?.current?.childNodes.forEach((items: ChildNode) => {
        items.addEventListener('click', () => {
          window.scrollTo({top: 0, behavior: 'smooth'})
        })
      })
    }
  })
  useEffect(()=>{
    console.log(products)
  })
  const relatedProductLink = ({products}:any) => {
   return router.push(`/product/${products}`, undefined, {scroll: false})
  }

  if (products.length > 0) {
    return (
      <div className="h-auto w-auto lg:mx-4 lg:my-4 px-4 lg:px-4 lg:py-3 rounded-lg border border-[#e0e0e2]">
        <div className="py-3 mb-3">
          <h5 className="text-[#0c0c0c] font-bold py-1 ">کالا های مشابه</h5>
          <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"/>
        </div>
        <div className="h-auto my-3">
          <Swiper
            slidesPerView={3}
            breakpoints={{
              769: {
                slidesPerView: 6,
              },
              1200: {
                slidesPerView: 8,
              },
            }}
            spaceBetween={0}
            // navigation ={true}
            lazy={true}
            preloadImages={false}
            // onLazyImageLoad={true}
            modules={[Pagination, Navigation, Lazy]}
            className="!h-auto w-full cursor-pointer"
          >
            <div className="w-fit border-4 bg-green-700">
              {products.map((relatedProduct: any, index: number) => {
                return (
                  <Fragment key={index}>
                    <SwiperSlide>
                      <div
                        ref={smoothScrollToTopRef}
                        onClick={() => relatedProductLink(relatedProduct.slug)}
                        className=" flex w-full h-full !flex-col border border-t-0 border-r-0 border-b-0 px-2 cursor-pointer"
                      >
                        <div className={'relative w-40 h-40'}>
                          <Image
                            src={relatedProduct.thumbnail}
                            fill={true}
                            alt=""
                          />
                        </div>

                        <h4 className="font-bold text-sm lg:text-sm mt-2 line-clamp-2 mb-3">
                          {relatedProduct.name}
                        </h4>
                        <div className="flex flex-col gap-y-3 items-end mb-2">
                          <div className="w-full mt-3 flex items-center justify-between">
                                <span className="bg-[#ef394e] text-xs text-white rounded-xl  py-0 px-1">
                                  {relatedProduct.offer}%
                                </span>
                            <span className="text-xs lg:text-sm">
                                  {Math.round(
                                    (Number(relatedProduct.price) *
                                      (100 - Number(relatedProduct.offer))) /
                                    100
                                  ).toLocaleString()} تومان
                                </span>
                          </div>
                          <div>
                            <del
                              className="text-xs lg:text-sm text-gray-400 ml-2 mt-1"
                            >
                              {relatedProduct.price}
                            </del>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Fragment>
                );
              })}
            </div>
          </Swiper>
        </div>
      </div>
    )
  }

  return null;
}

export default SimilarProduct;