import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '../../components/AdminSidebar'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu';


export default function HomePage() {

  const [mainCategory, setMainCategory] = useState(null)
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [productValues, setProductValues] = useState(
    [{ 
      id: Math.floor(Math.random() * 10000), 
      value: "", 
      specifications: "", 
      subCategory: "", 
      isChecked: false 
    }]);

  const [filter, setFilter] = useState({
    id: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    filterProduct: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const changeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  const showFilterHandler = () => {
    setShowFilter(!showFilter)
  }

  // category slug
  const [CategorySlug, setCategorySlug] = useState("");

  useEffect(() => {
    function fetchCategorySlug() {
      let categorySlugs = category?.filter(category => category.name == filter.category);
      categorySlugs = categorySlugs?.map((c) => c.slug)[0]
      setCategorySlug(categorySlugs);
    }
    fetchCategorySlug()
  }, [category, filter, CategorySlug]);

  // subCategory slug
  const [subCategorySlug, setSubCategorySlug] = useState("");

  useEffect(() => {
    function fetchSubCategorySlug() {
      let subCategorySlugs = subCategory.flatMap(sub => sub).filter(subCategory => subCategory.name == filter.subCategory);
      subCategorySlugs = subCategorySlugs?.map((c) => c.slug)[0]
      setSubCategorySlug(subCategorySlugs);
    }
    fetchSubCategorySlug()
  }, [subCategory, filter, subCategorySlug]);

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('https://digikala-demo-data-q7eo.vercel.app/filterProduct', { ...filter, productValues, showFilter, CategorySlug, subCategorySlug }, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        setFilter({
          id: "",
          mainCategory: "",
          category: "",
          subCategory: "",
          filterProduct: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        setShowFilter(false)
        setCategorySlug("")
        setSubCategorySlug("")
        setProductValues([{ value: "", specifications: "" }])
      })
      .catch(err => {
        console.log(err)
      })
  }

  // get main category
  useEffect(() => {
    const fetchMainCategory = async () => {
      const result = await axios.get('https://digikala-demo-data-q7eo.vercel.app/mainCategory')
      setMainCategory(result.data)
    }
    fetchMainCategory()
  }, [])

  // get category

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get('https://digikala-demo-data-q7eo.vercel.app/category')
      setCategory(result.data)
      setSubCategory(result.data.map(category => category.subCategory))
    }
    fetchCategory()
  }, [])

  // set filter title for all Filter feature
  useEffect(() => {
    setProductValues((current) =>
      current.map((obj, index) => {
        if (filter.filterProduct != "") {
          return {
            ...obj,
            id: Math.floor(Math.random()*10000) ,
            specifications: filter.filterProduct,
            subCategory: filter.subCategory,
            isChecked:false
          }
        }
        return obj;
      })
    );
  }, [filter])


  // Filter feature

  const handleProductValuesChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...productValues];
    list[index][name] = value;
    setProductValues(list);
  };

  const handleProductValuesRemove = (index) => {
    const list = [...productValues];
    list.splice(index, 1);
    setProductValues(list);
  };

  const handleProductValuesAdd = () => {
    setProductValues([...productValues, {id: Math.floor(Math.random()*10000) ,value: "", specifications: filter.filterProduct, subCategory: filter.subCategory,isChecked:false }]);
  };


  return (
    <div className='flex w-full  h-full min-h-screen bg-[#f14d60]'>

      {/* sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* main list */}

      <div className=' w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-5 pb-12'>
        <div
          className='py-4 mt-3 block xl:hidden '>
          <MenuIcon onClick={() => setShowSidebar(true)} className='w-10 h-10 cursor-pointer' />
        </div>
        <h1 className='naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold select-none'>اضافه کردن فیلتر محصولات</h1>
        <form onSubmit={submitHandler} className='h-auto x-full xl:w-1/2 flex flex-col gap-y-5'>

          <label>دسته بندی کلی محصول</label>
          <select
            className='w-full py-1 border-2 border-gray-600 rounded-lg'
            onChange={changeHandler}
            name="mainCategory" id=""
            value={filter.mainCategory}
          >
            <option value="">انتخاب دسته بندی کلی</option>
            {mainCategory && mainCategory.map(mainCategory => (
              <option key={mainCategory.id} value={mainCategory.name}>{mainCategory.name}</option>
            ))}
          </select>

          <label>دسته بندی محصول</label>
          <select
            onChange={changeHandler}
            name="category" id=""
            value={filter.category}
          >
            <option value="">انتخاب دسته بندی</option>
            {category && category.map(category => category).filter(category => category.mainCategory === filter.mainCategory).map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))
            }
          </select>

          <label>دسته بندی فرعی محصول</label>
          <select
            onChange={changeHandler}
            name="subCategory" id=""
            value={filter.subCategory}
          >
            <option value="">انتخاب دسته بندی</option>
            {filter.category && category && category.filter(category => category.mainCategory === filter.mainCategory).filter(category => category.name === filter.category).map(category => category.subCategory.map(subCategory => (
              <option className='text-black' key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
            )))
            }
          </select>

          <label>نام فیلتر محصولات</label>
          <input
            onChange={changeHandler}
            type="text" name="filterProduct" value={filter.filterProduct} />
          <div className='flex gap-x-2'>

            <input
              id="setFilter"
              className='w-6 h-6'
              onChange={showFilterHandler}
              type="checkbox"
              checked={showFilter}
              name=""
            />
            <label htmlFor='setFilter'>نمایش در قسمت فیلتر محصولات</label>
          </div>

          <h2 className='my-4 text-black'>ویژگی محصول</h2>
          {productValues.map((values, index) => (
            <div key={index} className="flex flex-col gap-y-6">
              <div className="first-division !flex !flex-col gap-x-5">
                <input
                  className='w-full py-1 border-2 border-gray-600 rounded-lg'
                  name="value"
                  type="text"
                  id="service"
                  value={values.value}
                  onChange={(e) => handleProductValuesChange(e, index)}
                  required
                />

              </div>
              <div className="flex gap-x-5">
                {productValues.length - 1 === index && productValues.length < 4 && (
                  <button
                    type="button"
                    onClick={handleProductValuesAdd}
                    className="w-full py-1  bg-blue-500 rounded-lg text-white"
                  >
                    <span className='text-white text-center'>اضافه کردن ویژگی</span>
                  </button>
                )}
                {productValues.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => handleProductValuesRemove(index)}
                    className="w-full py-1  bg-purple-900 rounded-lg text-white"
                  >
                    <span className='text-white'>حذف ویژگی </span>
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type='submit' className='w-full py-4 mt-5 bg-green-700 rounded-lg text-white'>ایجاد فیلتر</button>
        </form>
      </div>
    </div>
  )
}