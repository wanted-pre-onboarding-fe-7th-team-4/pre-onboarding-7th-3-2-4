import { AxiosRequestConfig } from "axios";
import { APIServiceImpl } from "../lib/api/API";
import { AccountModel } from "../model/model";

// const changeAccountNumberFormat = (account: AccountModel) => {
//   const format = Brokers[account.broker_id];
//   const number = account.number;
//   let result = "";
//   let index = 0;
//   for (let i = 0; i < format.length; i++) {
//     if (format[i] === "-") {
//       result += "-";
//     } else if (i < 2 && i > format.length - 3) {
//       result += number[index];
//       index++;
//     } else {
//       result += "*";
//     }
//   }
//   return result;
// };

// const accountChangeFormat = (account: AccountModel) => {
//   return {
//     ...account,
//     broker_name: Brokers[account.broker_id],
//     status_name: AccountStatus[account.status],
//     number: changeAccountNumberFormat(account)
//   };
// };

interface AccountService {
  api: APIServiceImpl;
  getUserAccounts<TData>(config?: AxiosRequestConfig): Promise<TData | TData[]>;
  getAccount<TData>(
    account_id: number,
    config?: AxiosRequestConfig
  ): Promise<TData>;
  createAccount<TData, TVarialbe>(
    body: TVarialbe,
    config?: AxiosRequestConfig
  ): Promise<TData>;
  updateAccount<TData, TVarialbe>(
    accountId: number,
    body: TVarialbe,
    config?: AxiosRequestConfig
  ): Promise<TData>;
  deleteAccount(accountId: number, config?: AxiosRequestConfig): Promise<void>;
}

export class AccountServiceImpl implements AccountService {
  api;
  constructor(baseURL: string) {
    this.api = new APIServiceImpl(baseURL);
  }

  async getUserAccounts<TData>(config?: AxiosRequestConfig): Promise<TData[]> {
    const response = await this.api.get<TData[]>("accounts", {
      ...config
    });

    return response.data;
  }

  async getAccount<TData>(
    account_id: number,
    config?: AxiosRequestConfig
  ): Promise<TData> {
    const response = await this.api.get<TData>(
      `accounts
      /${account_id}`,
      {
        ...config
      }
    );

    return response.data;
  }

  async createAccount<TData, TVariable>(
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<TData> {
    const response = await this.api.post<TData, TVariable>("accounts", body, {
      ...config
    });

    return response.data;
  }

  async updateAccount<TData, TVariable>(
    accountId: number,
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<TData> {
    const response = await this.api.put<TData, TVariable>(
      `account/${accountId}`,
      body,
      {
        ...config
      }
    );

    return response.data;
  }

  async deleteAccount(
    accountId: number,
    config?: AxiosRequestConfig
  ): Promise<void> {
    await this.api.delete(`account/${accountId}`, {
      ...config
    });
  }
}
