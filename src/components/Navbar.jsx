import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ size, handleShowCart, showCartVal }) => {
  const [username, setUsername] = useState('');

  // Fetch username from localStorage on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">JMB Trading Company</h1>

        {/* Username */}
        

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
          />
          <button className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {username && <p className="username">{username}!</p>}
        {/* Cart Button */}
        <div className="cart-container" onClick={handleShowCart}>
          <FontAwesomeIcon icon={faCartPlus} className="cart-icon" />
          <span className="cart-count">{size}</span>
        </div>
      </div>
    
      {/* Cart Popup - optional */}
      {showCartVal && <div className="cart-popup">Your Cart is Opened!</div>}
      
    </nav>
  );
};

export default Navbar;
