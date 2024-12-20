import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { 
  MdClose, 
  MdRemoveCircleOutline, 
  MdAddCircleOutline, 
  MdShoppingCart,
  MdArrowBack,
  MdLockOutline
} from 'react-icons/md';
import '../styles/Shop.css';

const Shop = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Shopping Cart</h1>
        <Link to="/products" className="continue-shopping">
          <MdArrowBack /> Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <MdShoppingCart />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't made your choice yet</p>
          <Link to="/products" className="start-shopping">
            Start Shopping <MdArrowBack style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <span className="header-product">Product</span>
              <span className="header-price">Price</span>
              <span className="header-quantity">Quantity</span>
              <span className="header-total">Total</span>
            </div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.images?.[0]?.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-id">Product ID: {item.id}</p>
                  </div>
                </div>
                <div className="item-price">{item.price.toFixed(2)}₸</div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <MdRemoveCircleOutline />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <MdAddCircleOutline />
                  </button>
                </div>
                <div className="item-total">
                  {(item.price * item.quantity).toFixed(2)}₸
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{total.subtotal.toFixed(2)}₸</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{total.shipping.toFixed(2)}₸</span>
              </div>
              <div className="summary-line">
                <span>Tax (12%)</span>
                <span>{total.tax.toFixed(2)}₸</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>{total.total.toFixed(2)}₸</span>
              </div>
            </div>
            <button className="checkout-button">
              Proceed to Checkout
            </button>
            <div className="secure-checkout">
              <MdLockOutline /> Secure Checkout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
