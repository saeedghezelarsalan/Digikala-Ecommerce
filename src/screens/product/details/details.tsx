import React, {forwardRef, useState} from "react";
import YellowStar from "@/icons/yellow-star";
import Image from "@/components/image";
import ProductPriceCard from "@/screens/product/product-price-card";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const Details = forwardRef((props: any, ref: any) => {
  const {product, rateReduce, comment, questions, quantityReduxProduct, setQuantityReduxProduct} = props
  const {firstCommentsCount, secondCommentsCount, questionsCount} = ref
  const [showMoreProperty, setShowMoreProperty] = useState(false);
  const [propertyDisplayCount, setPropertyDisplayCount] = useState(5);


  const rateCustomersTop = (rateReduce / comment.length).toFixed(1);
  const specificationsValue = product?.productsValues?.filter(
    (isSpecifications: any) => isSpecifications.isSpecifications == true
  );
  const propertyLength = specificationsValue?.length;

  const showMorePropertyHandler = () => {
    setShowMoreProperty(true);
    setPropertyDisplayCount(propertyLength);
  };

  return (
    <div className="col-span-2 lg:grid  grid-rows-[45px_minmax(auto,_1fr)]">
      <div className="row-span-1  mb-1 text-black font-bold text-[19px] break-word grid-rows-1 mr-8 ml-4">
        {product?.name}
      </div>
      {/* part tow */}
      <div className="flex flex-col lg:grid lg:grid-rows-1  lg:grid-cols-11">
        {/* product short description */}
        <div className=" lg:col-span-6 xl:col-span-7 ml-4 mr-8 h-auto flex flex-col ">
          {/* product latin name */}
          <div className="flex w-full items-center">
                  <span className="text-[#c0c2c5] text-xs ml-1">
                    {product?.latinName}
                  </span>
            <div className="h-[1px] bg-[#e0e0e2] grow"></div>
          </div>

          {/* product rate,count question */}

          <div className="flex items-center gap-x-1">
            <div ref={firstCommentsCount} className="flex gap-x-1 items-center cursor-pointer">
              <YellowStar/>
              <div className="text-xs">
                {comment.length > 0 ? rateCustomersTop : 0}
              </div>
              <div className="text-[11px] font-normal text-[#c0c2c5]">
                ({comment.length})
              </div>
            </div>
            <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3"/>
            <div ref={secondCommentsCount} className="text-[#19bfd3] text-xs cursor-pointer">
              {comment.length} دیدگاه
            </div>
            <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3"/>
            <div ref={questionsCount} className="text-[#19bfd3] text-xs cursor-pointer">
              {questions.length} پرسش
            </div>
          </div>

          {/* product information */}

          <div className="hidden lg:flex flex-col order-last">
            <div className="flex flex-col mt-20 py-3 text-black break-word">
              <h5 className="text-base font-bold">ویژگی ها</h5>
            </div>

            <div className="flex flex-col  border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] items-start gap-y-3 pb-6">
              {product?.productsValues
              .slice(0, propertyDisplayCount)
              .map((item: any, index: number) => {
                return (
                  <div key={index} className="flex items-center gap-x-1">
                    <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4"/>
                    <p className="text-[#81858b] text-sm">
                      {item.filter} :
                    </p>
                    <p className="text-[#424750] text-sm font-bold">
                      {item.value}
                    </p>
                  </div>
                );
              })}
              {propertyLength > 5 && (
                <button
                  onClick={showMorePropertyHandler}
                  className={`text-[#19bfd3] text-xs cursor-pointer ${showMoreProperty ? "hidden" : "block"
                  }`}
                >
                  <span>نمایش بیشتر</span>
                  <KeyboardArrowLeftOutlinedIcon className=""/>
                </button>
              )}
            </div>

            <div className="flex items-center py-3 mb-3">
              <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4"/>
              <span className="break-word text-xs leading-6 mr-3 text-[#424750]">
                      درخواست مرجوع کردن کالا در گروه لپ تاپ و الترابوک با دلیل
                &ldquo;انصراف از خرید&rdquo; تنها در صورتی قابل تایید است که کالا در
                      شرایط اولیه باشد (در صورت پلمپ بودن، کالا نباید باز شده
                      باشد).
                    </span>
            </div>

            <div className="flex justify-between items-center  border border-[#e0e0e2] rounded-lg mb-4">
              <div className="flex-col mr-4">
                <h5 className="text-[15px] text-[#232933] font-bold">
                  ارسال رایگان
                </h5>
                <span className="text-xs text-[#81858b]">
                        برای سفارش بالای 500 هزار تومان
                      </span>
              </div>
              <Image
                src="https://www.digikala.com/_next/static/media/normalFreeShippingTouchPointImage.d4416515.svg"
                width={140}
                height={140}
                fill={false}
                objectFit="cover"
                alt={''}
              />
            </div>

            <div className=" flex flex-col  border border-[#e0e0e2] rounded-lg py-3">
              <div className="flex">
                <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center mr-4">
                  <LibraryAddCheckOutlinedIcon className="w-5 h-5"/>
                  <VerticalAlignBottomOutlinedIcon className="w-4 h-4"/>
                </div>
                <div className="flex flex-col mr-3">
                  <div className="flex justify-between items-center ">
                    <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                      ویژه اعضای دیجی پلاس
                    </h5>
                    <KeyboardArrowLeftOutlinedIcon className=""/>
                  </div>
                  <div className="flex items-center gap-x-1 text-sm pt-2">
                    <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]"/>
                    <p className="text-slate-600 text-[12px] font-normal">
                      ارسال رایگان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductPriceCard product={product} quantityReduxProduct={quantityReduxProduct} setQuantityReduxProduct={setQuantityReduxProduct}/>
        <div className="flex lg:hidden flex-col px-4 border-4 border-b-0 border-l-0 border-r-0 border-[#e0e0e2] ">
          <div className="flex flex-col mt-2 py-3 text-black break-word">
            <h5 className="text-base font-bold">ویژگی ها</h5>
          </div>

          <ul className="flex flex-col border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] pb-6 items-start gap-y-3">
            {product?.productsValues
            .slice(0, propertyDisplayCount)
            .map((item: any, index: number) => {
              return (
                <div key={index} className="flex items-center gap-x-1">
                  <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4"/>
                  <p className="text-[#81858b] text-sm">
                    {item.filter} :
                  </p>
                  <p className="text-[#424750] text-sm font-bold">
                    {item.value}
                  </p>
                </div>
              );
            })}
            {propertyLength > 5 && (
              <button
                onClick={showMorePropertyHandler}
                className={`text-[#19bfd3] text-xs cursor-pointer ${showMoreProperty ? "hidden" : "block"
                }`}
              >
                <span>نمایش بیشتر</span>
                <KeyboardArrowLeftOutlinedIcon className=""/>
              </button>
            )}
          </ul>

          <div className="flex items-center py-3 mb-6 px-2 lg:px-0">
            <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4"/>
            <span className="break-word text-xs leading-6 mr-3 text-[#424750]">
                    درخواست مرجوع کردن کالا در گروه لپ تاپ و الترابوک با دلیل
              &ldquo;انصراف از خرید&rdquo; تنها در صورتی قابل تایید است که کالا در
                    شرایط اولیه باشد (در صورت پلمپ بودن، کالا نباید باز شده
                    باشد).
                  </span>
          </div>
        </div>

        <div className="bg-[#f0f0f1] lg:hidden px-4 py-4">
          <div className="bg-white flex justify-between items-center  border border-[#e0e0e2] rounded-lg mb-3 ml-4 lg:ml-0">
            <div className="flex-col mr-4">
              <h5 className="text-[15px] text-[#232933] font-bold">
                ارسال رایگان
              </h5>
              <span className="text-xs text-[#81858b]">
                      برای سفارش بالای 500 هزار تومان
                    </span>
            </div>
            <Image
              src="https://www.digikala.com/_next/static/media/normalFreeShippingTouchPointImage.d4416515.svg"
              width={140}
              height={140}
              fill={false}
              objectFit="cover"
              alt={''}
            />
          </div>

          <div className="bg-white flex flex-col ml-4 lg:ml-0 border border-[#e0e0e2] rounded-lg py-3">
            <div className="flex">
              <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center mr-4">
                <LibraryAddCheckOutlinedIcon className="w-5 h-5"/>
                <VerticalAlignBottomOutlinedIcon className="w-4 h-4"/>
              </div>
              <div className="flex flex-col mr-3">
                <div className="flex justify-between items-center ">
                  <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                    ویژه اعضای دیجی پلاس
                  </h5>
                  <KeyboardArrowLeftOutlinedIcon className=""/>
                </div>
                <div className="flex items-center gap-x-1 text-sm pt-2">
                  <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]"/>
                  <p className="text-slate-600 text-[12px] font-normal">
                    ارسال رایگان
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Details;