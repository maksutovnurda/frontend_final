import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const CategoryItem = ({ category }) => {
  const saveCategoryID = () => {
    Cookies.set("categoryID", category.id);
  };

  return (
    <Link
      to={"catalog/"}
      onClick={() => saveCategoryID()}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="categoryItem">
        <img
          style={{
            height: 150,
            width: 150,
            objectFit: "cover",
            borderRadius: 10,
          }}
          src={category.image}
          alt=""
        />
        <h1 style={{ fontSize: 20, maxWidth: 150, fontWeight: 600 }}>
          {category.name}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryItem;
