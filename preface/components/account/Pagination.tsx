import React from "react";
import styled from "styled-components";

function Pagination() {
  return (
    <PaginationContainer>
      <button
        className="first"
        //   onClick={onClickPrev} disabled={page === 1}
      >
        {"<"}
      </button>
      <div
        className="pageButtonContainer"
        //    onClick={onClick}
      >
        {/* {Array.from({ length: maxPage }, (_, index) => index + 1).map((v) => (
      <button data-index={v} key={v} className={v === page ? "active" : ""}>
        {v}
      </button>
    ))} */}
      </div>
      <button
        className="end"
        //   onClick={onClickNext}  disabled={page === maxPage}
      >
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
