import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductsBasedOnViews = ({product, category}: any) => {
  return (
    product && (
      <div className="w-full h-auto border border-l-0 border-b-0 lg:border-b-[1px] my-4 lg:flex grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 items-center">
        {category
        ?.map((category: any) => category.subCategory)
        .flatMap((sub: any) => sub)
        .slice(0, 4)
        .map((category: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col w-full border border-t-0 border-r-0 lg:border-b-0 p-2"
            >
              <h5 className="font-semibold">
                {category.name.replace("-", " ")}
              </h5>
              <span className="py-2">بر اساس بازدید های شما</span>
              <div className="grid bg-[#e5e7eb] grid-cols-2 grid-rows-2 gap-[1px]">
                {product
                .filter((products:any) => products.subCategory == category.name)
                .slice(0, 4)
                .map((product:any, index:number) => {
                  return (
                    <Link key={index} href={`/product/${product.slug}`}>
                      <div className="block w-full px-5 lg:p-5 bg-white relative">
                        <Image
                          src={product.thumbnail}
                          fill={true}
                          objectFit="fill"
                          alt=""
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link href={`/search/${category.name}`}>
                <h5 className="text-center py-2 text-xs text-blue-300">
                  مشاهده
                </h5>
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ProductsBasedOnViews;
