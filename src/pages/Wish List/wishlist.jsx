import React from 'react';
import { useWishlist } from '../Context/wishlistcontext';
import { useCart } from '../Context/cartcontext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './wishlist.css';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-heading">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="browse-products-btn">Browse Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img src={item.image} alt={item.name} className="wishlist-card-image" />
              <div className="wishlist-card-content">
                <h3 className="wishlist-card-title">{item.name}</h3>
                <p className="wishlist-card-price">₹{item.price}</p>
                <div className="wishlist-card-actions">
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}