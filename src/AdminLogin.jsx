import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
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
        setEmailError(false);
        setEmail(emailString);
      } else {
        setEmailError(true);
      }
    } else {
      setEmailError(false);
      setEmail("");
    }
  };

  const handlePassword = (e) => {
    const passwordString = e.target.value;

    if (passwordString.length > 0 && passwordString.length < 5) {
      setPasswordError(true);
    } else if (passwordString.length >= 5) {
      setPasswordError(false);
      setPassword(passwordString);
    } else {
      setPasswordError(false);
      setPassword("");
    }
  };

  useEffect(() => {
    email == "" || password == ""
      ? setIsSubmitDisabled(true)
      : setIsSubmitDisabled(false);
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // handle successful login
        Cookies.set("auth_token", data.token, { expires: 7 });
        Cookies.set("user", data.name, { expires: 7 });

        navigate("/");
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
        <h2 className="m-5" style={{ color: "black" }}>
          Admin Login
        </h2>
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
                {emailError && (
                  <p className="form-control text-white bg-danger">
                    Enter valid Email
                  </p>
                )}
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
                {passwordError && (
                  <p className="form-control text-white bg-danger">
                    Password should be minimun 5 characters
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={isSubmitDisabled}
              >
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
