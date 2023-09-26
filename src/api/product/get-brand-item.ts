import {fetchData} from '../fetch';
import routes from "@/routes";

const getBrandItemApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.brand.item"],
  });

  return responseData;
}

export default getBrandItemApi;