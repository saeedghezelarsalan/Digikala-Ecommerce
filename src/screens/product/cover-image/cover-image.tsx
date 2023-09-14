import React, {useState} from "react";
import ImageMagnify from "./image-magnify";
import Thumbnail from "./thumbnail";
import MobileCarousel from "./mobile-carousel";
import CtaIcons from "./cta-icons";
import {CoverImageProps} from "./cover-image.props";

const CoverImage = ({product}: CoverImageProps) => {
  const [modalMobileSwiper, setModalMobileSwiper] = useState(false);

  return (
    <div className="col-span-1 w-full h-auto bg-white">
      {/* mobile swiper */}
      <div className="w-full h-auto !flex flex-col">
        <div className=" w-full h-auto flex justify-end pt-8 lg:pt-0 ">
          {/* cover image icons */}
          <CtaIcons/>
          {/* magnify */}
          <ImageMagnify product={product}/>
        </div>
        <Thumbnail product={product}/>
        <MobileCarousel
          modalMobileSwiper={modalMobileSwiper}
          setModalMobileSwiper={setModalMobileSwiper}
          product={product}
        />
      </div>
    </div>
  )
}

export default CoverImage;