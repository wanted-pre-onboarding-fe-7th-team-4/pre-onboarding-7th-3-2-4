import { APIServiceImpl } from "../lib/api/API";
import { ILoginData, LoginModel } from "../model/model";
import { AxiosResponse, AxiosError } from "axios";
interface AuthService {
  api: APIServiceImpl;
  login(
    data: ILoginData
  ): Promise<AxiosResponse<LoginModel> | AxiosError | undefined>;
  logout(): void;
}

export class AuthServiceImpl implements AuthService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }

  async login(data: ILoginData) {
    const response = this.api.post<LoginModel, ILoginData>("login", data);
    return response;
    // setTimeout(this.logout, 1000 * 60 * 60);
  }

  logout(): void {
    console.log("logout됨");
    // this.api.get('/logout')
  }
}
