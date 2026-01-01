import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './adminlayout.css';
import { useAuth } from '../../Context/authcontext';

export default function AdminLayout() {
  const { logout } = useAuth();
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        
        <nav className="admin-sidebar-nav">
          <ul>
            <li><NavLink to="/admin" end>Dashboard</NavLink></li>
            <li><NavLink to="/admin/products">Manage Products</NavLink></li>
            <li><NavLink to="/admin/users">Manage Users</NavLink></li>
            <li><NavLink to="/admin/orders">Manage Orders</NavLink></li>
          </ul>
        </nav>
<button onClick={logout} className="admin-logout-btn">Logout</button>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
}