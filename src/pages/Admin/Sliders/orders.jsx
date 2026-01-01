import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/orders?_sort=orderDate&_order=desc");
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="admin-orders-container">
      <h1>Manage Orders</h1>
      <p>A list of all orders placed by customers.</p>

      {orders.length === 0 ? (
        <p>No orders have been placed yet.</p>
      ) : (
        <div className="admin-orders-list">
          {orders.map(order => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>User: {order.userName} (ID: {order.userId})</p>
                </div>
                <div>
                  <p><strong>Total: ₹{order.totalPrice}</strong></p>
                  <small>{new Date(order.orderDate).toLocaleString()}</small>
                </div>
              </div>
              <div className="admin-order-items">
                <h4>Items in this order:</h4>
                {order.items.map(item => (
                  <div key={item.id} className="admin-order-item">
                    <span>{item.name} (Qty: {item.quantity})</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}