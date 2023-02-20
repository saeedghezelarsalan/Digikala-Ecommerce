import React, { useState, useEffect } from 'react'
import { AdminSidebar } from '../../components/AdminSidebar'
import axios from 'axios'
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import MenuIcon from '@mui/icons-material/Menu';


export default function HomePage() {

  const [mainCategory, setMainCategory] = useState(null)
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [isSpecifications, setIsSpecifications] = useState(false)
  const [productValues, setProductValues] = useState([{ value: "", specifications: isSpecifications }]);


  // useEffect(()=>{
  //   setProductValues(
  //     [{ value: productValues.value, specifications: isSpecifications }]
  //   )
  // },[isSpecifications])



  const [product, setProduct] = useState({
    id: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    filterProduct: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const showFilterHandler = () => {
    setShowFilter(!showFilter)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3001/filterProduct', { ...product, productValues, showFilter }, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        console.log(res)
        setProduct({
          id: "",
          mainCategory: "",
          category: "",
          subCategory: "",
          filterProduct: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        setShowFilter(false)


      }
      )
      .catch(err => {
        console.log(err)
      }
      )
  }

  // get main category
  useEffect(() => {
    const fetchMainCategory = async () => {
      const result = await axios.get('http://localhost:3001/mainCategory')
      setMainCategory(result.data)
    }
    fetchMainCategory()
  }, [])

  // get category

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get('http://localhost:3001/category')
      setCategory(result.data)
      setSubCategory(result.data.map(category => category.subCategory))
    }
    fetchCategory()

  }, [])

  // عکس محصول

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
    setProductValues([...productValues, { value: "" }]);
  };


  return (
    <div className='flex w-full  h-full min-h-screen bg-[#f14d60]'>


      {/* hover:bg-[#6e3636] */}

      {/* سایدبار */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* لیست اصلی */}

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
            value={product.mainCategory}
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
            value={product.category}
          >
            <option value="">انتخاب دسته بندی</option>
            {category && category.map(category => category).filter(category => category.mainCategory === product.mainCategory).map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))
            }
          </select>

          <label>دسته بندی فرعی محصول</label>
          <select
            onChange={changeHandler}
            name="subCategory" id=""
            value={product.subCategory}
          >
            <option value="">انتخاب دسته بندی</option>
            {product.category && category && category.filter(category => category.mainCategory === product.mainCategory).map(category => category.subCategory.map(subCategory => (
              <option className='text-black' key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
            )))
            }
          </select>


          <label>نام فیلتر محصولات</label>
          <input
            onChange={changeHandler}
            type="text" name="filterProduct" value={product.filterProduct} />
          <div className='flex gap-x-2'>

            <input
              className='w-6 h-6'
              onChange={showFilterHandler}
              type="checkbox"
              checked={showFilter}
              name=""
            />
            <label>نمایش در قسمت فیلتر محصولات</label>
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
                <div className='flex gap-x-3 items-center mt-4'>
                  <input
                    className='w-6 h-6 border-2 border-gray-600 rounded-lg'
                    name="specifications"
                    type="checkbox"
                    id="specifications"
                    value={values.specifications}
                    onClick={() => setIsSpecifications(!isSpecifications)}
                  />
                  <label htmlFor="specifications">نمایش در قسمت مشخصات محصولات</label>
                </div>

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