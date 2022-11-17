import React, { useState, useEffect } from "react";
import type { NextPageWithLayout } from "pages/_app";

import Layout from "components/Layout/dashboard/Layout";
import styled from "styled-components";
import { useAccounts } from "react-query/hooks/useAccounts";
import AccountFilter from "components/account/AccountFilter";
import AccountListTable from "components/account/AccountListTable";
import Pagination from "components/account/Pagination";
import { useRouter } from "next/router";
import { generateQueryString } from "lib/utils/generateQueryString";

const AccountPage: NextPageWithLayout = () => {
  const { accounts, totalPage, refetch, limit, cur_page, query } =
    useAccounts();

  const [page, setPage] = useState(cur_page || 1);
  const router = useRouter();

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) return null;

  if (typeof window === "undefined") return <></>;

  return (
    <Container className="w-full">
      <AccountFilter />
      <AccountListTable accountsData={accounts} />
      <Pagination
        page={page}
        setPage={(page) => {
          setPage(page);

          router.push(
            "/account" + generateQueryString({ ...query, _page: page })
          );

          // 주소 바꾸기
        }}
        maxPage={totalPage}
      />
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
    /* text-align: center; */
    vertical-align: middle;
    height: 2.5rem;
    padding-right: 1rem;
    .positive {
      color: red;
    }
    .negative {
      color: blue;
    }
  }
`;
export function getServerSideProps({ query }: any) {
  // if query object was received, return it as a router prop:
  if (query._p) {
    return { props: { router: { query } } };
  }
  // obtain candidateId elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { candidateId: 8432 } } } };
}
