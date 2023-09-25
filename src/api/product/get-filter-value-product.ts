import {fetchData} from '../fetch';
import routes from "@/routes";

const getFilterValueProductApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["filter.value.product"],
  });

  return responseData;
}

export default getFilterValueProductApi;