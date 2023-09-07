import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
const DynamicChart = dynamic(() => import("../../components/Chart"), {
  loading: () => <p>loading...</p>,
});
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

// import required modules
import { Pagination, Navigation, Lazy } from "swiper";

// icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// redux
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../feature/AddToCart";
import { store } from "../../feature/store";

// component
import SingleProductImageMagnify from "../../components/singleProductPage/ImageMagnify";
import SingleProductThumbnailModalImage from "../../components/singleProductPage/ThumbnailAndModalImage";
import YellowStar from "../../components/YellowStar";
import WhiteStar from "../../components/WhiteStar";
import SingleProductSlider from "../../components/singleProductPage/MobileThumbnailSlider";
import { IndeterminateCheckBoxOutlined } from "@mui/icons-material";

function HomePage({
  product,
  comments,
  relatedProducts,
  mainCategory,
  category,
  questions,
}) {

  const dispatch = useDispatch()
  const [tabHeart, setTabHeart] = useState(false);
  const [hoverHeart, setHoverHeart] = useState(false);
  const [hoverNotification, setHoverNotification] = useState(false);
  const [hoverChart, setHoverChart] = useState(false);
  const [hoverbookmark, setHoverBookmark] = useState(false);
  const [clickBookmark, setClickBookmark] = useState(false);
  const [productChart, setProductChart] = useState(false);
  const [showMoreProperty, setShowMoreProperty] = useState(false);
  const [showMoreSpecifications, setShowMoreSpecifications] = useState(false);
  const [scrolled, setScrolled] = useState(1);
  const [userScroll, setuserScroll] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [modalMobileSwiper, setModalMobileSwiper] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [customerScore, setCustomerScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionsBox, setQuestionsBox] = useState("");
  const [openCustomersComment, setOpenCustomersComment] = useState(false);
  const [openCustomersQuestion, setOpenCustomersQuestion] = useState(false);
  const [quantityReduxProduct, setQuantityReduxProduct] = useState(0)
  const [allPositive, setAllPositive] = useState([]);
  const [allNegative, setAllNegative] = useState([]);
  const [customerComment, setCustomerComment] = useState({
    title: "",
    name: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [unknown, setUnknown] = useState(false);
  const [propertyDisplayCount, setPropertyDisplayCount] = useState(5);
  const [specificationsDisplayCount, setSpecificationsDisplayCount] =
    useState(5);
  const specificationsLength = product.productsValues.length;
  const specificationsValue = product.productsValues.filter(
    (isSpecifications) => isSpecifications.isSpecifications == true
  );
  const propertyLength = specificationsValue.length;

  const clickPositiveHandler = (e) => {
    if (positiveRef.current.innerText !== "") {
      setAllPositive([
        ...allPositive,
        {
          id: Math.ceil(Math.random() * 1000000),
          description: positiveRef.current.innerText,
        },
      ]);
      positiveRef.current.innerText = "";
    }
  };
  const comment = comments.map((comment) => comment);

  let rateReduce =
    comment.length > 0
      ? comment
        .map((comment) => Number(comment.rate))
        .reduce(function (previous, current) {
          return previous + current;
        })
      : "0";
  const rateCustomers = Math.ceil(rateReduce / comment.length);
  const rateCustomersTop = (rateReduce / comment.length).toFixed(1);

  const clickNegativeHandler = (e) => {
    e.preventDefault();
    if (negativeRef.current.innerText !== "") {
      setAllNegative([
        ...allNegative,
        {
          id: Math.ceil(Math.random() * 1000000),
          description: negativeRef.current.innerText,
        },
      ]);
      negativeRef.current.innerText = "";
    }
  };

  const questionBoxChangeHandler = (e) => {
    setQuestionsBox(e.target.value);
    setQuestionCount(questionsBox.length);
  };

  const clickCustomersQuestions = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3001/customersQuestion`, {
        id: "",
        questionsBox: questionsBox,
        slug: router.query.product,
      })
      .then(
        setOpenCustomersQuestion(false),
        setQuestionsBox(""),
        setQuestionCount(0),
        (customersQuestionsRef.current.value = "")
      );
  };

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:3001/customersComment`, {
        ...customerComment,
        positiveComments: allPositive,
        negativeComments: allNegative,
        unknown: unknown,
        slug: router.query.product,
        rate: customerScore,
        productName: product.name,
      })
      .then(
        setCustomerComment({
          title: "",
          name: "",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        setAllPositive([]),
        setAllNegative([]),
        setUnknown(false),
        setOpenCustomersComment(false)
      );
  };



  const nav = useRef();
  const menu = useRef();
  const activeLine = useRef();
  const sectionFirst = useRef();
  const sectionSecond = useRef();
  const sectionThird = useRef();
  const sectionFour = useRef();
  const firstCommentsCount = useRef();
  const secondCommentsCount = useRef();
  const questionsCount = useRef();
  const moarefi = useRef();
  const moshakhasat = useRef();
  const didgah = useRef();
  const porsesh = useRef();
  const positiveRef = useRef();
  const negativeRef = useRef();
  const rateRef = useRef();
  const router = useRouter();
  const customersQuestionsRef = useRef();
  const smoothScrollToTopRef = useRef()

  // redux
  const { cart } = useSelector(data => data.cart)

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
    let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
    countCart = countCart[0]
    dispatch(addProductToCart(product))
    setQuantityReduxProduct((prev) => (Number(countCart) || 0) + 1)
  }


  const removeRedux = (product) => {
    toast.error('محصول از سبد خرید کم شد', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
    countCart = countCart[0]
    dispatch(removeProductFromCart(product))
  }

  useEffect(() => {
    let countCart = cart?.map(a => a).filter(item => item.slug == product.slug).map(a => a).map(a => a.quantity)
    countCart = countCart[0]
    setQuantityReduxProduct(countCart)
  }, [product, cart])

  // users comments rates border
  useEffect(() => {
    const rates = product?.sellerView.map((item) => item.rate);
    rateRef?.current.childNodes.forEach((item, i) => {
      item.childNodes[1].childNodes[0].childNodes[0].style.width =
        (rates[i] * 100) / 5 + "%";
    });
  }, [product]);

  const customerUnknownHandler = (e) => {
    setUnknown(!unknown);
  };

  const deletePositiveHandler = (id) => {
    setAllPositive(allPositive.filter((positive) => positive.id !== id));
  };

  const deleteNegativeHandler = (id) => {
    setAllNegative(allNegative.filter((comment) => comment.id !== id));
  };

  const customersCommentHandler = (e) => {
    e.preventDefault();
    setCustomerComment({
      ...customerComment,
      [e.target.name]: e.target.value,
    });
  };

  const less = product.description.substring(0, 380) + " ...";
  const more = product.description;

  // show more description
  const showMoreHandler = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  useEffect(() => {
    const controllNavbar = () => {
      setShowSticky(true);
      if (window.scrollY > nav.current?.getBoundingClientRect().top) {
        setScrollPos(document.body.getBoundingClientRect().top);
        if (document.body.getBoundingClientRect().top < scrollPos) {
          setShowSticky(false);
        } else {
          setShowSticky(true);
        }
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", controllNavbar);
    return () => {
      window.removeEventListener("scroll", controllNavbar);
    };
  }, [scrollPos, showSticky]);


  const showMorePropertyHandler = () => {
    setShowMoreProperty(true);
    setPropertyDisplayCount(propertyLength);
  };

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


  // section nav scroll indicator

  // menu move indicator

  // click menu items
  useEffect(() => {
    menu.current.childNodes.forEach((item, index) => {
      item.addEventListener(
        "click",
        (e) => {
          let menuArray = [moarefi, moshakhasat, didgah, porsesh]
          setScrolled(index + 1);
          if ([index] + 1 == [index] + 1) {
            activeLine.current.style.left = menuArray[index].current.offsetLeft + "px";
            activeLine.current.style.width = menuArray[index].current.offsetWidth + "px";
          }

          if (
            index + 1 == 1 &&
            window.screenTop + 80 >
            sectionFirst.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 1 &&
            window.screenTop + 80 >
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 1 &&
            window.screenTop + 100 <
            sectionFirst.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFirst.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 2 &&
            window.screenTop + 80 >
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 2 &&
            window.screenTop + 80 >
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 2 &&
            window.screenTop + 100 <
            sectionSecond.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionSecond.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 3 &&
            window.screenTop + 80 >
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 3 &&
            window.screenTop + 80 >
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 3 &&
            window.screenTop + 100 <
            sectionThird.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionThird.current.offsetTop - 101,
              behavior: "smooth",
            });
          }

          if (
            index + 1 == 4 &&
            window.screenTop + 80 >
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFour.current.offsetTop - 151,
              behavior: "smooth",
            });
          } else if (
            index + 1 == 4 &&
            window.screenTop + 100 <
            sectionFour.current.getBoundingClientRect().top
          ) {
            window.scrollTo({
              top: sectionFour.current.offsetTop - 101,
              behavior: "smooth",
            });
          }


          setuserScroll(false);

          let timer = null;
          window.addEventListener(
            "scroll",
            function () {
              if (timer !== null) {
                clearTimeout(timer);
              }
              timer = setTimeout(function () {
                setuserScroll(true);
              }, 150);
            },
            false
          );

        },
        false
      );
    });

    firstCommentsCount.current.addEventListener("click", (e) => {
      setScrolled(3);
      window.scrollTo({
        top: sectionThird.current.offsetTop - 107,
        behavior: "smooth",
      });
    });

    secondCommentsCount.current.addEventListener("click", (e) => {
      setScrolled(3);
      window.scrollTo({
        top: sectionThird.current.offsetTop - 107,
        behavior: "smooth",
      });
    });

    questionsCount.current.addEventListener("click", (e) => {
      setScrolled(4);
      window.scrollTo({
        top: sectionFour.current.offsetTop - 107,
        behavior: "smooth",
      });
    });
  }, [scrolled]);


  useEffect(() => {
    function scrollHandler() {
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionFirst.current?.getBoundingClientRect().top
      ) {
        setScrolled(1);
        activeLine.current.style.left = moarefi.current.offsetLeft + "px";
        activeLine.current.style.width = moarefi.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionSecond.current?.getBoundingClientRect().top
      ) {
        setScrolled(2);
        activeLine.current.style.left = moshakhasat.current.offsetLeft + "px";
        activeLine.current.style.width = moshakhasat.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionThird.current?.getBoundingClientRect().top
      ) {
        setScrolled(3);
        activeLine.current.style.left = didgah.current.offsetLeft + "px";
        activeLine.current.style.width = didgah.current.offsetWidth + "px";
      }
      if (
        userScroll &&
        window.screenTop + 107 >
        sectionFour.current?.getBoundingClientRect().top - 1
      ) {
        setScrolled(4);
        activeLine.current.style.left = porsesh.current.offsetLeft + "px";
        activeLine.current.style.width = porsesh.current.offsetWidth + "px";
      }


      if (
        userScroll &&
        window.screenTop <
        sectionFirst.current?.getBoundingClientRect().top
      ) {
        activeLine.current.style.left = moarefi.current.offsetLeft + "px";
        activeLine.current.style.width = moarefi.current.offsetWidth + "px";
      }
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [userScroll]);

  // related product carousel 
  const relatedProductLink = (relatedProduct) => {
    router.push(`/product/${relatedProduct}`, undefined, { scroll: false })
  }


  // when go to the clicked related product page url with smoothy scroll to top
  useEffect(() => {
    smoothScrollToTopRef?.current?.childNodes.forEach(items => {
      items.addEventListener('click', (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    })
  })

  return (
    <>
      <Head>
        <title>{product.name} | دیجیکالا</title>
      </Head>
      <Navbar mainCategory={mainCategory} category={category} />
      <div className="pb-8 lg:pb-0  h-auto -mt-[-10px] lg:mt-0 max-w-screen-3xl mx-auto	">
        {/* breadcamp */}
        <div className="py-8 px-4 h-auto w-full items-center hidden lg:flex text-xs text-[#81858b] gap-x-4">
          <Link href="/">
            دیجی کالا
          </Link>
          <div>/</div>
          <Link href={`/main/${product.mainCategorySlug}`}>
            {product.mainCategory.replace("-", " ")}
          </Link>
          <div>/</div>
          <Link href={`/search/${product.categorySlug}`}>
           {product.category.replace("-", " ")}
          </Link>
          <div>/</div>
          <Link href={`/search/${product.subCategorySlug}`}>
            <p>{product.subCategory.replace("-", " ")}</p>
          </Link>
        </div>
        {/* product Header*/}
        <div className="lg:mx-4 lg:grid lg:grid-cols-3 ">
          {/* product image */}
          <div className="col-span-1 w-full h-auto bg-white">
            {/* mobile swiper */}
            <div className="w-full h-auto !flex flex-col">
              <div className=" w-full h-auto flex justify-end pt-8 lg:pt-0 ">
                {/* thumbnail icons */}

                <div className="flex-row-reverse gap-y-3 h-auto flex lg:flex-col items-center  w-auto ">
                  <div
                    onClick={() => setTabHeart(!tabHeart)}
                    className="px-3 cursor-pointer "
                  >
                    <FavoriteIcon
                      onMouseEnter={() => setHoverHeart(true)}
                      onMouseLeave={() => setHoverHeart(false)}
                      className={`${tabHeart
                        ? "fill-red-500  "
                        : "fill-white stroke-black stroke-2"
                        }`}
                    />
                    <div
                      className={`translate-y-[178px] -translate-x-2 hidden max-w-80 w-fit absolute  bg-[#424750] border border-[#232933] px-2 py-3 top-0 right-12 text-xs rounded z-[999] text-white ${hoverHeart ? "lg:block" : "lg:hidden"
                        }`}
                    >
                      اضافه به علاقه مندی
                    </div>
                  </div>

                  <div className="px-3 cursor-pointer">
                    <TimelineIcon
                      onClick={() => setProductChart(true)}
                      onMouseEnter={() => setHoverChart(true)}
                      onMouseLeave={() => setHoverChart(false)}
                    />
                    <div
                      className={`translate-y-[106px] -translate-x-2 hidden  max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-28 z-[999] right-12 text-xs rounded text-white ${hoverChart ? "lg:block" : "lg:hidden"
                        }`}
                    >
                      نمودار قیمت
                    </div>
                  </div>

                  <Link href="/login" passHref>
                    <div className="px-3 cursor-pointer">
                      <NotificationsActiveOutlinedIcon
                        onMouseEnter={() => setHoverNotification(true)}
                        onMouseLeave={() => setHoverNotification(false)}
                      />
                      <div
                        className={`translate-y-44 -translate-x-2 hidden  max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-20 z-[999] right-12 text-xs rounded text-white ${hoverNotification ? "lg:block" : "lg:hidden"
                          }`}
                      >
                        اطلاع رسانی شگفت انگیز
                      </div>
                    </div>
                  </Link>

                  <div
                    onClick={() => setClickBookmark(!clickBookmark)}
                    onMouseEnter={() => setHoverBookmark(true)}
                    onMouseLeave={() => setHoverBookmark(false)}
                    className="px-3 cursor-pointer"
                  >
                    {clickBookmark ? (
                      <BookmarkAddIcon />
                    ) : (
                      <BookmarkAddOutlinedIcon />
                    )}
                    <div
                      className={`translate-y-[148px] -translate-x-2 hidden  max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-36 z-[999] right-12 text-xs rounded text-white ${hoverbookmark ? "lg:block" : "lg:hidden"
                        }`}
                    >
                      اضافه به لیست
                    </div>
                  </div>
                </div>

                {/* magnify */}

                <SingleProductImageMagnify product={product} />

              </div>

              <SingleProductThumbnailModalImage product={product} />
              <SingleProductSlider
                modalMobileSwiper={modalMobileSwiper}
                setModalMobileSwiper={setModalMobileSwiper}
                product={product}
              />
            </div>
          </div>
          {/* part tow */}
          <div className="col-span-2 lg:grid  grid-rows-[45px_minmax(auto,_1fr)]">
            <div className="row-span-1  mb-1 text-black font-bold text-[19px] break-word grid-rows-1 mr-8 ml-4">
              {product.name}
            </div>
            {/* part tow */}
            <div className="flex flex-col lg:grid lg:grid-rows-1  lg:grid-cols-11">
              {/* product short description */}
              <div className=" lg:col-span-6 xl:col-span-7 ml-4 mr-8 h-auto flex flex-col ">
                {/* product latin name */}
                <div className="flex w-full items-center">
                  <span className="text-[#c0c2c5] text-xs ml-1">
                    {product.latinName}
                  </span>
                  <div className="h-[1px] bg-[#e0e0e2] grow"></div>
                </div>

                {/* product rate,count question */}

                <div className="flex items-center gap-x-1">
                  <div
                    ref={firstCommentsCount}
                    className="flex gap-x-1 items-center cursor-pointer"
                  >
                    <YellowStar />
                    <div className="text-xs">
                      {comment.length > 0 ? rateCustomersTop : 0}
                    </div>
                    <div className="text-[11px] font-normal text-[#c0c2c5]">
                      ({comment.length})
                    </div>
                  </div>
                  <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                  <div
                    ref={secondCommentsCount}
                    className="text-[#19bfd3] text-xs cursor-pointer"
                  >
                    {comment.length} دیدگاه
                  </div>
                  <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                  <div
                    ref={questionsCount}
                    className="text-[#19bfd3] text-xs cursor-pointer"
                  >
                    {questions.length} پرسش
                  </div>
                </div>

                {/* product information */}

                <div className="hidden lg:flex flex-col order-last">
                  <div className="flex flex-col mt-20 py-3 text-black break-word">
                    <h5 className="text-base font-bold">ویژگی ها</h5>
                  </div>

                  <div className="flex flex-col  border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] items-start gap-y-3 pb-6">
                    {product.productsValues
                      .slice(0, propertyDisplayCount)
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-x-1"
                          >
                            <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4" />
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
                        <KeyboardArrowLeftOutlinedIcon className="" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center py-3 mb-3">
                    <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4" />
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
                      height="70%"
                      objectFit="cover"
                      alt={''}
                    />
                  </div>

                  <div className=" flex flex-col  border border-[#e0e0e2] rounded-lg py-3">
                    <div className="flex">
                      <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center mr-4">
                        <LibraryAddCheckOutlinedIcon className="w-5 h-5" />
                        <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col mr-3">
                        <div className="flex justify-between items-center ">
                          <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                            ویژه اعضای دیجی پلاس
                          </h5>
                          <KeyboardArrowLeftOutlinedIcon className="" />
                        </div>
                        <div className="flex items-center gap-x-1 text-sm pt-2">
                          <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]" />
                          <p className="text-slate-600 text-[12px] font-normal">
                            ارسال رایگان
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* product price information */}

              <div className=" lg:px-0 select-none lg:mt-0 h-fit lg:col-span-5 xl:col-span-4  productPriceBg lg:border border-t-[#f0f0f1]  my-4 lg:my-0 border-t-8 lg:border-t-8 border-[#e0e0e2] rounded-lg lg:py-5 py-3">
                <div className="px-5 flex flex-col pt-5 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  pb-2">
                  <h3 className="font-semibold pb-6">فروشنده</h3>
                  <div className="flex items-start">
                    <Image
                      src="https://iili.io/hufgQj.th.png"
                      width={24}
                      height={24}
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
                  <VerifiedUserOutlinedIcon />
                  <p className="mr-3 text-xs">گارانتی 24 ماهه مادیران</p>
                </div>

                <div className="px-5 flex flex-col  border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
                  <div className="flex">
                    <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                      <LibraryAddCheckOutlinedIcon className="w-5 h-5" />
                      <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <div className="flex justify-between items-center ">
                        <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
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

                <div className="px-5 flex items-center  lg:border lg:border-t-0 lg:border-l-0 lg:border-r-0 border-[#e0e0e2]  py-3">
                  <MonetizationOnIcon className="fill-orange-500 w-5 h-5 mb-1" />
                  <p className=" mr-3 text-[#424750] text-xs">
                    150 امتیاز دیجی کلاب
                  </p>
                  <ErrorOutlineOutlinedIcon className="mr-1 w-4 h-4" />
                </div>

                <div
                  className={`productPriceBg w-full lg:px-5 px-2 sm:px-12 h-auto bottom-0 fixed lg:relative justify-between items-center bg-white py-2 z-[99] lg:z-0 border-2 lg:border-0 border-l-0 border-r-0 border-b-0  border-gray-200 lg:flex-col-reverse lg:flex lg:items-end lg:w-full lg:gap-y-3 lg:py-3 ${modalMobileSwiper ? "hidden" : "flex"
                    }`}
                >
                  {quantityReduxProduct > 0 ? (
                    <div className="flex items-center w-full">
                      {/* count */}
                      <div className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                        <button
                          onClick={() => addRedux(product)}
                          disabled={quantityReduxProduct == product.stock ? true : false}
                          className={`${quantityReduxProduct == product.stock ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <AddCircleOutlinedIcon
                            className="fill-[#ef4056]" />
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
                            <DeleteOutlinedIcon className="fill-[#ef4056]" />
                          ) : (
                            <RemoveOutlinedIcon className="fill-[#ef4056]" />
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
                    <button onClick={() => addRedux(product)} className="bg-[#ef394e] text-xs text-center text-white px-6 py-2 sm:px-16 sm:py-3 md:px-32 md:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0">
                      افزودن به سبد خرید {quantityReduxProduct}
                    </button>

                  )}
                  {product.offer > 0 ? (
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
                    <span
                      className="text-[18px] text-black"
                    >
                      {Number(product.price).toLocaleString()} تومان
                    </span>
                  )}
                </div>
              </div>
              <div className="flex lg:hidden flex-col px-4 border-4 border-b-0 border-l-0 border-r-0 border-[#e0e0e2] ">
                <div className="flex flex-col mt-2 py-3 text-black break-word">
                  <h5 className="text-base font-bold">ویژگی ها</h5>
                </div>

                <ul className="flex flex-col border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] pb-6 items-start gap-y-3">
                  {product.productsValues
                    .slice(0, propertyDisplayCount)
                    .map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-x-1">
                          <NoiseControlOffIcon className="fill-[#e0e0e2] w-4 h-4" />
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
                      <KeyboardArrowLeftOutlinedIcon className="" />
                    </button>
                  )}
                </ul>

                <div className="flex items-center py-3 mb-6 px-2 lg:px-0">
                  <ErrorOutlineOutlinedIcon className="stroke-[#81858b] mr-1 w-4 h-4" />
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
                    height="70%"
                    // layout="responsive"
                    objectFit="cover"
                    alt={''}
                  />
                </div>

                <div className="bg-white flex flex-col ml-4 lg:ml-0 border border-[#e0e0e2] rounded-lg py-3">
                  <div className="flex">
                    <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center mr-4">
                      <LibraryAddCheckOutlinedIcon className="w-5 h-5" />
                      <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <div className="flex justify-between items-center ">
                        <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
                          ویژه اعضای دیجی پلاس
                        </h5>
                        <KeyboardArrowLeftOutlinedIcon className="" />
                      </div>
                      <div className="flex items-center gap-x-1 text-sm pt-2">
                        <LocalShippingOutlinedIcon className="w-4 h-4 stroke-[#e6123d]" />
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
        </div>

        <div className="hidden lg:flex justify-between py-6 text-xs px-16 text-[#a1a3a8] tex-[11px] border border-b-8 mx-4 my-5">
          <div className="flex items-center">
            <div className="ml-1">
              <Image
                src="https://www.digikala.com/statics/img/svg/infosection/express-delivery.svg"
                width={40}
                height={40}
                alt={''}
              />
            </div>
            <p>امکان تحویل اکسپرس</p>
          </div>
          <div className="flex items-center">
            <div className="ml-1">
              <Image
                src="https://www.digikala.com/statics/img/svg/infosection/support.svg"
                width={40}
                height={40}
                alt={''}
              />
            </div>
            <p>24 ساعته، 7 روز هفته</p>
          </div>
          <div className="flex items-center">
            <div className="ml-1">
              <Image
                src="https://www.digikala.com/statics/img/svg/infosection/cash-on-delivery.svg"
                width={40}
                height={40}
                alt={''}
              />
            </div>

            <p>امکان پرداخت در محل</p>
          </div>
          <div className="flex items-center">
            <div className="ml-1">
              <Image
                src="https://www.digikala.com/statics/img/svg/infosection/days-return.svg"
                width={40}
                height={40}
                alt={''}
              />
            </div>

            <p>هفت روز ضمانت بازگشت کالا</p>
          </div>
          <div className="flex items-center">
            <div className="ml-1">
              <Image
                src="https://www.digikala.com/statics/img/svg/infosection/original-products.svg"
                width={40}
                height={40}
                alt={''}
              />
            </div>

            <p>ضمانت اصل بودن کالا</p>
          </div>
        </div>

        {/* related products swiper */}
        {relatedProducts.length > 0 && (
          <div className="h-auto w-auto lg:mx-4 lg:my-4 px-4 lg:px-4 lg:py-3 rounded-lg border border-[#e0e0e2]">
            <div className="py-3 mb-3">
              <h5 className="text-[#0c0c0c] font-bold py-1 ">کالا های مشابه</h5>
              <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"></div>
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
                onLazyImageLoad={true}
                modules={[Pagination, Navigation, Lazy]}
                className="!h-full w-full cursor-pointer"
              >
                <div className="w-fit border-4 bg-green-700">
                  {relatedProducts.slice(0, 10).map((relatedProduct, index) => {
                    return (
                      <Fragment key={index}>
                        <SwiperSlide>
                          <div ref={smoothScrollToTopRef} onClick={(e) => relatedProductLink(relatedProduct.slug)} className=" flex flex-col border border-t-0 border-r-0 border-b-0 px-2 cursor-pointer">
                            <Image
                              src={relatedProduct.thumbnail}
                              alt=""
                              width="100%"
                              height="100%"
                              layout="responsive"
                              objectFit="contain"
                            />

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
        )}

        {/* indicator navbar */}
        <div className="w-auto h-auto  bg-white">
          {/* product above nav */}
          <nav
            ref={nav}
            className={`hidden mt-6 pt-2 mr-4 ml-[32px] w-auto h-auto border border-t-0 border-r-0 border-l-0 border-[#e0e0e2] bg-white z-[3] sticky text-white xl:block ${showSticky ? "top-[107px]" : "top-[59px]"
              } `}
          >
            <ul
              ref={menu}
              className={`hidden xl:flex text-xs font-bold  w-auto mb-1`}
            >
              <li
                ref={moarefi}
                className={`py-2 px-4 cursor-pointer ${scrolled == 1 ? "text-[#ef394e]" : "text-[#81858b]"
                  }`}
              >
                معرفی
              </li>
              <li
                ref={moshakhasat}
                className={`py-2 px-4 cursor-pointer ${scrolled == 2 ? "text-[#ef394e]" : "text-[#81858b]"
                  }`}
              >
                مشخصات
              </li>
              <li
                ref={didgah}
                className={`py-2 px-4 cursor-pointer ${scrolled == 3 ? "text-[#ef394e]" : "text-[#81858b]"
                  }`}
              >
                دیدگاه ها
              </li>
              <li
                ref={porsesh}
                className={`py-2 px-4 cursor-pointer ${scrolled == 4 ? "text-[#ef394e]" : "text-[#81858b]"
                  }`}
              >
                پرسش ها
              </li>
            </ul>
            <div
              ref={activeLine}
              className="h-1 bg-[#ef394e] rounded-tl-[4px] rounded-tr-[4px] absolute bottom-0 transition-all duration-[0.2]"
            ></div>
          </nav>

          {/* product section */}

          <section className="lg:flex xl:grid grid-cols-12 pb-16">
            {/* product main section */}
            <div className="xl:col-span-9 xl:mx-5 px-4 lg:px-0">
              {/* product introduce */}

              <div
                ref={sectionFirst}
                className="py-6  border-4 border-t-0 border-r-0 border-l-0 border-[#f0f0f1]"
              >
                <h5 className="mb-8 font-bold">معرفی</h5>
                <p className="relative mb-2 text-sm text-[#232933] leading-7 text-justify  ">
                  {showMoreDescription ? more : less}
                </p>
                {more.length > 250 && (
                  <button
                    className="text-[#19bfd3] text-xs font-bold flex items-center"
                    onClick={showMoreHandler}
                  >
                    {showMoreDescription ? "نمایش کمتر" : "نمایش بیشتر"}
                    <KeyboardArrowLeftIcon className="mr-1 fill-[#19bfd3]" />
                  </button>
                )}
              </div>
              {/* product moshakhasat */}
              <div
                ref={sectionSecond}
                className="py-3 border-4 border-t-0 border-r-0 border-l-0 border-[#f0f0f1]"
              >
                <div className="py-3 mb-3 ">
                  <h5 className="text-[#0c0c0c] font-bold py-1 ">مشخصات</h5>
                  <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"></div>
                </div>
                <div className="flex flex-row">
                  <div className="hidden lg:block min-w-[256px] h-auto ml-12">
                    <h5 className="text-[#424750] font-bold">مشخصات</h5>
                  </div>
                  <ul className="w-full">
                    {product.productsValues
                      .slice(0, specificationsDisplayCount)
                      .map((specification, index) => {
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
              {/* product comments */}
              <div ref={sectionThird} className="w-full h-auto">
                {/* product users comments in laptop and computer device */}

                <div className="hidden lg:block py-6  border-4 border-t-0 border-r-0 border-l-0 border-[#f0f0f1]">
                  <div className="py-3 mb-3">
                    <h5 className="text-[#0c0c0c] font-bold py-1 ">
                      امتیاز و دیدگاه کاربران
                    </h5>
                    <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"></div>
                  </div>

                  <div className="flex flex-row ">
                    <div className="hidden lg:flex flex-col min-w-[256px] ml-12 h-auto sticky top-20">
                      {/* rate */}
                      <div className="flex items-center">
                        <div className="text-[26px] font-medium ml-1">
                          {comment.length > 0 ? rateCustomers : 0}
                        </div>
                        <div className="text-[10px]">از 5</div>
                      </div>

                      {/* star rate */}

                      <div className="flex items-center">
                        {rateCustomers == 1 ? (
                          <>
                            <YellowStar />
                            <WhiteStar />
                            <WhiteStar />
                            <WhiteStar />
                            <WhiteStar />
                          </>
                        ) : rateCustomers == 2 ? (
                          <>
                            <YellowStar />
                            <YellowStar />
                            <WhiteStar />
                            <WhiteStar />
                            <WhiteStar />
                          </>
                        ) : rateCustomers == 3 ? (
                          <>
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                            <WhiteStar />
                            <WhiteStar />
                          </>
                        ) : rateCustomers == 4 ? (
                          <>
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                            <WhiteStar />
                          </>
                        ) : rateCustomers == 5 ? (
                          <>
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                            <YellowStar />
                          </>
                        ) : (
                          rateCustomers == 0 && (
                            <>
                              <WhiteStar />
                              <WhiteStar />
                              <WhiteStar />
                              <WhiteStar />
                              <WhiteStar />
                            </>
                          )
                        )}

                        <p className="mr-2 text-[10px]">
                          از مجموع {comment.length} امتیاز
                        </p>
                      </div>

                      {/* rate borders */}

                      <div ref={rateRef}>
                        {product.sellerView.map((sellerView, index) => {
                          return (
                            <div key={index} className="flex flex-col pt-5">
                              <p className="text-[#424750] text-xs mb-2">
                                {sellerView.property}
                              </p>
                              <div className="flex items-center">
                                <div className="h-[10px] w-min-[140px] w-full bg-[#f0f0f1] rounded-2xl ml-2">
                                  <div
                                    className={`   h-full bg-[#19bfd3] rounded-2xl`}
                                  ></div>
                                </div>
                                <p className="text-xs">{sellerView.rate}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setOpenCustomersComment(true)}
                        className="border mt-6 border-[#ef4056] flex items-center justify-center py-2 px-4 h-10 select-none cursor-pointer rounded-lg"
                      >
                        <span className="text-[#ef4056] font-bold text-xs">
                          ثبت دیدگاه
                        </span>
                      </button>
                    </div>

                    {/* users comments in laptop and computer device*/}

                    <div className="flex flex-col w-full">
                      {comments.length > 0 ? (
                        comments
                          .map((comment, index) => {
                            return (
                              <div key={index} className="flex flex-row mt-6">
                                <div className="text-[11px] text-white font-bold max-h-[20px] bg-[#00a049] px-2 py-1 flex items-center justify-center rounded-sm min-w-[32px] ml-2 mt-1 ">
                                  {comment.rate}.0
                                </div>
                                <div className="flex flex-col w-full">
                                  {/* عنوان نظر */}
                                  <h4 className="text-base font-bold text-[#0c0c0c] pb-3">
                                    {comment.title}
                                  </h4>
                                  {/* مشخصات */}
                                  <div className="flex items-center gap-x-1 py-2 border-2 border-t-0 border-r-0 border-l-0 border-[#f0f0f1] w-full">
                                    <p className="text-[11px] text-[#a1a3a8]">
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleDateString("fa-IR")}
                                    </p>
                                    <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                                    <p className="text-[11px] text-[#a1a3a8]">
                                      {comment.unknown
                                        ? "کاربر دیجی کالا"
                                        : comment.name}
                                    </p>
                                  </div>
                                  {/* متن نظر */}
                                  <div className="flex flex-col border-2 border-t-0 border-r-0 border-l-0 border-[#f0f0f1] py-2 w-full">
                                    <div className="pt-6 w-full"></div>
                                    <p className="text-sm text-[#0c0c0c] pt-3 mb-1 break-words">
                                      {comment.description}
                                    </p>
                                    {/* نظرات مثبت */}

                                    {comment.positiveComments.map(
                                      (positive, index) => {
                                        return (
                                          <div key={index} className="flex flex-row items-end py-1">
                                            <div className="flex items-end ml-1">
                                              <AddIcon className="w-4 h-4 fill-[#00a049]" />
                                            </div>
                                            <p
                                              key={positive.id}
                                              className="text-xs text-black mt-1"
                                            >
                                              {positive.description}
                                            </p>
                                          </div>
                                        );
                                      }
                                    )}

                                    {/* نظرات منفی */}

                                    {comment.negativeComments.map(
                                      (negative, index) => {
                                        return (
                                          <div key={index} className="flex flex-row items-end py-1">
                                            <div className="flex items-end ml-1">
                                              <RemoveIcon className="w-4 h-4 fill-[#00a049]" />
                                            </div>
                                            <p
                                              key={negative.id}
                                              className="text-xs text-black mt-1"
                                            >
                                              {negative.description}
                                            </p>
                                          </div>
                                        );
                                      }
                                    )}
                                    {/* <p className="text-sm text-black"></p> */}
                                  </div>
                                  <div className="flex items-center justify-end w-full py-2">
                                    <p className="ml-10 text-xs text-[#81858b]">
                                      آیا این دیدگاه مفید بود؟
                                    </p>
                                    <div className="px-4 py-1 flex items-center justify-between gap-x-1 cursor-pointer ml-1">
                                      <span className="text-[#a1a3a8] text-xs">
                                        0
                                      </span>
                                      <ThumbUpIcon className="w-5 h-5 fill-[#a1a3a8]" />
                                    </div>
                                    <div className="py-1 flex items-center justify-between gap-x-1 cursor-pointer">
                                      <span className="text-[#a1a3a8] text-xs">
                                        0
                                      </span>
                                      <ThumbDownIcon className="w-5 h-5 fill-[#a1a3a8]" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                          .reverse()
                      ) : (


                        <div className="flex justify-center items-center w-full h-full">
                          <h2 className="w-full text-center">
                            هنوز دیدگاهی ثبت نشده است
                          </h2>
                        </div>

                      )}

                      {/* دیدگاه مفید */}
                    </div>
                  </div>
                </div>

                {/* users comments in mobile device*/}

                <div className="flex pt-2 mb-3 lg:hidden flex-col w-full border-4 border-t-0 border-r-0 border-l-0 border-[#e0e0e2]">
                  <div className="flex ">
                    <h4 className="text-[#0c0c0c] text-sm">دیدگاه ها</h4>
                    <span className="mr-auto text-[#19bfd3] text-[11px]">
                      {comment.length} دیدگاه
                    </span>
                  </div>

                  {/* fixed onclick comments user */}
                  <div
                    className={`hidden h-full w-full transition-all duration-500 translate-y-full `}
                  >
                    fe
                  </div>
                  {comment.map((comments) => comments).length > 0 ? (
                    <div className="h-[210px] mb-20">
                      <Swiper
                        breakpoints={{
                          0: {
                            slidesPerView: 2,
                          },
                          510: {
                            slidesPerView: 3,
                          },
                          700: {
                            slidesPerView: 4,
                          },
                          850: {
                            slidesPerView: 5,
                          },
                        }}
                        slidesPerView={2}
                        spaceBetween={10}
                        className="!h-full w-full mt-4"
                      >
                        {comment.slice(0, 10).map((comment) => {
                          return (
                            <Fragment key={comment.id}>
                              <SwiperSlide>
                                <div className="flex flex-col border h-full w-full px-4 py-4 rounded-lg">
                                  <p className="text-sm font-bold line-clamp-2">
                                    {comment.title}
                                  </p>
                                  {/* <div className="w-full pt-6"></div> */}
                                  <p className="text-xs mt-4 line-clamp-5">
                                    {comment.description}
                                  </p>
                                  <div className="flex items-center gap-x-1 py-2 w-full mt-auto">
                                    <p className="text-[11px] text-[#a1a3a8]">
                                      12 مرداد
                                    </p>
                                    <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3" />
                                    <p className="text-[11px] text-[#a1a3a8]">
                                      {comment.unknown
                                        ? "کاربر دیجی کالا"
                                        : comment.name}
                                    </p>
                                  </div>
                                </div>
                              </SwiperSlide>
                            </Fragment>

                          );
                        })}
                      </Swiper>
                    </div>
                  ) : (
                    <p className="py-6 my-3 text-center">
                      دیدگاهی ثبت نشده است
                    </p>
                  )}
                </div>

                {/* modal customers comments */}
                <div
                  className={`w-full top-0 left-0 h-full transition-all duration-500 flex items-center justify-center z-[999] ${openCustomersComment ? "fixed" : "hidden"
                    } `}
                >
                  <div
                    onClick={() => setOpenCustomersComment(false)}
                    className="absolute w-full h-full bg-[#0000004d] opacity-15"
                  ></div>

                  <div
                    className={`xl:max-h-[80vh] xl:max-w-[800px] w-full h-full rounded-lg bg-white z-20 flex flex-col `}
                  >
                    <div className="flex items-center w-auto mx-6 border border-t-0 border-r-0 border-l-0 mb-4 border-[#e0e0e2] xl:shadow-md">
                      <div className="relative h-auto text-center pt-2 pb-2 overflow-y-hidden flex flex-col gap-y-2 w-full items-start">
                        <p className="font-bold text-start">تصاویر رسمی</p>
                        <span className="text-[#81858b] text-xs">
                          در مورد {product.name}
                        </span>
                      </div>

                      <svg
                        onClick={() => setOpenCustomersComment(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-auto scale-110 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>

                    <div className="w-full h-full bg-white mt-8 overflow-y-scroll scrollCustomer flex flex-col pb-7">
                      <div className="w-full flex h-auto">
                        <div className="w-full  xl:w-1/2 flex flex-col px-6">
                          {/* put score */}
                          <div className="w-full flex items-center justify-center">
                            <p className="text-sm ml-1">امتیاز دهید!:</p>
                            <span className="text-sm">
                              {customerScore == 1
                                ? "خیلی بد"
                                : customerScore == 2
                                  ? "بد"
                                  : customerScore == 3
                                    ? "متوسط"
                                    : customerScore == 4
                                      ? "خوب"
                                      : customerScore == 5
                                        ? "عالی"
                                        : ""}
                            </span>
                          </div>
                          {/* input range score */}
                          <div className="w-full slider flex flex-col space-y-2   pt-4 pb-6 px-3 border border-r-0 border-t-0 border-l-0">
                            <input
                              onChange={(e) => setCustomerScore(e.target.value)}
                              className="accents w-full cursor-pointer rounded-lg  border-0"
                              defaultValue="0"
                              type="range"
                              min="0"
                              max="5"
                              step="1"
                            />

                            <ul className="flex justify-between w-full px-[10px]">
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                              <li className="flex justify-center relative w-1 h-1 rounded-full bg-[#ccc]"></li>
                            </ul>
                          </div>

                          <h2 className="text-base font-bold my-6">
                            دیدگاه خود را شرح دهید
                          </h2>
                          <label className="mb-2 text-sm">عنوان نظر</label>
                          <input
                            onChange={customersCommentHandler}
                            className="border rounded-lg py-1 px-2"
                            type="text"
                            name="title"
                            value={customerComment.title}
                          />

                          <label className="mb-2 text-sm mt-8">
                            نام خود را وارد کنید
                          </label>
                          <input
                            onChange={customersCommentHandler}
                            className="border rounded-lg py-1 px-2 mt-1 mb-2"
                            type="text"
                            name="name"
                            value={customerComment.name}
                          />

                          <div className="mt-2 pt-7 pb-6">
                            <h5 className="mb-2 text-sm">نظرات مثبت</h5>
                            <div className="relative mt-2">
                              <div
                                ref={positiveRef}
                                contentEditable={true}
                                className="border pl-5 py-2  rounded-lg pr-2 h-full text-sm"
                              ></div>
                              <AddIcon
                                onClick={clickPositiveHandler}
                                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
                              />
                            </div>

                            <div className="mt-2 w-full">
                              {allPositive.map((positive, index) => {
                                return (
                                  <div key={index} className="flex items-center py-1">
                                    <AddIcon className="h-4 w-4 ml-1 cursor-pointer" />
                                    <div className="break-all text-xs">
                                      {positive.description}
                                    </div>
                                    <DeleteIcon
                                      onClick={() =>
                                        deletePositiveHandler(positive.id)
                                      }
                                      className="mr-auto h-4 w-4 cursor-pointer"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-2 pb-6">
                            <h5 className="text-sm">نظرات منفی</h5>
                            <div className="relative mt-2">
                              <div
                                ref={negativeRef}
                                contentEditable={true}
                                className="border pl-5 py-2 rounded-lg pr-2 h-full text-sm"
                              ></div>
                              <AddIcon
                                onClick={clickNegativeHandler}
                                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
                              />
                            </div>

                            <div className="mt-2 w-full">
                              {allNegative.map((negative, index) => {
                                return (
                                  <div key={IndeterminateCheckBoxOutlined} className="flex items-center py-1">
                                    <AddIcon className="h-4 w-4 ml-1 cursor-pointer" />
                                    <div className="break-all text-xs">
                                      {negative.description}
                                    </div>
                                    <DeleteIcon
                                      onClick={() =>
                                        deleteNegativeHandler(negative.id)
                                      }
                                      className="mr-auto h-4 w-4 cursor-pointer"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <label className="text-sm">متن نظر</label>
                          <input
                            onChange={customersCommentHandler}
                            className="border rounded-lg py-1 px-2 mt-1 mb-4 resize-none"
                            type="text"
                            name="description"
                            value={customerComment.description}
                          />

                          <div
                            onClick={customerUnknownHandler}
                            className="cursor-pointer flex items-center mt-4 mb-4 py-1 select-none"
                          >
                            {unknown ? (
                              <CheckBoxIcon />
                            ) : (
                              <CheckBoxOutlineBlankIcon />
                            )}
                            <span className="text-sm mr-1">
                              ثبت نظر به عنوان ناشناس
                            </span>
                          </div>
                        </div>

                        <div className="hidden lg:flex flex-col w-1/2 border mx-6 px-4 rounded-lg pt-4 gap-y-1 leading-6 h-auto">
                          <h5 className="text-lg  mt-4">
                            دیگران را با نوشتن نظرات خود، برای انتخاب این محصول
                            راهنمایی کنید.
                          </h5>

                          <p className="text-[#2980b9] text-sm">
                            لطفا پیش از ارسال نظر، خلاصه قوانین زیر را مطالعه
                            کنید:
                          </p>

                          <p className="text-[11px]">
                            لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و
                            با بیانی رسمی و عاری از لحن تند، تمسخرو توهین باشد.
                          </p>

                          <p className="text-[11px]">
                            از ارسال لینک‌ سایت‌های دیگر و ارایه‌ی اطلاعات شخصی
                            نظیر شماره تماس، ایمیل و آی‌دی شبکه‌های اجتماعی
                            پرهیز کنید.
                          </p>

                          <p className="text-[11px] font-bold">
                            در نظر داشته باشید هدف نهایی از ارائه‌ی نظر درباره‌ی
                            کالا ارائه‌ی اطلاعات مشخص و مفید برای راهنمایی سایر
                            کاربران در فرآیند انتخاب و خرید یک محصول است.
                          </p>

                          <p className="text-[11px]">
                            با توجه به ساختار بخش نظرات، از پرسیدن سوال یا
                            درخواست راهنمایی در این بخش خودداری کرده و سوالات
                            خود را در بخش «پرسش و پاسخ» مطرح کنید.
                          </p>

                          <p className="text-[11px]">
                            افزودن عکس و ویدیو به نظرات:
                          </p>

                          <p className="text-[11px]">
                            با مطالعه‌ی این لینک می‌توانید مفید‌ترین الگوی عکاسی
                            از کالایی که خریداری کرده‌اید را مشاهده کنید.
                          </p>

                          <p className="text-[#2980b9] text-sm">
                            پیشنهاد می‌شود قوانین کامل ثبت نظر را در این صفحه
                            مطالعه کنید.
                          </p>

                          <p className="text-[11px]">
                            هرگونه نقد و نظر در خصوص سایت دیجی‌کالا، مشکلات
                            دریافت خدمات و درخواست کالا و نیز گزارش تخلف فروش
                            (نظیر گزارش کالای غیراصل یا مغایر) را با ایمیل
                            info@digikala.com یا با شماره‌ی ۶۱۹۳۰۰۰۰ - ۰۲۱ در
                            میان بگذارید و از نوشتن آن‌ها در بخش نظرات خودداری
                            کنید.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mx-4 py-3">
                        <button
                          onClick={submitCommentHandler}
                          className="bg-[#ef4056] text-white py-3 px-4 w-1/2 rounded-lg"
                        >
                          ثبت دیدگاه
                        </button>
                        <div className="px-3 py-3 text-xs break-words w-1/2 mr-4">
                          ثبت دیدگاه به معنی موافقت با قوانین انتشار دیجی کالا
                          است.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* product questions */}

              <div ref={sectionFour} className="w-full h-auto">
                {/* product Questions */}

                <div className="hidden lg:block py-6 border-t-0 border-r-0 border-l-0 border-[#e0e0e2]">
                  <div className="py-3 mb-3">
                    <h5 className="text-[#0c0c0c] font-bold py-1 ">پرسش ها</h5>
                    <div className="w-[112px] h-[3.2px] bg-[#ef394e] mt-3"></div>
                  </div>

                  <div className="flex flex-row">
                    {/* ask box */}
                    <div className="hidden lg:flex flex-col min-w-[256px] ml-12  h-auto sticky top-20">
                      <span className="mt-7 mb-5 text-[#424750] text-[10px]">
                        شما هم درباره این کالا پرسش ثبت کنید
                      </span>
                      <button
                        onClick={() => setOpenCustomersQuestion(true)}
                        className="border border-[#ef4056] flex items-center justify-center py-2 px-4 mt-2 h-10 select-none cursor-pointer rounded-lg"
                      >
                        <span className="text-[#ef4056] font-bold text-xs">
                          پرسش
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-row lg:flex-col w-full gap-y-4 gap-x-6 lg:gap-x-0">
                      {/* users questions */}
                      {questions.length > 0 ? (
                        questions.map((question, index) => {
                          return (
                            <div key={index} className="flex flex-row items-start lg:w-full  mb-4 lg:border-0 border-2 border-[#e0e0e2] h-full ">
                              <div className="text-[11px] text-white font-bold max-h-[20px]  px-2 py-1 flex items-center justify-center min-w-[32px] ml-2  w-full ">
                                <div className="pb-2 ml-1">
                                  <HelpCenterOutlinedIcon className="w-6 h-6 fill-[#19bfd3] " />
                                </div>
                                <div className="text-sm text-[#0c0c0c] break-words border-2 border-t-0 border-r-0 border-l-0 border-[#e0e0e2] w-full  pb-2">
                                  {question.questionsBox}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex justify-center items-center text-center">
                          <p className="text-center">

                            هنوز سوالی ثبت نشده است
                          </p>
                        </div>
                      )}

                      {/* متن سوال */}
                    </div>
                  </div>
                </div>

                {/* product Questions mobile device */}
                {questions.map(question => question).length > 0 ? (
                  <div className="flex lg:py-2 lg:hidden flex-col w-full">
                    <div className="flex ">
                      <h4 className="text-[#0c0c0c] text-sm">پرسش ها</h4>
                      <span className="mr-auto text-[#19bfd3] text-[11px]">
                        {questions.map(question => question).length} پرسش
                      </span>
                    </div>

                    {/* fixed onclick comments user */}
                    <div
                      className={`hidden h-full w-full transition-all duration-500 translate-y-full `}
                    >
                      fe
                    </div>

                    <div className="h-[150px] lg:mb-4">
                      <Swiper
                        breakpoints={{
                          0: {
                            slidesPerView: 2,
                          },
                          510: {
                            slidesPerView: 3,
                          },
                          700: {
                            slidesPerView: 4,
                          },
                          850: {
                            slidesPerView: 5,
                          },
                        }}
                        spaceBetween={5}
                        className="!h-full w-full mt-4 "
                      >
                        {questions.map((question, index) => (
                          <Fragment key={index}>
                            <SwiperSlide>
                              <div className="flex flex-col border h-full w-full px-4 py-4 rounded-lg cursor-pointer">
                                <h4 className="text-sm font-bold line-clamp-6 leading-6">
                                  {question.questionsBox}
                                </h4>

                              </div>
                            </SwiperSlide>
                          </Fragment>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-2 lg:hidden">
                    <h2 className="font-bold ">
                      هیچ سوالی موجود نمی باشد
                    </h2>
                  </div>
                )}

                {/* modal questions */}

                <div
                  className={`w-full top-0 left-0 h-full transition-all duration-500 flex items-center justify-center z-[999] ${openCustomersQuestion ? "fixed" : "hidden"
                    } `}
                >
                  <div
                    onClick={() => setOpenCustomersQuestion(false)}
                    className="absolute w-full h-full bg-[#0000004d] opacity-15"
                  ></div>

                  <div
                    className={`max-h-auto xl:max-w-[450px] w-full h-auto pb-4 rounded-lg bg-white z-20 flex flex-col`}
                  >
                    <div className="flex items-center w-auto mx-6 border border-t-0 border-r-0 border-l-0 mb-4 border-[#e0e0e2]">
                      <div className="relative w-fit h-auto text-center pt-2 pb-2 overflow-y-hidden overflow-x-hidden flex flex-col gap-y-2">
                        <p className="font-bold">
                          پرسش خود را درباره این کالا ثبت کنید
                        </p>
                      </div>

                      <svg
                        onClick={() => setOpenCustomersQuestion(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-auto scale-110 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>

                    <textarea
                      ref={customersQuestionsRef}
                      onChange={questionBoxChangeHandler}
                      className="border text-sm px-2 py-2 border-[#e0e0e2] mx-6 resize-none rounded-lg"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      minLength="0"
                      maxLength="101"
                    ></textarea>
                    <div className="mx-6 flex justify-end mt-1">
                      {Number(questionCount)} / 100
                    </div>

                    <div className="flex mx-6 h-auto  items-center justify-center mt-8 border border-r-0 border-l-0 border-b-0 border-[#e0e0e2]">
                      <button
                        onClick={clickCustomersQuestions}
                        className="h-auto rounded-lg w-full px-8 py-2 bg-[#ef4056] text-white"
                      >
                        ثبت پرسش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* product sticky price */}

            <div className="hidden mt-8 xl:flex xl:col-span-3 mx-8">
              <div
                className={`sticky select-none w-full h-fit  productPriceBg lg:border border-t-[#f0f0f1] my-4 lg:my-0 lg:border-t-8 border-[#e0e0e2] rounded-lg py-5 ${showSticky ? "top-44" : "top-32"
                  }`}
              >
                <div className="px-5 flex flex-col pt-5 border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  pb-2">
                  <h3 className="font-semibold pb-6">فروشنده</h3>
                  <div className="flex items-start">
                    <Image
                      src="https://iili.io/hufgQj.th.png"
                      width={24}
                      height={24}
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
                  <VerifiedUserOutlinedIcon />
                  <p className="mr-3 text-xs">گارانتی 24 ماهه مادیران</p>
                </div>

                <div className="px-5 flex flex-col  border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
                  <div className="flex">
                    <div className="flex flex-col justify-evenly gap-y-1 stroke-[#19bfd3] items-center">
                      <LibraryAddCheckOutlinedIcon className="w-5 h-5" />
                      <VerticalAlignBottomOutlinedIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <div className="flex justify-between items-center ">
                        <h5 className=" text-[#424750] text-[15px] font-bold ml-auto">
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

                <div className="px-5 flex items-center border border-t-0 border-l-0 border-r-0 border-[#e0e0e2]  py-3">
                  <MonetizationOnIcon className="fill-orange-500 w-5 h-5 mb-1" />
                  <p className=" mr-3 text-[#424750] text-xs">
                    150 امتیاز دیجی کلاب
                  </p>
                  <ErrorOutlineOutlinedIcon className="mr-1 w-4 h-4" />
                </div>

                <div className="productPriceBg w-full lg:px-5 px-2 sm:px-12 h-auto bottom-0 fixed lg:relative  flex justify-between items-center bg-white py-2 z-40 border border-l-0 border-r-0 border-b-0 border-gray-200 lg:flex-col-reverse lg:flex lg:items-end lg:w-full  lg:border-0 lg:gap-y-3 lg:py-3">


                  {quantityReduxProduct > 0 ? (
                    <div className="flex items-center w-full">
                      {/* count */}
                      <div className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2">
                        <button
                          onClick={() => addRedux(product)}
                          disabled={quantityReduxProduct == product.stock ? true : false}
                          className={`${quantityReduxProduct == product.stock ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <AddCircleOutlinedIcon
                            className="fill-[#ef4056]" />
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
                            <DeleteOutlinedIcon className="fill-[#ef4056]" />
                          ) : (
                            <RemoveOutlinedIcon className="fill-[#ef4056]" />
                          )}
                        </button>
                      </div>

                      <div className="flex flex-col justify-start text-sm">
                        <p>در سبد شما</p>
                        <Link href="/cart/checkout" passHref>
                          <p className="cursor-pointer text-blue-400">مشاهده سبد خرید</p>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => addRedux(product)} className="bg-[#ef394e] text-xs text-center text-white px-6 py-2 sm:px-32 sm:py-3 rounded-lg font-bold h-fit lg:w-full lg:px-0">
                      افزودن به سبد خرید
                    </button>
                  )}
                  {product.offer > 0 ? (
                    <div className="flex flex-col gap-y-1 items-end">
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
                    <span
                      className="text-[18px] text-black"
                    >
                      {Number(product.price).toLocaleString()} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>


          </section>
        </div>

        {/* product charts */}
        <div
          className={`w-screen h-screen top-0 z-[999] ${productChart ? "fixed flex justify-center items-center" : "hidden"
            }`}
        >
          <div
            onClick={() => setProductChart(false)}
            className="bg-gray-500 opacity-20 w-screen h-screen absolute top-0 left-0"
          ></div>
          <div className="bg-white z-[99999] w-screen  lg:w-3/4 lg:h-auto">
            <DynamicChart />
          </div>
        </div>

      </div>

      {/* show toastContainer when add or minus product */}
      <ToastContainer position="top-right"
        autoClose={2500}
        style={{ width: "290px" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "#FFC300", color: "black", fontSize: "16px" }}
      />
    </>
  );
}

export const getServerSideProps = store.getServerSideProps((store) => async ({ params }) => {
  const query = params.product;
  const { data } = await axios.get(`http://localhost:3001/product`);
  const customerComment = await axios.get(
    `http://localhost:3001/customersComment`
  );
  let comments = customerComment.data;
  comments = comments.filter((comment) => comment.slug == query);

  const customerQuestion = await axios.get(
    `http://localhost:3001/customersQuestion`
  );
  let questions = customerQuestion.data;
  questions = questions.filter((questions) => questions.slug == query);

  let mainCategory = await axios.get("http://localhost:3001/mainCategory");
  mainCategory = mainCategory.data;
  let category = await axios.get("http://localhost:3001/category");
  category = category.data;

  let product = data.filter((product) => product.slug == query)[0];
  const relatedProducts = data.filter((products) =>
    product && products.subCategory == product.subCategory
      ? products.slug != product.slug
      : null
  );

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
      relatedProducts,
      comments,
      mainCategory,
      category,
      questions,
    },
  };
})

export default HomePage