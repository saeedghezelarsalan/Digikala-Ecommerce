import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersCommentApi = async (
  {
    customerComment,
    positiveComments,
    negativeComments,
    unknown,
    slug,
    rate,
    productName,
  }: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.users.comment"],
    body: {
      customerComment,
      positiveComments,
      negativeComments,
      unknown,
      slug,
      rate,
      productName,
    }
  });

  return responseData;
}

export default postUsersCommentApi;