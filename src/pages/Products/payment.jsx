import React, { useState } from 'react';
import { useCart } from '../Context/cartcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Payment.css';
import { FaCreditCard, FaGooglePay } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa6';

export default function Payment() {
    const { cartItems, handleCheckout } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    
    const [paymentMethod, setPaymentMethod] = useState('');

    const totalPrice = cartItems.reduce((total, item) => {
        return total + (Number(item.price || 0) * item.quantity);
    }, 0);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            toast.warn("Please select a payment method.");
            return;
        }

        setIsProcessing(true);
        toast.info("Processing your order...");

        await new Promise(resolve => setTimeout(resolve, 2000));
        await handleCheckout();

        navigate('/cart'); 
        setIsProcessing(false);
    };
    
    return (
        <div className="payment-page-container">
            <div className="payment-layout">

                <div className="order-summary-section">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-item">
                                <img src={item.image} alt={item.name} className="summary-item-image" />
                                <div className="summary-item-details">
                                    <p>{item.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <p>₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <strong>Total</strong>
                        <strong>₹{totalPrice}</strong>
                    </div>
                </div>

                <div className="payment-form-section">
                    <h2>Choose Payment Method</h2>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="payment-options">
                            <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                                <FaGooglePay size={24} />
                                <span>UPI / Google Pay</span>
                                <input type="radio" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} />
                            </label>
                            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                <FaCreditCard size={24} />
                                <span>Credit / Debit Card</span>
                                <input type="radio" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
                            </label>
                            <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                <FaMoneyBill size={24} />
                                <span>Cash on Delivery</span>
                                <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
                            </label>
                        </div>
                        
                        <button type="submit" className="pay-now-btn" disabled={!paymentMethod || isProcessing}>
                            {isProcessing ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}