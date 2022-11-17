import UpdateAccount from "components/Layout/accountDetail/UpdateAccount";
import Layout from "components/Layout/dashboard/Layout";

export default function Accounts() {
  return (
    <>
      <Layout title="계좌 상세">
        <UpdateAccount />
      </Layout>
    </>
  );
}
