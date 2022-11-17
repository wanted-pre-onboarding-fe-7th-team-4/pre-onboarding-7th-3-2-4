import { AxiosRequestConfig } from "axios";
import { APIServiceImpl } from "../lib/api/API";
import { Brokers, AccountStatus, AccountModel } from "../model/model";

const changeAccountNumberFormat = (account: AccountModel) => {
  const format = Brokers[account.broker_id];
  const number = account.number;
  let result = "";
  let index = 0;
  for (let i = 0; i < format.length; i++) {
    if (format[i] === "-") {
      result += "-";
    } else if (i < 2 && i > format.length - 3) {
      result += number[index];
      index++;
    } else {
      result += "*";
    }
  }
  return result;
};

const accountChangeFormat = (account: AccountModel) => {
  return {
    ...account,
    broker_name: Brokers[account.broker_id],
    status_name: AccountStatus[account.status],
    number: changeAccountNumberFormat(account)
  };
};

export type CreateAccountBody = Pick<
  AccountModel,
  "user_id" | "broker_id" | "number" | "name" | "assets" | "payments"
>;

export type UpdateAccountBody = Pick<
  AccountModel,
  | "id"
  | "broker_id"
  | "number"
  | "name"
  | "assets"
  | "payments"
  | "is_active"
  | "status"
>;

interface AccountService {
  api: APIServiceImpl;
  getUserAccounts(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AccountModel[]>;
  // getSearchAccounts(
  //   endpoint: string,
  // ): Promise<Account[]>;
  // getAccount(id: number, account_id: number): Promise<Account>;
  createAccount(
    endpoint: string,
    body: CreateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<AccountModel>;
  updateAccount(
    endpoint: string,
    body: UpdateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<AccountModel>;
  deleteAccount(endpoint: string, config?: AxiosRequestConfig): Promise<void>;
}

export class AccountServiceImpl implements AccountService {
  api;
  constructor(baseURL: string) {
    this.api = new APIServiceImpl(baseURL);
  }

  async getUserAccounts(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<AccountModel[]> {
    const response = await this.api.get<AccountModel[]>(endpoint, {
      ...config
    });

    return response.data.map(accountChangeFormat);
  }

  // async getSearchAccounts(
  //   endpoint: string,
  // ): Promise<Account[]> {
  //   const response = await this.api.get<Account[]>(
  //     endpoint
  //   );

  //   return response.data.map(accountChangeFormat);
  // }

  // async getAccount(account_id: number): Promise<Account> {
  //   const response = await this.api.get<Account>(
  //     `accounts
  //     ?id=${account_id}`
  //   );

  //   return accountChangeFormat(response.data);
  // }

  async createAccount(
    endpoint: string,
    body: CreateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<AccountModel> {
    const response = await this.api.post<AccountModel, CreateAccountBody>(
      endpoint,
      body,
      { ...config }
    );

    return accountChangeFormat(response.data);
  }

  async updateAccount(
    endpoint: string,
    body: UpdateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<AccountModel> {
    const response = await this.api.put<AccountModel, UpdateAccountBody>(
      endpoint,
      body,
      { ...config }
    );

    return accountChangeFormat(response.data);
  }

  async deleteAccount(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    await this.api.delete(endpoint, {
      ...config
    });
  }
}
