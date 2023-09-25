import {fetchData} from '../fetch';
import routes from "@/routes";

const getUsersItemApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.users.item"],
  });

  return responseData;
}

export default getUsersItemApi;