import {fetchData} from '../fetch';
import routes from "@/routes";

const getMainCategoryItemApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.mainCategory.item"],
  });

  return responseData;
}

export default getMainCategoryItemApi;