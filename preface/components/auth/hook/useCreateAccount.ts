import { queryKeys } from "react-query/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AccountModel } from "model/model";
import { AccountServiceImpl } from "service/AccountService";

const accountService = new AccountServiceImpl("http://localhost:3000/api");

const onSubmitAccount = async (account: Omit<AccountModel, "id" | "uuid">) => {
  await accountService.createAccount(account);
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const { mutate: onCreate } = useMutation(onSubmitAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.accounts]);
      alert("새 계좌가 생성되었습니다");
      // MODAL 창 닫기
    },
    // TODO: ERROR 처리 전역으로 한번에
    onError: (err: unknown) => {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  });

  return onCreate;
};
