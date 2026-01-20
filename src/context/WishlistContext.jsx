import { createContext, useContext, useEffect, useState } from "react";
import { getHeaders } from "../utils/utils";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const clearWishlist = () => {
    setWishlist([]);
    setWishlistCount(0);
  };

  // CHECK PRODUCT IN WISHLIST
  const isInWishlist = (productId) => {
    if (!Array.isArray(wishlist)) return false;

    return wishlist.some(
      (product) => product?._id === productId
    );
  };

  // LOAD WISHLIST 
  const loadWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlist([]);
      setWishlistCount(0);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        {
          method: "GET",
          headers: getHeaders(),
        }
      );

      const data = await res.json();
      if (data?.isSuccess) {
        setWishlist(data.data?.products || []);
        setWishlistCount(data.data?.products?.length || 0);
      }
    } catch (err) {
      console.log("GET WISHLIST ERROR:", err);
      setWishlist([]);
      setWishlistCount(0);
    }
  };


  // ADD / REMOVE (OPTIMISTIC)
  const addToWishlist = async (product) => {
    setWishlist((prev) => [...prev, product]);
    setWishlistCount((c) => c + 1);

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist/add`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({ productId: product._id }),
        }
      );
    } catch {
      loadWishlist();
    }
  };

  // REMOVE (Wishlist page)
  const removeWishlistItem = async (productId) => {
    if (!productId) return;

    setWishlist((prev) =>
      prev.filter((p) => p._id !== productId)
    );
    setWishlistCount((c) => Math.max(c - 1, 0));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist/remove/${productId}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      const data = await res.json();
      if (!data?.isSuccess) {
        loadWishlist();
      }
    } catch (err) {
      console.log("REMOVE WISHLIST ERROR:", err);
      loadWishlist();
    }
  };

  // TOGGLE WISHLIST
  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeWishlistItem(product._id);
    } else {
      addToWishlist(product);
    }
  };

  // ON APP LOAD
  useEffect(() => {
    loadWishlist();

    const handler = () => {
      loadWishlist();
    }

    window.addEventListener("auth-change", handler);

    return () => {
      window.removeEventListener("auth-change", handler);
    };
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        toggleWishlist,
        removeWishlistItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

