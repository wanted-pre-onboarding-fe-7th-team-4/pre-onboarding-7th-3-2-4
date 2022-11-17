import { AccountType } from "lib/types/types";
import { PageAccountsQuery } from "../lib/interfaces/querys";
import { APIServiceImpl } from "./../lib/api/API";

interface AccountService {
  readonly api: APIServiceImpl;

  getAccountList(params: PageAccountsQuery): Promise<AccountType[]>;
}

class AccountServiceImpl implements AccountService {
  api;
  constructor(api: APIServiceImpl) {
    this.api = api;
  }

  async createAccount(account: AccountType) {
    const { data } = await this.api.post<AccountType>(`/accounts`, account);
    return data;
  }

  async updateAccount(account: AccountType) {
    const { data } = await this.api.put<AccountType>(`/accounts`, account);
    return data;
  }

  async getAccountList(params: PageAccountsQuery) {
    const { data } = await this.api.get<AccountType[]>(`/accounts`);
    return data;
  }
}

const api = new APIServiceImpl();
export const accountService = new AccountServiceImpl(api);
