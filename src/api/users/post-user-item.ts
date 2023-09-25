import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersItemApi = async ({values}: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.category.item"],
    body: {
      values,
    }
  });

  return responseData;
}

export default postUsersItemApi;