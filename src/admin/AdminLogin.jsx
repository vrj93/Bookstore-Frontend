import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("d-none");
  const [passwordError, setPasswordError] = useState("d-none");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    const isValidEmail = (email) => {
      const regex = /^\S+@\S+\.\S+$/;
      return regex.test(email);
    };

    const emailString = e.target.value;

    if (emailString.length > 0) {
      const isValid = isValidEmail(emailString);

      if (isValid) {
        setEmailError("d-none");
        setEmail(emailString);
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("d-none");
    }
  };

  const handlePassword = (e) => {
    const passwordString = e.target.value;

    if (passwordString.length > 0 && passwordString.length < 5) {
      setPasswordError("");
    } else if (passwordString.length >= 5) {
      setPasswordError("d-none");
      setPassword(passwordString);
    } else {
      setPasswordError("d-none");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // handle successful login
        Cookies.set("auth_token", data.token, { expires: 7 });
        Cookies.set("user", data.name, { expires: 7 });

        navigate("/admin/books");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="m-5">Admin Login</h2>
        <center>
          <div className="" style={{ maxWidth: 400 }}>
            <form action="" onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Email address"
                  onChange={handleEmail}
                />
                <p
                  className={`form-control text-white bg-danger ${emailError}`}
                >
                  Enter valid Email
                </p>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handlePassword}
                />
                <p
                  className={`form-control text-white bg-danger ${passwordError}`}
                >
                  Password should be minimun 5 characters
                </p>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
};

export default AdminLogin;
