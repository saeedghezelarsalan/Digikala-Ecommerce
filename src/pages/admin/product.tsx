import React, {useState, useEffect} from "react";
import {AdminSidebar} from "@/components/AdminSidebar";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MenuIcon from "@mui/icons-material/Menu";
import addProductItemApi from "@/api/product/add-product-item";
import getCategoryItemApi from "@/api/category/get-category-item";
import getFilterValueProductApi from "@/api/product/get-filter-value-product";
import getBrandItemApi from "@/api/product/get-brand-item";
import getMainCategoryItemApi from "@/api/category/get-main-category-item";
import getFilterProductApi from "@/api/product/get-filter-product";

export default function HomePage() {

  // useState<any
  const [filterProducts, setFilterProducts] = useState<any>(null);
  const [isSuggest, setIsSuggest] = useState<any>(false);
  const [filterValue, setFilterValue] = useState<any>(null);


  const [productsFilters, setProductsFilters] = useState<any>([
    {
      filter: "",
      value: "",
    },
  ]);

  const [productsValues, setProductsValues] = useState<any>([]);

  const [productImage, setProductImage] = useState<any>([{image: ""}]);
  const [productVideo, setProductVideo] = useState<any>([{video: ""}]);
  const [sellerView, setSellerView] = useState<any>([
    {
      property: "",
      rate: "",
    },
  ]);
  const [mainCategory, setMainCategory] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [brand, setBrand] = useState<any>(null);
  const [timeStartOffer, setTimeStartOffer] = useState<any>(new Date());
  const [timeEndOffer, setTimeEndOffer] = useState<any>(new Date());
  const [showSidebar, setShowSidebar] = useState<any>(false);
  const [product, setProduct] = useState<any>({
    id: "",
    name: "",
    latinName: "",
    slug: "",
    mainCategory: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    stock: "",
    sellCount: "",
    description: "",
    thumbnail: "",
    offer: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });


  // remove duplicate product features
  const productFeatures = filterProducts?.map((a: any) => a.productValues).flatMap((a: any) => a).filter((b: any) => b.specifications == productsFilters.filter).filter((c: any) => c.subCategory == product.subCategory)

  const features = productFeatures?.reduce((acc: any, current: any) => {
    const x = acc.find((item: any) => item.value === current.value);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const productsValuesLength = productsValues.map((a: any) => a).length


  // get category

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await getCategoryItemApi();
      setCategory(result);
      setSubCategory(result.map((category: any) => category.subCategory));
    };
    fetchCategory();
  }, []);


  const changeHandler = (e: any) => {
    setProduct({...product, [e.target.name]: e.target.value});
  };

  const changeFilterHandler = (e: any) => {
    setProductsFilters({...productsFilters, [e.target.name]: e.target.value});
  };

  const submitFilterHandler = (e: any) => {
    e.preventDefault();
    setProductsValues([
      ...productsValues,
      {
        id: Math.ceil(Math.random() * 1000000),
        filter: productsFilters.filter,
        value: productsFilters.value,
        isSpecifications: false,
      },
    ]);
  };

  const deleteProductsValue = (id: any) => {
    setProductsValues(productsValues.filter((filter: any) => filter.id != id));
  };


  // دیدگاه مشتری

  const handleSellerViewChange = (e: any, index: number) => {
    const {name, value} = e.target;
    const list = [...sellerView];
    list[index][name] = value;
    setSellerView(list);
  };

  const handleSellerViewRemove = (index: number) => {
    const list = [...sellerView];
    list.splice(index, 1);
    setSellerView(list);
  };

  const handleSellerViewAdd = () => {
    setSellerView([...sellerView, {property: "", rate: ""}]);
  };

  // عکس محصول

  const handleProductImageChange = (e: any, index: number) => {
    const {name, value} = e.target;
    const list = [...productImage];
    list[index][name] = value;
    setProductImage(list);
  };

  const handleProductImageRemove = (index: number) => {
    const list = [...productImage];
    list.splice(index, 1);
    setProductImage(list);
  };

  const handleProductImageAdd = () => {
    setProductImage([...productImage, {image: ""}]);
  };

  // ویدیو محصول

  const handleProductVideoChange = (e: any, index: number) => {
    const {name, value} = e.target;
    const list = [...productVideo];
    list[index][name] = value;
    setProductVideo(list);
  };

  const handleProductVideoRemove = (index: number) => {
    const list = [...productVideo];
    list.splice(index, 1);
    setProductVideo(list);
  };

  const handleProductVideoAdd = () => {
    setProductVideo([...productVideo, {video: ""}]);
  };

  // get brand

  useEffect(() => {
    const fetchBrand = async () => {
      const result = await getBrandItemApi();
      setBrand(result);
    };
    fetchBrand();
  }, []);

  // get main category
  useEffect(() => {
    const fetchMainCategory = async () => {
      const result = await getMainCategoryItemApi();
      setMainCategory(result);
    };
    fetchMainCategory();
  }, []);

  // get category


  // get filter product

  useEffect(() => {
    const fetchFilterProducts = async () => {
      const result = await getFilterProductApi();
      setFilterProducts(result);
    };
    fetchFilterProducts();
  }, []);

  // get filter value

  useEffect(() => {
    const fetchFilterValue = async () => {
      const result = await getFilterValueProductApi();
      setFilterValue(result.filter((value: any) => value.filterValue));
    };
    fetchFilterValue();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await getCategoryItemApi();
      setCategory(result);
      setSubCategory(result.map((category: any) => category.subCategory));

    };
    fetchCategory();
  }, []);


  const changeIsSpecificationsHandler = (id: any) => {
    productsValues.map((product: any) => {
      if (product.id == id) {
        product.isSpecifications = !product.isSpecifications;

      }
      return product;
    });
    setProductsValues([...productsValues]);
  };

  const [categorySlug, setCategorySlug] = useState<any>("");

  useEffect(() => {
    function fetchCategorySlug() {
      let categorySlugs = category?.filter((category: any) => category.name == product.category);
      categorySlugs = categorySlugs?.map((c: any) => c.slug).join('')
      setCategorySlug(categorySlugs);
    }

    fetchCategorySlug()
  }, [category, product, categorySlug]);


  const [mainCategorySlug, setMainCategorySlug] = useState<any>("");

  useEffect(() => {
    function fetchMainCategorySlug() {
      let mainCategorySlugs = mainCategory?.filter((mainCategory: any) => mainCategory.name == product.mainCategory);
      mainCategorySlugs = mainCategorySlugs?.map((c: any) => c.slug).join('')
      setMainCategorySlug(mainCategorySlugs);
    }

    fetchMainCategorySlug()
  }, [mainCategory, product, mainCategorySlug]);


  const [subCategorySlug, setSubCategorySlug] = useState<any>("");

  useEffect(() => {
    function fetchSubCategorySlug() {
      let subCategorySlugs = subCategory.flatMap((sub: any) => sub).filter((subCategory: any) => subCategory.name == product.subCategory);
      subCategorySlugs = subCategorySlugs?.map((c: any) => c.slug).join('')
      setSubCategorySlug(subCategorySlugs);
    }

    fetchSubCategorySlug()
  }, [subCategory, product, subCategorySlug]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await addProductItemApi(
      {
        product: {...product},
        productsValues: productsValues,
        timeStartOffer: timeStartOffer,
        timeEndOffer: timeEndOffer,
        productImage: productImage,
        productVideo: productVideo,
        sellerView: sellerView,
        isSuggest: isSuggest,
        mainCategorySlug: mainCategorySlug,
        categorySlug: categorySlug,
        subCategorySlug: subCategorySlug,
      })
    .then(() => {
      setProduct({
        id: "",
        name: "",
        latinName: "",
        slug: "",
        mainCategory: "",
        category: "",
        subCategory: "",
        brand: "",
        price: "",
        stock: "",
        sellCount: "",
        description: "",
        thumbnail: "",
        offer: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setProductImage([{image: ""}]);
      setProductVideo([{video: ""}]);
      setProductsValues([]);
      setTimeStartOffer(new Date());
      setTimeEndOffer(new Date());
      setSellerView([
        {
          property: "",
          rate: "",
        },
      ]);
    })

  };

  return (
    <div className="bg-[#f14d60] flex justify-center">
      <div className="flex w-full px-0 lg:max-w-screen-2xl h-full min-h-screen ">


        {/* سایدبار */}
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

        {/* لیست اصلی */}

        <div className=" w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-5 pb-12">
          <div className="py-4 mt-3 block xl:hidden ">
            <MenuIcon
              onClick={() => setShowSidebar(true)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <h1 className="naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold select-none">
            اضافه کردن محصولات
          </h1>
          <form
            onSubmit={submitHandler}
            className="h-auto x-full xl:w-1/2 flex flex-col gap-y-5"
          >

            <label>نام محصول :</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="name"
              value={product.name}
            />

            <label>نام لاتین محصول :</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="latinName"
              value={product.latinName}
            />

            <label>آدرس محصول</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="slug"
              value={product?.slug}
            />

            <label>دسته بندی کلی محصول</label>
            <select
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              onChange={(e) => changeHandler(e)}
              name="mainCategory"
              id=""
              value={product?.mainCategory}
            >
              <option value="">انتخاب دسته بندی کلی</option>
              {mainCategory &&
                mainCategory.map((mainCategory: any, index: number) => (
                  <option key={index} value={mainCategory.name}>
                    {mainCategory.name}
                  </option>
                ))}
            </select>

            <label>دسته بندی محصول</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="category"
              id=""
              value={product?.category}
            >
              <option value="">انتخاب دسته بندی</option>
              {category &&
                category
                .map((category: any) => category)
                .filter(
                  (category: any) => category.mainCategory === product.mainCategory
                )
                .map((category: any, index: number) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>

            <label>دسته بندی فرعی محصول</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="subCategory"
              id=""
              value={product?.subCategory}
            >
              <option value="">انتخاب دسته بندی</option>
              {product.category &&
                category &&
                category
                .filter(
                  (category: any) => category.mainCategory === product.mainCategory
                ).filter(
                  (category: any) => category.name === product.category
                )
                .map((category: any) =>
                  category.subCategory.map((subCategory: any, index: number) => (
                    <option
                      className="text-black"
                      key={index}
                      value={subCategory.name}
                    >
                      {subCategory.name}
                    </option>
                  ))
                )}
            </select>

            <label>برند</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="brand"
              id=""
              value={product?.brand}
            >
              <option value="">انتخاب دسته بندی کلی</option>
              {brand &&
                brand.map((brand: any, index: number) => (
                  <option key={index} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
            </select>

            <label>قیمت</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="price"
              value={product.price}
            />

            <label>موجودی</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="stock"
              value={product.stock}
            />

            <label>تعداد فروش</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="sellCount"
              value={product.sellCount}
            />

            <label>توضیحات محصول (معرفی)</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="description"
              value={product.description}
            />

            <label>تصویر شاخص</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              name="thumbnail"
              value={product.thumbnail}
            />

            <label>چند درصد تخفیف</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="offer"
              value={product.offer}
            />

            {/* تاریخ شروع تخفیف */}
            <label>تاریخ شروع تخفیف</label>
            <DatePicker
              value={timeStartOffer}
              onChange={setTimeStartOffer}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker key={''} position="left"/>]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />

            {/* تاریخ پایان تخفیف */}
            <label>تاریخ پایان تخفیف</label>
            <DatePicker
              value={timeEndOffer}
              onChange={setTimeEndOffer}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker key={''} position="left"/>]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />

            <h2 className="my-4 text-black">دیدگاه فروشنده</h2>
            {sellerView.map((view: any, index: number) => (
              <div key={index} className="flex flex-col gap-y-6">
                <div className="first-division !flex !flex-row gap-x-5">
                  <input
                    className="w-full py-1 border-2 border-gray-600 rounded-lg"
                    name="property"
                    type="text"
                    id="service"
                    value={view.property}
                    onChange={(e) => handleSellerViewChange(e, index)}
                  />
                  <input
                    className="w-full py-1 border-2 border-gray-600 rounded-lg"
                    min={0}
                    max={5}
                    name="rate"
                    type="number"
                    id="service"
                    placeholder="یک عدد بین 0 تا 5 وارد کنید"
                    value={view.rate}
                    onChange={(e) => handleSellerViewChange(e, index)}
                  />
                </div>
                <div className="flex gap-x-5">
                  {sellerView.length - 1 === index && sellerView.length < 20 && (
                    <button
                      type="button"
                      onClick={handleSellerViewAdd}
                      className="w-full py-1  bg-blue-500 rounded-lg text-white"
                    >
                      <span className="text-white text-center">
                        اضافه کردن ویژگی
                      </span>
                    </button>
                  )}
                  {sellerView.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleSellerViewRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">حذف</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            اضافه کردن ویژگی محصول

            <label>فیلتر محصول</label>
            <select
              onChange={changeFilterHandler}
              name="filter"
              id=""
              value={productsFilters?.filter}
            >
              <option value="">انتخاب دسته بندی</option>
              {product.subCategory &&
                filterProducts &&
                filterProducts
                .filter(
                  (filterProducts: any) =>
                    filterProducts.subCategory === product.subCategory
                )
                .map((filterProducts: any, index: number) => (
                  <option
                    className="text-black"
                    key={index}
                    value={filterProducts.filterProduct}
                  >
                    {filterProducts.filterProduct}
                  </option>
                ))}
            </select>

            <label>ویژگی محصول</label>
            <select
              onChange={changeFilterHandler}
              name="value"
              id=""
              value={productsFilters?.value}
            >
              <option value="">انتخاب دسته بندی</option>


              {productsFilters &&
                filterValue &&
                features?.map((filterProducts: any, index: number) => {
                  return (
                    <option className="text-black" key={index} value={filterProducts.value}>
                      {filterProducts.value}
                    </option>
                  );
                })
              }
            </select>
            <button
              onClick={submitFilterHandler}
              className="w-full py-4 mt-5 bg-green-700 rounded-lg text-white"
            >
              ثبت ویژگی
            </button>

            {productsValuesLength > 0 && (
              <>

                <h5>موارد ویژگی</h5>
                {productsValues.map((filter: any, index: number) => {

                  return (

                    <div key={index} className="flex gap-x-3 text-white">
                      <div>{filter.filter}</div>
                      <div>{filter.value}</div>
                      <div
                        className=""
                        onClick={() => deleteProductsValue(filter.id)}
                      >
                        delete
                      </div>
                      <div
                        onClick={() => changeIsSpecificationsHandler(filter.id)}
                        className={`select-none ${filter.isSpecifications ? "text-2xl" : "text-lg"
                        }`}
                      >
                        click
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            <h2 className="my-4 text-black">عکس محصول</h2>
            {productImage.map((singleImage: any, index: number) => (
              <div key={index} className="flex flex-col gap-y-6">
                <div className="first-division !flex !flex-row gap-x-5">
                  <input
                    className="w-full py-1 border-2 border-gray-600 rounded-lg"
                    name="image"
                    type="text"
                    id="service"
                    value={singleImage.image}
                    onChange={(e) => handleProductImageChange(e, index)}
                  />
                </div>
                <div className="flex gap-x-5">
                  {productImage.length - 1 === index &&
                    productImage.length < 4 && (
                      <button
                        type="button"
                        onClick={handleProductImageAdd}
                        className="w-full py-1  bg-blue-500 rounded-lg text-white"
                      >
                        <span className="text-white text-center">
                          اضافه کردن عکس
                        </span>
                      </button>
                    )}
                  {productImage.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleProductImageRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">حذف عکس </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <h2 className="my-4 text-black">ویدیو محصول</h2>
            {productVideo.map((singleVideo: any, index: number) => (
              <div key={index} className="flex flex-col gap-y-6">
                <div className="first-division !flex !flex-row gap-x-5">
                  <input
                    className="w-full py-1 border-2 border-gray-600 rounded-lg"
                    name="video"
                    type="text"
                    id="service"
                    value={singleVideo.video}
                    onChange={(e) => handleProductVideoChange(e, index)}
                  />
                </div>
                <div className="flex gap-x-5">
                  {productVideo.length - 1 === index &&
                    productVideo.length < 2 && (
                      <button
                        type="button"
                        onClick={handleProductVideoAdd}
                        className="w-full py-1  bg-blue-500 rounded-lg text-white"
                      >
                        <span className="text-white text-center">
                          اضافه کردن ویدیو
                        </span>
                      </button>
                    )}
                  {productVideo.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleProductVideoRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">حذف ویدیو </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-x-3 items-center mt-4">
              <input
                className="w-6 h-6 border-2 border-gray-600 rounded-lg"
                name="isSuggest"
                type="checkbox"
                id="isSuggest"
                value={isSuggest}
                onClick={() => setIsSuggest(!isSuggest)}
              />
              <label htmlFor="isSuggest">نمایش در قسمت پشنهادات</label>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-5 bg-green-700 rounded-lg text-white"
            >
              ایجاد محصول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}