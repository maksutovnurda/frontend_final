import React from "react";

const CategoriesList = ({ categories }) => {

    if (!categories.length) {
        return (
             <h1 style={{textAlign:'center'}}>
                 Categories are not found!
             </h1>
        )
     }

    return (
        <div className="categoriesList">
            { categories.map((category, index) => {
                
            }) }
        </div>
    )
}

export default CategoriesList;