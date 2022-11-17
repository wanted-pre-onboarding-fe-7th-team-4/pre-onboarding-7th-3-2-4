import { Brokers } from "lib/utils/account/changeToBrokerName";
import { AccountStatus } from "lib/utils/account/getAccountStatus";

export interface AccountsQuery {
  broker_id?: typeof Brokers;
  is_active?: boolean;
  user_id?: number;
  status?: typeof AccountStatus;
  q?: string;
}

export interface PageAccountsQuery extends AccountsQuery {
  _page: number;
  _limit: number;
}

export interface UsersQuery {
  id?: number;
  is_staff?: boolean;
  is_active?: boolean;
}
