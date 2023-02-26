import React, { useState } from 'react'
import axios from 'axios'
import { AdminSidebar } from '../../components/AdminSidebar'
import MenuIcon from "@mui/icons-material/Menu";

export default function HomePage() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [slider, setSlider] = useState([{
    id: Math.ceil(Math.random() * 1000000),
    image: "",
    slug: "",
  }]);
  const [banner, setBanner] = useState([{
    id: Math.ceil(Math.random() * 1000000),
    image: "",
    slug: "",
  }]);

  const [mainCategory, setMainCategory] = useState({
    id: "",
    name: "",
    icon: "",
    slug: "",
    AmazingOfferSliderColor: "#323ea8",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const changeHandler = (e) => {
    setMainCategory({ ...mainCategory, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/mainCategory', { ...mainCategory, slider, banner }, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        console.log(res)
        setMainCategory({
          id: "",
          name: "",
          icon: "",
          thumbnail: "",
          slug: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        setSlider([{
          id: Math.ceil(Math.random() * 1000000),
          image: "",
          slug: "",
        }])
        setBanner([{
          id: Math.ceil(Math.random() * 1000000),
          image: "",
          slug: "",
        }])

      }
      )
      .catch(err => {
        console.log(err)
      }
      )
  }


  // slider

  const handleSliderChanges = (e, index) => {
    const { name, value } = e.target;
    const list = [...slider];
    list[index][name] = value;
    setSlider(list);
  };

  const handleSliderRemoves = (index) => {
    const list = [...slider];
    list.splice(index, 1);
    setSlider(list);
  };

  const handleSliderAdds = () => {
    setSlider([...slider, {
      id: "",
      image: "",
      slug: ""
    }]);

  };

  //  banner

  const handleBannerChanges = (e, index) => {
    const { name, value } = e.target;
    const list = [...banner];
    list[index][name] = value;
    setBanner(list);
  };

  const handleBannerRemoves = (index) => {
    const list = [...banner];
    list.splice(index, 1);
    setBanner(list);
  };

  const handleBannerAdds = () => {
    setBanner([...banner, {
      id: "",
      image: "",
      slug: ""
    }]);

  };



  return (
    <div className='flex w-full xl:px-8 h-full min-h-screen bg-[#f14d60]'>


      {/* hover:bg-[#6e3636] */}

      {/* سایدبار */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* لیست اصلی */}

      <div className=' w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-3'>
        <div className="py-4 mt-3 block xl:hidden ">
          <MenuIcon
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <h1 className='naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold'>اضافه کردن دسته بندی کلی</h1>
        <form
          className='h-auto x-full xl:w-1/2 flex flex-col gap-y-5'
          onSubmit={submitHandler}>

          <label>نام دسته بندی کلی</label>
          <input type="text" name="name" value={mainCategory.name} onChange={changeHandler} />

          <label>آیکون</label>
          <input type="text" name="icon" value={mainCategory.icon} onChange={changeHandler} />

          <label>عکس دسته بندی کلی</label>
          <input type="text" name="thumbnail" value={mainCategory.thumbnail} onChange={changeHandler} />

          <label>آدرس دسته بندی کلی</label>
          <input type="text" name="slug" value={mainCategory.slug} onChange={changeHandler} />


          {/* swiper image */}
          <h2 className='mt-4 mb-2 text-black'>تصویر اسلایدر</h2>
          {slider.map((sliders, index) => (
            <div key={index} className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <label>تصویر</label>
                <input
                  name="image"
                  type="text"
                  id="service"
                  value={sliders.image}
                  onChange={(e) => handleSliderChanges(e, index)}
                  required
                />
                <label>لینک</label>
                <input
                  name="slug"
                  type="text"
                  id="service"
                  value={sliders.slug}
                  onChange={(e) => handleSliderChanges(e, index)}
                  
                />


              </div>
              <div className="flex gap-x-5">
                {slider.length - 1 === index && slider.length < 20 && (
                  <button
                    type="button"
                    onClick={handleSliderAdds}
                    className="w-full py-1  bg-blue-500 rounded-lg text-white"
                  >
                    <span className='text-white text-center'>اضافه کردن ویژگی</span>
                  </button>
                )}
                {slider.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleSliderRemoves(index)}
                    className="w-full py-1  bg-purple-900 rounded-lg text-white"
                  >
                    <span className='text-white'>حذف</span>
                  </button>
                )}
              </div>
            </div>
          ))}


          {/* banner */}
          <h2 className='mt-6 mb-1 text-black'>تصویر بنر</h2>
          {banner.map((banners, index) => (
            <div key={index} className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <label>تصویر</label>
                <input
                  name="image"
                  type="text"
                  id="service"
                  value={banners.image}
                  onChange={(e) => handleBannerChanges(e, index)}
                  required
                />
                <label>لینک</label>
                <input
                  name="slug"
                  type="text"
                  id="service"
                  value={banners.slug}
                  onChange={(e) => handleBannerChanges(e, index)}
                  
                />


              </div>
              <div className="flex gap-x-5">
                {banner.length - 1 === index && banner.length < 20 && (
                  <button
                    type="button"
                    onClick={handleBannerAdds}
                    className="w-full py-1  bg-blue-500 rounded-lg text-white"
                  >
                    <span className='text-white text-center'>اضافه کردن ویژگی</span>
                  </button>
                )}
                {banner.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleBannerRemoves(index)}
                    className="w-full py-1  bg-purple-900 rounded-lg text-white"
                  >
                    <span className='text-white'>حذف</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type='submit' className='w-full py-1 mt-5 bg-blue-500 rounded-lg text-white'>ایجاد تغییرات</button>
        </form>


      </div>
    </div>
  )
}

