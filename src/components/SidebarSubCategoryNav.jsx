import Link from "next/link";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SidebarSubCategoryNav = ({ category, indexs, mainCategorySlug }) => {
  const [openCategoryNavbar, setOpenCategoryNavbar] = useState(false);

  const toggleCategoryNavbar = (e) => {
    if (openCategoryNavbar == e) {
      setOpenCategoryNavbar(null);
    }

    setOpenCategoryNavbar((e) => !e);
  };

  return (
    <div className="bg-[#f1f2f4] pr-8 border border-x-0 border-t-0 mx-8">
      <li
        className={`flex items-center justify-between font-bold text-[13px] cursor-pointer text-[#3f4064] h-[52px]  ${openCategoryNavbar ? "text-[#ef4056]" : "text-black"}`}
        key={indexs}
        onClick={() => toggleCategoryNavbar()}
      >
        <p>{category.name.replace("-", " ")}</p>
        <KeyboardArrowDownIcon />
      </li>

      <div
        className={`  ${
          openCategoryNavbar ? "block" : "hidden"
        }`}
      >
        <Link href={`/main/${category.slug}`}>
          <a className="py-4 flex items-center">
            <span className="text-xs text-[#9e9fb1]">همه موارد این دسته</span>
            <KeyboardArrowLeftIcon className="fill-[#9e9fb1] w-4 h-4" />
          </a>
        </Link>
        {category.subCategory.map((subCategory, inde) => (
          <div key={inde} className="h-[52px] flex items-center">
            <p className="text-[#3f4064] text-xs !font-normal">{subCategory.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSubCategoryNav;
