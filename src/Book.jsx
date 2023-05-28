import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import SideBar from "./SideBar";
import Cookies from "js-cookie";

const Book = () => {
  //Sidebar States
  const [titles, setTitles] = useState([]);
  const [content, setContent] = useState([]);
  const [authors, setAuthor] = useState([]);
  const [genres, setGenre] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [isbn, setISBN] = useState(0);
  const [published, setPublished] = useState({
    duration: "",
    year: "",
  });
  const [submitting, setSubmitting] = useState(false);

  //Datatable States
  const [books, setBooks] = useState([]);
  const [links, setLinks] = useState([]);
  const [meta, setMeta] = useState([]);
  const [selectPerPage, setSelectPerPage] = useState("Per Page");
  const [selectOrderType, setOrderTpye] = useState("asc");
  const [isTableSpinning, setTableSpinning] = useState(false);

  const handleSearch = async (e, page = null) => {
    e.type === "submit" && e.preventDefault();
    console.log("clicked", page);

    setSubmitting(true);
    setTableSpinning(true);

    let searchObj = {
      title: titles,
      content: content,
      author: authors,
      genre: genres,
      publisher: publishers,
      isbn: isbn,
      published: published,
      sortorder: selectOrderType,
      paginate: selectPerPage,
    };

    // console.log(searchObj);

    const searchJson = JSON.stringify(searchObj);

    const url = page
      ? `${
          import.meta.env.VITE_APP_API_URL
        }/book?page=${page}&search=${searchJson}`
      : `${import.meta.env.VITE_APP_API_URL}/book?search=${searchJson}`;

    const res = await fetch(url);

    const response = await res.json(res);
    console.log(response);

    setPaginatedData(response);

    const getTimer = setTimeout(() => {
      setSubmitting(false);
    }, 3000);

    setTableSpinning(false);
    return () => clearTimeout(getTimer);
  };

  useEffect(() => {
    if (
      titles.length > 0 ||
      authors.length > 0 ||
      genres.lenght > 0 ||
      content.length > 0 ||
      isbn > 0 ||
      published.duration != "" ||
      published.year != "" ||
      publishers.length > 0
    ) {
      const event = { type: "dummy" }; // Create a dummy event object
      handleSearch(event);
    }
  }, [selectPerPage]);

  const setPaginatedData = (response) => {
    setBooks(response.data.data);
    setLinks({
      prev: getPageNumber(response.data.prev_page_url),
      next: getPageNumber(response.data.next_page_url),
      first: getPageNumber(response.data.first_page_url),
      last: getPageNumber(response.data.last_page_url),
    });
    setMeta({
      from: response.data.from,
      to: response.data.to,
      total: response.data.total,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
    });
  };

  const getPageNumber = (url) => {
    if (url) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("page");
    }
  };

  return (
    <>
      <div className="d-flex align-items-stretch vh-100">
        <SideBar
          titles={titles}
          setTitles={setTitles}
          content={content}
          setContent={setContent}
          authors={authors}
          setAuthor={setAuthor}
          genres={genres}
          setGenre={setGenre}
          publishers={publishers}
          setPublisher={setPublisher}
          setISBN={setISBN}
          published={published}
          setPublished={setPublished}
          submitting={submitting}
          handleSearch={handleSearch}
        />

        {/* <!-- Data Table  --> */}
        <div id="content" className="container-fluid">
          <div className="d-flex justify-content-between">
            <div className="justify-content-start align-items-center px-4 mb-3">
              <h2 className="rounded p-2" style={{ color: "black" }}>
                Results
              </h2>
            </div>
            {Cookies.get("user") && (
              <div className="justify-content-end align-items-center px-4 my-3">
                <span
                  className="rounded p-2"
                  style={{ color: "#781A75", fontSize: 18, fontFamily: "sans-serif" }}
                >
                  <strong>Hello {Cookies.get("user").split(" ")[0]}!</strong>
                </span>
              </div>
            )}
          </div>

          <DataTable
            meta={meta}
            links={links}
            books={books}
            handleSearch={handleSearch}
            selectPerPage={selectPerPage}
            setSelectPerPage={setSelectPerPage}
            selectOrderType={selectOrderType}
            setOrderTpye={setOrderTpye}
            isTableSpinning={isTableSpinning}
          />
        </div>
      </div>
    </>
  );
};

export default Book;
