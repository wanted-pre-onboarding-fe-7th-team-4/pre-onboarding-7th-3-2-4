export const Brokers = {
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

type BrokersObject = typeof Brokers;
export type TBrokersKey = keyof BrokersObject;
export type TBrokersValue = BrokersObject[TBrokersKey];

export const AccountStatus = {
  9999: "관리자확인필요",
  1: "입금대기",
  2: "운용중",
  3: "투자중지",
  4: "해지"
} as const;

type AccountStatusObject = typeof AccountStatus;
export type TAccountStatusKey = keyof AccountStatusObject;
export type TAccountStatusValue = AccountStatusObject[TAccountStatusKey];

export interface LoignVariable {
  email: string;
  password: string;
}

export interface LoginModel {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface UserModel {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: Date;
  updated_at: Date;
}

export interface AccountModel {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: TBrokersKey;
  status: TAccountStatusKey;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ILoginData {
  email: string;
  password: string;
}
