import React from "react";
import type { NextPageWithLayout } from "pages/_app";

import Layout from "components/Layout/dashboard/Layout";
import styled from "styled-components";
import { useAccounts } from "react-qeury/hooks/useAccounts";
import AccountFilter from "components/account/AccountFilter";
import AccountListTable from "components/account/AccountListTable";
import Pagination from "components/account/Pagination";

const AccountPage: NextPageWithLayout = () => {
  const { accounts } = useAccounts();

  return (
    <Container className="w-full">
      <AccountFilter />
      <AccountListTable accountsData={accounts} />
      <Pagination />
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
