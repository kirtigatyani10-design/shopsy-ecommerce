import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { useCart } from "../../context/CartContext";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Products", link: "/products" },
  { id: 3, name: "Kids Wear", link: "/categories/kids-wears" },
  { id: 4, name: "Mens Wear", link: "/categories/men-wears" },
  { id: 5, name: "Electronics", link: "/categories/electronics" },
];

const DropdownLinks = [
  { id: 1, name: "Trending Products", link: "/products" },
  { id: 2, name: "Best Selling", link: "/products" },
  { id: 3, name: "Top Rated", link: "/products" },
];

const Navbar = ({
  handleOrderPopup,
  handleLoginPopup,
  handleRegisterPopup,
}) => {
  const navigate = useNavigate();
  const { clearWishlist } = useWishlist();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data || data);
      })
      .catch(err => console.error("Category fetch error:", err));
  }, []);

  // USER LOGIN STATE
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { wishlistCount } = useWishlist();

  const { cartCount } = useCart();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    // auth 
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    localStorage.removeItem("cartCount");
    localStorage.removeItem("guestCartId");

    if (clearWishlist) clearWishlist();
    navigate("/login");
    
    // reset ui
    setToken(null);
    setOpenUserMenu(false);

    // sync context
    window.dispatchEvent(new Event("storage"));

    window.location.href = "/";
  };

  // SEARCH API
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`http://localhost:5000/api/products/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={Logo} alt="Logo" className="w-10" />
            Shopsy
          </Link>

          {/* Search + Buttons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border px-3 py-1"
              />
              <IoMdSearch className="absolute right-3 top-2 text-gray-500" />

              {loading && <p className="absolute mt-1 text-sm">Loading...</p>}

              {suggestions.length > 0 && (
                <ul className="absolute bg-white w-full mt-2 rounded shadow">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => setQuery(item.name)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Order */}
            <button
              onClick={handleOrderPopup}
              className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full"
            >
              Order
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 bg-gray-200 rounded-full relative text-xl"
            >
              <FaCartShopping />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black 
                  text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 bg-gray-200 rounded-full">
              <FaHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white
                 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* USER ICON */}
            {!token ? (
              <button
                onClick={handleLoginPopup}
                className="p-2 bg-gray-200 rounded-full"
              >
                <FaUser />
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="p-2 bg-gray-200 rounded-full"
                >
                  <FaUser />
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded">

                    <Link
                      to="/account"
                      className="block p-2 hover:bg-gray-100"
                    >
                      My Account
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left p-2 text-red-600 hover:bg-red-100"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <DarkMode />
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="container flex justify-center mt-1">
        <ul className="sm:flex justify-center items-center gap-8">
          {/* Static links */}
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>

          <li>
            <Link to="/products" className="hover:text-primary">Products</Link>
          </li>

          <li>
            <Link to="/categories/kids-wears" className="hover:text-primary">
              Kids Wear
            </Link>
          </li>

          <li>
            <Link to="/categories/men-wears" className="hover:text-primary">
              Mens Wear
            </Link>
          </li>

          <li>
            <Link to="/categories/electronics" className="hover:text-primary">
              Electronics
            </Link>
          </li>

          {/* Accessories Dropdown */}
          <li className="relative group cursor-pointer">
            <span className="flex items-center gap-1 hover:text-primary">
              Accessories <FaCaretDown />
            </span>

            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 min-w-[180px] z-50">
              {categories
                .filter(cat =>
                  !["kids-wears", "men-wears", "electronics"].includes(cat.slug)
                )
                .map(cat => (
                  <Link
                    key={cat._id}
                    to={`/categories/${cat.slug}`}
                    className="block px-4 py-2 hover:bg-primary/10"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>
          </li>

          <li className="group relative cursor-pointer">
            <span className="flex items-center gap-1">
              Trending <FaCaretDown />
            </span>

            <div className="absolute hidden group-hover:block bg-white shadow rounded">
              {DropdownLinks.map((d) => (
                <Link
                  key={d.id}
                  to={d.link}
                  className="block p-2 hover:bg-primary/20"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
