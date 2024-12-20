import React from "react";
import { useState } from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { MdAccountCircle, MdShoppingCart } from "react-icons/md";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const token = Cookies.get("access_token");
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

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
        <Link 
          style={{ textDecoration: "none", color: "white" }} 
          to={"/shop"}
          className="cart-link"
        >
          <MdShoppingCart size={24} />
          {cartItemsCount > 0 && (
            <span className="cart-count">{cartItemsCount}</span>
          )}
        </Link>
        {token ? (
          <Link to={"/profile"}>
            <MdAccountCircle size={30} />
          </Link>
        ) : (
          <>
            <button className="btn btn-primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/login"}
              >
                Login
              </Link>
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
