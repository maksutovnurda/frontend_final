import React from 'react';
import { MdClose, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="cart-item">
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
        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        aria-label="Decrease quantity"
      >
        <MdRemoveCircleOutline />
      </button>
      <span className="quantity">{item.quantity}</span>
      <button 
        className="quantity-btn"
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        aria-label="Increase quantity"
      >
        <MdAddCircleOutline />
      </button>
    </div>
    <div className="item-total">
      {(item.price * item.quantity).toFixed(2)}₸
    </div>
    <button 
      className="remove-btn"
      onClick={() => onRemove(item.id)}
      aria-label="Remove item"
    >
      <MdClose />
    </button>
  </div>
);

export default React.memo(CartItem);
