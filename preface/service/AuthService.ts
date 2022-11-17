import { APIServiceImpl } from "../lib/api/API";
interface AuthService<T> {
  api: APIServiceImpl;
  login(endPoint: string, data: T): void;
  logout(): void;
}

export class AuthServiceImpl<T> implements AuthService<T> {
  api;
  constructor(baseUrl: string) {
    this.api = new APIServiceImpl(baseUrl);
  }

  login(endPoint: string, data: T): void {
    this.api.post(endPoint, data);
  }

  logout(): void {
    console.log("logout됨");
    // this.api.get('/logout')
  }
}
