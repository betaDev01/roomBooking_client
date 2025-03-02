import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const apiCall =async (apiConfig: {
  apiPath: string,
  method: string,
  params?: any,
  data?: any
}) => {
  const url = `http://localhost:4000${apiConfig.apiPath}`

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpdmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3NDA5MjA1NzZ9.AnZhiYnNYb8zVbKpNI3VqeOo1IO2QrLoTfky3VXDsOc';
  const axiosRequestConfig: AxiosRequestConfig = {
    url,
    method: apiConfig.method,
    data: apiConfig?.data,
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    },
    params: apiConfig?.params
  };

  return await axios(axiosRequestConfig)
  .then((res: AxiosResponse) => ({ ...res }))
  .catch((error: AxiosError) => { throw new Error(error.message); });

}