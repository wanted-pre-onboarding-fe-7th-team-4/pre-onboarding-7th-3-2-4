import React from "react";
import type { NextPageWithLayout } from "pages/_app";

import Layout from "components/Layout/dashboard/Layout";
import styled from "styled-components";
import { accountTableColumns } from "lib/data/accountTableColumns";

const AccountPage: NextPageWithLayout = () => {
  return (
    <Container className="flex w-full">
      <table className="bg-white font-normal text-sm">
        <thead className="bg-myBeige">
          <tr>
            {accountTableColumns.map((it) => (
              <th key={it.key}>{it.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* // TODO: 고객명, 계좌번호, 컴포넌트 분리 */}
          <tr>
            {/* TODO: 맵 돌려서 출력 */}
            <td>a</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

AccountPage.getLayout = (page) => <Layout title="투자계좌">{page}</Layout>;

export default AccountPage;

const Container = styled.div`
  table {
    border-collapse: collapse;
    border: 1px solid #f0f0f0;
    width: 95%;
    margin: 2.5rem auto;
  }
  th {
    padding: 0.8rem;
    border: 1px solid #f0f0f0;
    border-left: 0;
    color: #222;
  }
  tr,
  td {
    border-collapse: collapse;
    border: 1px solid #f0f0f0;
    /* text-align: right; */
    height: 2.5rem;
    padding-right: 1rem;
  }
`;
