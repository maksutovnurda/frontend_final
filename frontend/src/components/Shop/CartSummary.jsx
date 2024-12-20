import React from 'react';
import { MdLockOutline } from 'react-icons/md';

const CartSummary = ({ total, onCheckout }) => (
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
    <button className="checkout-button" onClick={onCheckout}>
      Proceed to Checkout
    </button>
    <div className="secure-checkout">
      <MdLockOutline /> Secure Checkout
    </div>
  </div>
);

export default React.memo(CartSummary);
