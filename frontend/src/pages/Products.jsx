import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";
import Loader from "../components/UI/Loader";
import ProductCardSkeleton from '../components/UI/ProductCardSkeleton';
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [showWishlist, setShowWishlist] = useState(false);

  const navigate = useNavigate();
  const categoryID = Cookies.get("categoryID");

  // Fetch products
  const fetchProducts = async () => {
    const response = await axiosInstance.get(
      `products/?category=${categoryID}`
    );
    setProducts(response.data.results);
    setFilteredProducts(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Filter and sort products when filter changes
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search query
    if (filter.query) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(filter.query.toLowerCase())
      );
    }

    // Sort by price or name
    if (filter.sort === "price") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filter.sort === "name") {
      updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  }, [filter, products]);

  // Add/Remove product from wishlist
  const toggleWishlist = (product) => {
    let updatedWishlist;

    if (wishlist.some((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Display wishlist products
  const handleShowWishlist = () => {
    setShowWishlist((prev) => !prev);

    if (!showWishlist) {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setFilteredProducts(savedWishlist);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <div className="filters">
          <input
            type="text"
            className="search-input"
            name="query"
            placeholder="Search products..."
            value={filter.query}
            onChange={handleFilterChange}
          />
          <select
            className="sort-select"
            name="sort"
            value={filter.sort}
            onChange={handleFilterChange}
          >
            <option value="">Sort by</option>
            <option value="price">Price: Low to High</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="product-grid">
          {[...Array(9)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          No products found
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div 
                className="product-image"
                onClick={() => navigate(`/products/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={product.images?.[0]?.image || "placeholder.jpg"}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400";
                  }}
                />
              </div>
              <div className="product-info">
                <h3 
                  className="product-name"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.name}
                </h3>
                <div className="product-price">
                  <span className="price-main">{product.price.toFixed(0)} ₸</span>
                </div>
                <div className="product-rating">
                  <FaStar className="rating-star" />
                  <span>{product.avg_rating?.toFixed(1) || "0.0"}</span>
                  <span>•</span>
                  <span className="quantity-badge">1 шт</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
