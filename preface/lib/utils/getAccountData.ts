import { AccountModel } from "./../../model/model";
import { changeToBrokerName } from "./changeToBrokerName";
import { maskAccountNumber } from "./maskAccountNumber";
import { getAccountName } from "./getAccountName";
import { getAccountStatus } from "./getAccountStatus";
import { getMoney } from "./getMoney";
import { getDate } from "./getDate";

export const getAccountData = (accounts: AccountModel[], users) => {
  const newAccounts = accounts.map(
    ({
      uuid,
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
        uuid,
        user_id,
        broker_id: changeToBrokerName(broker_id),
        number: maskAccountNumber(number),
        name: getAccountName(name),
        status: getAccountStatus(status),
        assets: getMoney(assets),
        payments: getMoney(payments),
        is_active: is_active === true ? "활성" : "비활성",
        created_at: getDate(created_at)
      };
    }
  );

  return newAccounts;
};
