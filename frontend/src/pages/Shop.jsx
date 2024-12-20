import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { useCart } from '../context/CartContext';
import CartItem from '../components/Shop/CartItem';
import CartSummary from '../components/Shop/CartSummary';
import EmptyCart from '../components/Shop/EmptyCart';
import '../styles/Shop.css';

const Shop = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  const handleUpdateQuantity = useCallback((id, quantity) => {
    updateQuantity(id, quantity);
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((id) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleCheckout = useCallback(() => {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
  }, []);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Shopping Cart</h1>
        <Link to="/products" className="continue-shopping">
          <MdArrowBack /> Continue Shopping
        </Link>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span aria-hidden="true"></span>
          </div>
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <CartSummary 
          total={total}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Shop;
