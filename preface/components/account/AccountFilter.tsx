import { Queries } from "lib/types/types";
import { deleteQueryStringKey } from "lib/utils/deleteQueryStringKey";
import { generateQueryString } from "lib/utils/generateQueryString";
import {
  AccountStatus,
  Brokers,
  TAccountStatusKey,
  TBrokersKey
} from "model/model";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInput from "./hook/useInput";

interface Props {
  query: Queries;
}
function AccountFilter({ query }: Props) {
  const [search, setSearch, onChangeSearch] = useInput();
  const [qText, setQText] = useState<string>();

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQText(search?.trim());
  };

  useEffect(() => {
    if (qText)
      router.push(
        "/account" + generateQueryString({ ...query, q: qText, _page: 1 })
      );
    else {
      router.push(
        "/account" +
          generateQueryString(deleteQueryStringKey("q", { ...query, _page: 1 }))
      );
    }
  }, [qText]);

  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.name === "q") return;
    const newQuery: Queries = { ...query };

    if (e.target.value === "선택") {
      router.push(
        "/account" +
          generateQueryString(
            deleteQueryStringKey(e.target.name, { ...query, _page: 1 })
          )
      );
      return;
    }
    router.push(
      "/account" +
        generateQueryString({
          ...newQuery,
          [e.target.name]: e.target.value,
          _page: 1
        })
    );
  };

  return (
    <AccountFilterContainer>
      <div className="bg-white font-normal text-sm">
        <form onSubmit={onSubmit} onChange={onChange}>
          <div className="item">
            <label>증권사</label>
            <select name="broker_id">
              <option selected value={undefined}>
                선택
              </option>
              {Object.keys(Brokers).map((broker_id, i) => (
                <option key={i} value={broker_id}>
                  {Brokers[broker_id as TBrokersKey]}
                </option>
              ))}
            </select>
          </div>
          <div className="item">
            <label>계좌활성여부</label>
            <select name="is_active">
              <option selected>선택</option>
              <option value={"true"}>활성</option>
              <option value={"false"}>비활성</option>
            </select>
          </div>
          <div className="item">
            <label>계좌상태</label>
            <select name="status">
              <option selected>선택</option>
              {Object.keys(AccountStatus).map((status, i) => (
                <option key={i} value={status}>
                  {AccountStatus[status as unknown as TAccountStatusKey]}
                </option>
              ))}
            </select>
          </div>
          <div className="item flex-1 p-1">
            <label>계좌명</label>
            <input name="q" value={search} onChange={onChangeSearch} />
            <button type="submit" className="searchButton">
              검색
            </button>
          </div>
        </form>
        {qText && (
          <div className="searchTextContainer">
            <label>검색된 내용</label>
            <p>{qText}</p>
            <button onClick={() => setQText("")}>X</button>
          </div>
        )}
      </div>
    </AccountFilterContainer>
  );
}

export default AccountFilter;

const AccountFilterContainer = styled.div`
  margin: 0 auto;
  form {
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
  }
  select,
  option {
    text-align: center;
    min-width: 100px;
    margin-right: 0.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    label {
      display: block;
      padding: 12px 1rem;
      background: #3b8ef5;
      text-align: center;
      color: white;
    }
  }
  input {
    flex: 1;
    height: 100%;
    border: 2px solid #3b8ef5;
  }
  .searchButton {
    width: 100px;
    background: #3b8ef5;
    height: 100%;
    color: white;
    font-weight: 500;
  }
  .searchTextContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    label {
      display: block;
      padding: 12px 1rem;
      background: #3b8ef5;
      text-align: center;
      color: white;
    }
    p {
      padding: 1rem 2rem;
    }
    button {
      width: 30px;
      height: 30px;
      text-align: center;
      color: white;
      background: #3b8ef5;
      border-radius: 30px;
    }
  }
`;
