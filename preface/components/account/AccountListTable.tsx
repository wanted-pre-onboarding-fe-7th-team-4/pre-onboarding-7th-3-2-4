import { accountTableColumns } from "lib/data/accountTableColumns";
import { AccountModel } from "model/model";
import React from "react";
import AccountItemTable from "./AccountItemTable";

interface Props {
  accountsData?: Record<keyof AccountModel, string>[];
}
function AccountListTable({ accountsData }: Props) {
  return (
    <div>
      <table className="bg-white font-normal text-sm text-center">
        <thead className="bg-myBeige">
          <tr>
            {accountTableColumns.map((it) => (
              <th key={it.key}>{it.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accountsData?.map((row, index) => (
            <tr key={index}>
              {accountTableColumns.map(({ key }) => {
                return <AccountItemTable row={row} column={key} key={key} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountListTable;
