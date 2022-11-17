import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import styled from "styled-components";

interface Props {
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
}

function Pagination({ page, maxPage, setPage }: Props) {
  const router = useRouter();
  const pageButtons = useMemo(
    () => Array.from({ length: maxPage }, (_, index) => index + 1),
    [maxPage]
  );

  const onBefore = () => {
    if (page > 1) setPage(page - 1);
  };

  const onNext = () => {
    if (page < maxPage) setPage(page + 1);
  };

  return (
    <PaginationContainer>
      <button
        className="first"
        onClick={onBefore}
        //   onClick={onClickPrev} disabled={page === 1}
      >
        {"<"}
      </button>
      <div
        className="pageButtonContainer"
        //    onClick={onClick}
      >
        {pageButtons.map((v) => (
          <button
            data-index={v}
            key={v}
            className={v === page ? "active" : ""}
            onClick={() => {
              setPage(v);
            }}
          >
            {v}
          </button>
        ))}
      </div>
      <button className="end" onClick={onNext}>
        {">"}
      </button>
    </PaginationContainer>
  );
}

export default Pagination;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  /* gap: 10px; */
  margin: 20px;

  button {
    min-width: 30px;
    height: 30px;
    font-size: 15px;
    text-align: center;
    border-radius: 30px;
    font-weight: bold;
    margin: 5px;
    &:disabled {
      color: gray;
    }
    &.active {
      color: white;
      background: #3b8ef5;
    }
  }

  .first,
  .end {
    font-size: 18px;
  }
`;
