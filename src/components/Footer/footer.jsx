
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-column about">
          <h3>About Health Hive</h3>
          <p>We provide high-quality nutritional supplements, dry fruits, and wellness products to help you live your healthiest life.</p>
        </div>

        <div className="footer-column links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <p>Email: support@healthhive.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Health Hive. All rights reserved.</p>
      </div>
    </footer>
  );
}