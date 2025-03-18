import React, { useRef } from 'react';
import '../styles/Shop.css';
import { addProduct } from './api';
import { addToCart } from './api';

const Shop = ({ handleClick, list, handleOpenModal }) => {
  const debounceTimers = useRef({});

  const handleMouseOver = (item) => {
    const email = localStorage.getItem('name');
    if (!email) return;

    if (debounceTimers.current[item.id]) return;

    debounceTimers.current[item.id] = setTimeout(() => {
      const productData = {
        email,
        name: item.title,
        price: item.price,
        image: item.image,
      };

      addProduct(productData)
        .then((res) => {
          if (res.error) {
            console.log(`Skipping duplicate: ${res.error}`);
          } else {
            console.log(`Product Added: ${item.title}`);
          }
        })
        .catch((err) => console.error('Error adding product:', err));

      debounceTimers.current[item.id] = null;
    }, 800);
  };

  const handleAddToCart = (item) => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    addToCart({ email, productName: item.title })
      .then((res) => {
        if (res.error) {
          console.log(`Error adding to cart: ${res.error}`);
        } else {
          console.log(`${item.title} added to cart!`);
          handleClick(item); // Local cart state update
        }
      })
      .catch((err) => console.error('Error adding to cart:', err));
  };

  return (
    <div className="shop">
      {list.map((item) => (
        <div
          className="product-card"
          key={item.id}
          onMouseOver={() => handleMouseOver(item)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="product-image"
            onClick={() => handleOpenModal(item)}
          />
          <h3>{item.title}</h3>
          <p>Rs {item.price}</p>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
