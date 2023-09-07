import Image from "next/image";
import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";

const ImageMagnify = ({product}: any) => {
  const magnify = useRef<any>(null);
  const small = useRef<any>(null);
  const large = useRef<any>(null);
  const zoomWrapper = useRef<any>(null);
  const zoomPlace = useRef<any>(null);
  const [projectedWidth, setProjectedWidth] = useState<any>(0);
  const [projectedHeight, setProjectedHeight] = useState<any>(0);

  useEffect(() => {
    magnify.current && magnify.current.addEventListener("mousemove", (e: any) => {
      zoomPlace.current && (zoomPlace.current.style.background = `url(${
        product && product.thumbnail
      }) no-repeat`);
      setProjectedWidth(small.current && small.current.offsetWidth);
      setProjectedHeight(small.current && small.current.offsetHeight);

      let mx = e.pageX - magnify.current.offsetLeft;
      const my = e.pageY - magnify.current.offsetTop;
      if (
        mx < magnify.current.offsetWidth &&
        my < magnify.current.offsetHeight &&
        mx > 0 &&
        my > 0
      ) {
        large.current.style.display = "block";
        zoomPlace.current.style.display = "block";
        zoomWrapper.current.style.display = "block";
      } else {
        large.current.style.display = "none";
        zoomPlace.current.style.display = "none";
        zoomWrapper.current.style.display = "none";
      }

      if (large.current.style.display === "block") {
        const smallMagePositionX =
          Math.round(
            (mx / small.current.offsetWidth) * projectedWidth -
            zoomPlace.current.offsetWidth / 5
          ) * -1;
        const smallMagePositionY =
          Math.round(
            (my / small.current.offsetHeight) * projectedHeight -
            zoomPlace.current.offsetHeight / 10
          ) * -1;

        const px = mx - large.current.offsetWidth / 2;
        const py = my - large.current.offsetHeight / 2;

        large.current.style.top = py + "px";
        large.current.style.left = px + "px";
        large.current.style.backgroundPositionX = smallMagePositionX + "px";
        large.current.style.backgroundPositionY = smallMagePositionY + "px";
        zoomPlace.current.style.backgroundPositionX = smallMagePositionX + "px";
        zoomPlace.current.style.backgroundPositionY = smallMagePositionY + "px";
      }
    });
    magnify.current.addEventListener("mouseleave", () => {
      large.current.style.display = "none";
      zoomPlace.current.style.display = "none";
      zoomWrapper.current.style.display = "none";
    });
  }, [projectedWidth, projectedHeight, product]);

  return (
    <>
      {/* thumbnail */}

      <div
        ref={magnify}
        className="hidden w-full cursor-crosshair
h-auto lg:!block relative"
      >
        <div className="relative ">
          <div
            ref={large}
            className="w-11/12 h-40 absolute z-[1] hidden bg-[#860f0f] opacity-25"
          ></div>
          <div className="relative aspect-w-12 aspect-h-14">
            <motion.div ref={small}>
              <Image
                src={product.thumbnail}
                alt=""
                layout="responsive"
                objectFit="contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* thumbnail magnify image */}
      <div
        ref={zoomWrapper}
        className="bg-white absolute left-[1%] top-48 xl:top-52 hidden overflow-hidden w-[65%] h-[600px] xl:h-[550px]  drop-shadow-2xl shadow-md rounded-md z-[1]"
      >
        <div ref={zoomPlace} className="w-full h-full absolute "></div>
      </div>
    </>
  );
};

export default ImageMagnify;
