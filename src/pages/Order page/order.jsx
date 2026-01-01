import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/authcontext'
import axios from 'axios'

export default function Order() {
const {user}=useAuth()
const [order,setorder]=useState([])
useEffect(()=>{
  const fetchdata =async()=>{
    if(user&&user.id){
    try{
      const res =await axios.get(`http://localhost:5001/orders?userId=${user.id}`)
      setorder(res.data);
    }
    catch(err){console.error(err)}
  }
}
  fetchdata();
},[user ])

  return (
    <>
    <h2>My Orders</h2>
    {order.length===0 ? (<p>You had not placed the order yet.</p>
    ):(
        <div className="orders-list">
          {order.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <h3>Order placed on: {new Date(order.orderDate).toLocaleDateString()}</h3>
                <p>Order Total: ₹{order.totalPrice}</p>
              </div>
              <div className="order-items-list">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
