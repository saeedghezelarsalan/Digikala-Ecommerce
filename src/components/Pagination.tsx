import React, { useState, useEffect } from "react";
import {
  usePaginationRange,
  DOTS,
} from "./hooks/usePaginationRange";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Image from "next/image";

const Pagination = ({
  data,
  RenderComponent,
  searchFilter,
  title,
  buttonConst,
  contentPerPage,
  siblingCount,
  currentPage,
  setCurrentPage,
}:any) => {
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    setTotalPageCount(Math.ceil(data.length / contentPerPage));
  }, [data, totalPageCount, contentPerPage]);

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page:any) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page:any) => page - 1);
  }
  function changePage(event:any) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };

  const productLength = data?.map((a:any) => a).length;
  return productLength > 0 ? (
    <>
      <div className="w-full bg-white">
        {/* show the post 10 post at a time*/}
        <div className="bg-white md:mx-8">
          <div
            className="productsFilters grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 "
          >
              {getPaginatedData().map((product:any, index:number) => {
                return <RenderComponent key={index} products={product} />;
              })}
          </div>
        </div>
        {/* show the pagiantion
                it consists of next and previous buttons
                along with page numbers, in our case, 5 page
                numbers at a time */}
        <div className="lg:px-8 my-3 flex justify-between items-center">
          {/* previous button */}
          <button
            onClick={gotToPreviousPage}
            className={` flex items-center ${
              currentPage === 1
                ? "invisible"
                : "text-[#ef394e] text-xs ml-2 font-bold visible"
            }`}
          >
            <KeyboardArrowRightIcon />
            <span className="mr-2 hidden lg:block">قبلی</span>
          </button>
          {/* show paginated button group */}
          <div className="w-auto flex items-center">
            {paginationRange && paginationRange.map((item, index) => {
              if (item === DOTS) {
                return (
                  <button key={index} className={`w-9 h-9 border rounded-full`}>
                    &#8230;
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  onClick={changePage}
                  className={`w-9 h-9 border rounded-full ${
                    currentPage === item
                      ? "bg-[#ef394e] text-white"
                      : "border-0"
                  }`}
                >
                  <span className=" font-bold text-xs">{item}</span>
                </button>
              );
            })}
          </div>
          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`flex items-center ${
              currentPage === totalPageCount
                ? "invisible"
                : "text-[#ef394e] text-xs ml-2 font-bold visible"
            }`}
          >
            <span className="ml-2 hidden lg:block">بعدی</span>
            <KeyboardArrowLeftIcon />
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-col gap-y-4 w-full items-center justify-center">
      <Image
        src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
        width={200}
        height={150}
        alt={''}
      />
      <h2
        className="font-bold break-w
        "
      >
        محصول مورد نظر موجود نمی باشد
      </h2>
    </div>
  );
};

export default Pagination;
