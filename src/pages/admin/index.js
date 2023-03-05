import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Chart from "../../components/Chart";
import { AdminSidebar } from "../../components/AdminSidebar";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import CountUp from "react-countup";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [users, setUsers] = useState(null);
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState(null);

  // get data
  const userData = async () => {
    try {
      const users = await axios.get("http://localhost:3001/user");
      const product = await axios.get("http://localhost:3001/product");
      const comments = await axios.get(
        "http://localhost:3001/customersComment"
      );
      setUsers(users.data);
      setProduct(product.data);
      setComments(comments.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const productSellCount =
    product &&
    product
      .map((item) => Number(item.sellCount))
      .reduce(function (previous, current) {
        return previous + current;
      }, 0);

  let productSell =
    product &&
    product
      .map((item) => Number(item.sellCount) * Number(item.price))
      .reduce(function (previous, current) {
        return previous + current;
      }, 0)
      .toLocaleString("fa-IR");

  return (
    <div className="bg-[#f14d60] flex justify-center">
      <div className="flex w-full max-w-screen-2xl h-auto max-h-max !min-h-max  pb-8">
        <Head>
          <meta key="robots" name="robots" content="noindex,follow" />
          <meta key="googlebot" name="googlebot" content="noindex,follow" />
        </Head>

        {/* سایدبار */}
        <AdminSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        {/* لیست اصلی */}

        <div className="w-full xl:w-10/12 h-auto flex flex-col bg-[#f14d60] py-4 px-3 xl:px-3 ">
          {/* باکس */}
          <div className="py-4 mt-3 block xl:hidden ">
            <MenuIcon
              onClick={() => setShowSidebar(true)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <div className="w-full h-fit grid grid-cols-2 grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-8">
            <div className="naves flex flex-col items-center justify-center w-auto h-auto  py-2 text-[#461919] font-extrabold">
              <div>فروش</div>
              <div className="text-white py-2 text-center">
                {product && productSell} تومان
              </div>
            </div>

            <div className="naves flex flex-col items-center justify-center w-auto h-auto  py-2 text-[#461919] font-extrabold">
              <div>تعداد فروش</div>
              <div className="text-white py-2">
                <CountUp end={product && productSellCount} /> عدد
              </div>
            </div>

            <div className="naves flex flex-col items-center justify-center w-auto h-auto  py-2 text-[#461919] font-extrabold">
              <div>تعداد محصول</div>
              <div className="text-white py-2">
                <CountUp end={product && product.length} /> عدد
              </div>
            </div>

            <div className="naves flex flex-col items-center justify-center w-auto h-auto  py-2 text-[#461919] font-extrabold">
              <div>تعداد کاربران</div>
              <div className="text-white py-2">
                <CountUp end={users && users.length} /> عدد
              </div>
            </div>
          </div>

          {/* نمودار */}

          <div className="hidden lg:block">
            <Chart />
          </div>

          {/* ثبت نام و نظرات کاربران */}

          <div className="w-full h-auto flex flex-col flex-wrap xl:flex-row xl:flex-nowrap xl:items-start xl:justify-between xl:gap-x-4 gap-y-6 xl:gap-y-0 mt-8">
            {/* تاریخ عضویت کاربران */}

            <div className="xl:w-1/4 w-full bg-white naves h-auto flex flex-col text-[#461919] font-extrabold py-4 px-4 mr-0 xl:mr-4">
              <h1 className="text-center py-2">آخرین کاربران</h1>
              <ul>
                <div className="flex items-center text-white py-2">
                  <div>نام کاربران</div>
                  <div className="mr-auto">تاریخ عضویت</div>
                </div>
                {users &&
                  users
                    .slice(-4)
                    .map((item) => (
                      <div className="flex  items-center border border-black border-r-0 border-l-0 border-b-0 py-1">
                        <div>{item.name}</div>
                        <div className="mr-auto">
                          {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                        </div>
                      </div>
                    ))
                    .reverse()}
              </ul>
            </div>

            {/* نظرات کاربران */}

            <div className="xl:w-3/4 w-full bg-white naves h-auto flex flex-col text-[#461919] font-extrabold py-4 px-4">
              <h1 className="text-center py-2">آخرین نظرات کاربران</h1>
              <ul>
                {comments &&
                  comments.slice(0, 5).map((item) => (
                    <div className="">
                      <div className="flex items-start flex-col border border-black border-r-0 border-l-0 border-b-0 pt-2">
                        <div className="mr-2">{item.name}</div>
                        <div className="mr-2">
                          <Link href={`/product/${item.slug}`}>
                            <a>
                              <h1>لینک : {item.productName}</h1>
                            </a>
                          </Link>
                        </div>
                      </div>
                      <li className="w-full h-auto flex items-center justify-between pt-3 pb-2 text-xs xl:text-sm text-white text-justify !leading-7 mr-2">
                        {item.description}
                      </li>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
