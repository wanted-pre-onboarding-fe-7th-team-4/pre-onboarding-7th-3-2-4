// import { Brokers } from "lib/utils/account/changeToBrokerName";
// import { AccountStatus } from "lib/utils/account/getAccountStatus";
import { TAccountStatusKey, TBrokersKey } from "model/model";

interface AccountsQuery {
  broker_id?: TBrokersKey;
  is_active?: boolean;
  user_id?: number;
  status?: TAccountStatusKey;
  name?: string;
  _page?: number;
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
