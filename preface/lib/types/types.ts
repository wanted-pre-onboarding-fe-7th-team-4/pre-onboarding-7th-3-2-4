// export interface Queries {
//   q?: string | string[];
//   _page?: string | string[];
//   _limit?: string | string[];
//   _sort?: string | string[];
//   _order?: string | string[];
// }

export type AccountType = {
  id?: string;
  user_id: string;
  uuid?: string;
  broker_id: string;
  status: string;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: string;
  created_at: Date;
  updated_at: Date;
};

export interface Queries {
  q?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
  broker_id?: string;
  status?: string;
  is_active?: boolean;
}

export type QueryKeys = keyof Queries;
