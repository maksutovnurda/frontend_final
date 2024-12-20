import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
      window.location.reload(); // Redirect to homepage on successful login
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={status === "loading"}>
            Login
          </button>
        </form>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && (
          <p style={{ color: "red" }}>
            {error?.detail || "Invalid credentials, please try again!"}
          </p>
        )}
        <div className="forgot-password">
          <Link to="/password-reset">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
