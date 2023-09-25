import {fetchData} from '../fetch';
import routes from "@/routes";

const getHomePageApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.home.page"],
  });

  return responseData;
}

export default getHomePageApi;