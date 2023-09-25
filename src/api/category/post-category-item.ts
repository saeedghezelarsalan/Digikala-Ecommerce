import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersCategoryApi = async ({category, subCategory}: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.category.item"],
    body: {
      category: category,
      subCategory: subCategory,
    }
  });

  return responseData;
}

export default postUsersCategoryApi;