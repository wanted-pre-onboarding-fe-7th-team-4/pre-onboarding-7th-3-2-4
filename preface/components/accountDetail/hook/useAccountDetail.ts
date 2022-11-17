import { queryKeys } from "./../../../lib/react-query/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountServiceImpl } from "service/AccountService";
import { AccountModel } from "model/model";

const accountService = new AccountServiceImpl("http://localhost:3000/api");

export const getAccountDetail = (id: number) => {
  const { data, isLoading, error } = useQuery(
    [queryKeys.accounts, id],
    () =>
      accountService.getUserAccounts<AccountModel>({
        params: {
          id
        }
      }),
    {
      enabled: !!id
    }
  );

  return {
    data,
    isLoading,
    error
  };
};

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

export const updateAccountDetail = (id: number, body: UpdateAccountBody) => {
  const queryClient = useQueryClient();

  const { mutate: onUpdate } = useMutation(
    () =>
      accountService.updateAccount<AccountModel, UpdateAccountBody>(body, {
        params: {
          id
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.accounts]);
        alert("계좌가 수정되었습니다");
      }
    }
  );

  return onUpdate;
};

export const deleteAccountDetail = (id: number) => {
  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation(
    () =>
      accountService.deleteAccount({
        params: {
          id
        }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.accounts]);
        alert("계좌가 삭제되었습니다.");
      }
    }
  );

  return onDelete;
};
