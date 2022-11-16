import { APIServiceImpl } from "../lib/api/API";
interface AuthService<T> {
  api: APIServiceImpl;
  login(data: T): void;
  logout(): void;
}

export class AuthServiceImpl<T> implements AuthService<T> {
  api;
  constructor() {
    this.api = new APIServiceImpl();
  }

  login(data: T): void {
    this.api.post("/login", data);
    // setTimeout(this.logout, 1000 * 60 * 60);
    // return error?
  }

  logout(): void {
    console.log("logout됨");
    // this.api.get('/logout')
  }
}
