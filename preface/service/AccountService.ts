import { AxiosRequestConfig, AxiosResponse } from "axios";
import { APIServiceImpl } from "../lib/api/API";

interface AccountService {
  api: APIServiceImpl;
  getUserAccounts<TData>(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>>;
  createAccount<TData, TVariable>(
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>>;
  updateAccount<TData, TVariable>(
    id: number,
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>>;
  deleteAccount(config?: AxiosRequestConfig): Promise<void>;
}

export class AccountServiceImpl implements AccountService {
  api;
  constructor(baseURL: string) {
    this.api = new APIServiceImpl(baseURL);
  }

  async getUserAccounts<TData>(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>> {
    const response = await this.api.get<TData>("accounts", {
      ...config
    });

    return response;
  }

  async createAccount<TData, TVariable>(
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>> {
    const response = await this.api.post<TData, TVariable>("accounts", body, {
      ...config
    });

    return response;
  }

  async updateAccount<TData, TVariable>(
    id: number,
    body: TVariable,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>> {
    const response = await this.api.put<TData, TVariable>(
      `accounts/${id}`,
      body,
      {
        ...config
      }
    );

    return response;
  }

  async deleteAccount(config?: AxiosRequestConfig): Promise<void> {
    await this.api.delete("accounts", {
      ...config
    });
  }
}
