import React from "react";
import styled from "styled-components";

function AccountFilter() {
  return (
    <AccountFilterContainer className="bg-white font-normal text-sm">
      <form
        onSubmit={() => {
          console.log("change");
        }}
      >
        <div className="item">
          <label>증권사</label>
          <select
            name="broker_id"
            defaultValue="임시"
            //   value={broker}
          >
            <option defaultValue={1}>선택</option>
            {/* {Object.keys(brokersData).map((key, i) => (
              <option key={i} value={key}>
                {brokersData[key as Broker]}
              </option>
            ))} */}
          </select>
        </div>
        <div className="item">
          <label>계좌활성여부</label>
          <select
            name="is_active"
            defaultValue="임시"
            //   value={isActive ?? undefined}
          >
            <option defaultValue={1}>선택</option>
            <option value={1}>활성</option>
            <option value={0}>비활성</option>
          </select>
        </div>
        <div className="item">
          <label>계좌상태</label>
          <select
            name="status"
            defaultValue="임시"
            //   value={status}
          >
            <option defaultValue={1}>선택</option>
            {/* {Object.keys(accountStatusData).map((key, i) => (
              <option key={i} value={key}>
                {accountStatusData[key as AccountStatus]}
              </option>
            ))} */}
          </select>
        </div>
        <div className="item flex-1 p-1">
          <label>계좌명</label>
          <input
            name="q"
            defaultValue="임시"
            //   value={search} onChange={onChangeSearch}
          />
          <button type="submit" className="searchButton">
            검색
          </button>
        </div>
      </form>
      {/* {searchedText && (
        <div className="searchTextContainer">
          <label>검색된 내용</label>
          <p>{searchedText}</p>
          <button onClick={() => setSearchedText("")}>X</button>
        </div>
      )} */}
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
