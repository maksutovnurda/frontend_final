import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to yela.shop</h1>
      <p>Discover our amazing products</p>
      <Link to="/products" className="browse-button">
        Browse Products
      </Link>
    </div>
  );
};

export default Home; 