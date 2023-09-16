import React, {forwardRef, useEffect, useState} from "react";

const Specifications = forwardRef((props: any, ref: any) => {

  const {product} = props
  const [specificationsDisplayCount, setSpecificationsDisplayCount] = useState(5);
  const [showMoreSpecifications, setShowMoreSpecifications] = useState(false);
  const specificationsLength = product.productsValues.length;
  const showMoreSpecificationsHandler = () => {
    setShowMoreSpecifications(!showMoreSpecifications);
    setSpecificationsDisplayCount(specificationsLength);
    if (showMoreSpecifications) {
      setSpecificationsDisplayCount(specificationsLength);
    } else {
      setSpecificationsDisplayCount(5);
    }
  };

  // show more specifications

  useEffect(() => {
    if (showMoreSpecifications) {
      setSpecificationsDisplayCount(specificationsLength);
    } else {
      setSpecificationsDisplayCount(5);
    }
  }, [showMoreSpecifications, specificationsLength]);


  return (
    <div ref={ref} className="py-3 border-4 border-t-0 border-r-0 border-l-0 border-[#f0f0f1]">
      <div className="py-3 mb-3 ">
        <h5 className="text-[#0c0c0c] font-bold py-1 ">مشخصات</h5>
        <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"></div>
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block min-w-[256px] h-auto ml-12">
          <h5 className="text-[#424750] font-bold">مشخصات</h5>
        </div>
        <ul className="w-full">
          {props.product.productsValues
          .slice(0, specificationsDisplayCount)
          .map((specification: any, index: number) => {
            return (
              <li key={index} className="flex items-center w-full">
                <div className="w-[104px] lg:w-[200px] text-sm text-[#81858b] py-3 px-2">
                  {specification.filter}
                </div>

                <div className="flex-grow py-3 text-sm text-[#0c0c0c] border border-r-0 border-t-0 border-l-0 border-[#f0f0f1]">
                  <p>{specification.value}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {specificationsLength > 5 && (
        <button
          onClick={showMoreSpecificationsHandler}
          className="mt-3 mb-3 text-[#19bfd3] text-xs font-bold"
        >
          {showMoreSpecifications ? "نمایش کمتر" : "نمایش بیشتر"}
        </button>
      )}
    </div>
  )
})

export default Specifications;