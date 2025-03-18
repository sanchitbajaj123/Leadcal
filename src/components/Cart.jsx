import React from 'react';
import '../styles/Cart.css';
import { makePayment } from './api'; // Import your API function

const Cart = ({ cartItems, onRemoveItem }) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
  const itemNames = cartItems.map(item => item.title).join(', ');

  const handlePayment = async () => {
    try {
      const email = localStorage.getItem('name'); // Assuming user email is stored in localStorage

      const paymentData = {
        amount: totalAmount,
        email: email,
        productName: itemNames,
      };

      const response = await makePayment(paymentData);

      if (response.error) {
        console.log('Payment initiation failed:', response.error);
        return;
      }

      const { orderId, amount } = response; // Get orderId & amount from backend

      const options = {
        key: "rzp_test_LVMfEY3Rs5STmn",
        amount: amount,
        currency: "INR",
        name: "Payment",
        description: `Payment for: ${itemNames}`,
        order_id: orderId,
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optionally, send confirmation to backend
        },
        prefill: {
          name: "SANCHIT BAJAJ",
          email: "sanchitbajaj@gmail.com",
          contact: "7347204088",
        },
        theme: {
          color: "#2c3e50"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.log('Error in payment:', error);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some items!</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="product-image" />
                <div className="item-details">
                  <center><h3>{item.name}</h3></center>
                  <p>{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
                <button onClick={async() => { await onRemoveItem(item.name) }} className="remove-item">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Total Amount: ₹{totalAmount}</strong></p>
            <button onClick={handlePayment} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
