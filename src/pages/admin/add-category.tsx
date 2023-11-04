import React, {useState, useEffect} from 'react'
import {AdminSidebar} from '@/components/AdminSidebar'
import MenuIcon from "@mui/icons-material/Menu";
import getMainCategoryItemApi from "@/api/category/get-main-category-item";
import postCategoryItem from "@/api/category/post-category-item";

export default function HomePage() {
  const [mainCategory, setMainCategory] = useState<any>(null)
  const [showSidebar, setShowSidebar] = useState(false);

  const [subCategory, setSubCategory] = useState<any>([{
    name: "",
    slug: "",
    image: "",
  }]);


  const [category, setCategory] = useState<any>({
    id: "",
    name: "",
    slug: "",
    mainCategory: '',
    thumbnail: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const changeHandler = (e: any) => {
    setCategory({...category, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e: any) => {
    e.preventDefault()
    await postCategoryItem({
      category: {...category},
      subCategory
    }).then(() => {
        setCategory({
          id: "",
          name: "",
          slug: "",
          mainCategory: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        setSubCategory([{
          id: Math.ceil(Math.random() * 1000000),
          name: "",
          slug: "",
          image: "",
        }])


      }
    )
    .catch(err => {
        console.log(err)
      }
    )
  }

  useEffect(() => {
    const fetchMainCategory = async () => {
      const result = await getMainCategoryItemApi();
      setMainCategory(result.data)
    }
    fetchMainCategory()
  }, [])


  const handleSubCategoryChanges = (e: any, index: any) => {
    const {name, value} = e.target;
    const list = [...subCategory];
    list[index][name] = value;
    setSubCategory(list);
  };

  const handleSubCategoryRemoves = (index: any) => {
    const list = [...subCategory];
    list.splice(index, 1);
    setSubCategory(list);
  };

  const handleSubCategoryAdds = () => {
    setSubCategory([...subCategory, {
      id: "",
      image: "",
      slug: ""
    }]);

  };


  return (
    <div className='flex w-full xl:px-8 h-full min-h-screen bg-[#f14d60]'>


      {/* hover:bg-[#6e3636] */}

      {/* سایدبار */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

      {/* لیست اصلی */}

      <div className=' w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-3'>
        <div className="py-4 mt-3 block xl:hidden ">
          <MenuIcon
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <h1 className='naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold'>اضافه کردن دسته بندی</h1>
        <form
          className='h-auto x-full xl:w-1/2 flex flex-col gap-y-5'
          onSubmit={submitHandler}>

          <select
            onChange={changeHandler}
            name="mainCategory" id=""
            value={category.mainCategory}
          >
            <option value="">انتخاب دسته بندی کلی</option>
            {mainCategory && mainCategory.map((mainCategory: any) => (
              <option key={mainCategory.id} value={mainCategory.name}>{mainCategory.name}</option>
            ))}
          </select>

          <label>نام دسته بندی</label>
          <input type="text" name="name" value={category.name} onChange={changeHandler}/>

          <label>آدرس دسته بندی</label>
          <input type="text" name="slug" value={category.slug} onChange={changeHandler}/>

          <label>عکس دسته بندی</label>
          <input type="text" name="thumbnail" value={category.thumbnail} onChange={changeHandler}/>


          <h2 className='mt-6 mb-1 text-black'>دسته بندی فرعی</h2>
          {subCategory.map((subCategories: any, index: number) => (
            <div key={index} className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <label>نام دسته بندی فرعی</label>
                <input
                  name="name"
                  type="text"
                  id="service"
                  value={subCategories.name}
                  onChange={(e) => handleSubCategoryChanges(e, index)}

                />
                <label>لینک دسته بندی فرعی</label>
                <input
                  name="slug"
                  type="text"
                  id="service"
                  value={subCategories.slug}
                  onChange={(e) => handleSubCategoryChanges(e, index)}

                />
                <label>عکس دسته بندی فرعی</label>
                <input
                  name="image"
                  type="text"
                  id="service"
                  value={subCategories.image}
                  onChange={(e) => handleSubCategoryChanges(e, index)}

                />


              </div>
              <div className="flex gap-x-5">
                {subCategory.length - 1 === index && subCategory.length < 20 && (
                  <button
                    type="button"
                    onClick={handleSubCategoryAdds}
                    className="w-full py-1  bg-blue-500 rounded-lg text-white"
                  >
                    <span className='text-white text-center'>اضافه کردن ویژگی</span>
                  </button>
                )}
                {subCategory.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleSubCategoryRemoves(index)}
                    className="w-full py-1  bg-purple-900 rounded-lg text-white"
                  >
                    <span className='text-white'>حذف</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type='submit' className='w-full py-1 mt-5 bg-blue-500 rounded-lg text-white'>ایجاد دسته بندی</button>
        </form>


      </div>
    </div>
  )
}

