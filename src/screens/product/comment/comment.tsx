import React, {forwardRef, Fragment, useRef, useState} from "react";
import Star from "@/screens/product/start";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
//@ts-ignore
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";
// import required modules
//@ts-ignore
import {Pagination, Navigation, Lazy} from "swiper";
//@ts-ignore
import {Swiper, SwiperSlide} from "swiper/react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import {useRouter} from "next/router";

const Comment = forwardRef((
    {
      product,
      comment,
      comments,
      rateCustomers,
    }: any,
    ref: any) => {

    const {sectionThird, rateRef} = ref;
    const router = useRouter();

    // ref
    const positiveRef = useRef<any>(null);
    const negativeRef = useRef<any>(null);


    const [openCustomersComment, setOpenCustomersComment] = useState(false);
    const [customerScore, setCustomerScore] = useState(0);
    const [customerComment, setCustomerComment] = useState<any>({
      title: "",
      name: "",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const [allPositive, setAllPositive] = useState<any>([]);
    const [allNegative, setAllNegative] = useState<any>([]);
    const [unknown, setUnknown] = useState<any>(false);


    const deletePositiveHandler = (id: any) => {
      setAllPositive(allPositive.filter((positive: any) => positive.id !== id));
    };

    const deleteNegativeHandler = (id: any) => {
      setAllNegative(allNegative.filter((comment: any) => comment.id !== id));
    };


    const clickNegativeHandler = (e: any) => {
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

    const customersCommentHandler = (e: any) => {
      e.preventDefault();
      setCustomerComment({
        ...customerComment,
        [e.target.name]: e.target.value,
      });
    };

    const clickPositiveHandler = () => {
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

    const customerUnknownHandler = () => {
      setUnknown(!unknown);
    };


    const submitCommentHandler = async (e: any) => {
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
        () => setCustomerComment({
          title: "",
          name: "",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        }))

      .then(() => setAllPositive([]))
      .then(() => setAllNegative([]))
      .then(() => setUnknown(false))
      .then(() => setOpenCustomersComment(false))
    };

    return (
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
                <Star rate={rateCustomers}/>
                <p className="mr-2 text-[10px]">
                  از مجموع {comment?.length} امتیاز
                </p>
              </div>

              {/* rate borders */}

              <div ref={rateRef}>
                {product.sellerView.map((sellerView:any, index:number) => {
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
                .map((comment:any, index:number) => {
                  return (
                    <div key={index} className="flex flex-row mt-6">
                      <div
                        className="text-[11px] text-white font-bold max-h-[20px] bg-[#00a049] px-2 py-1 flex items-center justify-center rounded-sm min-w-[32px] ml-2 mt-1 ">
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
                          <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3"/>
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
                            (positive:any, index:number) => {
                              return (
                                <div key={index} className="flex flex-row items-end py-1">
                                  <div className="flex items-end ml-1">
                                    <AddIcon className="w-4 h-4 fill-[#00a049]"/>
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
                            (negative:any, index:number) => {
                              return (
                                <div key={index} className="flex flex-row items-end py-1">
                                  <div className="flex items-end ml-1">
                                    <RemoveIcon className="w-4 h-4 fill-[#00a049]"/>
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
                            <ThumbUpIcon className="w-5 h-5 fill-[#a1a3a8]"/>
                          </div>
                          <div className="py-1 flex items-center justify-between gap-x-1 cursor-pointer">
                                      <span className="text-[#a1a3a8] text-xs">
                                        0
                                      </span>
                            <ThumbDownIcon className="w-5 h-5 fill-[#a1a3a8]"/>
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
          {comment.map((comments:any) => comments).length > 0 ? (
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
                {comment.slice(0, 10).map((comment:any) => {
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
                            <NoiseControlOffIcon className="fill-[#e0e0e2] w-3 h-3"/>
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
                      onChange={(e:any) => setCustomerScore(e.target.value)}
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
                      {allPositive.map((positive:any, index:number) => {
                        return (
                          <div key={index} className="flex items-center py-1">
                            <AddIcon className="h-4 w-4 ml-1 cursor-pointer"/>
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
                      {allNegative.map((negative:any) => {
                        return (
                          <div key={negative?.id} className="flex items-center py-1">
                            <AddIcon className="h-4 w-4 ml-1 cursor-pointer"/>
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
                      <CheckBoxIcon/>
                    ) : (
                      <CheckBoxOutlineBlankIcon/>
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
    )
  }
)

export default Comment;