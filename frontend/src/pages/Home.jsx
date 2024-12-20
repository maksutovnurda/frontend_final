import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import CategoriesList from "../components/CategoriesList";
import Loader from "../components/UI/Loader";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCategories = async () => {
    const response = await axiosInstance.get("categories/");
    setCategories(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <h1 className="welcomeText">
        <span style={{ color: "rgb(44, 109, 158)" }}>GrabIt. </span>Online Store
      </h1>
      <div className="categories">
        {isLoading ? <Loader /> : <CategoriesList categories={categories} />}
      </div>
    </div>
  );
};

export default Home;
