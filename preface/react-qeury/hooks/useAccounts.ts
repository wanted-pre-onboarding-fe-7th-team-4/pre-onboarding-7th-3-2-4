import { useQuery } from "@tanstack/react-query";
import { accountApi } from "lib/api/instance";
import { getAccountData } from "lib/utils/getFormattedAccountData";
import { AccountModel, TAccountStatusKey, TBrokersKey } from "model/model";
import { useRouter } from "next/router";
import { queryKeys } from "react-qeury/constants";

const LIMIT = 20;

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

export interface AccountResponseData {
  totalItems: number;
  data: AccountModel[];
}

export interface AccountsPage extends AccountResponseData {
  cur_page: number;
}

interface ResponseModel {
  accounts: AccountModel[];
  totalItems: number;
}

export const getPageAccounts = async (
  params: PageAccountsQuery
): Promise<AccountsPage> => {
  try {
    const { data } = await accountApi.getUserAccounts<ResponseModel>({
      params,
      withCredentials: true
    });
    return {
      totalItems: data.totalItems,
      data: data.accounts,
      cur_page: params._page
    };
  } catch (error) {
    return {
      totalItems: 0,
      data: [],
      cur_page: params._page
    };
  }
};

//page
/*
 const {query, data, setPage, setQuery } = useAccounts()

 * <filter query page가 변동됐을때도반영되어야함  />
* <table data/>
 * <page page setpage setpage를 할 수 있는 콜백/>
 */

export const useAccounts = () => {
  const { query } = useRouter();
  // console.log({ query });

  const { data, refetch } = useQuery(
    [queryKeys.accounts, query],
    () => getPageAccounts({ _page: 1, _limit: LIMIT, ...query }),
    {
      retry: 3,
      retryDelay: 3000
    }
  );

  return { accounts: getAccountData(data?.data || []), refetch };
};
