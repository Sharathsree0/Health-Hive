import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Footer from '../../components/Footer/footer';

export default function Home() {

  const featuredProducts = [
    { id: "6", name: "Hive 100% Whey Protein", image: "/Images/gold whey protein.avif", price: 4999 },
    { id: "11", name: "Hive Pre-Workout Ripped", image: "/Images/Pre-Workout Ripped.jpg", price: 2999 },
    { id: "36", name: "Hive Glow Collagen Peptides", image: "/Images/Glow Collagen Peptides.webp", price: 2199 }
  ];

  const categories = [
    { name: "Bodybuilding", image:"/Images/gold whey protein.avif" },
    { name: "Fat Burning", image: "/Images/Shred L-Carnitine Liquid.jpg" },
    { name: "Nuts & Dry Fruits", image: "/Images/dry-grapes.webp" },
    { name: "For Women", image:"/Images/Women's Calcium Plus with Magnesium.jpg"}
  ];

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Health Hive</h1>
          <p>Your one-stop shop for high-quality nutritional supplements, dry fruits, and seeds.</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </header>

      <section className="featured-products-section">
        <h2>Our Top Picks</h2>
        <div className="featured-products-list">
          {featuredProducts.map(({ id, name, image, price }) => (
            <Link key={id} to={`/products/${id}`} className="featured-product-card">
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <p>₹{price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Your Goal</h2>
        <div className="category-list">
          {categories.map(({ name, image }) => (
            <Link key={name} to={`/products?category=${encodeURIComponent(name)}`} className="category-card">
              <img src={image} alt={name} />
              <div className="category-name">{name}</div>
            </Link>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
}