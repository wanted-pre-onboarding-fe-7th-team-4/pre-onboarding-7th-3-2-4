import { AccountModel } from "../../model/model";
import { changeToBrokerName } from "./changeToBrokerName";
import { maskAccountNumber } from "./maskAccountNumber";
import { getAccountName } from "./getAccountName";
import { getAccountStatus } from "./getAccountStatus";
import { getMoney } from "./getMoney";
import { getDate } from "./getDate";

export const getFormattedAccountData = (
  accounts?: AccountModel[]
): Record<keyof AccountModel, string>[] | undefined => {
  const newAccounts =
    accounts?.map(
      ({
        id,
        uuid,
        user_id,
        broker_id,
        number,
        name,
        status,
        assets,
        payments,
        is_active,
        created_at,
        updated_at
      }) => {
        return {
          id: id.toString(),
          uuid,
          user_id: user_id.toString(), // 사용자 이름
          broker_id: changeToBrokerName(broker_id),
          number: maskAccountNumber(number), // 링크 정보(계좌 id)
          name: getAccountName(name),
          status: getAccountStatus(status),
          assets: getMoney(assets), // payments보다 큰지, 작은지, 같은지
          payments: getMoney(payments),
          is_active: is_active === true ? "활성" : "비활성",
          created_at: getDate(created_at),
          updated_at: getDate(updated_at)
        };
      }
    ) || undefined;

  return newAccounts;
};
