import Home from "./pages/Home/home";
import Navbar from "./components/Navbar/navbar";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Products from "./pages/Products/product";
import { useLocation ,Routes, Route, useParams} from 'react-router-dom'
import Cart from "./pages/Cart/cart";
import { ToastContainer } from "react-toastify";
import Productlist from "./pages/Products/productlist";
import Order from "./pages/Order page/order";
import Wishlist from "./pages/Wish List/wishlist";
import ProtectedRoute from "./pages/protection/protection";
import Payment from "./pages/Products/payment";
import Adminroute from "./pages/Admin/Admindashboard/adminroute";
import Adminproduct from "./pages/Admin/Adminproducts/adminproduct";
import Admindashboard from "./pages/Admin/Admindashboard/admindashboard";
import AdminLayout from "./pages/Admin/Admin layout/adminlayout";
import Editproducts from "./pages/Admin/Adminproducts/editproducts";
import Addproducts from "./pages/Admin/Adminproducts/addproducts";
import Orders from "./pages/Admin/Sliders/orders";
import Users from "./pages/Admin/Sliders/users";

export default function App() {
   
    const location = useLocation()
    const ConditonNavbar = () => {
        
        if (location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/admin') ){
            return null
        } else {
            return <Navbar />
        }
    }
    return (
        <>
           <ConditonNavbar />
          
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<search/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={ <ProtectedRoute> <Cart /></ProtectedRoute>} />
                <Route path="/order" element={ <ProtectedRoute><Order /></ProtectedRoute> } />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/products/:id" element={<Productlist/>} />
                
                <Route path="/admin" element={<Adminroute><AdminLayout/></Adminroute>} >
                    <Route index element={<Admindashboard/>} />
                    <Route path="products"  element={<Adminproduct/>} />
                    <Route path="products/edit/:productId" element={<Editproducts/>} />
                    <Route path="products/add" element={<Addproducts/>} />
                    <Route path="users" element={<Users/>} />
                    <Route path="orders" element={<Orders/>} />
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    )
}
