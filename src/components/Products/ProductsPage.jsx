import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { useSearchParams } from "react-router-dom";
import DarkMode from "../Navbar/DarkMode";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setCartCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetch("http://localhost:5000/api/products?page=1&limit=50")
      .then((res) => res.json())
      .then((data) => {
        console.log("API:", data);

        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId, e) => {
    e.preventDefault(); // Prevent navigation to product detail page

    const token = localStorage.getItem("token");
    let guestCartId = localStorage.getItem("guestCartId");

    if (!token && !guestCartId) {
      guestCartId = crypto.randomUUID();
      localStorage.setItem("guestCartId", guestCartId);
    }

    try {
      const res = await fetch("http://localhost:5000/api/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(guestCartId && { "guest-cart-id": guestCartId }),
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("ADD TO CART:", data);
      if (data.isSuccess) {
        setCartCount(data.itemCount);
        localStorage.setItem("cartCount", data.itemCount);
        window.dispatchEvent(new Event("storage")); // Notify other tabs
      }

      console.log("SAVED CART COUNT:", data.itemCount);
      console.log("LS CART COUNT:", localStorage.getItem("cartCount"));
      // DIRECT CART PAGE PAR LE JAO
      navigate("/cart");

      if (!res.ok) {
        alert(data.message || "Failed to add item");
        return;
      }

      // DIRECT CART PAGE PAR LE JAO
      navigate("/cart");

    } catch (err) {
      console.error("ADD TO CART ERROR:", err);
    }
  };


  if (loading) {

    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Loading Products...
      </p>
    );
  }

  return (
    <div className="mt-24 mb-20 w-full bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-xs text-primary">
            Browse all categories and explore more items.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">

          {products.map((item) => {
            // ✅ SAFETY CHECK (YAHI LINE)
            if (!item || !item._id) return null;

            return (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="relative group space-y-3 shadow-md p-3 rounded-md bg-primary/15"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item);
                  }}
                  className="absolute top-2 right-2 text-xl opacity-0 group-hover:opacity-100 transition"
                >
                  {isInWishlist(item._id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[220px] w-[150px] object-cover rounded-md mx-auto"
                />

                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-700">
                  {typeof item.category === "string"
                    ? item.category
                    : item.category?.name}
                </p>

                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span>{item.rating}</span>
                </div>

                <p className="font-bold text-primary mt-1">₹{item.price}</p>

                <button
                  onClick={(e) => handleAddToCart(item._id, e)}
                  className="mt-3 w-full bg-primary text-white py-2 rounded-full 
                hover:bg-secondary transition"
                >
                  Add to Cart
                </button>
              </Link>
            );
          })};
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;