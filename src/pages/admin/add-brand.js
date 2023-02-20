import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/AdminSidebar";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [brand, setBrand] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const changeHandler = (e) => {
    setBrand({
      ...brand,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/brand", brand)
      .then((res) => {
        setBrand({
          id: "",
          name: "",
          image: "",
          description: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-full xl:px-8 h-full min-h-screen bg-[#f14d60]">
      {/* hover:bg-[#6e3636] */}

      {/* سایدبار */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />


      {/* لیست اصلی */}
      <div className=" w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-5 pb-12">
        <div className="py-4 mt-3 block xl:hidden ">
          <MenuIcon
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <h1 className="naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold select-none">
          اضافه کردن برند
        </h1>
        <form
          onSubmit={submitHandler}
          className=" w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-3 gap-y-4"
        >
          <label>نام برند</label>
          <input
            onChange={changeHandler}
            name="name"
            value={brand.name}
            type="text"
            className="w-full h-8 px-2 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-700"
          />

          <label>تصویر برند</label>
          <input
            onChange={changeHandler}
            name="image"
            value={brand.image}
            className="w-full h-8 px-2 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-700"
          />

          <label>توضیحات برند</label>
          <textarea
            onChange={changeHandler}
            name="description"
            value={brand.description}
            className="w-full h-8 px-2 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-700"
          />

          <button type='submit' className='w-full py-1 mt-5 bg-blue-500 rounded-lg text-white'>ثبت برند</button>
        </form>
      </div>
    </div>
  );
}
