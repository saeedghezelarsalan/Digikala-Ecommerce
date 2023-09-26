import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersQuestionApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.users.comment"],
  });

  return responseData;
}

export default postUsersQuestionApi;