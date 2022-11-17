import { APIServiceImpl } from "../lib/api/API";
import { AxiosResponse, AxiosError } from "axios";

interface AuthService {
  api: APIServiceImpl;
  login: <TData, TVariable>(
    data: TVariable
  ) => Promise<AxiosResponse<TData> | AxiosError | undefined>;
  logout: <TData>() => Promise<AxiosResponse<TData> | AxiosError | undefined>;
}

export class AuthServiceImpl implements AuthService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }

  login = <TData, TVariable>(data: TVariable) => {
    const response = this.api.post<TData, TVariable>("login", data);
    return response;
  };

  logout = <TData>() => {
    const response = this.api.get<TData>("logout");
    return response;
  };
}
