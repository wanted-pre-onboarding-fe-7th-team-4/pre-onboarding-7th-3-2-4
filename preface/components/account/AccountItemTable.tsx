import { AccountModel } from "model/model";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  row: any;
  column: keyof AccountModel;
}

function AccountItemTable({row, column: key} : Props) {
  const router = useRouter();
  
  const handelNumberClick = () => {
    router.push({
      pathname: "/account/[id]",
      query: { id: row.id },
    })
  }
    if(key === "id" || key === "payments") {
      return <td className="text-right" key={key}>{row[key]}</td>;
    }
    if(key === "number"){
      return <td className="text-center" key={key} onClick={handelNumberClick}>{row[key]}</td>;
    }
    if(key === "assets"){
      const [assets, compare] = row[key].split("|");
      return <td key={key} className={`text-right ${compare}`}>{assets}</td>
    }
    return <td className="text-center" key={key}>{row[key]}</td>;
}

export default AccountItemTable;
