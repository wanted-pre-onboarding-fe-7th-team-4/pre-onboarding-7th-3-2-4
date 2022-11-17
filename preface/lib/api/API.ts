import { AxiosResponse, AxiosRequestConfig } from "axios";
import { HttpClientImpl } from "./HttpClient";

interface APIService {
  get: <T>(
    endPoint: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  post: <T>(
    endPoint: string,
    data: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  put: <T>(
    endPoint: string,
    data: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
}

export class APIServiceImpl extends HttpClientImpl implements APIService {
  constructor(baseURL: string) {
    super(baseURL);
  }
  get = <T>(endPoint: string, config?: AxiosRequestConfig) => {
    return this.instance.get<T>(endPoint, config);
  };

  post = <T, B>(endPoint: string, data: B, config?: AxiosRequestConfig) => {
    return this.instance.post<T>(endPoint, data, config);
  };

  put = <T, B>(endPoint: string, data: B, config?: AxiosRequestConfig) => {
    return this.instance.put<T>(endPoint, data, config);
  };

  delete = <T>(endPoint: string, config?: AxiosRequestConfig) => {
    return this.instance.delete<T>(endPoint, config);
  };
}
