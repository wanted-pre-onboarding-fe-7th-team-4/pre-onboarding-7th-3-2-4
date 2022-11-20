import { AccountModel } from "model/model";
import { changeToBrokerName } from "./changeToBrokerName";
import { maskAccountNumber } from "./maskAccountNumber";
import { getAccountName } from "./getAccountName";
import { getAccountStatus } from "./getAccountStatus";
import { getMoney } from "./getMoney";
import { getDate } from "./getDate";
import { compareTwoNumber } from "./compareTwoNumber";

export type NeedAccountModel = Omit<AccountModel, "uuid" | "updated_at">;

export const getFormattedAccountData = (
  accounts?: AccountModel[]
): Record<keyof NeedAccountModel, string>[] | undefined => {
  const newAccounts = accounts?.map(
    ({
      id,
      user_id,
      broker_id,
      number,
      name,
      status,
      assets,
      payments,
      is_active,
      created_at
    }) => {
      return {
        id: id.toString(),
        user_id: user_id.toString(),
        broker_id: changeToBrokerName(broker_id),
        number: maskAccountNumber(number),
        name: getAccountName(name),
        status: getAccountStatus(status),
        assets:
          getMoney(assets) +
          "|" +
          compareTwoNumber(Number(assets), Number(payments)),
        payments: getMoney(payments),
        is_active: is_active === true ? "활성" : "비활성",
        created_at: getDate(created_at)
      };
    }
  );

  return newAccounts;
};
