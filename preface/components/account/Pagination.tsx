import React, { useMemo } from "react";
import styled from "styled-components";

interface Props {
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
}

function Pagination({ page, maxPage, setPage }: Props) {
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
      <button className="first" onClick={onBefore}>
        {"<"}
      </button>
      <div className="pageButtonContainer">
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
  padding: 1rem 0;
  background: white;

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
