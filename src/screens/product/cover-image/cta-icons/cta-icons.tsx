import React, {useState} from "react";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import dynamic from "next/dynamic";
const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>loading...</p>,
});
const CtaIcons = () => {
  const [tabHeart, setTabHeart] = useState(false);
  const [clickBookmark, setClickBookmark] = useState(false);
  const [productChart, setProductChart] = useState(false);

  const openTimeLineHandler = () => {
    setProductChart(true)
  }

  return (
    <>
      <div className="flex-row-reverse gap-y-3 h-auto flex lg:flex-col items-center  w-auto ">
        <div
          onClick={() => setTabHeart(!tabHeart)}
          className="px-3 cursor-pointer group/heart"
        >
          <FavoriteIcon className={tabHeart ? "fill-red-500" : "fill-white stroke-black stroke-2"}/>
          <div
            className={`translate-y-[178px] -translate-x-2 hidden max-w-80 w-fit absolute bg-[#424750] border border-[#232933] px-2 py-3 top-0 right-12 text-xs rounded z-[999] text-white group-hover/heart:lg:block`}
          >
            اضافه به علاقه مندی
          </div>
        </div>

        <div className="px-3 cursor-pointer group/timeLine">
          <TimelineIcon onClick={openTimeLineHandler}/>
          <div
            className={`translate-y-[106px] -translate-x-2 hidden  max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-28 z-[999] right-12 text-xs rounded text-white group-hover/timeLine:lg:block`}
          >
            نمودار قیمت
          </div>
        </div>

        <Link href="/login" passHref>
          <div className="px-3 cursor-pointer group/notification">
            <NotificationsActiveOutlinedIcon/>
            <div
              className={`translate-y-44 -translate-x-2 hidden group-hover/notification:lg:block max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-20 z-[999] right-12 text-xs rounded text-white`}
            >
              اطلاع رسانی شگفت انگیز
            </div>
          </div>
        </Link>

        <div
          onClick={() => setClickBookmark(!clickBookmark)}
          className="px-3 cursor-pointer group/bookmark"
        >
          {clickBookmark ? <BookmarkAddIcon/> : <BookmarkAddOutlinedIcon/>}
          <div
            className={`translate-y-[148px] -translate-x-2 hidden group-hover/bookmark:lg:block max-w-80 w-fit break-word absolute bg-[#424750] border border-[#232933] px-2 py-3 top-36 z-[999] right-12 text-xs rounded text-white`}
          >
            اضافه به لیست
          </div>
        </div>

      </div>
      <div className={`w-screen h-screen top-0 left-0 z-[999] ${productChart ? "fixed flex justify-center items-center" : "hidden"}`}>
        <div
          onClick={() => setProductChart(false)}
          className="bg-gray-500 opacity-20 w-screen h-screen absolute top-0 left-0"
        />
        <div className="bg-white z-[99999] w-screen  lg:w-3/4 lg:h-auto">
          <DynamicChart/>
        </div>
      </div>
    </>
  )
}

export default CtaIcons;