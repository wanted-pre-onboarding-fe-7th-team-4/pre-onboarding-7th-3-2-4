import { useState } from "react";
import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Layout from "components/Layout/dashboard/Layout";

import AccountInfo from "components/Layout/accountDetail/AccountInfo";
import { UserModel } from "model/model";
import { changeNewAccountDataForDashBoard } from "lib/utils/account/changeNewAccountDataForDashBoard";
import { useGetAccountDetail } from "components/accountDetail/hook/useAccountDetail";

export default function Accounts() {
  const [isEdit, setIsEdit] = useState(false);
  const { data, isSuccess, isLoading } = useGetAccountDetail(1);

  const user: UserModel[] = [
    {
      id: 1,
      uuid: "a18c83dc-f5e4-48a6-8b8d-25cbd03a9e58",
      photo:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/341.jpg",
      name: "Florence 남",
      email: "91@gmail.com",
      age: 53,
      gender_origin: 2,
      birth_date: "1963-07-03T02:15:24.547Z",
      phone_number: "010-9068-8591",
      address: "Pitcairn Islands 부천시",
      detail_address: "48245 대명면 Apt. 938",
      last_login: "2022-07-17T21:53:49.901Z",
      created_at: new Date("2020-12-05T14:53:24.704Z"),
      updated_at: new Date("2020-02-08T01:16:40.107Z")
    }
  ];

  const [newAccountDetail] = changeNewAccountDataForDashBoard(
    data ? data : [],
    user
  );

  if (isLoading) {
    return <div>hihih</div>;
  }

  return (
    <>
      {!isSuccess ? (
        <div>상세 페이지를 보여줄 수 없습니다. </div>
      ) : (
        <Layout title="계좌 상세">
          <div className="min-w-[50%] ">
            {isEdit ? (
              <UpdateAccount
                newAccountDetail={newAccountDetail}
                setIsEdit={setIsEdit}
              />
            ) : (
              <AccountInfo
                newAccountDetail={newAccountDetail}
                setIsEdit={setIsEdit}
              />
            )}
          </div>
        </Layout>
      )}
    </>
  );
}
