import React from "react";

const AdminPagingComponent = ({ pageData, onPageChange }) => {
  const currentPage = pageData.currentPage || 1;
  const totalPages = pageData.totalPages || 1;

  const blockSize = 5;

  // ✔ 5개 블록 계산
  const startPage = Math.floor((currentPage - 1) / blockSize) * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  // ✔ 1~totalPages가 아니라 start~end만 생성
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="admin-paging">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        이전
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
};

export default AdminPagingComponent;
