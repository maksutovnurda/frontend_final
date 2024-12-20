import React from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
          Home
        </Link>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={"/products"}
        >
          Products
        </Link>
        <Link style={{ textDecoration: "none", color: "white" }} to={"/shop"}>
          Shop
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
