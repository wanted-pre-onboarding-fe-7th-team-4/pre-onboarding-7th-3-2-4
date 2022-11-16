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
  constructor() {
    super();
  }

  get = <T>(endPoint: string, config?: AxiosRequestConfig) => {
    return this.instance.get<T>(endPoint, config);
  };

  post = <T>(endPoint: string, data: T, config?: AxiosRequestConfig) => {
    return this.instance.post<T>(endPoint, data, config);
  };

  put = <T>(endPoint: string, data: T, config?: AxiosRequestConfig) => {
    return this.instance.put<T>(endPoint, data, config);
  };
}
