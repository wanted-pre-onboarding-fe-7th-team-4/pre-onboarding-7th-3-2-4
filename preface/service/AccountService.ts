import { APIServiceImpl } from "../lib/api/API";

interface AccountService {
  api: APIServiceImpl;
  getAccounts(): void;
  getAccountDetail(): void;
}
