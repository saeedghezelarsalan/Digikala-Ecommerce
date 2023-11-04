import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersMainCategoryApi = async ({mainCategory, slider, banner}: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.mainCategory.item"],
    body: {
      mainCategory,
      slider,
      banner,
    }
  });

  return responseData;
}

export default postUsersMainCategoryApi;