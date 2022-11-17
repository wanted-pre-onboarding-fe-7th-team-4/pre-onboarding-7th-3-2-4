import { APIServiceImpl } from "../lib/api/API";
import { ILoginData, UserModel } from "../model/model";
import { AxiosResponse, AxiosError } from "axios";
interface AuthService {
  api: APIServiceImpl;
  login(
    endPoint: string,
    data: ILoginData
  ): Promise<AxiosResponse<UserModel> | AxiosError | undefined>;
  logout(): void;
}

export class AuthServiceImpl implements AuthService {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }

  async login(endPoint: string, data: ILoginData) {
    const response = this.api.post<UserModel, ILoginData>(endPoint, data);
    return response;
    // setTimeout(this.logout, 1000 * 60 * 60);
  }

  logout(): void {
    console.log("logout됨");
    // this.api.get('/logout')
  }
}
