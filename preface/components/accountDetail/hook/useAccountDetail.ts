import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AccountServiceImpl } from "service/AccountService";
import { queryKeys } from "lib/react-query/constants";
import { AccountModel } from "model/model";
import { CLIENT_BASE_URL } from "lib/constants/constants";

export type UpdateAccountBody = Pick<
  AccountModel,
  | "broker_id"
  | "number"
  | "name"
  | "assets"
  | "payments"
  | "is_active"
  | "status"
>;

const accountService = new AccountServiceImpl(CLIENT_BASE_URL);

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

export const useUpdateAccountDetail = (id: number, body: UpdateAccountBody) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () =>
      await accountService.updateAccount<AccountModel, UpdateAccountBody>(
        body,
        {
          params: {
            id
          }
        }
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
