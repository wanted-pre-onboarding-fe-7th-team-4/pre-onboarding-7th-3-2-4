import { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import { APIServiceImpl } from "lib/api/API";

interface UserService {
  api: APIServiceImpl;
  searchUser: <TData>(
    id?: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export class UserServiceImpl implements UserService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }
  searchUser = async <TData>(
    id?: string | undefined,
    config?: AxiosRequestConfig
  ) => {
    const response = await this.api.get<TData>(`/users?id=${id}`, {
      ...config
    });
    return response;
  };
}
