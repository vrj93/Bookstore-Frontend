import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [isSpinning, setSpinning] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  };

  const handleShowBookDetails = async (id) => {
    setSpinning(true);
    const url = `http://localhost:8000/api/v1/book/${id}`;

    const res = await fetch(url, config);
    const response = await res.json();

    const bookData = response.data;

    const bookObj = {
      title: bookData.title,
      author: bookData.author.name,
      genre: bookData.genre.name,
      description: bookData.description,
      isbn: bookData.isbn,
      published: bookData.published,
      publisher: bookData.publisher.name,
    };

    setBookDetails(bookObj);
    setSpinning(false);
  };

  useEffect(() => {
    handleShowBookDetails(id);
  }, []);

  return (
    <div className="container-fluid">
      <div
        className="d-flex justify-content-center align-items-center px-4 mb-3"
        style={{ backgroundColor: "#e6e6fa" }}
      >
        <h1 className="rounded p-2">Book Details</h1>
      </div>
      {!isSpinning ? (
        <div className="container-fluid">
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
