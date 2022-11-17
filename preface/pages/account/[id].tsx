import { useState } from "react";
import { useRouter } from "next/router";

import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Layout from "components/Layout/dashboard/Layout";
import AccountInfo from "components/Layout/accountDetail/AccountInfo";
import { useGetAccountAndUser } from "components/accountDetail/hook/useAccountDetail";
import Modal from "components/Modal";

export default function Accounts() {
  const { query } = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const { isLoading, detail } = useGetAccountAndUser(Number(query.id));

  return (
    <>
      <Layout title="계좌 상세">
        {isLoading && <div>계좌 정보를 불러오고 있습니다.</div>}
        <div className="min-w-[50%] ">
          {isEdit && detail && (
            <Modal closeModal={() => setIsEdit(false)}>
              <UpdateAccount newAccountDetail={detail} setIsEdit={setIsEdit} />
            </Modal>
          )}
          {detail && (
            <AccountInfo newAccountDetail={detail} setIsEdit={setIsEdit} />
          )}
        </div>
      </Layout>
    </>
  );
}
