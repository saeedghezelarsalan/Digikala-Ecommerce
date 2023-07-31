import React, { useState } from "react";
import SidebarSubCategoryNav from "./SidebarSubCategoryNav";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const SidebarCategoryNav = ({ mainCategory, key, category }) => {
  const [openMobileNavbarCategory, setOpenMobileNavbarCategory] =
    useState(false);

  const toggleMobileNavbar = (id, e) => {
    if (openMobileNavbarCategory == e) {
      setOpenMobileNavbarCategory(null);
    }
    setOpenMobileNavbarCategory((e) => !e);
  };

  return (
    <>
      <div
        className={`px-8 w-full flex justify-between items-center cursor-pointer ${openMobileNavbarCategory ? "text-[#ef4056]" : "text-black"} `}
        onClick={() => toggleMobileNavbar(key)}
        key={key}
      >
        <span className="text-[13px] flex items-center h-[52px]">{mainCategory.name}</span>
        <KeyboardArrowDownIcon />
      </div>

      {openMobileNavbarCategory &&(
      <Link href={`/main/${mainCategory.slug}`}>
          <a className="py-4 flex items-center px-8 mx-8">
            <span className="text-xs text-[#9e9fb1]">همه موارد این دسته</span>
            <KeyboardArrowLeftIcon className="fill-[#9e9fb1] w-4 h-4" />
          </a>
        </Link>)}
      <div className={`${openMobileNavbarCategory ? "block" : "hidden"}`}>
        {category
          .filter((category) => category.mainCategory == mainCategory.name)
          .map((category, index) => (
            <div key={index} className="bg-[#f1f2f4]">
            <SidebarSubCategoryNav mainCategorySlug={mainCategory.slug} category={category} indexs={index} />
            </div>
          ))}
      </div>
    </>
  );
};

export default SidebarCategoryNav;
