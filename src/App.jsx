import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';
import list from './list';
import { getCart } from './api'; // Import getCart function

const App = () => {
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const email = localStorage.getItem('name'); // Assuming user email is stored in localStorage

  // Fetch cart from DB on mount
  useEffect(() => {
    const fetchCart = async () => {
      const dbCart = await getCart(email);
      setCart(dbCart);
    };
    fetchCart();
  }, []);

  const handleClick = (item) => {
    let isPresent = cart.some(c => c.name === item.name);
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    } else {
      // Send request to backend to add product to DB
      // (Optional: You may have an API for that)
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
      setCart([...cart, item]);
    }
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleOpenModal = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (item) => {
    handleClick(item);
    handleCloseModal();
  };

  const handleRemoveItem = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId)); // Use _id from DB
  };

  return (
    <div>
      <Navbar size={cart.length} handleShowCart={handleShowCart} showCartVal={showCart} />
      <div className="messageAndWarning">
        {warning && <div className="warning">Item is already present in your cart.</div>}
        {message && <div className="message">Item added to your cart</div>}
      </div>

      {showCart && (
        <div className="cart-overlay">
          <Cart
            cartItems={cart}
            handleCloseCart={handleCloseCart}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      )}

      <Shop handleClick={handleClick} list={list} handleOpenModal={handleOpenModal} />

      {showModal && modalData && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={handleCloseModal}>X</button>
            <img src={modalData.image} alt={modalData.title} className="modal-image" />
            <div className="modal-details">
              <h2>{modalData.title}</h2>
              <p>{modalData.description}</p>
              <div className="price">Rs{modalData.price}</div>
              <button className="add-to-cart" onClick={() => handleAddToCart(modalData)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
