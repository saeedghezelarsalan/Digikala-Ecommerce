import {fetchData} from '../fetch';
import routes from "@/routes";

const getFilterProductApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["filter.product.item"],
  });

  return responseData;
}

export default getFilterProductApi;