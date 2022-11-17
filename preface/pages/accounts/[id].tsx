import { useState } from "react";
import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Layout from "components/Layout/dashboard/Layout";
import styled from "styled-components";
import AccountInfo from "components/Layout/accountDetail/AccountInfo";
import { AccountModel, UserModel } from "model/model";
import { changeNewAccountDataForDashBoard } from "lib/utils/account/changeNewAccountDataForDashBoard";

export default function Accounts() {
  const [isEdit, setIsEdit] = useState(false);

  const accountDetail: AccountModel[] = [
    {
      id: 376,
      user_id: 81,
      uuid: "c5f476ab-8c08-42ac-bf65-dac71aef237a",
      broker_id: "209",
      status: 9999,
      number: "597146468431",
      name: "Personal Loan Account",
      assets: "120062438.72",
      payments: "564769162.38",
      is_active: false,
      created_at: new Date("2020-08-14T17:52:46.542Z"),
      updated_at: new Date("2021-04-03T18:12:33.767Z")
    }
  ];
  const user: UserModel[] = [
    {
      id: 81,
      uuid: "009cd912-5bcb-44ee-a293-1e1102dfc338",
      photo:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/455.jpg",
      name: "Joey 방 Jr.",
      email: "_22@hanmail.net",
      age: 52,
      gender_origin: 2,
      birth_date: "1970-04-12T14:41:41.023Z",
      phone_number: "010-7998-6474",
      address: "Dominican Republic 시흥군",
      detail_address: "17831 면목동 Apt. 440",
      last_login: "2022-02-28T03:45:01.203Z",
      created_at: new Date("2020-12-05T14:53:24.704Z"),
      updated_at: new Date("2020-02-08T01:16:40.107Z")
    }
  ];

  const [newAccountDetail] = changeNewAccountDataForDashBoard(
    accountDetail,
    user
  );

  return (
    <>
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
    </>
  );
}

const InfoAccount = styled.div`
  table {
    width: 95%;
    height: 20rem;

    display: flex;
    margin: 1rem auto;
    border-collapse: collapse;
    border: 1px solid #f0f0f0;
  }
  th {
    display: flex;
    align-items: center;
    width: 8rem;
    height: 5rem;
    padding-left: 1rem;
    border-collapse: collapse;
    border: 1px solid #f0f0f0;
    text-align: left;
    color: #222;
  }
  th:nth-of-type(2) {
    height: 10rem;
  }
  td {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 11rem;
    height: 5rem;
    padding-right: 1rem;
    border-collapse: collapse;
    border: 1px solid #f0f0f0;
  }
  td:nth-of-type(2) {
    height: 10rem;
  }
`;
