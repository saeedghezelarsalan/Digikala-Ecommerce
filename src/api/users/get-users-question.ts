import {fetchData} from '../fetch';
import routes from "@/routes";

const getUsersQuestionApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.users.question"],
  });

  return responseData;
}

export default getUsersQuestionApi;