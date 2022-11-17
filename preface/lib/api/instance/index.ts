import { CLIENT_BASE_URL } from "lib/constants/constants";
import { AuthServiceImpl } from "service/AuthService";
import { AccountServiceImpl } from "service/AccountService";
import { UserServiceImpl } from "service/UserService";

export const authApi = new AuthServiceImpl(CLIENT_BASE_URL);
export const accountApi = new AccountServiceImpl(CLIENT_BASE_URL);
export const userApi = new UserServiceImpl(CLIENT_BASE_URL);
