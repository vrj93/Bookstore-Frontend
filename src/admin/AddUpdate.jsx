const AddUpdate = ({
  selectAddEdit,
  isModalSpinning,
  bookDetails,
  setBookDetails,
  closeButtonRef,
  handleAddEditDetails,
  selectAddEditButton,
  submitting,
  setSubmitting
}) => {
  return (
    <>
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
                      max={new Date().toISOString().slice(0, 10)}
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
                disabled={submitting}
                onClick={() => handleAddEditDetails(bookDetails.id)}
              >
                {selectAddEditButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdate;
