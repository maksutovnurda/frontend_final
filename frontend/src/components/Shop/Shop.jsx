import React from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/Shop.css';

const Shop = () => {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="shop-container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.images?.[0]?.image || "https://via.placeholder.com/100"}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price.toFixed(2)} ₸</p>
            </div>
            <div className="cart-item-quantity">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="remove-item"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>{total.subtotal.toFixed(2)} ₸</span>
        </div>
        <div className="summary-row">
          <span>Tax (12%):</span>
          <span>{total.tax.toFixed(2)} ₸</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{total.shipping.toFixed(2)} ₸</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>{total.total.toFixed(2)} ₸</span>
        </div>
        <button className="checkout-button">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Shop; 