import { useQuery, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "lib/api/instance";
import { Queries } from "lib/types/types";
import { getFormattedAccountData } from "lib/utils/getFormattedAccountData";
import { AccountModel } from "model/model";
import { useRouter } from "next/router";
import { queryKeys } from "react-query/constants";
import { useCallback, useEffect } from "react";

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

  const queryClient = useQueryClient();

  const { data } = useQuery(
    [queryKeys.accounts, query],
    () => getPageAccounts({ _limit: LIMIT, ...query }),

    {
      retry: 3,
      retryDelay: 3000,
      staleTime: 2000,
      keepPreviousData: true,

      select: useCallback((data: AccountsPage) => {
        return { ...data, data: getFormattedAccountData(data.data) };
      }, [])
    }
  );

  useEffect(() => {
    const current_page = Number(query._page);
    const totalPage = Math.ceil((data?.totalItems || 0) / LIMIT);

    if (current_page < totalPage) {
      const next_page = current_page + 1;

      queryClient.prefetchQuery([queryKeys.accounts, next_page], () => {
        return getPageAccounts({ _limit: LIMIT, ...query, _page: next_page });
      });
    }
  }, [query._page]);

  return {
    query,
    limit: LIMIT,
    cur_page: data?.cur_page,
    accounts: data?.data,
    totalPage: Math.ceil((data?.totalItems || 0) / LIMIT)
  };
};
