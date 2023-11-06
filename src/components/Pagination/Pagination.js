import React from "react";
import S from "./Pagination.module.css";
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ total, handleNextPage }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const paramPage = searchParams.get("page");
  const itemsPerPage = 10; // You can adjust this as needed
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        handleNextPage(newPage);
    }
  };

  return (
    <nav className={S.pagination_warpper}>
      <ul className={S.pagination}>
        <li onClick={() => handlePageChange(+paramPage-1)}>&lt; Previous</li>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <li className={paramPage == page ? 'bg-primary '+S.text_white: ''} key={page} onClick={() => handlePageChange(page)}>
              {page}
            </li>
          );
        })}
        <li onClick={() => handlePageChange(+paramPage+1)}>Next &gt;</li>
      </ul>

      <span>Total Records: {total}</span>
    </nav>
  );
};

export default Pagination;
