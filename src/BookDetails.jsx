import { auto } from "@popperjs/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [isSpinning, setSpinning] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState("dummy");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const handleAuth = async () => {
    setSpinning(true);
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    if (res.ok) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      console.log("Unauthenticated");
    }
  };

  const handleShowBookDetails = async (id) => {
    const url = `${import.meta.env.VITE_APP_API_URL}/book/${id}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    const bookData = response.data;

    const bookObj = {
      title: bookData.title,
      author: bookData.author.name,
      genre: bookData.genre.name,
      description: bookData.description,
      isbn: bookData.isbn,
      cover: bookData.cover,
      published: bookData.published,
      publisher: bookData.publisher.name,
    };

    setBookDetails(bookObj);
    setSpinning(false);
  };

  const handleAddUpdateBook = async (e) => {
    e.preventDefault();

    let url, method;

    if (id) {
      url = `${import.meta.env.VITE_APP_API_URL}/admin/book/${id}`;
      method = "PATCH";
    } else {
      url = `${import.meta.env.VITE_APP_API_URL}/admin/book`;
      method = "POST";
    }

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(bookDetails),
    });

    const response = await res.json();
    console.log(response);
  };

  useEffect(() => {
    handleAuth();
    if (id) {
      handleShowBookDetails(id);
    } else {
      setSpinning(false);
    }
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("cover", selectedFile);

    const res = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/admin/book/cover-upload/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: formData,
      }
    );

    const response = await res.json();
    console.log(response);
  };

  console.log(selectedFile);

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center px-4"
        style={{ backgroundColor: "#781A75" }}
      >
        {isAuthenticated ? (
          id ? (
            <h1 className="rounded p-2">Edit Book</h1>
          ) : (
            <h1 className="rounded p-2">Add Book</h1>
          )
        ) : (
          <h1 className="rounded p-2">Book Details</h1>
        )}
      </div>
      {!isSpinning ? (
        isAuthenticated ? (
          <div
            className="container d-flex justify-content-center py-5"
            style={{ backgroundColor: "#DBE3E1" }}
          >
            <div className="container col-lg-8">
              <form onSubmit={handleAddUpdateBook}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="row">Title</th>
                      <td className="text-start">
                        <input
                          type="text"
                          value={bookDetails.title && bookDetails.title}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              title: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Author</th>
                      <td className="text-start">
                        <input
                          type="text"
                          value={bookDetails.author && bookDetails.author}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              author: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Genre</th>
                      <td className="text-start">
                        <input
                          type="text"
                          value={bookDetails.genre && bookDetails.genre}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              genre: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Description</th>
                      <td className="text-start">
                        <textarea
                          className="form-control"
                          defaultValue={
                            bookDetails.description && bookDetails.description
                          }
                          rows={4}
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">ISBN</th>
                      <td className="text-start">
                        <input
                          type="text"
                          value={bookDetails.isbn && bookDetails.isbn}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              isbn: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Published</th>
                      <td className="text-start">
                        <input
                          type="date"
                          value={bookDetails.published && bookDetails.published}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              published: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Publisher</th>
                      <td className="text-start">
                        <input
                          type="text"
                          value={bookDetails.publisher && bookDetails.publisher}
                          className="form-control"
                          onChange={(e) =>
                            setBookDetails({
                              ...bookDetails,
                              publisher: e.target.value,
                            })
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td className="text-start">
                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          style={{ width: 150 }}
                        >
                          {id ? "Update" : "Create"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-12">
                  <label htmlFor="file-input">
                    <img
                      src={
                        imageURL ||
                        (bookDetails.cover
                          ? `${import.meta.env.VITE_APP_SERVER_IMG_PATH}/${
                              bookDetails.cover
                            }`
                          : `${import.meta.env.VITE_APP_IMG_PATH}/no_cover.png`)
                      }
                      alt=""
                      srcSet=""
                      style={{
                        maxHeight: 400,
                        maxWidth: 250,
                        cursor: "pointer",
                      }}
                    />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="mt-2 btn btn-primary"
                    onClick={handleImageUpload}
                  >
                    Upload Cover
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="container d-flex justify-content-center py-5"
            style={{ backgroundColor: "#DBE3E1" }}
          >
            <div className="col-lg-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="row">Title</th>
                    <td className="text-start">{bookDetails.title}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Author</th>
                    <td className="text-start">{bookDetails.author}</td>
                  </tr>
                  <tr>
                    <th scope="row">Genre</th>
                    <td className="text-start">{bookDetails.genre}</td>
                  </tr>
                  <tr>
                    <th scope="row">Description</th>
                    <td className="text-start">{bookDetails.description}</td>
                  </tr>
                  <tr>
                    <th scope="row">ISBN</th>
                    <td className="text-start">{bookDetails.isbn}</td>
                  </tr>
                  <tr>
                    <th scope="row">Published</th>
                    <td className="text-start">{bookDetails.published}</td>
                  </tr>
                  <tr>
                    <th scope="row">Publisher</th>
                    <td className="text-start">{bookDetails.publisher}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <img
                src={`${import.meta.env.VITE_APP_IMG_PATH}/${
                  bookDetails.cover
                }`}
                alt=""
                srcSet=""
                style={{ height: 350, width: auto }}
              />
            </div>
          </div>
        )
      ) : (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className="spinner-border mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
