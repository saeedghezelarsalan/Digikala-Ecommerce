import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Product from "../../components/SearchedProducts"
import FilterListIcon from '@mui/icons-material/FilterList';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Navbar from "../../components/Navbar";
import {useRouter} from "next/router";

export default function HomePage({productss, brand, query, filterProduct, category, mainCategories, data, productsSubCategorySlug, productsCategorySlug}: any) {


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState(null)
  const [brands, setBrands] = useState(brand);
  const [newBrands, setNewBrands] = useState(brands || null);
  const [checked, setChecked] = useState([]);
  const [checkedValue, setCheckedValue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffer, setIsOffer] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [openBrand, setOpenBrand] = useState(false)
  const [openValue, setOpenValue] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  const [openModalFilter, setOpenModalFilter] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setProducts(productss)
  }, [productss])

  useEffect(() => {
    setNewBrands(brand)
  }, [brand])

  useEffect(() => {
    setFilteredProducts(productss)
  }, [productss])

  const modalFilterRef = useRef<any>(null)

  const openModalFilterHandler = () => {
    setOpenModalFilter(true)
  }

  const closeModalFilterHandler = () => {
    setOpenModalFilter(false)
  }
// @ts-ignore
  const filtersData = filterProducts && filterProducts.map((filter: any) => filter).filter((filters: any) => filters.subCategorySlug == query || filters.CategorySlug == query)
// @ts-ignore
  const filters = filtersData?.reduce((acc: any, current: any) => {
    const x = acc.find((item: any) => item.filterProduct === current.filterProduct);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [])

  useEffect(() => {
    setFilterProducts(filterProduct.filter((filter: any) => filter.showFilter == true))
  }, [filterProduct])

  const openValueHandler = (e: any) => {
    if (openValue == e) {
      // @ts-ignore
      return setOpenValue(null)
    }

    setOpenValue(e)
    setSearchFilter("")
  }

  const openBrandHandler = () => {
    setOpenBrand(!openBrand)
  }

  const isAvailableHandler = () => {
    setIsAvailable(!isAvailable)
  }

  const offerHandler = () => {
    setIsOffer(!isOffer)
  }

  const changeBrandHandler = (id: any) => {
    // @ts-ignore
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // @ts-ignore
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };


  const changeValueHandler = (id: any) => {
    // @ts-ignore
    const currentIndex = checkedValue.indexOf(id);
    const newChecked = [...checkedValue];

    if (currentIndex === -1) {
      // @ts-ignore
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedValue(newChecked);
  };

  const clickBrand = (id: any) => {
    setBrands((current: any) =>
      current.map((obj: any) => {
        if (obj.id === id) {
          return {
            ...obj,
            checkbox: !obj.checkbox
          };
        }
        return obj;
      })
    );
  }


  // filter product item based on this filter list
  useEffect(() => {
    let filteredArray = products && [...products]
    if (checked.length != 0) {
      filteredArray = filteredArray
      // @ts-ignore
      .filter((data) => checked.includes(data.brand))
      .map((filteredName) => {
        return filteredName;
      });
      setFilteredProducts(filteredArray);
    }

    if (checkedValue.length != 0) {
      filteredArray = filteredArray
      // @ts-ignore
      .filter(data => data.productsValues.some((elemet: any) => checkedValue.includes(elemet.value))).map((filteredName) => {
        return filteredName;
      });
      setFilteredProducts(filteredArray);
    }
    if (isAvailable) {
      // @ts-ignore
      filteredArray = filteredArray.filter(data => Number(data.stock) > 0)
      setFilteredProducts(filteredArray)
    } else {
      // @ts-ignore
      filteredArray = filteredArray.filter(data => Number(data.stock) >= 0)
      setFilteredProducts(filteredArray)
    }
    if (isOffer) {
      // @ts-ignore
      filteredArray = filteredArray.filter(data => Number(data.offer) > 0)
      setFilteredProducts(filteredArray)
    } else {
      // @ts-ignore
      filteredArray = filteredArray.filter(data => Number(data.offer) >= 0)
      setFilteredProducts(filteredArray)
    }

    setFilteredProducts(filteredArray)
    setCurrentPage(1)
  }, [checked, isOffer, checkedValue, isAvailable, newBrands, router, products]);

  // useEffect(() => {
  //   let filterBrands = products.map((product) => product.brand);
  //   const newFilter = (filterBrands = [...new Set(filterBrands)]);
  //   const data = brands
  //     .filter((data) => newFilter.includes(data.name))
  //     .map((filterBrand) => filterBrand);
  //   setNewBrands(data);
  // }, []);

  useEffect(() => {
    let filterBrands = products.map((product: any) => product.brand);
    // @ts-ignore
    const newFilter = [...new Set(filterBrands)]
    const data = brands
    .filter((data: any) => newFilter.includes(data.name))
    .map((filterBrand: any) => filterBrand);
    setNewBrands(data);
  }, [products, brands]);

  return (
    <div className="flex flex-col w-full h-auto ">
      <Navbar mainCategory={mainCategories} category={category}/>
      <div className="pt-4 w-full h-auto pb-8">
        {category.filter((cate: any) => cate.subCategory.some((sub: any) => sub.name == query)).map((datas: any, index: number) => {
          return (
            <ul key={index} className="flex gap-x-3 mx-3 text-sm font-bold mb-5 mt-2">
              <li>دیجیکالا /</li>
              <li>{datas.mainCategory} /</li>
              <li>{datas.name} /</li>
              {datas.subCategory.filter((sub: any) => sub.name == query).map((subs: any, index: number) => {
                return <li key={index}>{subs.name}</li>
              })}
            </ul>
          )
        })}
        {/* section */}
        <div className="w-full flex flex-col lg:flex-row px-3">
          {/* filter */}
          <div className="w-[300px] border hidden flex-col lg:flex px-2 py-4">
            <div className="flex flex-col">
              {/* برند */}
              <div className="cursor-pointer">
                <div onClick={openBrandHandler}
                     className={`flex justify-between items-center cursor-pointer py-3 font-bold text-[15px] text-[#424750] ${openBrand ? "border-0" : "border border-x-0 border-t-0"} `}>
                  <p>برند</p>
                  <KeyboardArrowDownIcon className="w-6 h-6"/>
                </div>

                <div>
                  {brands?.map((brand: any) => {
                    return (
                      <div key={brand.id}
                           className={`w-full border border-x-0 border-t-0 flex items-center ${openBrand ? "max-h-auto visible" : "h-0 max-h-0 invisible"} `}
                      >
                        <input
                          onClick={() => clickBrand(brand.id)}
                          className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                          onChange={() => changeBrandHandler(brand.name)}
                          type="checkbox"
                          name=""
                          id={brand.name}
                          checked={brand.checkbox ? true : false}
                        />
                        <label className="select-none text-[#424750] text-[15px]font-bold py-2 cursor-pointer" htmlFor={brand.name}>
                          {brand.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* تخفیف */}
              <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
                <label className="grow cursor-pointer" htmlFor="default-toggle">فقط کالا های تخفیف دار</label>

                <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                  <input onChange={offerHandler} type="checkbox" value="" id="default-toggle" className="sr-only peer"/>
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              {/* کالا های موجود */}

              <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
                <label className="grow cursor-pointer" htmlFor="default-toggles">فقط کالا های موجود</label>

                <label
                  htmlFor="default-toggles"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input onChange={isAvailableHandler} type="checkbox" value="" id="default-toggles" className="sr-only peer"/>
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                </label>
              </div>


              {/* فیلتر اصلی */}
              {filters?.map((filter: any, index: number) => {
                return (
                  <div key={index} className="border border-x-0 border-t-0 last:border-b-0">
                    <div onClick={() => openValueHandler(filter.id)} key={filter.id} className="flex justify-between items-center w-full cursor-pointer">

                      <div
                        className={` py-3 font-bold text-[15px] text-[#424750]`}
                      >{filter.filterProduct}</div>
                      <KeyboardArrowDownIcon className="w-6 h-6"/>
                    </div>
                    <div
                      className={`flex flex-col w-full h-auto items-center border border-x-0 border-t-0 ${openValue == filter.id ? "max-h-[200px] scrollCustomer overflow-y-scroll visible" : "invisible h-0"} `}>
                      {/* {filter.productValues.length > 0 &&
                        <input
                          onChange={searchHandler}
                          className="border mb-3 mt-1 px-2 py-3 text-sm w-full rounded-md"
                          type="text"
                          placeholder={`جستجو در ${filter.filterProduct}`} />
                      } */}
                      {filter.productValues && filter.productValues.filter((el: any) => el.value.includes(searchFilter)).map((value: any, index: number) => {
                        return (
                          // <div onChange={() => changeBrandHandler(filter.value)}>{value.value}</div>
                          <div key={index}
                               className={`flex w-full h-auto items-center border border-x-0 border-t-0 last:border-0 ${openValue == filter.id ? "max-h-auto visible" : "invisible h-0"} `}>
                            <input
                              className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                              onChange={() => changeValueHandler(value.value)}
                              type="checkbox"
                              name=""
                              id={value.value}
                            />
                            <label
                              className="select-none grow text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                              htmlFor={value.value}>{value.value}</label>
                          </div>
                        )
                      })}
                    </div>

                  </div>
                )
              })}
            </div>
          </div>

          {/* mobile filter */}

          <div className="flex flex-col flex-1">

            <div className="flex xl:hidden items-center mx-10 border border-x-0 border-t-0 pb-2">
              <div
                onClick={openModalFilterHandler}
                className="flex items-center">
                <FilterListIcon className="w-6 h-6 fill-[#424750]"/>
                <span className="text-xs font-bold cursor-pointer">فیلتر</span>
              </div>
              <div className="hidden items-center mr-2">
                <ImportExportIcon className="lg:hidden w-6 h-6 fill-[#424750]"/>
                {/* <span className="text-xs font-bold">{sortText}</span> */}
              </div>
            </div>

            {/* products */}
            <Pagination
              data={filteredProducts}
              RenderComponent={Product}
              title="Posts"
              buttonConst={3}
              contentPerPage={10}
              siblingCount={1}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* modal filter */}
      <div
        ref={modalFilterRef}
        className={`fixed bottom-0 lg:top-full xl:hidden border  pt-2 left-0 p-4 bg-white  overflow-x-hidden w-full  min-h-fit max-h-3/4 overflow-y-scroll scrollCustomer z-[999] ${openModalFilter
          ? "-translate-y-0 lg:block transition-all duration-500"
          : "translate-y-full  lg:hidden transition-all duration-500"
        } `}
      >
        <div className="flex flex-col">
          {/* close */}
          <div className="text-sm cursor-pointer text-red-600" onClick={closeModalFilterHandler}>بستن فیلتر</div>
          {/* برند */}
          <div className="cursor-pointer">
            <div onClick={openBrandHandler}
                 className={`flex justify-between items-center cursor-pointer py-3 font-bold text-[15px] text-[#424750] ${openBrand ? "border-0" : "border border-x-0 border-t-0"} `}>
              <p>برند</p>
              <KeyboardArrowDownIcon className="w-6 h-6"/>
            </div>

            <div>
              {brands?.map((brand: any) => {
                return (
                  <div key={brand.id}
                       className={`w-full border border-x-0 border-t-0 flex items-center ${openBrand ? "max-h-auto visible" : "h-0 max-h-0 invisible"} `}
                  >
                    <input
                      className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                      onChange={() => changeBrandHandler(brand.name)}
                      type="checkbox"
                      name=""
                      id={brand.name}
                    />
                    <label className="select-none text-[#424750] text-[15px]font-bold py-2 cursor-pointer" htmlFor={brand.name}>
                      {brand.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          {/* تخفیف */}
          <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
            <label className="grow cursor-pointer" htmlFor="defaults-toggles">فقط کالا های تخفیف دار</label>

            <label htmlFor="defaults-toggles" className="inline-flex relative items-center cursor-pointer">
              <input onChange={offerHandler} type="checkbox" value="" id="defaults-toggles" className="sr-only peer"/>
              <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

            </label>
          </div>
          {/* کالا های موجود */}

          <div className="flex py-3 border border-x-0 border-t-0 justify-between font-bold text-[15px] text-[#424750]">
            <label className="grow cursor-pointer" htmlFor="default-toggless">فقط کالا های موجود</label>

            <label htmlFor="default-toggless" className="inline-flex relative items-center cursor-pointer">
              <input onChange={isAvailableHandler} type="checkbox" value="" id="default-toggless" className="sr-only peer"/>
              <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

            </label>
          </div>


          {/* فیلتر اصلی */}
          {filters?.map((filter: any, index: number) => {
            return (
              <div key={index} className="border border-x-0 border-t-0 last:border-b-0">
                <div onClick={() => openValueHandler(filter.id)} key={filter.id} className="flex justify-between items-center w-full cursor-pointer">

                  <div
                    className={` py-3 font-bold text-[15px] text-[#424750]`}
                  >{filter.filterProduct}</div>
                  <KeyboardArrowDownIcon className="w-6 h-6"/>
                </div>
                <div
                  className={`flex flex-col w-full h-auto items-center border border-x-0 border-t-0 ${openValue == filter.id ? "max-h-[200px] scrollCustomer overflow-y-scroll visible" : "invisible h-0"} `}>
                  {/* {filter.productValues.length > 0 &&
                        <input
                          onChange={searchHandler}
                          className="border mb-3 mt-1 px-2 py-3 text-sm w-full rounded-md"
                          type="text"
                          placeholder={`جستجو در ${filter.filterProduct}`} />
                      } */}
                  {filter.productValues && filter.productValues.filter((el: any) => el.value.includes(searchFilter)).map((values: any, index: number) => {
                    return (
                      // <div onChange={() => changeBrandHandler(filter.values)}>{values.values}</div>
                      <div key={index}
                           className={`flex w-full h-auto items-center border border-x-0 border-t-0 last:border-0 ${openValue == filter.id ? "max-h-auto visible" : "invisible h-0"} `}>
                        <input
                          className="w-[15px] h-[15px] ml-4 py-1 accent-[#008eb2] cursor-pointer"
                          onChange={() => changeValueHandler(values.value)}
                          type="checkbox"
                          name=""
                          id={values.value}
                        />
                        <label
                          className="select-none grow text-[#424750] text-[15px]font-bold py-2 cursor-pointer"
                          htmlFor={values.value}>{values.value}</label>
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

export async function getServerSideProps({params}: any) {
  const query = params.search;
  const {data} = await axios.get(`http://localhost:3001/product`);

  let category = await axios.get("http://localhost:3001/category");
  category = category.data

  let productss = data.map((a: any) => a).filter((product: any) => product.subCategorySlug == query ? product.subCategorySlug == query : product.categorySlug == query ? product.categorySlug == query : null);

  const productsSubCategorySlug = data.map((a: any) => a).filter((product: any) => product.subCategorySlug == query)

  const productsCategorySlug = data.map((a: any) => a).filter((product: any) => product.CategorySlug == query)

  let brand = await axios.get("http://localhost:3001/brand");
  brand = brand.data;

  let filterProduct = await axios.get("http://localhost:3001/filterProduct");
  filterProduct = filterProduct.data;
  let mainCategory = await axios.get("http://localhost:3001/mainCategory")
  const mainCategories = mainCategory.data
  if (!productss) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productss,
      category,
      brand,
      query,
      filterProduct,
      mainCategories,
      data,
      productsSubCategorySlug,
      productsCategorySlug
    },
  };
}