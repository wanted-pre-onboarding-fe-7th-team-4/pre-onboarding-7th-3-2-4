import { accountTableColumns } from "lib/data/accountTableColumns";
import { AccountModel } from "model/model";
import React from "react";

interface Props {
  accountsData?: Record<keyof AccountModel, string>[];
}
function AccountListTable({ accountsData }: Props) {
  // 데이터가 변경될때마다 가공이 되어야한다.

  return (
    <div>
      <table className="bg-white font-normal text-sm">
        <thead className="bg-myBeige">
          <tr>
            {accountTableColumns.map((it) => (
              <th key={it.key}>{it.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* TODO: 밖에서 가공해서.. */}
          {accountsData?.map((row, index) => (
            <tr key={index}>
              {accountTableColumns.map(({ key }) => {
                return <td key={key}>{row[key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountListTable;
