import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const ImageMagnify = ({ product }) => {
  const magnify = useRef();
  const small = useRef();
  const large = useRef();
  const zoomWrapper = useRef();
  const zoomPlace = useRef();
  const [projectedWidth, setProjectedWidth] = useState(0);
  const [projectedHeight, setProjectedHeight] = useState(0);

  useEffect(() => {
    magnify.current.addEventListener("mousemove", (e) => {
      zoomPlace.current.style.background = `url(${
        product && product.thumbnail
      }) no-repeat`;
      setProjectedWidth(small.current.offsetWidth);
      setProjectedHeight(small.current.offsetHeight);

      const magnify_offset = magnify.current.getBoundingClientRect();
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
        const bgp = smallMagePositionX + "px" + smallMagePositionY + "px";

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
    magnify.current.addEventListener("mouseleave", (e) => {
      large.current.style.display = "none";
      zoomPlace.current.style.display = "none";
      zoomWrapper.current.style.display = "none";
    });
  }, [projectedWidth, projectedHeight]);

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
          <div className="aspect-w-12 aspect-h-14">
            <div ref={small}>
              <Image
                src={product.thumbnail}
                alt=""
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* thumbnail magnify image */}
      <div
        ref={zoomWrapper}
        class="bg-white absolute left-[1%] top-48 xl:top-52 hidden overflow-hidden w-[65%] h-[600px] xl:h-[550px]  drop-shadow-2xl shadow-md rounded-md z-[1]"
      >
        <div ref={zoomPlace} class="w-full h-full absolute "></div>
      </div>
    </>
  );
};

export default ImageMagnify;