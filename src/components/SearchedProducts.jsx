import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addProductToCart, removeProductFromCart } from "../feature/AddToCart";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentLoader from "react-content-loader";

const SearchedProducts = ({ products }) => {
  const [showCountBtn, setShowCountBtn] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(products);
  });

  const { cart } = useSelector((item) => item.cart);
  const dispatch = useDispatch();

  const addRedux = (product) => {
    toast.success("محصول به سبد خرید اضافه شد", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(addProductToCart(product));
  };

  const removeRedux = (product) => {
    toast.error("محصول از سبد خرید کم شد", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(removeProductFromCart(product));
  };

  const showCountBtnMobileHandler = () => {
    setShowCountBtn(true);
    setTimeout(() => {
      setShowCountBtn(false);
    }, 2000);
  };

  const [isImageReady, setIsImageReady] = useState(false);

  // show content loader while loading image
  const onLoadCallBack = (e) => {
    setIsImageReady(true);
    typeof onLoad === "function" && onLoad(e);
  };
  return (
    product && 
    <div
      key={product.id}
      className="bg-white w-full h-full lg:p-2 hover:lg:shadow-2xl hover:lg:z-10 hover:lg:border-0 select-none"
    >
      <div className="flex flex-col cursor-pointer border border-[#f0f0f1] border-x-0 border-b-[1px] border-t-0 sm:border-r-0 sm:border-t-0 md:border-0 ">
        <div className="flex flex-row sm:flex-col md:flex-row lg:flex-col justify-evenly w-full h-full relative items-center  lg:items-start lg:mb-3">
          <div className="flex flex-col w-[118px] sm:w-full md:w-[118px] h-auto lg:w-full lg:h-auto">
            <div className="relative block mb-2 lg:px-8 w-[118px] h-[118px] md:w-[118px] md:h-[118px] sm:w-[240px] sm:h-[240px] lg:w-full lg:h-[240px] ">
              <Link href={`/product/${product.slug}`} key={product.id} passHref>
                <a>
                  {!isImageReady && (
                    <ContentLoader
                      viewBox="0 0 500 500"
                      height={200}
                      width={200}
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
                      <ellipse cx="120" cy="140" rx="28" ry="28" />
                    </ContentLoader>
                  )}
                  <Image
                    onLoadingComplete={onLoadCallBack}
                    src={product.thumbnail}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </Link>
            </div>
            <div className="block absolute bottom-0 right-0 sm:px-4  md:px-8 lg:px-0">
              {cart.find((c) => c.name === product.name) && showCountBtn ? (
                cart
                  .filter((a) => a.name == product.name)
                  .map((products) => {
                    return (
                      <div
                        onMouseLeave={() => setShowCountBtn(false)}
                        key={products.id}
                        className="flex justify-between items-center bg-white w-[102px] max-w-[102px] h-11 max-h-11 ml-2 shadow-[0_1px_5px_1px_rgb(0,0,0,0.2),0_1px_5px_-2px_rgb(0,0,0,0.2)] rounded-sm px-2 select-none"
                      >
                        <button
                          onClick={() => addRedux(product)}
                          disabled={
                            products.quantity == products.stock ? true : false
                          }
                          className={`${
                            products.quantity == products.stock
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }  select-none`}
                        >
                          <AddCircleOutlinedIcon className="fill-[#ef4056]" />
                        </button>
                        <div className="text-[#ef4056] flex flex-col items-center ">
                          <p>{products.quantity}</p>
                          <p className="text-sm">
                            {products.quantity == products.stock && "حداکثر"}
                          </p>
                        </div>
                        <button onClick={() => removeRedux(product)}>
                          {products.quantity == 1 ? (
                            <DeleteOutlinedIcon className="fill-[#ef4056]" />
                          ) : (
                            <RemoveOutlinedIcon className="fill-[#ef4056]" />
                          )}
                        </button>
                      </div>
                    );
                  })
              ) : (
                <button
                  onClick={() => addRedux(product)}
                  onMouseEnter={() => setShowCountBtn(true)}
                  onTouchStart={showCountBtnMobileHandler}
                  className="select-none cursor-pointer h-11 max-h-11 rounded-full p-2"
                >
                  <AddCircleOutlinedIcon className="fill-[#ef4056]" />
                </button>
              )}
            </div>
          </div>

          <div className="w-2/3 sm:w-full flex flex-col justify-center lg:hidden sm:px-4 md:px-8 lg:mx-0">
            <div className="w-full flex ">
              {/* <div className='w-0 sm:w-2/12 h-1/2  lg:hidden'></div> */}
              <h4 className="font-bold text-[13px] md:text-sm lg:text-sm mt-2 line-clamp-2 lg:mb-3  text-[#424750]">
                {product.name}
              </h4>
            </div>

            <div className="flex lg:hidden">
              {/* <div className='w-0 sm:w-1/4 lg:w-1/4 h-1/2  lg:hidden'></div> */}
              <div className="flex flex-col gap-y-3 items-end mb-2 w-full h-1/2  mr-2 lg:mr-0 lg:w-full lg:h-full">
                <div className="flex flex-row justify-between  items-start gap-y-2 lg:gap-y-0 w-full mt-3 sm:flex-row lg:items-center sm:justify-between">
                  <span className="bg-[#ef394e] text-xs text-white rounded-xl  py-0 px-1">
                    {product.offer}%
                  </span>
                  <span className="text-[13px] md:text-sm font-bold lg:text-sm text-[#424750]">
                  {Math.round((product.price * (100 - product.offer)) / 100)} تومان
                  </span>
                </div>
                <div>
                  <del className="text-xs lg:text-sm text-gray-400 ml-2 lg:mt-1">
                    {product.price}
                  </del>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" hidden lg:block ">
          <h4 className="font-bold text-[13px] hidden lg:block lg:text-sm mt-2 line-clamp-2 lg:mb-3 mr-2 lg:mr-0 text-[#424750]">
            {product.name}
          </h4>
        </div>
        <div className="hidden lg:flex ">
          <div className="w-1/4 h-1/2 sm:w-1/2 lg:hidden"></div>
          <div className="flex flex-col gap-y-3 items-end mb-2 w-3/4 h-1/2 sm:w-1/2 mr-2 lg:mr-0 lg:w-full lg:h-full">
            <div className="w-full mt-3 flex items-center justify-between">
              <span className="bg-[#ef394e] text-xs text-white rounded-xl  py-0 px-1">
                {product.offer}%
              </span>
              <span className="text-sm font-bold lg:text-sm text-[#424750]">
              {Math.round((product.price * (100 - product.offer)) / 100).toLocaleString()} تومان
              </span>
            </div>
            <div>
              <del className="text-xs lg:text-sm text-gray-400 ml-2 lg:mt-1">
                {product.price}
              </del>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        style={{ width: "290px" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: "#FFC300",
          color: "black",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default SearchedProducts;
