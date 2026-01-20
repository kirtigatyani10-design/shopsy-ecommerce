import { createContext, useContext, useEffect, useState } from "react";
import { getHeaders } from "../utils/utils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/carts/cart-counter`,
        {
          headers: getHeaders(),
        }
      );
      const data = await res.json();

      if (data.isSuccess) {
        setCartCount(data.itemCount);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.log("CART COUNT ERROR:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // intial load 
    fetchCartCount();

    // listen for login/logout
    const handleAuthChange = () => {
      fetchCartCount();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        fetchCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
