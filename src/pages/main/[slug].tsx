import Head from "next/head";
import Image from "next/image";
import HomeSwiper from "../../components/HomeSwiper";
import Navbar from "../../components/Navbar";
import AmazingOfferSlider from "../../components/AmazingOfferSlider";
import QuadrupleBanner from "../../components/QuadrupleBanner";
import DigikalaCategories from "../../components/DigikalaCategories";
import DigikalaSuggestion from "../../components/DigikalaSuggestion";
import PopularBrands from "../../components/PopularBrands";
import BlogPost from "../../components/BlogPost";
import getCategoryItemApi from "@/api/category/get-category-item";
import getProductItemApi from "@/api/product/get-product-item";
import getMainCategoryItemApi from "@/api/category/get-main-category-item";
import getBrandItemApi from "@/api/product/get-brand-item";
import {useEffect} from "react";

export default function Home({query,product, mainCategory, category, mainCategories, AmazingOfferSliderColor, brands, blogData, categories}: any) {

  const productLength = product.map((products: any) => products).length;

  useEffect(()=>{
    console.log(mainCategory)
    console.log(query)
  })

  return (
    <>
      <Head>
        <title>فروشگاه اینترنتی دیجی‌کالا</title>
        <meta name="description" content="هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!
"/>

      </Head>
      <Navbar mainCategory={mainCategories} category={categories}/>

      <main className=" h-auto w-full max-w-screen-xl px-12   !pt-4 mx-auto">
        <div className='rounded-xl overflow-hidden h-[400px]'>
          <HomeSwiper carousel={mainCategory.slider}/>
        </div>

        {productLength > 0 && <AmazingOfferSlider key={mainCategory.id} product={product} color={AmazingOfferSliderColor}/>}


        {/*<QuadrupleBanner QuardrupleBanners={mainCategory}/>*/}

        {/* <h5 className="text-center py-5 text-xl font-semibold">دسته‌بندی‌های دیجی‌کالا</h5> */}

        {/* <DigikalaCategories category={category} /> */}

        <div className="w-full h-auto flex flex-col md:flex-row gap-y-5 gap-x-5 my-10">
          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/25ba855e4369204f419f06eb89eb3b8335d68f5e_1672493058.jpg?x-oss-process=image/quality,q_95"
              fill={true}
              objectFit="fill"
              alt=""
            />
          </div>

          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/a2388bca514ab5ec462a7c811253ebe33b3f13ba_1645096153.jpg"
              fill={true}
              objectFit="fill"
              alt=""
            />
          </div>
        </div>

        {productLength > 0 && <DigikalaSuggestion product={product}/>}

        <PopularBrands brands={brands}/>

        {/* banner */}

        <div className="w-full h-auto flex flex-col md:flex-row gap-y-5 gap-x-5 my-10">
          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/ccf429b44cea826989f5cda8a614d8ac0f94d772_1672227248.jpg?x-oss-process=image/quality,q_95"
              fill={true}
              objectFit="fill"
              alt=""
            />
          </div>

          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/d5186195d5cfbde723226735a1077019e20ed9a3_1672223742.jpg?x-oss-process=image/quality,q_95"
              fill={true}
              objectFit="fill"
              alt=""
            />
          </div>
        </div>
        <div className="relative rounded-lg h-16 lg:h-36">
          <Image
            className="rounded-lg"
            src="https://dkstatics-public.digikala.com/digikala-adservice-banners/abede523b20e3c6fd5addcae68a54e454cb95a5e_1654948996.jpg?x-oss-process=image/quality,q_95"
            fill={true}
            alt=""
          />
        </div>

        {/* blog post */}
        <div className='grid grid-cols-1 grid-rows-4 lg:grid-cols-4 lg:grid-rows-1 gap-x-2 my-4 gap-y-4'>
          {blogData.map((post: any, index: number) => (
            <BlogPost key={index} post={post}/>
          ))}
        </div>

      </main>
    </>
  );
}

export async function getServerSideProps({params}: any) {
  const query = params?.slug;

  let mainCategory = await getMainCategoryItemApi();
  const mainCategories = mainCategory
  mainCategory = mainCategory.filter((mainCategory: any) => mainCategory.slug == query)[0]
  let category = await getCategoryItemApi();
  const categories = category
  // @ts-ignore
  category = category.filter((category: any) => category.mainCategory == mainCategory.name).filter(category => category.thumbnail != "");
  let product = await getProductItemApi();
  // @ts-ignore
  product = product.filter((product: any) => mainCategory && product.mainCategory == mainCategory.name)
  let blogData = await getBrandItemApi();
  const AmazingOfferSliderColor = mainCategory && mainCategory.AmazingOfferSliderColor
  let brands = await getBrandItemApi();
  if (!mainCategory) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
  return {
    props: {
      query,
      product,
      mainCategory,
      category,
      mainCategories,
      AmazingOfferSliderColor,
      brands,
      blogData,
      categories
    },
  };
}