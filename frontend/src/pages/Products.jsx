import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  // Fetch products
  const fetchProducts = async () => {
    const response = await axiosInstance.get("products/");
    setProducts(response.data.results);
    setFilteredProducts(response.data.results); // Initialize filtered products
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

  return (
    <div className="products-page" style={{ padding: "20px" }}>
      <h1>Products</h1>

      {/* Filters */}
      <div className="filters" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="query"
          placeholder="Search products..."
          value={filter.query}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <select
          name="sort"
          value={filter.sort}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Product List */}
      <div
        className="product-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-item"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            {/* Check if there are images and display the first image */}
            <img
              src={
                product.images.length > 0
                  ? product.images[0].image
                  : "placeholder.jpg"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
              }}
            />
            <h3 style={{ fontSize: "18px", margin: "10px 0" }}>
              {product.name}
            </h3>
            <p style={{ color: "#888", marginBottom: "10px" }}>
              ${product.price}
            </p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => alert(`Product ID: ${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
