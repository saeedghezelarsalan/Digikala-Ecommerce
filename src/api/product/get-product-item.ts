import {fetchData} from '../fetch';
import routes from "@/routes";

const getProductItemApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.product.item"],
  });

  return responseData;
}

export default getProductItemApi;