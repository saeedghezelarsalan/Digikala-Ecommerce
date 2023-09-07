import Head from "next/head";
import Image from "next/image";
import HomeSwiper from "../../components/HomeSwiper";
import Navbar from "../../components/Navbar";
import axios from "axios";
import AmazingOfferSlider from "../../components/AmazingOfferSlider";
import QuadrupleBanner from "../../components/QuadrupleBanner";
import DigikalaCategories from "../../components/DigikalaCategories";
import DigikalaSuggestion from "../../components/DigikalaSuggestion";
import PopularBrands from "../../components/PopularBrands";
import ProductsBasedOnViews from "../../components/ProductsBasedOnViews";
import BlogPost from "../../components/BlogPost";

export default function Home({ product, mainCategory, category, mainCategories, AmazingOfferSliderColor, brands, blogData,categories }) {

  const productLength = product.map(products => products).length

  return (
    <>
      <Head>
        <title>فروشگاه اینترنتی دیجی‌کالا</title>
        <meta name="description" content="هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!
" />

      </Head>
      <Navbar mainCategory={mainCategories} category={categories} />

      <main
        className=" h-auto w-full max-w-screen-xl px-12   !pt-4 mx-auto
    "
      >

        <div className='rounded-xl overflow-hidden h-[400px]'>

          <HomeSwiper carousel={mainCategory.slider} />


        </div>

        {productLength > 0 && <AmazingOfferSlider key={mainCategory.id} product={product} color={AmazingOfferSliderColor} />}




        <QuadrupleBanner QuardrupleBanners={mainCategory} />

        {/* <h5 className="text-center py-5 text-xl font-semibold">دسته‌بندی‌های دیجی‌کالا</h5> */}

        {/* <DigikalaCategories category={category} /> */}

        <div className="w-full h-auto flex flex-col md:flex-row gap-y-5 gap-x-5 my-10">
          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/25ba855e4369204f419f06eb89eb3b8335d68f5e_1672493058.jpg?x-oss-process=image/quality,q_95"
              alt=""
              layout="fill"
              objectFit="fill"
            />
          </div>

          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/a2388bca514ab5ec462a7c811253ebe33b3f13ba_1645096153.jpg"
              alt=""
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>

        {productLength > 0 && <DigikalaSuggestion product={product} />}

        <PopularBrands brands={brands} />

        {/* banner */}

        <div className="w-full h-auto flex flex-col md:flex-row gap-y-5 gap-x-5 my-10">
          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/ccf429b44cea826989f5cda8a614d8ac0f94d772_1672227248.jpg?x-oss-process=image/quality,q_95"
              alt=""
              layout="fill"
              objectFit="fill"
            />
          </div>

          <div className="relative w-full h-52 lg:h-64 rounded-lg overflow-hidden">
            <Image
              src="https://dkstatics-public.digikala.com/digikala-adservice-banners/d5186195d5cfbde723226735a1077019e20ed9a3_1672223742.jpg?x-oss-process=image/quality,q_95"
              alt=""
              layout="fill"
              objectFit="fill"
            />
          </div>
        </div>
        <div className="relative rounded-lg h-16 lg:h-36">
        <Image
          className="rounded-lg"
          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/abede523b20e3c6fd5addcae68a54e454cb95a5e_1654948996.jpg?x-oss-process=image/quality,q_95"
          alt=""
          layout={'fill'}
        />
        </div>

        {/* blog post */}
        <div className='grid grid-cols-1 grid-rows-4 lg:grid-cols-4 lg:grid-rows-1 gap-x-2 my-4 gap-y-4'>
          {blogData.map((post, index) => (
            <BlogPost key={index} post={post} />
          ))}
        </div>

      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const query = params.main;

  let mainCategory = await axios.get("http://localhost:3001/mainCategory")
  const mainCategories = mainCategory.data
  mainCategory = mainCategory.data.filter(mainCategory => mainCategory.slug == query)[0]
  let category = await axios.get("http://localhost:3001/category");
  let categories = category.data
  category = category.data.filter(category => category.mainCategory == mainCategory.name).filter(category => category.thumbnail != "")

  let product = await axios.get(`http://localhost:3001/product`);
  product = product.data.filter(product => mainCategory && product.mainCategory == mainCategory.name)

  let blogData = await axios.get("http://localhost:3001/blog")
  blogData = blogData.data

  const AmazingOfferSliderColor = mainCategory && mainCategory.AmazingOfferSliderColor

  let brands = await axios.get("http://localhost:3001/brand")
  brands = brands.data
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

