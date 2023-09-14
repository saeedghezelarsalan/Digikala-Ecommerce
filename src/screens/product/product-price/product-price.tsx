import React, {useEffect} from "react";
import Image from "@/components/image";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import Link from "next/link";
// @ts-ignore
import {toast} from "react-toastify";
import {addProductToCart, removeProductFromCart} from "@/feature/AddToCart";
import {useDispatch, useSelector} from "react-redux";

const ProductPrice = ({product, setQuantityReduxProduct, quantityReduxProduct}: any) => {
  const {cart} = useSelector((data: any) => data.cart);
  const dispatch = useDispatch()

  const addRedux = () => {
    toast.success('محصول به سبد خرید اضافه شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    let countCart = cart?.map((a: any) => a).filter((item: any) => item.slug == product.slug).map((a: any) => a).map((a: any) => a.quantity)
    countCart = countCart[0]
    dispatch(addProductToCart(product))
    setQuantityReduxProduct((prev: any) => (Number(countCart) || 0) + 1)
  }

  useEffect(() => {
    let countCart = cart?.map((a: any) => a).filter((item: any) => item.slug == product.slug).map((a: any) => a).map((a: any) => a.quantity)
    countCart = countCart[0]
    setQuantityReduxProduct(countCart)
  }, [product, cart])

  const removeRedux = (product: any) => {
    toast.error('محصول از سبد خرید کم شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    let countCart = cart?.map((a: any) => a).filter((item: any) => item.slug == product.slug).map((a: any) => a).map((a: any) => a.quantity)
    countCart = countCart[0]
    dispatch(removeProductFromCart(product))
  }

  useEffect(()=>{
    console.log(product)
  })
  return (
    <div
      className=" lg:px-0 select-none lg:mt-0 h-fit lg:col-span-5 xl:col-span-4  productPriceBg lg:border border-t-[#f0f0f1]  my-4 lg:my-0 border-t-8 lg:border-t-8 border-[#e0e0e2] rounded-lg lg:py-5 py-3">
      <div className="px-5 flex flex-col pt-5 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  pb-2">
        <h3 className="font-semibold pb-6">فروشنده</h3>
        <div className="flex items-start">
          <Image
            src="https://iili.io/hufgQj.th.png"
            width={24}
            height={24}
            fill={false}
            objectFit="contain"
            alt={''}
          />
          <div className="flex flex-col mr-3">
            <p className="font-[15px] text-[#424750] font-normal">
              دیجی کالا
            </p>
            <div className="flex gap-x-1 text-sm pt-2">
              <p className="text-[#81858b] text-[12px] font-normal">
                عملکرد
              </p>
              <p className="text-[#00a049] text-[12px] font-bold">
                عالی
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 flex items-center py-3 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2] ">
        <VerifiedUserOutlinedIcon/>
        <p className="mr-3 text-xs">گارانتی 24 ماهه مادیران</p>
      </div>

      <div className="px-5 flex flex-col  border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
        <div className="flex">
          <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
            <LibraryAddCheckOutlinedIcon className="w-5 h-5"/>
            <VerticalAlignBottomOutlinedIcon className="w-4 h-4"/>
          </div>
          <div className="flex flex-col mr-3">
            <div className="flex justify-between items-center ">
              <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                موجود در انبار دیجی کالا
              </h5>
              <KeyboardArrowLeftOutlinedIcon className=""/>
            </div>
            <div className="flex items-center gap-x-1 text-sm pt-2">
              <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]"/>
              <p className="text-slate-600 text-[12px] font-normal">
                ارسال دیجیکالا
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 flex items-center  lg:border lg:border-t-0 lg:border-l-0 lg:border-r-0 border-[#e0e0e2]  py-3">
        <MonetizationOnIcon className="fill-orange-500 w-5 h-5 mb-1"/>
        <p className=" mr-3 text-[#424750] text-xs">
          150 امتیاز دیجی کلاب
        </p>
        <ErrorOutlineOutlinedIcon className="mr-1 w-4 h-4"/>
      </div>

      <div
        className={`productPriceBg w-full lg:px-5 px-2 sm:px-12 h-auto bottom-0 fixed lg:relative justify-between items-center bg-white py-2 z-[99] lg:z-0 border-2 lg:border-0 border-l-0 border-r-0 border-b-0  border-gray-200 lg:flex-col-reverse lg:flex lg:items-end lg:w-full lg:gap-y-3 lg:py-3 flex`}>
        {quantityReduxProduct > 0 ? (
          <div className="flex items-center w-full">
            {/* count */}
            <div
              className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
              <button
                onClick={() => addRedux()}
                disabled={quantityReduxProduct == product.stock}
                className={`${quantityReduxProduct == product.stock ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <AddCircleOutlinedIcon
                  className="fill-[#ef4056]"/>
              </button>
              <div className="text-[#ef4056] flex flex-col items-center ">
                <p>
                  {quantityReduxProduct}
                </p>
                <p className="text-sm">
                  {quantityReduxProduct == product.stock && "حداکثر"}
                </p>
              </div>
              <button onClick={() => removeRedux(product)}

              >
                {quantityReduxProduct == 1 ? (
                  <DeleteOutlinedIcon className="fill-[#ef4056]"/>
                ) : (
                  <RemoveOutlinedIcon className="fill-[#ef4056]"/>
                )}
              </button>
            </div>

            <div className="hidden lg:flex flex-col justify-start text-sm">
              <p>در سبد شما</p>
              <Link href="/cart/checkout" passHref>
                <p className="cursor-pointer text-blue-400">مشاهده سبد خرید</p>
              </Link>
            </div>
          </div>
        ) : (
          <button onClick={addRedux}
                  className="bg-[#ef394e] text-xs text-center text-white px-6 py-2 sm:px-16 sm:py-3 md:px-32 md:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0">
            افزودن به سبد خرید {quantityReduxProduct}
          </button>

        )}
        {product?.offer > 0 ? (
          <div className="flex w-full lg:w-auto flex-col gap-y-1 items-end">
            <div className="flex items-center">
              <del
                className="text-xs text-gray-400"
              >
                {Number(product.price).toLocaleString()}
              </del>
              <span className="bg-[#ef394e] text-xs text-white rounded-xl mr-2 py-1 px-2">
                          {product.offer}%
                        </span>
            </div>
            <div>
              <span className="text-base">{((Number(product.price)) - (Number(product.price) * (Number(product.offer) / 100))).toLocaleString()} تومان</span>
            </div>
          </div>

        ) : (
          <span className="text-[18px] text-black">
            {Number(product?.price).toLocaleString()} تومان
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductPrice;


{/* product sticky price */
}
//
// <div className="hidden mt-8 xl:flex xl:col-span-3 mx-8">
//   <div
//     className={`sticky select-none w-full h-fit  productPriceBg lg:border border-t-[#f0f0f1] my-4 lg:my-0 lg:border-t-8 border-[#e0e0e2] rounded-lg py-5 ${showSticky ? "top-44" : "top-32"
//     }`}
//   >
//     <div className="px-5 flex flex-col pt-5 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  pb-2">
//       <h3 className="font-semibold pb-6">فروشنده</h3>
//       <div className="flex items-start">
//         <Image
//           src="https://iili.io/hufgQj.th.png"
//           width={24}
//           height={24}
//           fill={false}
//           objectFit="contain"
//           alt={''}
//         />
//         <div className="flex flex-col mr-3">
//           <p className="text-[#424750] font-normal">
//             دیجی کالا
//           </p>
//           <div className="flex gap-x-1 text-sm pt-2">
//             <p className="text-[#81858b] text-[12px] font-normal">
//               عملکرد
//             </p>
//             <p className="text-[#00a049] text-[12px] font-bold">
//               عالی
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//
//     <div className="px-5 flex items-center py-3 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2] ">
//       <VerifiedUserOutlinedIcon/>
//       <p className="mr-3 text-xs">گارانتی 24 ماهه مادیران</p>
//     </div>
//
//     <div className="px-5 flex flex-col  border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
//       <div className="flex">
//         <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
//           <LibraryAddCheckOutlinedIcon className="w-5 h-5"/>
//           <VerticalAlignBottomOutlinedIcon className="w-4 h-4"/>
//         </div>
//         <div className="flex flex-col mr-3">
//           <div className="flex justify-between items-center ">
//             <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
//               موجود در انبار دیجی کالا
//             </h5>
//             <KeyboardArrowLeftOutlinedIcon className=""/>
//           </div>
//           <div className="flex items-center gap-x-1 text-sm pt-2">
//             <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]"/>
//             <p className="text-slate-600 text-[12px] font-normal">
//               ارسال دیجیکالا
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//
//     <div className="px-5 flex items-center border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
//       <MonetizationOnIcon className="fill-orange-500 w-5 h-5 mb-1"/>
//       <p className=" mr-3 text-[#424750] text-xs">
//         150 امتیاز دیجی کلاب
//       </p>
//       <ErrorOutlineOutlinedIcon className="mr-1 w-4 h-4"/>
//     </div>
//
//     <div
//       className="productPriceBg w-full lg:px-5 px-2 sm:px-12 h-auto bottom-0 fixed lg:relative  flex justify-between items-center bg-white py-2 z-40 border border-l-0 border-r-0 border-b-0 border-gray-200 lg:flex-col-reverse lg:flex lg:items-end lg:w-full  lg:border-0 lg:gap-y-3 lg:py-3">
//
//
//       {quantityReduxProduct > 0 ? (
//         <div className="flex items-center w-full">
//           {/* count */}
//           <div
//             className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
//             <button
//               onClick={() => addRedux(product)}
//               disabled={quantityReduxProduct == product.stock}
//               className={`${quantityReduxProduct == product.stock ? "cursor-not-allowed" : "cursor-pointer"}`}
//             >
//               <AddCircleOutlinedIcon
//                 className="fill-[#ef4056]"/>
//             </button>
//             <div className="text-[#ef4056] flex flex-col items-center ">
//               <p>
//                 {quantityReduxProduct}
//               </p>
//               <p className="text-sm">
//                 {quantityReduxProduct == product.stock && "حداکثر"}
//               </p>
//             </div>
//             <button onClick={() => removeRedux(product)}
//
//             >
//               {quantityReduxProduct == 1 ? (
//                 <DeleteOutlinedIcon className="fill-[#ef4056]"/>
//               ) : (
//                 <RemoveOutlinedIcon className="fill-[#ef4056]"/>
//               )}
//             </button>
//           </div>
//
//           <div className="flex flex-col justify-start text-sm">
//             <p>در سبد شما</p>
//             <Link href="/cart/checkout" passHref>
//               <p className="cursor-pointer text-blue-400">مشاهده سبد خرید</p>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => addRedux(product)}
//           className="bg-[#ef394e] text-xs text-center text-white px-6 py-2 sm:px-32 sm:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0"
//         >
//           افزودن به سبد خرید
//         </button>
//       )}
//       {product.offer > 0 ? (
//         <div className="flex flex-col gap-y-1 items-end">
//           <div className="flex items-center">
//             <del
//               className="text-xs text-gray-400"
//             >
//               {Number(product.price).toLocaleString()}
//             </del>
//             <span className="bg-[#ef394e] text-xs text-white rounded-xl mr-2 py-1 px-2">
//                           {product.offer}%
//                         </span>
//           </div>
//           <div>
//             <span className="text-base">{((Number(product.price)) - (Number(product.price) * (Number(product.offer) / 100))).toLocaleString()} تومان</span>
//           </div>
//         </div>
//
//       ) : (
//         <span
//           className="text-[18px] text-black"
//         >
//                       {Number(product.price).toLocaleString()} تومان
//                     </span>
//       )}
//     </div>
//   </div>
// </div>