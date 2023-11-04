import React from "react";
import Link from "next/link";

const Breadcrumb = ({product}:any) => {
  return(
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
  )
}

export default Breadcrumb;