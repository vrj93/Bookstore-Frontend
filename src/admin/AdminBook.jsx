import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import Cookies from "js-cookie";

const Book = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate("/admin");
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-between align-items-center px-4 mb-3"
          style={{ backgroundColor: "#e6e6fa" }}
        >
          <h6>Hello, {Cookies.get("user")}</h6>
          <h1 className="rounded p-2">Book Store Management</h1>
          <button type="button" className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <DataTable />
      </div>
    </>
  );
};

export default Book;
