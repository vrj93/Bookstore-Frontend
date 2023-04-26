export default function Pagination({
  meta,
  fetchBooks,
  firstPage,
  previousPage,
  nextPage,
  lastPage,
}) {
  const renderPaginationButtons = () => {
    let paginationNumbers = [];
    let head = 1;
    let tail = meta.current_page + 1;

    if (meta.current_page > 2) {
        head = meta.current_page - 1;
        tail = meta.current_page + 1;
    }

    for (let i = head; i <= tail; i++) {
      paginationNumbers.push(
        <button key={i} onClick={() => fetchBooks(`http://localhost:8000/api/v1/book?page=${i}`)} className="btn btn-outline-secondary mr-2">
          {i}
        </button>
      );
    }
    return paginationNumbers;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span className="text-gray-700">
          {meta.from} - {meta.to} of {meta.total} items (page{" "}
          {meta.current_page} of {meta.last_page})
        </span>
      </div>
      <div>
        <button onClick={firstPage} className="btn btn-outline-secondary mr-2">
          First
        </button>
        <button
          onClick={previousPage}
          className="btn btn-outline-secondary mr-2"
        >
          Previous
        </button>

        {renderPaginationButtons()}

        <button onClick={nextPage} className="btn btn-outline-secondary mr-2">
          Next
        </button>
        <button onClick={lastPage} className="btn btn-outline-secondary">
          Last
        </button>
      </div>
    </div>
  );
}
