import React from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="store-header">
      <div className="logo">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          yela.shop
        </Link>
      </div>
      <nav className="nav-links">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          <a>Home</a>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={"/products"}
        >
          <a>Products</a>
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/shop"}>
          <a>Shop</a>
        </Link>
        <a href="#contact">Contact</a>
      </nav>
      <div className="header-buttons">
        <button className="btn btn-primary">Sign In</button>
        <button className="btn btn-secondary">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
