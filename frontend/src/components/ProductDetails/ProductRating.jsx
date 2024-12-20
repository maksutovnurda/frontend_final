import React from 'react';
import { FaStar } from "react-icons/fa";

const ProductRating = ({ rating, count }) => {
  return (
    <div className="rating-container">
      <div className="product-rating">
        <FaStar className="star filled" />
        <span className="rating-value">{rating.toFixed(1)}</span>
        <span className="rating-count">({count} reviews)</span>
      </div>
    </div>
  );
};

export default ProductRating;
