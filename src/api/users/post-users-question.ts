import {fetchData} from '../fetch';
import routes from "@/routes";

const postUsersQuestionApi = async ({id, questionsBox, slug}: any) => {

  const responseData = await fetchData({
    method: 'POST',
    url: routes["route.users.question"],
    body: {
      id: id,
      questionsBox: questionsBox,
      slug: slug,
    }
  });

  return responseData;
}

export default postUsersQuestionApi;