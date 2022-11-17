import { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import { APIServiceImpl } from "lib/api/API";

interface UserService {
  api: APIServiceImpl;
  searchUser: <TData>(
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export class UserServiceImpl implements UserService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }
  searchUser = async <TData>(config?: AxiosRequestConfig) => {
    const response = await this.api.get<TData>("/users", {
      ...config
    });
    return response;
  };
}
