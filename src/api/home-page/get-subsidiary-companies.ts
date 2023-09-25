import {fetchData} from '../fetch';
import routes from "@/routes";

const getSubsidiaryCompaniesApi = async () => {

  const responseData = await fetchData({
    method: 'GET',
    url: routes["route.subsidiary.companies"],
  });

  return responseData;
}

export default getSubsidiaryCompaniesApi;