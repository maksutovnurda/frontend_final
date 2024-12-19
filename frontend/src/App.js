import React from "react";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<Error />} />
        <Route path="/products" element={<Products />} />
        <Route path="/*" element={<Navigate to="/error" />} />
      </Routes>
    </Router>
  );
}

export default App;
