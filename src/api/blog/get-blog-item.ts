import {fetchData} from '../fetch';
import routes from "@/routes";

const getBlogApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.blog.item"],
  });

  return responseData;
}

export default getBlogApi;