import React from "react";
import { queryKeys } from "./../../../lib/react-query/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountServiceImpl } from "service/AccountService";
import { AccountModel } from "model/model";

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

const accountService = new AccountServiceImpl("http://localhost:3000/api");

const useAccountDetail = () => {
  const [accountDetail, setAccountDetail] = React.useState<AccountModel | null>(
    null
  );
  const getAccountDetail = (id: number) => {
    const { isLoading, error } = useQuery(
      [queryKeys.accounts, id],
      () =>
        accountService.getUserAccounts<AccountModel>({
          params: {
            id
          }
        }),
      {
        enabled: !!id,
        onSuccess: (response) => {
          const { data } = response;
          setAccountDetail(data);
        }
      }
    );

    return {
      accountDetail,
      isLoading,
      error
    };
  };

  const updateAccountDetail = (id: number, body: UpdateAccountBody) => {
    const queryClient = useQueryClient();

    const { mutate: onUpdate } = useMutation(
      () =>
        accountService.updateAccount<AccountModel, UpdateAccountBody>(body, {
          params: {
            id
          }
        }),
      {
        onSuccess: (response) => {
          const { data } = response;
          queryClient.invalidateQueries([queryKeys.accounts]);
          alert("계좌가 수정되었습니다");
          setAccountDetail(data);
        }
      }
    );

    return {
      accountDetail,
      onUpdate
    };
  };

  const deleteAccountDetail = (id: number) => {
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
          setAccountDetail(null);
        }
      }
    );

    return onDelete;
  };

  return {
    getAccountDetail,
    updateAccountDetail,
    deleteAccountDetail
  };
};

export default useAccountDetail;
