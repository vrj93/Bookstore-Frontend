import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const DataTable = ({ Multiselect }) => {
  const [books, setBooks] = useState([]);
  const [links, setLinks] = useState([]);
  const [meta, setMeta] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [selectPerPage, setSelectPerPage] = useState("Per Page");
  const [selectURLParams, setURLParams] = useState("");
  const [selectSearchText, setSearchText] = useState("");
  const [selectOrderName, setOrderName] = useState("");
  const [selectOrderType, setOrderTpye] = useState("asc");
  const [isTableSpinning, setTableSpinner] = useState(false);
  const navigate = useNavigate();

  const setPaginatedData = (response) => {
    setBooks(response.data.data);
    setLinks({
      prev: response.data.prev_page_url,
      next: response.data.next_page_url,
      first: response.data.first_page_url,
      last: response.data.last_page_url,
    });
    setMeta({
      from: response.data.from,
      to: response.data.to,
      total: response.data.total,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
    });
  };

  const fetchBooks = async (link) => {
    setTableSpinner(true);

    if (link !== null) {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_text: selectSearchText,
          order_name: selectOrderName,
          order_type: selectOrderType,
          search_option: selectedOption,
          per_page: selectPerPage,
        }),
      });

      const responseData = await response.json();
      setPaginatedData(responseData);
    }

    setTableSpinner(false);
  };

  const handleShowBook = async (id) => {
    navigate(`book/${id}`);
  };

  const handlePerPage = (eventKey) => {
    setSelectPerPage(eventKey);
  };

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleOrder = (key) => {
    setOrderName(key);
    const orderType = selectOrderType === "asc" ? "desc" : "asc";
    setOrderTpye(orderType);
  };

  useEffect(() => {
    if (selectSearchText != "") {
      const getData = setTimeout(() => {
        fetchBooks(`${import.meta.env.VITE_APP_API_URL}/book`);
      }, 500);

      return () => clearTimeout(getData);
    }
  }, [
    selectSearchText,
    selectOrderName,
    selectOrderType,
    selectedOption,
    selectPerPage,
  ]);

  /* useEffect(() => {
    if (selectSearchText !== "") {
      const newURLParam = `${selectedOption.toLowerCase()}=${selectSearchText}&paginate=${selectPerPage}&sortname=${selectOrderName}&sortorder=${selectOrderType}`;

      setURLParams(newURLParam);
    }
  }, [
    selectedOption,
    selectSearchText,
    selectPerPage,
    selectOrderName,
    selectOrderType,
  ]);

  useEffect(() => {
    const searchString = "title=&paginate=Per Page&sortname=&sortorder=asc";

    if (selectURLParams != searchString && selectURLParams != "") {
      const getData = setTimeout(() => {
        fetchBooks(`${import.meta.env.VITE_APP_API_URL}/book`);
      }, 500);

      return () => clearTimeout(getData);
    }
  }, [selectURLParams]); */

  const previousPage = async () => {
    await fetchBooks(links.prev);
  };

  const nextPage = async () => {
    await fetchBooks(links.next);
  };

  const firstPage = async () => {
    await fetchBooks(links.first);
  };

  const lastPage = async () => {
    await fetchBooks(links.last);
  };

  const options = [
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Genre", value: "genre" },
    { label: "ISBN", value: "isbn" },
    { label: "Published", value: "published" },
    { label: "Publisher", value: "publisher" },
  ];

  const handleDropDown = (selectedObj) => {
    const optionObj = selectedObj.map((option) => {
      return option.value;
    });

    setSelectedOption(optionObj);
  };

  return (
    <div className="container-fluid">
      {/* <div className="row">
        <div className="col-md-6 d-flex justify-content-end mb-3 w-100">
          <div className="input-group mr-3" style={{ marginRight: 15 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchText}
            />
          </div>

          <div className="input-group mr-3" style={{ marginRight: 15 }}>
            <Multiselect
              isObject={true}
              onKeyPressFn={function noRefCheck() {}}
              onRemove={function noRefCheck(selectedList) {
                handleDropDown(selectedList);
              }}
              onSearch={function noRefCheck() {}}
              onSelect={function noRefCheck(selectedList) {
                handleDropDown(selectedList);
              }}
              options={options}
              displayValue="label"
              placeholder="Filter By"
            />
          </div>

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
      </div> */}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr className="font-weight-bold">
              <th
                className="px-4 py-2 text-start"
                key="title"
                onClick={() => handleOrder("title")}
                style={{ cursor: "pointer" }}
              >
                Titles
              </th>
            </tr>
          </thead>
          <tbody>
            {!isTableSpinning ? (
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
        fetchBooks={fetchBooks}
        firstPage={firstPage}
        previousPage={previousPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />
    </div>
  );
};

export default DataTable;
