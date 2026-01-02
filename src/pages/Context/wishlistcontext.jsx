import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useAuth } from "./authcontext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isLogged } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!isLogged) return;
    const res = await api.get("/wishlist");
    setWishlist(res.data.items || []);
  };

  useEffect(() => {
    fetchWishlist();
  }, [isLogged]);

  const addToWishlist = async (productId) => {
    await api.post("/wishlist/add", { productId });
    fetchWishlist();
  };

  const removeFromWishlist = async (productId) => {
    await api.delete(`/wishlist/remove/${productId}`);
    fetchWishlist();
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
