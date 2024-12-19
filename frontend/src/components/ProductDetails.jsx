import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { FaStar } from "react-icons/fa";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const id = 1;

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`products/${id}/`);
      setProduct(response.data);
      setAvgRating(response.data.avg_rating);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <img 
            src={product.images?.[0]?.image || "https://via.placeholder.com/400"} 
            alt={product.name || "Product"} 
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400";
            }}
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name || "Product Title"}</h1>
          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.round(avgRating) ? "star filled" : "star"
                }
                color={index < Math.round(avgRating) ? "#ffc107" : "#e4e5e9"}
              />
            ))}
            <span className="rating-value">({avgRating.toFixed(1)})</span>
          </div>
          <div className="product-description">
            {(product.description || "Product description goes here").split('-').map((point, index) => (
              point.trim() && (
                <p key={index} className="description-point">
                  {index !== 0 && <span className="bullet">•</span>}
                  {point.trim()}
                </p>
              )
            ))}
          </div>
          <div className="product-actions">
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
