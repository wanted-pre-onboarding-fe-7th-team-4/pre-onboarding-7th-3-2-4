import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountServiceImpl } from "service/AccountService";
import { queryKeys } from "react-query/constants";
import { AccountModel, DashboardModel, UserModel } from "model/model";
import { CLIENT_BASE_URL } from "lib/constants/constants";
import { UserServiceImpl } from "service/UserService";

import { changeNewAccountDataForDashBoard } from "lib/utils/account/changeNewAccountDataForDashBoard";
import { useEffect, useState } from "react";

export type UpdateAccountBody = AccountModel;

const accountService = new AccountServiceImpl(CLIENT_BASE_URL);
const userService = new UserServiceImpl(CLIENT_BASE_URL);

export const useGetAccountDetail = (id: number) => {
  return useQuery(
    [queryKeys.accounts, id],
    async () =>
      await accountService.getUserAccounts<{ accounts: AccountModel[] }>({
        params: {
          id
        }
      }),
    {
      enabled: !!id,
      select: ({ data: { accounts } }) => accounts
    }
  );
};

export const useGetUser = (id: number) => {
  return useQuery(
    ["users", id],
    async () =>
      await userService.searchUser<{ users: UserModel[] }>({ params: { id } }),
    {
      select: ({ data: { users } }) => users
    }
  );
};

export const useGetAccountAndUser = (id: number) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetial] = useState<DashboardModel>();
  const [userId, setUserId] = useState<number>(0);
  const {
    data: accounts,
    isSuccess: isAccountSuccess,
    isLoading: isAccountLoading
  } = useGetAccountDetail(id);

  const {
    data: user,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading
  } = useGetUser(userId);

  useEffect(() => {
    const isSuccess = [isAccountSuccess, isUserSuccess].every((value) => value);
    setIsSuccess(isSuccess);
  }, [isAccountSuccess, isUserSuccess]);

  useEffect(() => {
    const isLoading = [isAccountLoading, isUserLoading].some((value) => value);
    setIsLoading(isLoading);
  }, [isAccountLoading, isUserLoading]);

  useEffect(() => {
    if (isAccountSuccess) {
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
