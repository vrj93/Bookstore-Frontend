/* eslint-disable react/prop-types */
import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Routes,
  Navigate,
} from "react-router-dom";
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
      <Router>
        <Switch>
          <Route path="/" exact component={Book} />
          <Route path="/book/:id?" component={BookDetails} />
          <Route path="/admin" component={AdminLogin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
