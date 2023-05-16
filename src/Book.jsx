import DataTable from "./DataTable";
import SideBar from "./SideBar";

const Book = ({ Multiselect }) => {
  return (
    <>
      <div className="d-flex align-items-stretch vh-100">
        <SideBar Multiselect={Multiselect} />

        {/* <!-- Data Table  --> */}
        <div id="content" className="container-fluid">
          <div
            className="d-flex justify-content-start align-items-center px-4 mb-3"
          >
            <h2 className="rounded p-2" style={{ color: "black" }}>Results</h2>
          </div>

          <DataTable Multiselect={Multiselect} />
        </div>
      </div>
    </>
  );
};

/* const Book = ({ Multiselect }) => {
  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center align-items-center px-4 mb-3"
          style={{ backgroundColor: "#e6e6fa" }}
        >
          <h1 className="rounded p-2">Book Store</h1>
        </div>

        <DataTable Multiselect={Multiselect} />
      </div>
    </>
  );
}; */

export default Book;
