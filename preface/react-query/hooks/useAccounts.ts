import { useQuery } from "@tanstack/react-query";
import { accountApi } from "lib/api/instance";
import { Queries } from "lib/types/types";
import { getFormattedAccountData } from "lib/utils/getFormattedAccountData";
import { AccountModel } from "model/model";
import { useRouter } from "next/router";
import { queryKeys } from "react-query/constants";
import useUsers from "./useUsers";

const LIMIT = 20;

export interface AccountResponseData {
  totalItems: number;
  data: AccountModel[];
}

export interface AccountsPage extends AccountResponseData {
  cur_page?: number;
}

interface ResponseModel {
  accounts: AccountModel[];
  totalItems: number;
}

export const getPageAccounts = async (
  params: Queries
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

export const useAccounts = () => {
  const { query } = useRouter();
  const { users } = useUsers();

  const { data, refetch, isLoading } = useQuery(
    [queryKeys.accounts, query],
    () => getPageAccounts({ _limit: LIMIT, ...query }),
    {
      retry: 3,
      retryDelay: 3000
    }
  );

  return {
    query,
    isLoading,
    limit: LIMIT,
    cur_page: data?.cur_page,
    accounts: getFormattedAccountData(data?.data || [], users),
    totalPage: Math.ceil((data?.totalItems || 0) / LIMIT),
    refetch
  };
};
