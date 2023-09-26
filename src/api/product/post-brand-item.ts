import {fetchData} from '../fetch';
import routes from "@/routes";

const postBrandItemApi = async ({brand}: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.brand.item"],
    body: {
      brand: brand,
    }
  });

  return responseData;
}

export default postBrandItemApi;