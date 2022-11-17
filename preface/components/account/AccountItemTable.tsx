import { AccountModel } from "model/model";
import { useRouter } from "next/router";
import React from "react";
import useUsers from "react-query/hooks/useUsers";

interface Props {
  row: any;
  column: keyof AccountModel;
}

function AccountItemTable({ row, column: key }: Props) {
  const router = useRouter();
  const { users } = useUsers();

  const handelNumberClick = () => {
    router.push({
      pathname: "/account/[id]",
      query: { id: row.id }
    });
  };
  if (key === "id" || key === "payments") {
    return (
      <td className="text-right" key={key}>
        {row[key]}
      </td>
    );
  }
  if (key === "number") {
    return (
      <td className="text-center" key={key} onClick={handelNumberClick}>
        {row[key]}
      </td>
    );
  }
  if (key === "assets") {
    const [assets, compare] = row[key].split("|");

    return (
      <td key={key} className={`text-right ${compare}`}>
        {assets}
      </td>
    );
  }
  if (key === "user_id") {
    const name = users?.find(({ id }) => id.toString() === row[key])?.name;
    return (
      <td className="text-center" key={key}>
        {name}
      </td>
    );
  }
  return (
    <td className="text-center" key={key}>
      {row[key]}
    </td>
  );
}

export default AccountItemTable;
