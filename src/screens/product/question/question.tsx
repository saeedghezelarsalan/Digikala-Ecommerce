import React, {forwardRef, Fragment, useRef, useState} from "react";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
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
import {useRouter} from "next/router";
import postUsersQuestionApi from "@/api/users/post-users-question";

const Question = forwardRef(({
                               questions,
                             }: any, ref: any) => {
  const router = useRouter();

  const [openCustomersQuestion, setOpenCustomersQuestion] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionsBox, setQuestionsBox] = useState("");

  const {sectionFour} = ref;
  const customersQuestionsRef = useRef<any>(null);


  const questionBoxChangeHandler = (e: any) => {
    setQuestionsBox(e.target.value);
    setQuestionCount(questionsBox.length);
  };

  const clickCustomersQuestions = async (e: any) => {
    e.preventDefault();
    await postUsersQuestionApi({
      id: "",
      questionsBox: questionsBox,
      slug: router.query.product,
    })
    .then(
      () => setOpenCustomersQuestion(false),
    ).then(
      () => setQuestionsBox("")
    ).then(
      () => setQuestionCount(0)
    ).then(
      () => (customersQuestionsRef.current.value = "")
    );
  };

  return (
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
              questions.map((question: any, index: number) => {
                return (
                  <div key={index} className="flex flex-row items-start lg:w-full  mb-4 lg:border-0 border-2 border-[#e0e0e2] h-full ">
                    <div className="text-[11px] text-white font-bold max-h-[20px]  px-2 py-1 flex items-center justify-center min-w-[32px] ml-2  w-full ">
                      <div className="pb-2 ml-1">
                        <HelpCenterOutlinedIcon className="w-6 h-6 fill-[#19bfd3] "/>
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
      {questions.map((question: any) => question).length > 0 ? (
        <div className="flex lg:py-2 lg:hidden flex-col w-full">
          <div className="flex ">
            <h4 className="text-[#0c0c0c] text-sm">پرسش ها</h4>
            <span className="mr-auto text-[#19bfd3] text-[11px]">
                        {questions.map((question: any) => question).length} پرسش
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
              {questions.map((question: any, index: number) => (
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
            cols={30}
            rows={5}
            minLength={0}
            maxLength={101}
          />
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
  )
})

export default Question;