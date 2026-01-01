import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authcontext";
import api from "../../utils/api.js";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLogged } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // 1️⃣ Fetch cart
  const fetchCart = async () => {
    if (!isLogged) return;

    try {
      const res = await api.get("/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLogged]);

  // 2️⃣ Add to cart
  const addToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId });
      fetchCart();
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Add to cart failed");
    }
  };

  // 3️⃣ Decrease qty / remove
  const decreaseQuantity = async (productId) => {
    try {
      await api.post("/cart/decrease", { productId });
      fetchCart();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
