import {fetchData} from '../fetch';
import routes from "@/routes";

const postFilterProductApi = async (
  {
    filter,
    productValues,
    showFilter,
    CategorySlug,
    subCategorySlug,
  }: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["filter.product.item"],
    body: {
      filter,
      productValues,
      showFilter,
      CategorySlug,
      subCategorySlug,
    }
  });

  return responseData;
}

export default postFilterProductApi;