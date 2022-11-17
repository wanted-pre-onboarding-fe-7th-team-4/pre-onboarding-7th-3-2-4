import React, { useState } from "react";
import type { NextPageWithLayout } from "pages/_app";

import Layout from "components/Layout/dashboard/Layout";
import styled from "styled-components";
import { useAccounts } from "react-query/hooks/useAccounts";
import AccountFilter from "components/account/AccountFilter";
import AccountListTable from "components/account/AccountListTable";
import Pagination from "components/account/Pagination";
import { useRouter } from "next/router";
import { Queries } from "lib/types/types";
import { generateQueryString } from "lib/utils/generateQueryString";

const AccountPage: NextPageWithLayout = () => {
  const { accounts, totalPage, refetch, limit, cur_page, isLoading } =
    useAccounts();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<Queries>({ _limit: 20 });
  const router = useRouter();

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
    /* text-align: right; */
    height: 2.5rem;
    padding-right: 1rem;
  }
`;
export function getServerSideProps({ query }: any) {
  // if query object was received, return it as a router prop:
  if (query._page) {
    return { props: { router: { query } } };
  }
  // obtain candidateId elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { _page: 8432 } } } };
}
