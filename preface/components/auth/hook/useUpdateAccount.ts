import { queryKeys } from "../../../lib/react-query/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AccountModel } from "model/model";
import { AccountServiceImpl } from "service/AccountService";

const accountService = new AccountServiceImpl("http://localhost:3000/api");

const onSubmitAccount = async (account: Omit<AccountModel, "id" | "uuid">) => {
  await accountService.updateAccount(account);
};

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  const { mutate: onUpdate } = useMutation(onSubmitAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.accounts]);
      alert("계좌가 수정었습니다");
    },
    // TODO: ERROR 처리 전역으로 한번에
    onError: (err: unknown) => {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  });

  return onUpdate;
};
