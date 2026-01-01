import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authcontext";
import api from "../../utils/api.js";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isLogged } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  // 🔹 Fetch wishlist
  const fetchWishlist = async () => {
    if (!isLogged) return;

    try {
      const res = await api.get("/wishlist");
      setWishlistItems(res.data.items || []);
    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isLogged]);

  // 🔹 Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      await api.post("/wishlist/add", { productId });
      fetchWishlist();
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  // 🔹 Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);
      fetchWishlist();
      toast.info("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
