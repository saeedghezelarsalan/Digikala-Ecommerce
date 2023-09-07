import React, {useState, useEffect, useRef, Fragment} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Link from "next/link";
import {SearchOutlined} from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EggIcon from "@mui/icons-material/Egg";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DiscountIcon from "@mui/icons-material/Discount";
import PercentIcon from "@mui/icons-material/Percent";
import {useDispatch, useSelector} from "react-redux";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import HelpIcon from '@mui/icons-material/Help';
import Image from "next/image";
import {addProductToCart, removeProductFromCart} from "@/feature/AddToCart";
import {useRouter} from "next/router";
import SidebarCategoryNav from "./SidebarCategoryNav";

const Navbar = ({mainCategory, category}: any) => {
  // useState
  const productCategory = useRef<any>(null);
  const [show, setShow] = useState(true);
  const [showMobileNavbar, setShowMobileNavbar] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [hover, sethover] = useState(false);
  const [hoverSubMenu, setHoverSubMenu] = useState(false);
  const [hoverMainCategory, setHoverMainCategory] = useState("");
  const [showBasketItem, setShowBasketItem] = useState(false);
  const [search, setSearch] = useState("");

  // redux
  const totalBasketCartItem = useSelector((item: any) => item.cart.total);
  const cartBasketItem = useSelector((item: any) => item.cart.cart);
  const dispatch = useDispatch();

  // ref
  const tubeLights = useRef<any>(null);
  const ulRef = useRef<any>(null);
  const router = useRouter();
  const HeaderRef = useRef<any>(null);

  const tubeHide = () => {
    tubeLights.current.style.opacity = "0";
    tubeLights.current.style.width = "0";
  };

  const tubeShow = () => {
    tubeLights.current.style.opacity = "1";
  };

  const mouses = () => {
    sethover(true);
    setHoverSubMenu(false);
  };
  const pak = () => {
    sethover(false);
  };
  const controllNavbar = () => {
    if (hover === true) {
      setShow(true);
    } else {
      if (window.scrollY > 100) {
        setScrollPos(document.body.getBoundingClientRect().top);
        setShow(document.body.getBoundingClientRect().top > scrollPos);
      } else {
        setShow(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  });

  const showMobileNavbarHandler = () => {
    setShowMobileNavbar(true);
    if (window.scrollY > 250) {
      setScrollPos(document.body.getBoundingClientRect().top);
      if (document.body.getBoundingClientRect().top < scrollPos) {
        setShowMobileNavbar(false);
      } else {
        setShowMobileNavbar(true);
      }
    } else {
      setShowMobileNavbar(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", showMobileNavbarHandler);
    return () => {
      window.removeEventListener("scroll", showMobileNavbarHandler);
    };
  });


  const firstMainCategoryName = mainCategory.map(
    (mainCategory: any) => mainCategory.name
  )[0];

  useEffect(() => {
    ulRef.current.childNodes.forEach((links: any) => {
      links.addEventListener("mouseenter", (e: any) => {
        tubeLights.current.style.left = e.target.offsetLeft + "px";
        tubeLights.current.style.width = e.target.offsetWidth + "px";
        tubeLights.current.style.opacity = "1";
      });
    });
  }, []);

  const hoverHandler = (e: any) => {
    setHoverMainCategory(e.target.innerText);
  };

  const mousess = () => {
    sethover(true);
    setHoverSubMenu(true);
  };
  const pakes = () => {
    setHoverSubMenu(false);
    sethover(false);
  };

  const [open, setisOpen] = useState(false);

  const openMenuHandler = () => {
    setisOpen(true);
  };

  const cartBasketLength = cartBasketItem?.map((item: any) => item).length;

  const totalShoppingCartDiscount = cartBasketItem
  ?.map((item: any) => Number(item.price) * (Number(item.offer) / 100) * Number(item.quantity))
  .reduce(function (previous: any, current: any) {
    return previous + current;
  }, 0);

  const itemsPrice = cartBasketItem?.map((item: any) => Number(item.price) * Number(item.quantity))
  .reduce(function (previous: any, current: any) {
    return previous + current;
  }, 0);

  let totalShoppingCart = itemsPrice - totalShoppingCartDiscount;

  const addRedux = (product: any) => {
    dispatch(addProductToCart(product));
  };

  const removeRedux = (product: any) => {
    dispatch(removeProductFromCart(product));
  };

  const submitSearchHandler = (e: any) => {
    e.preventDefault();
    router.push({pathname: "/search", query: `q=${search}`});
  };


  return (
    <div className="xl:border xl:border-t-0 xl:border-l-0 xl:border-r-0 mt-0 !h-auto w-full mb-0 xl:mb-[107px] z-50">
      {/* mobile and tablet navbar */}
      <div
        className={` w-full h-auto z-[9] xl:hidden bg-white border-2 border-x-0 border-t-0 transition-300 duration-1000 `}>
        <div
          className={`bg-white z-50 border fixed lg:relative  top-0 mb-0 flex justify-between items-center w-full px-4 xl:py-4 transition-300 duration-1000 ${
            showMobileNavbar
              ? "translate-y-0 "
              : "-translate-y-full !shadow-none"
          } `}
        >
          <div onClick={openMenuHandler} className="cursor-pointer">
            <MenuIcon className="h-5"/>
          </div>
          <Image
            src="https://www.digikala.com/statics/img/svg/logo.svg"
            width={80}
            height={80}
            alt={''}
          />

          <QuestionMarkIcon className="border-[2px] rounded-lg border-black  h-5 "/>
        </div>
        {/* <div className={open ? 'flex w-full  h-screen  z-10 fixed top-0 right-0' : 'hidden'}> */}

        <div className="">
          <div
            onClick={() => setisOpen(!open)}
            className={`bg-[#0c0c0c]  fixed  opacity-30 -top-32 w-full z-50 h-[200vh] ${
              open ? "block" : "hidden"
            }`}
          ></div>

          <div
            className={`w-4/5 h-screen  overflow-y-auto flex-col flex-grow bg-white fixed top-0 right-0 z-50  transition-all  duration-300 ${
              open ? "-translate-x-0" : "translate-x-full"
            }`}
          >

            {/* sidebar */}
            <div className="">

              {/* image */}
              <div
                onClick={() => setisOpen(false)}
                className="border-bottoom border border-t-0 border-l-0 border-r-0 pb-4 px-6 mt-8 mx-2"
              >
                <Link href="/">
                  <Image
                    width={80}
                    height={20}
                    src="https://www.digikala.com/statics/img/svg/digi.svg"
                    alt=""
                  />
                </Link>
              </div>


              {/* <mobile MainNavbar /> */}

              <div className="w-full bg-white pr-8">
                <ul
                  className=" bg-white gap-y-1 w-full flex flex-col h-full items-start relative border border-x-0 border-t-0 pb-4"
                >
                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      {/* <MenuOutlined className="hamburger-icon" /> */}
                      <EggIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">سوپر مارکت</span>
                    </li>
                  </Link>


                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      {/* <MenuOutlined className="hamburger-icon" /> */}
                      <LocalFireDepartmentIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">
                  پرفروش ترین ها
                </span>
                    </li>
                  </Link>


                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      <DiscountIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">
                تخفیف ها و پیشنهاد ها
                </span>
                    </li>
                  </Link>

                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      <PercentIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">
                شگفت انگیزها
                </span>
                    </li>
                  </Link>

                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      <HelpIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">
                سوالی دارید؟
                </span>
                    </li>
                  </Link>

                  <Link href="" passHref>
                    <li className="py-2 cursor-pointer">
                      <StoreMallDirectoryIcon className="w-[20px] h-[20px] fill-[#9e9fb1] ml-1"/>
                      <span className="text-[13px] text-[#3f4064] font-bold">
                فروشنده شوید
                </span>
                    </li>
                  </Link>
                </ul>
              </div>
              {/*mobile  category navbar */}

              <h5 className="text-sm font-bold py-6 pr-8">دسته بندی کالاها</h5>
              {/* <MobileNavbar /> */}
              <ul className="text-[13px] font-bold">
                {mainCategory.map((mainCategory: any, index: number) => (
                  <SidebarCategoryNav mainCategory={mainCategory} key={index} category={category}/>
                ))}
              </ul>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>

      {/* search navbar */}

      <nav
        ref={HeaderRef}
        className={`flex z-[50] items-center px-2 py-2 xl:fixed bg-white w-full mt-20 lg:-mt-[1px] ${
          showMobileNavbar ? "shadow-md xl:shadow-none" : "shadow-none"
        } `}
      >
        <div className="hidden xl:flex items-center w-auto xl:w-24 ">
          <Link href="/">
            <div className="relative  flex items-center h-full cursor-pointer">
              <Image
                src="https://www.digikala.com/statics/img/svg/logo.svg"
                width={115}
                height={30}
                alt=""
              />
            </div>
          </Link>
        </div>

        {/* search product */}
        <form
          onSubmit={submitSearchHandler}
          className="relative flex items-center w-full xl:w-[37%] xl:mr-4 ml-auto"
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#f0f0f1] fill-[#a1a3a8] text-[#424750] w-full h-11 text-sm px-12 rounded-lg placeholder:text-[#81858b] placeholder:border-2 placeholder:border-black placeholder:border-t-0 placeholder:border-r-0 placeholder:border-l-0 placeholder:text-[10px]"
            type="text"
            placeholder="جستجو"
          />
          <SearchOutlined className="absolute right-4 w-6 h-6 fill-[#a1a3a8] text-sm cursor-pointer font-normal"/>
        </form>

        <Link href="/index">
          <div
            className="flex items-center mr-2 xl:mr-0 xl:gap-x-1 xl:border xl:bg-[#ef394e] xl:px-3 xl:rounded-lg font-bold xl:py-1">
            <span className="hidden xl:block">پنل مدیریت</span>
            <SupervisorAccountIcon className="w-8 h-max"/>
          </div>
        </Link>

        <Link href="/login" passHref>
          <PersonOutlineOutlinedIcon className="mr-3 h-max w-8 border-2 border-white cursor-pointer"/>
        </Link>

        {/*  basket cart modal in laptop */}

        <div
          onMouseEnter={() => setShowBasketItem(true)}
          onMouseLeave={() => setShowBasketItem(false)}
          className="hidden lg:block relative pb-2 mr-3"
        >
          <Link href="/checkout/cart">
            <ShoppingBagOutlinedIcon className="h-max w-8 border-2 border-white cursor-pointer"/>
          </Link>
          <div
            className=" absolute  w-4 h-4 rounded-md -bottom-0 -right-0 bg-[#ef394e] text-white flex justify-center items-center text-[10px] cursor-pointer">
            {totalBasketCartItem}
          </div>

          {/* basket cart modal */}
          {showBasketItem &&
            (cartBasketLength > 0 ? (
              <div
                className="absolute top-[39px] z-50 left-0 py-3 px-2 bg-white h-auto rounded-lg shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] w-max max-w-[350px] ">
                {/* total item */}
                <div className="flex justify-between items-center ">
                  <div className="text-xs select-none">
                    {totalBasketCartItem} کالا
                  </div>

                  <Link href="/checkout/cart">
                    <p className="text-[#19bfd3] text-xs font-bold ml-4">
                      مشاهده ی سبد خرید
                    </p>
                  </Link>
                </div>

                {/* total item */}
                <div
                  className="px-2 scrollCustomer min-h-0 h-auto max-h-96 overflow-hidden overflow-y-scroll border border-x-0 my-2">
                  {cartBasketItem &&
                    cartBasketItem.map((product: any) => (
                      <>
                        <div
                          className="grid grid-cols-[118px_minmax(auto,_1fr)] border border-t-0 border-x-0 last:border-0 py-4 !max-w-max">
                          {/* product image */}

                          <div className="relative block mb-2 lg:px-1 w-[118px] h-[118px] ">
                            <Image
                              src={product.thumbnail}
                              layout="fill"
                              objectFit="contain"
                              alt={''}
                            />
                          </div>

                          {/* product name and information */}
                          <div className="flex flex-col w-auto  mr-1 flex-1 ">
                            <div className="text-[#23254e] text-[12px] lg:text-[15px] font-bold line-clamp-3">
                              <Link href={`/product/${product.slug}`} passHref>
                                {product.name}
                              </Link>
                            </div>

                            <div className="flex items-center py-3  ">
                              <VerifiedUserOutlinedIcon className="w-4 h-4"/>
                              <p className="mr-2 text-xs">
                                گارانتی اصالت و سلامت فیزیکی کالا
                              </p>
                            </div>

                            <div className="flex flex-col ">
                              <div className="flex">
                                <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                                  <LibraryAddCheckOutlinedIcon className="w-4 h-4"/>
                                  <VerticalAlignBottomOutlinedIcon className="w-4 h-4"/>
                                </div>
                                <div className="flex flex-col mr-3">
                                  <div className="flex justify-between items-center ">
                                    <h5 className=" text-[#424750] text-xs font-bold ml-auto">
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
                          </div>

                          {/* product add or remove item */}

                          <div
                            className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                            <button
                              onClick={() => addRedux(product)}
                              disabled={
                                product.quantity == product.stock ? true : false
                              }
                              className={`${
                                product.quantity == product.stock
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }  select-none`}
                            >
                              <AddCircleOutlinedIcon className="fill-[#ef4056]"/>
                            </button>
                            <div className="text-[#ef4056] flex flex-col items-center ">
                              <p>{product.quantity}</p>
                              <p className="text-sm">
                                {product.quantity == product.stock && "حداکثر"}
                              </p>
                            </div>
                            <button onClick={() => removeRedux(product)}>
                              {product.quantity == 1 ? (
                                <DeleteOutlinedIcon className="fill-[#ef4056]"/>
                              ) : (
                                <RemoveOutlinedIcon className="fill-[#ef4056]"/>
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

                {/* submit cart */}

                <div className="flex justify-between items-center py-1">
                  <div className="flex flex-col w-auto gap-y-1 ">
                    <div className="flex flex-col items-start gap-y-1 lg:justify-between text-[#23254e]  pt-3">
                      <p className="text-xs font-bold">جمع سبد خرید</p>
                      <p className="text-[15px] font-bold">
                        {/* {totalBasketCart} */}
                        {Number(totalShoppingCart).toLocaleString()} تومان
                      </p>
                    </div>
                    {/* #ef4056 */}
                  </div>
                  <Link href="/checkout/cart" passHref>
                    <button
                      className="bg-[#ef394e] w-auto text-xs text-center text-white !px-6 py-3 rounded-lg font-bold h-fit  lg:px-0">
                      ثبت سفارش
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div
                className="absolute top-[39px] z-50 left-0 py-3 px-2 bg-white h-auto rounded-lg shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] w-[350px] ">
                {/* total item */}
                <div className="flex justify-end items-center ">
                  <Link href="/checkout/cart">
                    <p className="text-[#19bfd3] text-xs font-bold ml-4">
                      مشاهده ی سبد خرید
                    </p>
                  </Link>
                </div>

                {/* total item */}
                <div
                  className="px-2 scrollCustomer min-h-0 h-auto max-h-96 overflow-hidden overflow-y-scroll border border-x-0 my-2">
                  <div className="flex flex-col justify-center items-center w-full h-auto rounded-lg py-6">
                    <Image
                      src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
                      width={200}
                      height={150}
                      alt={''}
                    />
                    <p
                      className="text-[19px] font-semibold mt-6 mb-4
"
                    >
                      سبد خرید شما خالی است!
                    </p>
                  </div>
                </div>

                {/* submit cart */}

                <div className="flex justify-end items-center py-1">
                  <button
                    disabled={true}
                    className="bg-gray-400 w-auto text-xs text-center text-white !px-6 py-3 rounded-lg font-bold h-fit  lg:px-0"
                  >
                    ثبت سفارش
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/*  basket cart modal in mobile */}

        <div className="block lg:hidden relative mr-3">
          <Link href="/checkout/cart">
            <ShoppingBagOutlinedIcon className="h-max w-8 border-2 border-white cursor-pointer"/>
            <div
              className="absolute  w-4 h-4 rounded-md -bottom-1 -right-0 bg-[#ef394e] text-white flex justify-center items-center text-[10px]">
              {totalBasketCartItem}
            </div>
          </Link>
        </div>
      </nav>

      {/* main navbar */}

      <div
        className={`hidden xl:block text-[11px] h-auto bg-white xl:px-0 w-full font-bold fixed z-[5] mt-[59px] transition-all duration-1000 shadow-md pt-3 ${
          show ? "translate-y-0 " : "!-translate-y-  !mt-0 "
        }`}
      >
        <div className="w-full bg-white">
          <ul
            ref={ulRef}
            onMouseLeave={tubeHide}
            onMouseEnter={tubeShow}
            className=" bg-white gap-x-1 w-fit xl:flex h-full items-center relative"
          >
            <div
              ref={productCategory}
              onMouseEnter={mousess}
              onMouseLeave={pakes}
              className="movement relative cursor-pointer pl-4 lg:mr-4 xl:py-2 z-[999] h-full hidden  xl:flex xl:items-center text-[13px] "
            >
              <li>
                {/* <MenuOutlined className="hamburger-icon" /> */}
                <MenuIcon className="h-5 ml-1"/>
                دسته بندی کالا ها
              </li>
              <div className="w-[1px] h-[16px] bg-[#ceced8]   absolute left-0"></div>
            </div>
            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D]  py-4 cursor-pointer">
              <Link
                href={{pathname: "search/", query: {name: "leangchhean"}}}
                className="flex items-center"
              >
                <li>
                  <EggIcon className="w-[18px] h-[18px] fill-[#a1a3a8] ml-1"/>
                  سوپرمارکت
                </li>
              </Link>
            </div>

            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D] py-4 cursor-pointer">
              <Link href="/" className="active-a">
                <li>
                  <LocalFireDepartmentIcon className="w-[18px] h-[18px] fill-[#a1a3a8] ml-1"/>
                  پرفروش ترین ها
                </li>
              </Link>
            </div>

            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D] py-4 cursor-pointer">
              <Link href="/">
                <li>
                  <DiscountIcon className="w-[18px] h-[18px] fill-[#a1a3a8] ml-1"/>
                  تخفیف ها و پیشنهاد ها
                </li>
              </Link>
            </div>

            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D] py-4 cursor-pointer flex items-center">
              <Link href="/">
                <div className="flex">
                  <li>
                    <PercentIcon className="w-[18px] h-[18px] fill-[#a1a3a8] ml-1 border rounded-full"/>
                    شگفت انگیزها
                  </li>
                </div>
              </Link>
            </div>

            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D] py-4 cursor-pointer">
              <Link href="/">
                <li>سوالی دارید؟</li>
              </Link>
            </div>

            <div className="movement  text-[12px] px-2 xl:py-2 text-[#62666D] py-4 cursor-pointer">
              <Link href="/">
                <li>فروشنده شوید!</li>
              </Link>
            </div>
            <div
              ref={tubeLights}
              className="hidden xl:block duration-[0.3s] absolute bottom-0 opacity-0 h-[3px] w-0 bg-[#ef394e] rounded-tl rounded-tr"
            ></div>
          </ul>
        </div>

        <div
          className={`bg-white -translate-y-[1px] list-none shadow-sm h-[500px] w-auto mx-4 border ${
            hover ? "flex flex-wrap" : "hidden"
          }`}
          onMouseEnter={mouses}
          onMouseLeave={pak}
        >
          <div className="w-[12%] h-full flex flex-col border border-t-0 ">
            {mainCategory.map((mainCategory: any, index: number) => {
              return (
                <Link key={index} href={`/main/${mainCategory.slug}`}>
                  <div
                    className="h-full flex  items-center py-3 px-2 text-xs font-bold text-[#424750] hover:text-[#ef394e] hover:bg-[#f0f0f180] cursor-pointer"
                    onMouseEnter={(e) => hoverHandler(e)}
                  >
                    {mainCategory.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="w-[88%] h-full flex flex-col flex-wrap py-5 px-4 bg-white">
            {hoverSubMenu ? (
              <>
                {category.filter((category:any) => category.mainCategory == firstMainCategoryName)
                .map((category:any) => {
                  return (
                    <>
                      <li>
                        <Link href={`/search/${category.slug}`}>
                          <div
                            className="text-[#0c0c0c] !leading-[2.15rem] text-sm h-auto w-auto ml-12 hover:text-[#ef394e]">
                            {category.name}
                          </div>
                        </Link>
                      </li>
                      {category.subCategory.map((subCategory:any) => {
                        return (
                          subCategory.name != "" && <li>
                            <Link href={`/search/${subCategory.slug}`}>
                              <div
                                className="text-[#81858b] !leading-[2.17rem] text-xs h-auto w-auto ml-12 hover:text-[#ef394e]">
                                {subCategory.name}
                              </div>
                            </Link>
                          </li>
                        );
                      })}

                      {/* <div className="w-[285px] h-full bg-white"></div> */}
                    </>
                  );
                })}
              </>


              /* <div className="w-[285px] h-full bg-white"></div> */


            ) : (
              category
              .filter(
                (category:any) => category.mainCategory == hoverMainCategory
              )
              .map((category:any) => {
                return (
                  <>
                    <li
                      //  onClick={()=>sethover(false)}
                    >
                      <Link href={`/search/${category.slug}`}>
                        <p
                          className="text-[#0c0c0c] !leading-[2.15rem] text-sm h-auto w-auto ml-12 hover:text-[#ef394e]">
                          {category.name}
                        </p>
                      </Link>
                    </li>
                    {category.subCategory.map((subCategory:any) => {
                      return (
                        subCategory.name != "" && <li>
                          <Link href={`/search/${subCategory.slug}`}>
                            <p
                              // onClick={()=>sethover(false)}
                              className="text-[#81858b] !leading-[2.17rem] text-xs h-auto w-auto ml-12 hover:text-[#ef394e]">
                              {subCategory.name}
                            </p>
                          </Link>
                        </li>
                      );
                    })}

                    {/* <div className="w-[285px] h-full bg-white"></div> */}
                  </>
                );
              })
            )}
          </div>
        </div>
        <Fragment>
          {
            <div
              className={`${
                hover
                  ? "absolute bg-black w-full h-[200vh] top-9 -z-10 opacity-30"
                  : "hidden"
              }`}
            ></div>
          }
        </Fragment>
      </div>
    </div>
  );
};

export default Navbar;
