import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  // logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.data?._id;

  // user-based storage key
  const storageKey = userId ? `wishlist_${userId}` : "wishlist_guest";

  const [wishlist, setWishlist] = useState([]);

  // LOAD wishlist (on refresh)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setWishlist(saved);
    console.log("Loaded wishlist from storage:", storageKey);  
  }, [storageKey]);

  // SAVE wishlist
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
    
  }, [wishlist, storageKey]);

  // add / remove
  const toggleWishlist = (product) => {
    const exists = wishlist.find((p) => p._id === product._id);

    if (exists) {
      setWishlist(wishlist.filter((p) => p._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (id) =>
    wishlist.some((item) => item._id === id);

  // CLEAR on logout
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(storageKey);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
