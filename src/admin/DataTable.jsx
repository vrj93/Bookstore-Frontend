import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import Dropdown from "react-bootstrap/Dropdown";

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
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  };

  const fetchBooks = async (link) => {
    setTableSpinner(true);

    if (link !== null) {
      console.log(selectURLParams);

      const url = new URL(link);
      const page = url.searchParams.get("page");

      const urlWithParams = page
        ? `${link}&${selectURLParams}`
        : `${link}?${selectURLParams}`;
      console.log(urlWithParams);

      const response = await fetch(urlWithParams, config);
      const responseData = await response.json();
      console.log(responseData);
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

    const url = `http://localhost:8000/api/v1/book/${id}`;

    const res = await fetch(url, config);
    const response = await res.json();

    const bookData = response.data;
    console.log(bookData);
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
    console.log(bookDetails);
    let baseUrl = "http://localhost:8000/api/v1/admin/book";
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
        await fetchBooks("http://localhost:8000/api/v1/book");
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const handleDeleteBook = async (id) => {
    setTableSpinner(true);
    const url = `http://localhost:8000/api/v1/admin/book/${id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: config.headers,
        body: "",
      });

      const response = await res.json();

      if (res.ok) {
        await fetchBooks("http://localhost:8000/api/v1/book");
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
      const searchString = "title=&paginate=Per Page&sortname=&sortorder=asc";

      setURLParams(newURLParam);

      if (searchString !== selectURLParams && selectURLParams != "") {
        fetchBooks("http://localhost:8000/api/v1/book");
      }
    }
  }, [
    selectedOption,
    selectSearchText,
    selectPerPage,
    selectOrderName,
    selectOrderType,
    selectURLParams,
  ]);

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
                      onClick={() => handleDeleteBook(book.id)}
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
      <div className="modal fade" id="addeditBook">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{selectAddEdit} Book</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!isModalSpinning ? (
                <form action="">
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="title" className="form-label">
                      <strong>Title</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={bookDetails.title}
                      placeholder="Title"
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="author" className="form-label">
                      <strong>Author</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      name="author"
                      value={bookDetails.author}
                      placeholder="Author"
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="Genre" className="form-label">
                      <strong>Genre</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="genre"
                      name="genre"
                      value={bookDetails.genre}
                      placeholder="Genre"
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          genre: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="description" className="form-label">
                      <strong>Description</strong>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={bookDetails.description}
                      placeholder="Description"
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="isbn" className="form-label">
                      <strong>ISBN</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="isbn"
                      name="isbn"
                      value={bookDetails.isbn}
                      placeholder="ISBN"
                      onChange={(e) =>
                        setBookDetails({ ...bookDetails, isbn: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="published" className="form-label">
                      <strong>Published</strong>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="published"
                      name="published"
                      value={bookDetails.published}
                      placeholder=""
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          published: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="publisher" className="form-label">
                      <strong>Publisher</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="publisher"
                      name="publisher"
                      value={bookDetails.publisher}
                      placeholder="Publisher"
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          publisher: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "40vh" }}
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeButtonRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddEditDetails(bookDetails.id)}
              >
                {selectAddEditButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
