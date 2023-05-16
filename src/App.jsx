/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Book from "./Book";
import AdminLogin from "./admin/AdminLogin";
import AdminBook from "./admin/AdminBook";
import Cookies from "js-cookie";
import BookDetails from "./BookDetails";
import Multiselect from 'multiselect-react-dropdown';

function App() {
  const AdminPrivate = ({ Component }) => {
    const auth =
      Boolean(Cookies.get("auth_token"));

    return auth ? <Component /> : <Navigate to="/admin" />;
  }

  const AdminDashboardRedirect = ({ Component }) => {
    const auth =
      Boolean(Cookies.get("auth_token"));

    return auth ? <Navigate to="/admin/books" /> : <Component />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book Multiselect={Multiselect} />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route
            path="/admin"
            element={<AdminDashboardRedirect Component={AdminLogin} />}
          />
          <Route
            path="/admin/books"
            element={<AdminPrivate Component={AdminBook} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
