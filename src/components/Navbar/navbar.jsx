import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../pages/Context/authcontext';
import { useCart } from '../../pages/Context/cartcontext';
import { FaShoppingCart,FaRegHeart,FaShoppingBag } from 'react-icons/fa';
import { useWishlist } from '../../pages/Context/wishlistcontext';
export default function Navbar() {
  const { isLogged, user, logout } = useAuth();
console.log("isLogged:", isLogged);
console.log("user:", user);
const{cartItems}=useCart();
const {wishlistItems}=useWishlist();



  return (
    <>
  <nav>
        <Link to="/">
          <img
            src={"/Images/Health Hive.png"}
            style={{ width: "140px", height: "70px", borderRadius: "50%" }}
            alt="Health Hive Logo"
          />
        </Link>
      
        <div className="nav-links">
          <Link to="/products"> <FaShoppingBag/> Products  </Link>
          <Link to="/cart"> <FaShoppingCart/> {cartItems.length} </Link>
          <Link to="/wishlist" ><FaRegHeart className="heart"/>{wishlistItems.length} </Link>
        </div>


        <div className='nav-auth'>
          {isLogged ? (
            <>
             {user?.isAdmin && (
              <NavLink to="/admin" style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                Admin
              </NavLink>
            )}
              <NavLink to="/order">My Orders</NavLink>
              <span className='welcome-message'>Welcome, {user?.name}</span>
              <button onClick={logout} className='logout-button'>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </nav>
      
    </>
  );
}
