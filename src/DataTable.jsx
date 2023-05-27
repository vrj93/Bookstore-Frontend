import Pagination from "./Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const DataTable = ({
  meta,
  links,
  books,
  handleSearch,
  selectPerPage,
  setSelectPerPage,
  selectOrderType,
  setOrderTpye,
  isTableSpinning,
}) => {
  const navigate = useNavigate();

  const handleShowBook = async (id) => {
    navigate(`book/${id}`);
  };

  const handlePerPage = (eventKey) => {
    setSelectPerPage(eventKey);
  };

  const handleOrder = () => {
    const orderType = selectOrderType === "asc" ? "desc" : "asc";
    setOrderTpye(orderType);
  };

  const firstPage = async (e) => {
    await handleSearch(e, links.first);
  };

  const previousPage = async (e) => {
    await handleSearch(e, links.prev);
  };

  const nextPage = async (e) => {
    await handleSearch(e, links.next);
  };

  const lastPage = async (e) => {
    await handleSearch(e, links.last);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-end mb-3 w-100">
          <div className="input-group">
            <Dropdown onSelect={handlePerPage}>
              <Dropdown.Toggle variant="info" id="dropdown-perpage">
                {selectPerPage}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="10">10</Dropdown.Item>
                <Dropdown.Item eventKey="30">30</Dropdown.Item>
                <Dropdown.Item eventKey="50">50</Dropdown.Item>
                <Dropdown.Item eventKey="100">100</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr className="font-weight-bold">
              <th
                className="px-4 py-2 text-start"
                key="title"
                onClick={() => handleOrder()}
                style={{ cursor: "pointer" }}
              >
                Titles
              </th>
            </tr>
          </thead>
          <tbody>
            {books && !isTableSpinning ? (
              books.map((book, key) => (
                <tr key={key} className="">
                  <td className="px-4 py-2 text-start">
                    <button
                      type="button"
                      className="btn p-0"
                      style={{
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onClick={() => handleShowBook(book.id)}
                    >
                      {book.title}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ height: "300px" }}>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "40vh" }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        meta={meta}
        handleSearch={handleSearch}
        firstPage={firstPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />
    </div>
  );
};

export default DataTable;
