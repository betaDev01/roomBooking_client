import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const apiCall =async (apiConfig: {
  apiPath: string,
  method: string,
  params?: any,
  data?: any
}) => {
  const url = `http://localhost:4000${apiConfig.apiPath}`

  const axiosRequestConfig: AxiosRequestConfig = {
    url,
    method: apiConfig.method,
    data: apiConfig?.data,
    headers: {
      'Accept': 'application/json',
    },
    params: apiConfig?.params
  };

  return await axios(axiosRequestConfig)
  .then((res: AxiosResponse) => ({ ...res }))
  .catch((error: AxiosError) => { throw new Error(error.message); });

}