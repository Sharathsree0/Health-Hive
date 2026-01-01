import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/cartcontext';
import './Product.css';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const { id: productId } = useParams();
    
    const { cartItems, addToCart, decreaseQuantity } = useCart();

    useEffect(() => {
        if (productId) {
            const fetchProductData = async () => {
                try {
                    const res = await axios.get("http://localhost:5000/api/products");
                    setProduct(res.data);
                } catch (err) {
                    console.log("Error fetching product:", err);
                }
            };
            fetchProductData();
        }
    }, [productId]);

    if (!product) {
        return <div className="loading-message">Loading product details...</div>;
    }

    const itemInCart = cartItems.find(item => item.id === product.id);
    const currentQuantity = itemInCart ? itemInCart.quantity : 0;

    return (
        <div className="product-detail-container">
            <div className="product-detail-image-container">
                <img src={product.image} alt={product.name} className="product-detail-image" />
            </div>
            <div className="product-detail-info">
                <p className="product-detail-category">{product.category}</p>
                <h1 className="product-detail-name">{product.name}</h1>
                <p className="product-detail-description">{product.description}</p>
                
                {product.nutritionFacts && (
                    <div className="product-nutrition">
                        <h3>Nutrition Facts</h3>
                        <p>Serving Size: {product.nutritionFacts.servingSize}</p>
                    </div>
                )}

                <p className="product-detail-price">₹{product.price}</p>
                
                <div className="product-detail-actions">
                    {itemInCart ? (
                        <div className="quantity-controls-detail">
                            <button onClick={() => decreaseQuantity(product.id)} className="quantity-btn-detail">-</button>
                            <span className="quantity-display-detail">{currentQuantity}</span>
                            <button onClick={() => addToCart(product)} className="quantity-btn-detail">+</button>
                        </div>
                    ) : (
                        <button className="add-to-cart-btn-detail" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}