import {fetchData} from '../fetch';
import routes from "@/routes";

const addProductItemApi = async (
  {
    product,
    productsValues,
    timeStartOffer,
    timeEndOffer,
    productImage,
    productVideo,
    sellerView,
    isSuggest,
    mainCategorySlug,
    categorySlug,
    subCategorySlug,
  }: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.product.item"],
    body: {
      product: product,
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
    }
  });

  return responseData;
}

export default addProductItemApi;