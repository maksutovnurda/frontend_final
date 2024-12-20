import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";
import Loader from "../components/UI/Loader";
import notfound from "../assets/images/notfound.jpg";
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
      <h1>Products</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          name="query"
          placeholder="Search products..."
          value={filter.query}
          onChange={handleFilterChange}
        />
        <select name="sort" value={filter.sort} onChange={handleFilterChange}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <button onClick={handleShowWishlist}>
          {showWishlist ? "Back to Products" : "View Wishlist"}
        </button>
      </div>

      {/* Conditional Rendering */}
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">No available products</div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {/* Product Image */}
              <img
                src={
                  product.images.length > 0 ? product.images[0].image : notfound
                }
                alt={product.name}
              />

              {/* Product Name */}
              <h3>{product.name}</h3>

              {/* Price and Rating Container */}
              <div className="price-rating-container">
                <p>{product.price}₸</p>
                <div className="rating-container">
                  <span className="rating-star">★</span>
                  <span className="rating-text">
                    {product.avg_rating ? product.avg_rating.toFixed(1) : '0.0'}
                  </span>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                className={
                  wishlist.some((item) => item.id === product.id)
                    ? "remove-from-wishlist"
                    : "add-to-wishlist"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                {wishlist.some((item) => item.id === product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
