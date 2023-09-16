import React, {useState, useEffect, useRef} from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import axios from "axios";
import SimilarProduct from "@/screens/product/similar-product";
import Breadcrumb from "@/components/breadcrumb";
import CoverImage from "@/screens/product/cover-image";
import Comment from "@/screens/product/comment";
import Question from "@/screens/product/question";
import Specifications from "@/screens/product/Specifications";
import Details from "@/screens/product/details";
import Introduction from "@/screens/product/introduction";
import ProductNavbar from "@/screens/product/product-navbar";
import ProductWarranty from "@/screens/product/product-warranty";
import StickyProductPrice from "@/screens/product/sticky-product-price";
import {store} from "@/feature/store";

const Product = ({product, comments, relatedProducts, mainCategory, category, questions,}: any) => {
  const [quantityReduxProduct, setQuantityReduxProduct] = useState(0)
  const [scrollPos, setScrollPos] = useState(0);

  const comment = comments.map((comment: any) => comment);

  // ref
  const sectionFirst = useRef<any>(null);
  const sectionSecond = useRef<any>(null);
  const sectionThird = useRef<any>(null);
  const sectionFour = useRef<any>(null);
  const firstCommentsCount = useRef<any>(null);
  const secondCommentsCount = useRef<any>(null);
  const questionsCount = useRef<any>(null);
  const rateRef = useRef<any>(null);
  const nav = useRef<any>(null)
  // users comments rates border
  useEffect(() => {
    const rates = product?.sellerView.map((item: any) => item.rate);
    rateRef?.current.childNodes.forEach((item: any, i: number) => {
      item.childNodes[1].childNodes[0].childNodes[0].style.width =
        (rates[i] * 100) / 5 + "%";
    });
  }, [product]);

  let rateReduce =
    comment.length > 0
      ? comment
      .map((comment: any) => Number(comment.rate))
      .reduce(function (previous: any, current: any) {
        return previous + current;
      })
      : "0";
  const rateCustomers = Math.ceil(rateReduce / comment.length);


  return (
    <>
      <Head>
        <title>{product.name} | دیجیکالا</title>
      </Head>
      <Navbar mainCategory={mainCategory} category={category}/>
      <div className="pb-8 lg:pb-0  h-auto -mt-[-10px] lg:mt-0 max-w-screen-3xl mx-auto	">
        <Breadcrumb product={product}/>
        {/* product Header*/}
        <div className="lg:mx-4 lg:grid lg:grid-cols-3 ">
          <CoverImage product={product}/>
          <Details
            setQuantityReduxProduct={setQuantityReduxProduct} quantityReduxProduct={quantityReduxProduct} questions={questions} comment={comment} rateReduce={rateReduce}
            product={product}
            // @ts-ignore
            ref={{secondCommentsCount, firstCommentsCount, questionsCount}}/>
        </div>
        <ProductWarranty/>
        <SimilarProduct products={relatedProducts}/>
        <div className="w-auto h-auto bg-white">
          <ProductNavbar
            scrollPos={scrollPos}
            setScrollPos={setScrollPos}
            ref={{
              // @ts-ignore
              nav,
              sectionFirst,
              sectionSecond,
              sectionThird,
              sectionFour,
              firstCommentsCount,
              secondCommentsCount,
              questionsCount,
            }}
          />
          <section className="lg:flex xl:grid grid-cols-12 pb-16">
            <div className="xl:col-span-9 xl:mx-5 px-4 lg:px-0">
              <Introduction product={product} sectionFirst={sectionFirst} ref={sectionFirst}/>
              <Specifications product={product} ref={sectionSecond}/>
              <Comment
                product={product} comment={comment} comments={comments} rateCustomers={rateCustomers}
                ref={{sectionThird, rateRef} as any}/>
              <Question
                questions={questions}
                ref={{sectionFour} as any}/>
            </div>
            <StickyProductPrice
              ref={nav}
              scrollPos={scrollPos}
              setScrollPos={setScrollPos}
              product={product}
              quantityReduxProduct={quantityReduxProduct}
              setQuantityReduxProduct={setQuantityReduxProduct}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = store.getServerSideProps(() => async ({params}: any) => {
  const query = params.product;
  console.log(params)
  const {data} = await axios.get(`http://localhost:3001/product`);
  const customerComment = await axios.get(
    `http://localhost:3001/customersComment`
  );
  let comments = customerComment.data;
  comments = comments.filter((comment: any) => comment.slug == query);

  const customerQuestion = await axios.get(
    `http://localhost:3001/customersQuestion`
  );
  let questions = customerQuestion.data;
  questions = questions.filter((questions: any) => questions.slug == query);

  let mainCategory = await axios.get("http://localhost:3001/mainCategory");
  mainCategory = mainCategory.data;
  let category = await axios.get("http://localhost:3001/category");
  category = category.data;

  let product = data.filter((product: any) => product.slug == query)[0];
  const relatedProducts = data.filter((products: any) =>
    product && products.subCategory == product.subCategory
      ? products.slug != product.slug
      : null
  );

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
      relatedProducts,
      comments,
      mainCategory,
      category,
      questions,
    },
  };
})

export default Product;