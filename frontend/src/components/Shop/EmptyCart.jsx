import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingCart, MdArrowBack } from 'react-icons/md';

const EmptyCart = () => (
  <div className="empty-cart">
    <MdShoppingCart />
    <h2>Your cart is empty</h2>
    <p>Looks like you haven't made your choice yet</p>
    <Link to="/products" className="start-shopping">
      Start Shopping <MdArrowBack style={{ transform: 'rotate(180deg)' }} />
    </Link>
  </div>
);

export default EmptyCart;
