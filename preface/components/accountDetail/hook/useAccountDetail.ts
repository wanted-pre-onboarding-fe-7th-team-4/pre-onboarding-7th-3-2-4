import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { AccountServiceImpl } from "service/AccountService";
import { queryKeys } from "react-query/constants";
import { AccountModel, DashboardModel, UserModel } from "model/model";
import { CLIENT_BASE_URL } from "lib/constants/constants";
import { UserServiceImpl } from "service/UserService";

import { changeNewAccountDataForDashBoard } from "lib/utils/account/changeNewAccountDataForDashBoard";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

export type UpdateAccountBody = AccountModel;

const accountService = new AccountServiceImpl(CLIENT_BASE_URL);
const userService = new UserServiceImpl(CLIENT_BASE_URL);

export const useGetAccountAndUser = (id: number) => {
  const [detail, setDetial] = useState<DashboardModel>();
  const [userId, setUserId] = useState<number>(0);

  const results = useQueries({
    queries: [
      {
        queryKey: [queryKeys.accounts, id],
        queryFn: async () =>
          await accountService.getUserAccounts<{ accounts: AccountModel[] }>({
            params: {
              id
            }
          }),
        enabled: !!id,
        select: (data: AxiosResponse<{ accounts: AccountModel[] }>) =>
          data.data.accounts
      },
      {
        queryKey: ["users", userId],
        queryFn: async () =>
          await userService.searchUser<{ users: UserModel[] }>({
            params: { userId }
          }),

        select: (data: AxiosResponse<{ users: UserModel[] }>) => data.data.users
      }
    ]
  });

  const isSuccess = results.every((query) => query.isSuccess);
  const isLoading = results.some((query) => query.isLoading);
  const isAccountSuccess = results[0].isSuccess;
  const accounts = results[0].data;
  const user = results[1].data;

  useEffect(() => {
    if (isAccountSuccess && accounts) {
      const [userId] = accounts.map((value) => value.user_id);
      setUserId(userId);
    }
  }, [isAccountSuccess]);

  useEffect(() => {
    if (isSuccess) {
      const [newAccountDetail] = changeNewAccountDataForDashBoard(
        accounts ? accounts : [],
        user
      );
      setDetial(newAccountDetail);
    }
  }, [isSuccess]);

  return { isSuccess, isLoading, detail };
};

export const useUpdateAccountDetail = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, body }: { id: number; body: UpdateAccountBody }) =>
      await accountService.updateAccount<AccountModel, UpdateAccountBody>(
        id,
        body
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.accounts]);
      }
    }
  );
};

export const useDeleteAccountDetail = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () =>
      await accountService.deleteAccount({
        params: {
          id
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.accounts]);
      }
    }
  );
};
