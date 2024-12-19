import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import CategoriesList from "./CategoriesList";

const Home = () => {

    const [categories, setCategories] = useState([])
    const fetchCategories = async () => {
        const response = await axiosInstance.get('categories/');
        setCategories(response.data.results);
    }

    useEffect(() => {
        fetchCategories();
        console.log(categories)
    }, [])

    return (
        <div>
            <h1>Welcome to our Online Store</h1>
            <h2>Categories</h2>
            <div className="categories">
                <CategoriesList categories={categories} />
            </div>
        </div>
    )
}

export default Home;