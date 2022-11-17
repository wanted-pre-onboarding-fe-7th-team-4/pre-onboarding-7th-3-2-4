import { CLIENT_BASE_URL } from "lib/constants/constants";
import { AuthServiceImpl } from "service/AuthService";
import { AccountServiceImpl } from "service/AccountService";

export const authApi = new AuthServiceImpl(CLIENT_BASE_URL);
export const accountApi = new AccountServiceImpl(`${CLIENT_BASE_URL}`);
