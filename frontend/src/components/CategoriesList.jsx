import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categories }) => {
  if (!categories.length) {
    return <h1 style={{ textAlign: "center" }}>Categories are not found!</h1>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      <h1 style={{ fontWeight: 600, fontSize: 25 }}>Categories</h1>
      <div className="categoriesList">
        {categories.map((category, index) => (
          <CategoryItem key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
