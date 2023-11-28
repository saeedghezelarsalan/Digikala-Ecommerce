import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  addProductToCart,
  removeProductFromCart,
  removeAllFromCart
} from "../../feature/AddToCart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useSelect } from "@mui/base";

const HomePage = ({ mainCategories, category }) => {
  const [showSticky, setShowSticky] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const nav = useRef();

  useEffect(() => {
    const controllNavbar = () => {
      setShowSticky(true);
      if (window.scrollY > 100) {
        setScrollPos(document.body.getBoundingClientRect().top);
        if (document.body.getBoundingClientRect().top < scrollPos) {
          setShowSticky(false);
        } else {
          setShowSticky(true);
        }
      } else {
        setShowSticky(true);
      }
    };

    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  }, [scrollPos]);

  const cartBasketItem = useSelector((item) => item.cart);
  const totalBasketCart = useSelector((item) => item.cart.total);
  const dispatch = useDispatch();


  const cartBasketLength = cartBasketItem?.cart
    ?.map((item) => item).length

  const itemsPrice = cartBasketItem?.cart
    ?.map((item) => Number(item.price) * Number(item.quantity))
    .reduce(function (previous, current) {
      return previous + current;
    }, 0);



  const totalShoppingCartDiscount = cartBasketItem?.cart
    ?.map((item) => (Number(item.price) * (Number(item.offer) / 100)) * Number(item.quantity))
    .reduce(function (previous, current) {
      return previous + current;
    }, 0);



  let totalShoppingCart = itemsPrice - totalShoppingCartDiscount

  let discountPercent = Math.round((totalShoppingCart * 100) / itemsPrice)

  const addRedux = (product) => {
    dispatch(addProductToCart(product));
  };

  const removeRedux = (product) => {
    dispatch(removeProductFromCart(product));
  };

  const removeAllCart = () => {

    toast.success('خرید شما با موفقیت ثبت شد !', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    dispatch(removeAllFromCart())
  }

  const scrollToTopRef = useRef()

  useEffect(() => {
    scrollToTopRef?.current?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  })
  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>
      <Navbar mainCategory={mainCategories} category={category} />
      <div className="flex !justify-center">
        <div className="flex justify-center max-w-screen-2xl w-full lg:mx-24 py-12 lg:gap-x-4">

          {cartBasketLength > 0 ? (
            <>
              {/* basket items */}
              <div className="flex flex-col flex-1 border rounded-lg">
                {/* total cart */}
                <div className="mr-8 mt-5 space-y-2">
                  <p className="font-bold">سبدخرید شما</p>
                  <p className="text-sm">{totalBasketCart} کالا</p>
                </div>

                {/* total item */}
                <div className=" px-12">
                  {cartBasketItem.cart &&
                    cartBasketItem.cart.map((product) => (
                      <>
                        <div className="grid  grid-cols-[118px_minmax(auto,_1fr)] border border-t-0 border-x-0 last:border-0 py-4">


                          {/* product image */}

                          <div className="relative block mb-2 lg:px-8 w-[118px] h-[118px] ">
                            <Image
                              src={product.thumbnail}
                              layout="fill"
                              objectFit="contain"
                              alt={''}
                            />
                          </div>

                          {/* product name and information */}
                          <div className="flex flex-col w-auto  mr-5">
                            <div className="text-[#23254e] text-[12px] lg:text-base font-bold">
                              <Link href={`/product/${product.slug}`} passHref>
                                {product.name}
                              </Link>
                            </div>

                            <div className="flex items-center py-3  ">
                              <VerifiedUserOutlinedIcon className="w-4 h-4" />
                              <p className="mr-2 text-xs">
                                گارانتی اصالت و سلامت فیزیکی کالا
                              </p>
                            </div>

                            <div className="flex flex-col ">
                              <div className="flex">
                                <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                                  <LibraryAddCheckOutlinedIcon className="w-4 h-4" />
                                  <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col mr-3">
                                  <div className="flex justify-between items-center ">
                                    <h5 className=" text-[#424750] text-xs font-bold ml-auto">
                                      موجود در انبار دیجی کالا
                                    </h5>
                                    <KeyboardArrowLeftOutlinedIcon className="" />
                                  </div>
                                  <div className="flex items-center gap-x-1 text-sm pt-2">
                                    <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]" />
                                    <p className="text-slate-600 text-[12px] font-normal">
                                      ارسال دیجیکالا
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* product add or remove item */}

                          <div className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                            <button
                              onClick={() => addRedux(product)}
                              disabled={product.quantity == product.stock ? true : false}
                              className={`${product.quantity == product.stock ? 'cursor-not-allowed' : 'cursor-pointer'}  select-none`}
                            >
                              <AddCircleOutlinedIcon className="fill-[#ef4056]" />
                            </button>
                            <div className="text-[#ef4056] flex flex-col items-center ">
                              <p>{product.quantity}</p>
                              <p className="text-sm">
                                {product.quantity == product.stock && "حداکثر"}
                              </p>
                            </div>
                            <button onClick={() => removeRedux(product)}>
                              {product.quantity == 1 ? (
                                <DeleteOutlinedIcon className="fill-[#ef4056]" />
                              ) : (
                                <RemoveOutlinedIcon className="fill-[#ef4056]" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center text-base text-[#23254e] font-bold mr-5">
                            {Number(product.price).toLocaleString()} تومان
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>

              {/* basket */}
              <div
                ref={nav}
                className={`absolute lg:!sticky select-none w-full lg:w-[300px] h-fit   lg:!bg-white lg:border my-4 lg:my-0 rounded-lg py-5 z-50 lg:z-0 ${showSticky ? "top-32 transition-300" : "top-20 transition-300"
                  } `}
              >
                <div className=" w-full lg:px-5 px-2 sm:px-12 h-auto  fixed bottom-0 right-0 lg:relative  flex flex-row-reverse justify-between items-center bg-white py-2 z-40 border border-l-0 border-r-0 border-b-0 border-gray-200 lg:flex-col lg:flex lg:items-end lg:w-full  lg:border-0 lg:gap-y-3 lg:py-3">
                  <div className="flex flex-col w-full gap-y-1 ">


                    <div className="hidden lg:flex justify-between text-[#5a5c7a] pt-3">
                      <p className="text-xs font-bold">قیمت کالا ها ({totalBasketCart})</p>
                      <p className="text-[15px] font-bold">
                        {/* {totalBasketCart} */}
                        {Number(itemsPrice).toLocaleString()} تومان
                      </p>
                    </div>


                    <div className="flex flex-col lg:flex-row items-end gap-y-1 lg:justify-between text-[#23254e]  pt-3">
                      <p className="text-xs font-bold">جمع سبد خرید</p>
                      <p className="text-[15px] font-bold">
                        {/* {totalBasketCart} */}
                        {Number(totalShoppingCart).toLocaleString()} تومان
                      </p>
                    </div>
                    {/* #ef4056 */}

                    {totalShoppingCartDiscount && (
                      <div className="hidden lg:flex justify-between text-[#ef4056] pt-3">
                        <p className="text-xs font-bold">
                          جمع سود شما ({100 - discountPercent}%)
                        </p>
                        <p className="text-base font-bold">
                          {/* {totalBasketCart} */}
                          {Number(totalShoppingCartDiscount).toLocaleString()} تومان
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    ref={scrollToTopRef}
                    onClick={removeAllCart}
                    className="bg-[#ef394e] w-full text-xs text-center text-white px-6 py-2 sm:px-12 sm:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0"
                  >
                    ثبت سفارش
                  </button>

                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-auto border rounded-lg py-6">
              <Image
                src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
                width={200}
                height={150}
                alt={''}
              />
              <p className="text-[19px] font-semibold mt-6 mb-4">
                سبد خرید شما خالی است!
              </p>
            </div>
          )}
        </div>

      </div>
      <ToastContainer position="bottom-right"
        autoClose={3000}
        style={{ width: "280px" }}

        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "#32cd32", color: "white", fontSize: "16px" }}
      />
    </>
  );
};

export default HomePage;

export async function getServerSideProps({ params }) {
  let mainCategory = await axios.get("https://digikala-demo-data-q7eo.vercel.app/mainCategory");
  const mainCategories = mainCategory.data;

  let category = await axios.get("https://digikala-demo-data-q7eo.vercel.app/category");
  category = category.data;

  return {
    props: {
      mainCategories,
      category,
    },
  };
}