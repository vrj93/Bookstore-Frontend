import DataTable from "./DataTable";

const Book = () => {
  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center align-items-center px-4 mb-3"
          style={{ backgroundColor: "#e6e6fa" }}
        >
          <h1 className="rounded p-2">Book Store</h1>
        </div>

        <DataTable />
      </div>
    </>
  );
};

export default Book;
