import { AxiosError } from "axios";
import { AxiosResponse } from "axios";
import { APIServiceImpl } from "lib/api/API";

interface UserService {
  api: APIServiceImpl;
  searchUser: <T>(
    id?: string
  ) => Promise<AxiosResponse<T> | AxiosError | undefined>;
}

export class UserServiceImpl implements UserService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }
  searchUser = async <T>(id?: string | undefined) => {
    const response = await this.api.get<T>(`/users?id=${id}`);
    return response;
  };
}
