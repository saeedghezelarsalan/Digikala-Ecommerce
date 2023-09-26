import {fetchData} from '../fetch';
import routes from "@/routes";

const getCategoryItemApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.category.item"],
  });

  return responseData;
}

export default getCategoryItemApi;