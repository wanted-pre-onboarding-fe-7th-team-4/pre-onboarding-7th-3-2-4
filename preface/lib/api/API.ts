import { AxiosResponse } from "axios";
import { HttpClientImpl } from "./HttpClient";

interface APIService {
  get: <T>(endPoint: string) => Promise<AxiosResponse<T, any>>;
  post: <T>(endPoint: string, data: T) => Promise<AxiosResponse<T, any>>;
  put: <T>(endPoint: string, data: T) => Promise<AxiosResponse<T, any>>;
}

export class APIServiceImpl extends HttpClientImpl implements APIService {
  constructor() {
    super();
  }

  get = <T>(endPoint: string) => {
    return this.instance.get<T>(endPoint);
  };

  post = <T>(endPoint: string, data: T) => {
    return this.instance.post<T>(endPoint, data);
  };

  put = <T>(endPoint: string, data: T) => {
    return this.instance.put<T>(endPoint, data);
  };
}
