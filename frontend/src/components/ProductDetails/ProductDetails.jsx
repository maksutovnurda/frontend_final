import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../api/axiosInstance";
import ProductRating from "./ProductRating";
import ProductSkeleton from "./ProductSkeleton";
import "../../styles/ProductDetails.css";
import "../../styles/ProductDetailsLoader.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [avgRating, setAvgRating] = useState(0.0);
  const [ratingCount, setRatingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productResponse, ratingsResponse] = await Promise.all([
          axiosInstance.get(`products/${id}/`),
          axiosInstance.get(`ratings/?product=${id}`)
        ]);

        if (productResponse.data) {
          setProduct(productResponse.data);
          setAvgRating(productResponse.data.avg_rating ?? 0);
          setRatingCount(ratingsResponse.data?.count ?? 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="product-details-container">
        <ProductSkeleton />
      </div>
    );
  }

  const renderDescription = (description) => {
    if (!description) return null;
    
    return description.split('-').map((point, index) => {
      const trimmedPoint = point.trim();
      if (!trimmedPoint) return null;
      
      return (
        <p key={index} className="description-point">
          {index !== 0 && <span className="bullet">•</span>}
          {trimmedPoint}
        </p>
      );
    });
  };

  const handleAddToCart = () => {
    try {
      addToCart(product);
      console.log('Product added to cart:', product); // Add this for debugging
      navigate('/shop', { replace: true });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

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
          <h1 className="product-title">{product.name || "Product"}</h1>
          <ProductRating rating={avgRating} count={ratingCount} />
          <div className="product-price">
            {product.price?.toFixed(2) ?? "0.00"} ₸
          </div>
          <div className="product-description">
            {renderDescription(product.description)}
          </div>
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
