import React from "react";

const CategoryItem = ({ category }) => {
  return (
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
  );
};

export default CategoryItem;
