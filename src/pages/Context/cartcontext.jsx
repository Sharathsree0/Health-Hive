import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useAuth } from "./authcontext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLogged } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    if (!isLogged) return;
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.items || []);
    } catch {
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLogged]);

  const addToCart = async (productId) => {
    await api.post("/cart/add", { productId });
    fetchCart();
  };

  const decreaseQuantity = async (productId) => {
    await api.post("/cart/decrease", { productId });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await api.delete(`/cart/remove/${productId}`);
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
