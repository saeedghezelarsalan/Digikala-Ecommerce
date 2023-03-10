import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/AdminSidebar";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import MenuIcon from "@mui/icons-material/Menu";

export default function HomePage() {

  // useState
  const [filterProducts, setFilterProducts] = useState(null);
  const [isSuggest, setIsSuggest] = useState(false);
  const [filterValue, setFilterValue] = useState(null);



  const [productsFilters, setProductsFilters] = useState([
    {
      filter: "",
      value: "",
    },
  ]);

  useEffect(() => {
    console.log(productsFilters)
  })
  const [productsValues, setProductsValues] = useState([]);

  const [productImage, setProductImage] = useState([{ image: "" }]);
  const [productVideo, setProductVideo] = useState([{ video: "" }]);
  const [sellerView, setSellerView] = useState([
    {
      property: "",
      rate: "",
    },
  ]);
  const [mainCategory, setMainCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState(null);
  const [timeStartOffer, setTimeStartOffer] = useState(new Date());
  const [timeEndOffer, setTimeEndOffer] = useState(new Date());
  const [showSidebar, setShowSidebar] = useState(false);
  const [product, setProduct] = useState({
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
  const productFeatures = filterProducts?.map(a => a.productValues).flatMap(a => a).filter(b => b.specifications == productsFilters.filter).filter(c => c.subCategory == product.subCategory)

  const features = productFeatures?.reduce((acc, current) => {
    const x = acc.find(item => item.value === current.value);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const productsValuesLength = productsValues.map(a => a).length


  // get category

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get("http://localhost:3001/category");
      setCategory(result.data);
      setSubCategory(result.data.map((category) => category.subCategory));
    };
    fetchCategory();
  }, []);


  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const changeFilterHandler = (e) => {
    setProductsFilters({ ...productsFilters, [e.target.name]: e.target.value });
  };

  const submitFilterHandler = (e) => {
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

  const deleteProductsValue = (id) => {
    setProductsValues(productsValues.filter((filter) => filter.id != id));
  };



  // ???????????? ??????????

  const handleSellerViewChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sellerView];
    list[index][name] = value;
    setSellerView(list);
  };

  const handleSellerViewRemove = (index) => {
    const list = [...sellerView];
    list.splice(index, 1);
    setSellerView(list);
  };

  const handleSellerViewAdd = () => {
    setSellerView([...sellerView, { property: "", rate: "" }]);
  };

  // ?????? ??????????

  const handleProductImageChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...productImage];
    list[index][name] = value;
    setProductImage(list);
  };

  const handleProductImageRemove = (index) => {
    const list = [...productImage];
    list.splice(index, 1);
    setProductImage(list);
  };

  const handleProductImageAdd = () => {
    setProductImage([...productImage, { image: "" }]);
  };

  // ?????????? ??????????

  const handleProductVideoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...productVideo];
    list[index][name] = value;
    setProductVideo(list);
  };

  const handleProductVideoRemove = (index) => {
    const list = [...productVideo];
    list.splice(index, 1);
    setProductVideo(list);
  };

  const handleProductVideoAdd = () => {
    setProductVideo([...productVideo, { video: "" }]);
  };

  // get brand

  useEffect(() => {
    const fetchBrand = async (e) => {
      const result = await axios.get("http://localhost:3001/brand");
      setBrand(result.data);
    };
    fetchBrand();
  }, []);

  // get main category
  useEffect(() => {
    const fetchMainCategory = async () => {
      const result = await axios.get("http://localhost:3001/mainCategory");
      setMainCategory(result.data);
    };
    fetchMainCategory();
  }, []);

  // get category



  // get filter product

  useEffect(() => {
    const fetchFilterProducts = async () => {
      const result = await axios.get("http://localhost:3001/filterProduct");
      setFilterProducts(result.data);
    };
    fetchFilterProducts();
  }, []);

  useEffect(() => {
    console.log(filterProducts?.map(a => a.productValues).flatMap(a => a).filter(b => b.specifications == productsFilters.filter
    ))
  })

  // get filter value

  useEffect(() => {
    const fetchFilterValue = async () => {
      const result = await axios.get("http://localhost:3001/filterValue");
      setFilterValue(result.data.filter((value) => value.filterValue));
    };
    fetchFilterValue();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await axios.get("http://localhost:3001/category");
      setCategory(result.data);
      setSubCategory(result.data.map((category) => category.subCategory));

    };
    fetchCategory();
  }, []);


  const changeIsSpecificationsHandler = (id) => {
    productsValues.map((product) => {
      if (product.id == id) {
        product.isSpecifications = !product.isSpecifications;

      }
      return product;
    });
    setProductsValues([...productsValues]);
  };

  const [categorySlug, setCategorySlug] = useState("");

  useEffect(() => {
    function fetchCategorySlug() {
      let categorySlugs = category?.filter(category => category.name == product.category);
      categorySlugs = categorySlugs?.map((c) => c.slug).join('')
      setCategorySlug(categorySlugs);
    }
    fetchCategorySlug()
  }, [category, product, categorySlug]);


  const [mainCategorySlug, setMainCategorySlug] = useState("");

  useEffect(() => {
    function fetchMainCategorySlug() {
      let mainCategorySlugs = mainCategory?.filter(mainCategory => mainCategory.name == product.mainCategory);
      mainCategorySlugs = mainCategorySlugs?.map((c) => c.slug).join('')
      setMainCategorySlug(mainCategorySlugs);
    }
    fetchMainCategorySlug()
  }, [mainCategory, product, mainCategorySlug]);


  const [subCategorySlug, setSubCategorySlug] = useState("");

  useEffect(() => {
    function fetchSubCategorySlug() {
      let subCategorySlugs = subCategory.flatMap(sub => sub).filter(subCategory => subCategory.name == product.subCategory);
      subCategorySlugs = subCategorySlugs?.map((c) => c.slug).join('')
      setSubCategorySlug(subCategorySlugs);
    }
    fetchSubCategorySlug()
  }, [subCategory, product, subCategorySlug]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3001/product",
        {
          ...product,
          productsValues,
          timeStartOffer,
          timeEndOffer,
          productImage,
          productVideo,
          sellerView,
          isSuggest,
          mainCategorySlug,
          categorySlug,
          subCategorySlug
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {

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

        setProductImage([{ image: "" }]);
        setProductVideo([{ video: "" }]);
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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-[#f14d60] flex justify-center">
      <div className="flex w-full px-0 lg:max-w-screen-2xl h-full min-h-screen ">


        {/* ?????????????? */}
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* ???????? ???????? */}

        <div className=" w-full xl:w-10/12 h-full flex flex-col bg-[#f14d60] py-4 px-5 pb-12">
          <div className="py-4 mt-3 block xl:hidden ">
            <MenuIcon
              onClick={() => setShowSidebar(true)}
              className="w-10 h-10 cursor-pointer"
            />
          </div>
          <h1 className="naves !w-fit self-center py-6 px-6 text-center mt-8 mb-8 text-[#461919] font-extrabold select-none">
            ?????????? ???????? ??????????????
          </h1>
          <form
            onSubmit={submitHandler}
            className="h-auto x-full xl:w-1/2 flex flex-col gap-y-5"
          >

            <label>?????? ?????????? :</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="name"
              value={product.name}
            />

            <label>?????? ?????????? ?????????? :</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="latinName"
              value={product.latinName}
            />

            <label>???????? ??????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="slug"
              value={product?.slug}
            />

            <label>???????? ???????? ?????? ??????????</label>
            <select
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              onChange={(e) => changeHandler(e)}
              name="mainCategory"
              id=""
              value={product?.mainCategory}
            >
              <option value="">???????????? ???????? ???????? ??????</option>
              {mainCategory &&
                mainCategory.map((mainCategory, index) => (
                  <option key={index} value={mainCategory.name}>
                    {mainCategory.name}
                  </option>
                ))}
            </select>

            <label>???????? ???????? ??????????</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="category"
              id=""
              value={product?.category}
            >
              <option value="">???????????? ???????? ????????</option>
              {category &&
                category
                  .map((category) => category)
                  .filter(
                    (category) => category.mainCategory === product.mainCategory
                  )
                  .map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
            </select>

            <label>???????? ???????? ???????? ??????????</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="subCategory"
              id=""
              value={product?.subCategory}
            >
              <option value="">???????????? ???????? ????????</option>
              {product.category &&
                category &&
                category
                  .filter(
                    (category) => category.mainCategory === product.mainCategory
                  ).filter(
                    (category) => category.name === product.category
                  )
                  .map((category) =>
                    category.subCategory.map((subCategory, index) => (
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

            <label>????????</label>
            <select
              onChange={(e) => changeHandler(e)}
              name="brand"
              id=""
              value={product?.brand}
            >
              <option value="">???????????? ???????? ???????? ??????</option>
              {brand &&
                brand.map((brand, index) => (
                  <option key={index} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
            </select>

            <label>????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="price"
              value={product.price}
            />

            <label>????????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="stock"
              value={product.stock}
            />

            <label>?????????? ????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="sellCount"
              value={product.sellCount}
            />

            <label>?????????????? ?????????? (??????????)</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="description"
              value={product.description}
            />

            <label>?????????? ????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              name="thumbnail"
              value={product.thumbnail}
            />

            <label>?????? ???????? ??????????</label>
            <input
              onChange={(e) => changeHandler(e)}
              className="w-full py-1 border-2 border-gray-600 rounded-lg"
              type="text"
              name="offer"
              value={product.offer}
            />

            {/* ?????????? ???????? ?????????? */}
            <label>?????????? ???????? ??????????</label>
            <DatePicker
              value={timeStartOffer}
              onChange={setTimeStartOffer}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="left" />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />

            {/* ?????????? ?????????? ?????????? */}
            <label>?????????? ?????????? ??????????</label>
            <DatePicker
              value={timeEndOffer}
              onChange={setTimeEndOffer}
              format="MM/DD/YYYY HH:mm:ss"
              plugins={[<TimePicker position="left" />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />

            <h2 className="my-4 text-black">???????????? ??????????????</h2>
            {sellerView.map((view, index) => (
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
                    placeholder="???? ?????? ?????? 0 ???? 5 ???????? ????????"
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
                        ?????????? ???????? ??????????
                      </span>
                    </button>
                  )}
                  {sellerView.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleSellerViewRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">??????</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            ?????????? ???????? ?????????? ??????????

            <label>?????????? ??????????</label>
            <select
              onChange={changeFilterHandler}
              name="filter"
              id=""
              value={productsFilters?.filter}
            >
              <option value="">???????????? ???????? ????????</option>
              {product.subCategory &&
                filterProducts &&
                filterProducts
                  .filter(
                    (filterProducts) =>
                      filterProducts.subCategory === product.subCategory
                  )
                  .map((filterProducts, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={filterProducts.filterProduct}
                    >
                      {filterProducts.filterProduct}
                    </option>
                  ))}
            </select>

            <label>?????????? ??????????</label>
            <select
              onChange={changeFilterHandler}
              name="value"
              id=""
              value={productsFilters?.value}
            >
              <option value="">???????????? ???????? ????????</option>


              {productsFilters &&
                filterValue &&
                features?.map((filterProducts, index) => {
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
              ?????? ??????????
            </button>

            {productsValuesLength > 0 && (
              <>

                <h5>?????????? ??????????</h5>
                {productsValues.map((filter, index) => {

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
            <h2 className="my-4 text-black">?????? ??????????</h2>
            {productImage.map((singleImage, index) => (
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
                          ?????????? ???????? ??????
                        </span>
                      </button>
                    )}
                  {productImage.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleProductImageRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">?????? ?????? </span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            <h2 className="my-4 text-black">?????????? ??????????</h2>
            {productVideo.map((singleVideo, index) => (
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
                          ?????????? ???????? ??????????
                        </span>
                      </button>
                    )}
                  {productVideo.length !== 1 && (
                    <button
                      type="button"
                      onClick={() => handleProductVideoRemove(index)}
                      className="w-full py-1  bg-purple-900 rounded-lg text-white"
                    >
                      <span className="text-white">?????? ?????????? </span>
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
              <label htmlFor="isSuggest">?????????? ???? ???????? ????????????????</label>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-5 bg-green-700 rounded-lg text-white"
            >
              ?????????? ??????????
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
