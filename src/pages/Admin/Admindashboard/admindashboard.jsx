
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import "./admindashboard.css"

export default function AdminDashboard() {
  const [users,setusers]=useState([]);
  const [products,setproducts]=useState([]);
  const [orders,setorders]=useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const alldata=async()=>{
      try{
      const[usersresponse,productsresponse,ordersresponse]=await Promise.all([
        axios.get('http://localhost:5001/users'),
        axios.get('http://localhost:5001/products'),
        axios.get('http://localhost:5001/orders')
      ]);
      setusers(usersresponse.data);
      setproducts(productsresponse.data);
      setorders(ordersresponse.data);

    }catch (err){console.error("Failed to fetch dashboard data:",err)
      toast.error("Could not load dashboard data.")
    }finally{setIsLoading(false)}
}
alldata();
},[])

  if(isLoading){
    return <div>Loadiing Dashboard data...</div>;
  }
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .slice(0, 5);
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <FaUsers size={30} className="stat-icon" />
          <div className="stat-info">
            <p>Total Users</p>
            <span>{users.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <FaBoxOpen size={30} className="stat-icon" />
          <div className="stat-info">
            <p>Total Products</p>
            <span>{products.length}</span>
          </div>
        </div>
        <div className="stat-card">
          <FaShoppingCart size={30} className="stat-icon" />
          <div className="stat-info">
            <p>Total Orders</p>
            <span>{orders.length}</span>
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        {recentOrders.length > 0 ? (
          <ul className="recent-orders-list">
            {recentOrders.map(order => (
              <li key={order.id} className="order-item">
                <div className="order-item-details">
                  <p><strong>{order.userName}</strong> placed an order.</p>
                  <small>{new Date(order.orderDate).toLocaleString()}</small>
                </div>
                <span className="order-item-total">₹{order.totalPrice}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders have been placed yet.</p>
        )}
      </div>
    </div>
  );
}