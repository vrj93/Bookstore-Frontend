export default function Pagination({
  meta,
  handleSearch,
  firstPage,
  previousPage,
  nextPage,
  lastPage,
}) {
  const renderPaginationButtons = () => {
    let paginationNumbers = [];
    let head;
    let tail;

    if (meta.last_page == 1) {
      head = tail = 1;
    }

    if (meta.last_page == 2) {
      head = 1;
      tail = 2;
    }

    if (meta.last_page >= 3) {
      if (meta.current_page == 1) {
        head = 1;
        tail = meta.current_page + 2;
      } else if (meta.current_page == 2) {
        head = 1;
        tail = meta.current_page + 1;
      } else {
        if (meta.current_page == meta.last_page) {
          head = meta.current_page - 2;
          tail = meta.current_page;
        } else {
          head = meta.current_page - 1;
          tail = meta.current_page + 1;
        }
      }
    }

    for (let i = head; i <= tail; i++) {
      if (meta.current_page == i) {
        paginationNumbers.push(
          <button
            key={i}
            onClick={(e) => handleSearch(e, i)}
            className="btn btn-secondary mr-2"
          >
            {i}
          </button>
        );
      } else {
        paginationNumbers.push(
          <button
            key={i}
            onClick={(e) => handleSearch(e, i)}
            className="btn btn-outline-secondary mr-2"
          >
            {i}
          </button>
        );
      }
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
