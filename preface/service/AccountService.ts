import { AxiosRequestConfig } from "axios";
import { APIServiceImpl } from "../lib/api/API";

export interface Account {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: keyof typeof BrokerName;
  status: keyof typeof AccountStatus;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const BrokerName = {
  "209": "유안타증권",
  "218": "현대증권",
  "230": "미래에셋증권",
  "238": "대우증권",
  "240": "삼성증권",
  "243": "한국투자증권",
  "247": "우리투자증권",
  "261": "교보증권",
  "262": "하이투자증권",
  "263": "HMC투자증권",
  "264": "키움증권",
  "265": "이베스트투자증권",
  "266": "SK증권",
  "267": "대신증권",
  "268": "아이엠투자증권",
  "269": "한화투자증권",
  "270": "하나대투자증권",
  "279": "동부증권",
  "280": "유진투자증권",
  "288": "카카오페이증권",
  "287": "메리츠종합금융증권",
  "290": "부국증권",
  "291": "신영증권",
  "292": "LIG투자증권",
  "271": "토스증권"
} as const;

export type BrokerName = typeof BrokerName[keyof typeof BrokerName];

export const AccountStatus = {
  9999: "관리자확인필요",
  1: "입금대기",
  2: "운용중",
  3: "투자중지",
  4: "해지"
} as const;

export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];

export const BrokerFormat = {
  "209": "00-00000000-00",
  "218": "00-0000000-000",
  "230": "00-000000-0000",
  "238": "00-000-0000-000",
  "240": "00-0000-000000",
  "243": "00-000000000-0",
  "247": "00-0000-000000",
  "261": "00-00-00000000",
  "262": "00-0000000-000",
  "263": "00-0000-000000",
  "264": "00-0000-00-0000",
  "265": "00-000-000-0000",
  "266": "00-00000-00000",
  "267": "00-000-0000000",
  "268": "00-000000-00-00",
  "269": "00-00000-00000",
  "270": "00-000-0000000",
  "279": "00-00000-00000",
  "280": "00-0000-000000",
  "288": "00-00000000-00",
  "287": "00-0000-00000-0",
  "290": "00-000000-0000",
  "291": "00-0000-000000",
  "292": "00-00000-00000",
  "271": "00-000-0000000"
} as const;

export type BrokerFormat = typeof BrokerFormat[keyof typeof BrokerFormat];

const changeAccountNumberFormat = (account: Account) => {
  const format = BrokerFormat[account.broker_id];
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

const accountChangeFormat = (account: Account) => {
  return {
    ...account,
    broker_name: BrokerName[account.broker_id],
    status_name: AccountStatus[account.status],
    number: changeAccountNumberFormat(account)
  };
};

type CreateAccountBody = Pick<
  Account,
  "user_id" | "broker_id" | "number" | "name" | "assets" | "payments"
>;

type UpdateAccountBody = Pick<
  Account,
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
  ): Promise<Account[]>;
  // getSearchAccounts(
  //   endpoint: string,
  // ): Promise<Account[]>;
  // getAccount(id: number, account_id: number): Promise<Account>;
  createAccount(
    endpoint: string,
    body: CreateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<Account>;
  updateAccount(
    endpoint: string,
    body: UpdateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<Account>;
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
  ): Promise<Account[]> {
    const response = await this.api.get<Account[]>(endpoint, {
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
  ): Promise<Account> {
    const response = await this.api.post<Account, CreateAccountBody>(
      endpoint,
      body,
      { ...config }
    );

    return response.data;
  }

  async updateAccount(
    endpoint: string,
    body: UpdateAccountBody,
    config?: AxiosRequestConfig
  ): Promise<Account> {
    const response = await this.api.put<Account, UpdateAccountBody>(
      endpoint,
      body,
      { ...config }
    );

    return response.data;
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
