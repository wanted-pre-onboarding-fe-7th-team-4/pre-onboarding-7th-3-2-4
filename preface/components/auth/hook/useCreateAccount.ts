import { queryKeys } from "./../../../lib/react-query/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AccountType } from "lib/types/types";
import { accountService } from "service/AccountsService";

const onSubmitAccount = async (account: AccountType) => {
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
