import { useRouter } from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AccountModel } from "model/model";
import { AccountServiceImpl } from "service/AccountService";
import { CLIENT_BASE_URL } from "lib/constants/constants";

const accountsService = new AccountServiceImpl(CLIENT_BASE_URL);

const useCreateNewAccount = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation<AxiosResponse, AxiosError, Omit<AccountModel, "id">>(
    async (account) => await accountsService.createAccount(account),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["accounts"]);
        push("/account");
      }
    }
  );
};

export default useCreateNewAccount;
