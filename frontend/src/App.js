import React from "react";
import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Products from "./pages/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/error" element={<Error />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/password-reset" element={<PasswordResetRequest />} />
      <Route
        path="/password-reset/confirm"
        element={<PasswordResetConfirm />}
      />
      <Route
        path="/login/reset-password-form/:token"
        element={<PasswordResetConfirm />}
      />
      <Route path="/*" element={<Navigate to="/error" />} />
    </Routes>
  );
}

export default App;
