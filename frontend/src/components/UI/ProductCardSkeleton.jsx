import React from 'react';

const ProductCardSkeleton = () => (
  <div className="product-card skeleton">
    <div className="product-image skeleton-image">
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
    <div className="product-info">
      <div className="skeleton-text-long">
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
      </div>
      <div className="skeleton-text-short">
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
      </div>
      <div className="skeleton-text-short">
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
