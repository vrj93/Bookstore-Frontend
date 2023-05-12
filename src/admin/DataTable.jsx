import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import AddUpdate from "./AddUpdate";

const DataTable = () => {
  const [books, setBooks] = useState([]);
  const [links, setLinks] = useState([]);
  const [meta, setMeta] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Title");
  const [selectPerPage, setSelectPerPage] = useState("Per Page");
  const [selectURLParams, setURLParams] = useState("");
  const [selectSearchText, setSearchText] = useState("");
  const [selectOrderName, setOrderName] = useState("");
  const [selectOrderType, setOrderTpye] = useState("asc");
  const [bookDetails, setBookDetails] = useState([]);
  const [isTableSpinning, setTableSpinner] = useState(false);
  const [isModalSpinning, setModalSpinner] = useState(false);
  const [selectAddEdit, setAddEdit] = useState("Add");
  const [selectAddEditButton, setAddEditButton] = useState("Add");
  const [submitting, setSubmitting] = useState(false);
  const closeButtonRef = useRef(null);

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

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  };

  const fetchBooks = async (link) => {
    setTableSpinner(true);

    if (link !== null) {
      const url = new URL(link);
      const page = url.searchParams.get("page");

      const urlWithParams = page
        ? `${link}&${selectURLParams}`
        : `${link}?${selectURLParams}`;

      const response = await fetch(urlWithParams, config);
      const responseData = await response.json();

      setPaginatedData(responseData);
    }

    setTableSpinner(false);
  };

  const handleAddButton = () => {
    setAddEdit("Add");
    setAddEditButton("Add");
    setBookDetails({
      id: "",
      title: "",
      author: "",
      genre: "",
      description: "",
      isbn: "",
      published: "",
      publisher: "",
    });
  };

  const handleShowBookDetails = async (id) => {
    setAddEdit("Edit");
    setAddEditButton("Update");
    setModalSpinner(true);

    const url = `${import.meta.env.VITE_APP_API_URL}/book/${id}`;

    const res = await fetch(url, config);
    const response = await res.json();

    const bookData = response.data;

    const bookObj = {
      id: bookData.id,
      title: bookData.title,
      author: bookData.author.name,
      genre: bookData.genre.name,
      description: bookData.description,
      isbn: bookData.isbn,
      published: bookData.published,
      publisher: bookData.publisher.name,
    };

    setBookDetails(bookObj);
    setModalSpinner(false);
  };

  const handleAddEditDetails = async (id) => {
    setSubmitting(true);
    let baseUrl = `${import.meta.env.VITE_APP_API_URL}/admin/book`;
    let url = "";
    let method = "";

    if (id) {
      url = `${baseUrl}/${id}`;
      method = "PATCH";
    } else {
      url = baseUrl;
      method = "POST";
    }

    const requestObj = {
      method: method,
      headers: config.headers,
      body: JSON.stringify(bookDetails),
    };

    try {
      const res = await fetch(url, requestObj);
      const data = await res.json();

      if (res.ok) {
        closeButtonRef.current.click();
        await fetchBooks(`${import.meta.env.VITE_APP_API_URL}/book`);
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
    setSubmitting(false);
  };

  const handleDeleteBook = async (id) => {
    setTableSpinner(true);
    const url = `${import.meta.env.VITE_APP_API_URL}/admin/book/${id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: config.headers,
        body: "",
      });

      const response = await res.json();

      if (res.ok) {
        await fetchBooks(`${import.meta.env.VITE_APP_API_URL}/book`);
        alert(response.message);
      } else {
        alert(response.error);
      }
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
    setTableSpinner(false);
  };

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
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
  }, [selectURLParams]);

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

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-start mb-3">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addeditBook"
            onClick={handleAddButton}
          >
            Add Book
          </button>
        </div>
        <div className="col-md-6 d-flex justify-content-end mb-3">
          <div className="input-group mr-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearchText}
              style={{ marginRight: "15px" }}
            />
          </div>
          <Dropdown onSelect={handleSelect} style={{ marginRight: "15px" }}>
            <Dropdown.Toggle variant="warning" id="dropdown-filter">
              {selectedOption}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
              <Dropdown.Item eventKey="Author">Author</Dropdown.Item>
              <Dropdown.Item eventKey="Genre">Genre</Dropdown.Item>
              <Dropdown.Item eventKey="ISBN">ISBN</Dropdown.Item>
              <Dropdown.Item eventKey="Published">Published</Dropdown.Item>
              <Dropdown.Item eventKey="Publisher">Publisher</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

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

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr className="text-left font-weight-bold">
              <th
                className="px-4 py-2"
                key="title"
                onClick={() => handleOrder("title")}
                style={{ cursor: "pointer" }}
              >
                Title
              </th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isTableSpinning ? (
              books.map((book, key) => (
                <tr key={key} className="text-left">
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2 text-nowrap">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#addeditBook"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleShowBookDetails(book.id)}
                    >
                      <span className="text-nowrap">Edit</span>
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this book?"
                          )
                        ) {
                          handleDeleteBook(book.id);
                        }
                      }}
                    >
                      Delete
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

      {/* Modal */}
      <AddUpdate
        selectAddEdit={selectAddEdit}
        isModalSpinning={isModalSpinning}
        bookDetails={bookDetails}
        setBookDetails={setBookDetails}
        closeButtonRef={closeButtonRef}
        handleAddEditDetails={handleAddEditDetails}
        selectAddEditButton={selectAddEditButton}
        submitting={submitting}
        setSubmitting={setSubmitting}
      />
    </div>
  );
};

export default DataTable;
