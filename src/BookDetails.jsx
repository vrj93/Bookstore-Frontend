import { auto } from "@popperjs/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [isSpinning, setSpinning] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const handleShowBookDetails = async (id) => {
      setSpinning(true);
      const url = `${import.meta.env.VITE_APP_API_URL}/book/${id}`;

      const res = await fetch(url, config);
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

    handleShowBookDetails(id);
  }, []);

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center px-4"
        style={{ backgroundColor: "#781A75" }}
      >
        <h1 className="rounded p-2">Book Details</h1>
      </div>
      {!isSpinning ? (
        <div className="container d-flex justify-content-center py-3" style={{ backgroundColor: '#DBE3E1' }}>
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
              src={`${import.meta.env.VITE_APP_IMG_PATH}/${bookDetails.cover}`}
              alt=""
              srcSet=""
              style={{ height: 350, width: auto }}
            />
          </div>
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
