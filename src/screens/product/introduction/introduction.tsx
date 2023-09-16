import React, {forwardRef, useState} from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Introduction = forwardRef((props: any, ref: any) => {
  const {product} = props
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const less = product.description.substring(0, 380) + " ...";
  const more = product.description;
  const showMoreHandler = () => {
    setShowMoreDescription(!showMoreDescription);
  };
  return (
    <div ref={ref} className="py-6  border-4 border-t-0 border-r-0 border-l-0 border-[#f0f0f1]">
      <h5 className="mb-8 font-bold">معرفی</h5>
      <p className="relative mb-2 text-sm text-[#232933] leading-7 text-justify  ">
        {showMoreDescription ? more : less}
      </p>
      {more.length > 250 && (
        <button className="text-[#19bfd3] text-xs font-bold flex items-center" onClick={showMoreHandler}>
          {showMoreDescription ? "نمایش کمتر" : "نمایش بیشتر"}
          <KeyboardArrowLeftIcon className="mr-1 fill-[#19bfd3]"/>
        </button>
      )}
    </div>
  )
})

export default Introduction;