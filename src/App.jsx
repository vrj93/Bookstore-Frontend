/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Book from "./Book";
import AdminLogin from "./AdminLogin";
import Cookies from "js-cookie";
import BookDetails from "./BookDetails";

function App() {
  const AdminPrivate = ({ Component }) => {
    const auth = Boolean(Cookies.get("auth_token"));

    return auth ? <Component /> : <Navigate to="/admin" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
