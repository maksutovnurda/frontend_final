import React from 'react';

const ProductSkeleton = () => (
  <div className="product-details loading">
    <div className="product-image skeleton">
      <div className="shimmer"></div>
    </div>
    <div className="product-info">
      <div className="product-title skeleton">
        <div className="shimmer"></div>
      </div>
      <div className="product-rating skeleton">
        <div className="shimmer"></div>
      </div>
      <div className="product-description">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="description-point skeleton">
            <div className="shimmer"></div>
          </div>
        ))}
      </div>
      <div className="product-actions">
        <div className="add-to-cart skeleton">
          <div className="shimmer"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductSkeleton;
