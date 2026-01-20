import React, { useState, } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaFacebook, FaGoogle } from "react-icons/fa";

// import { FcGoogle } from "react-icons/fc";

const LoginPopup = ({ loginPopup, setLoginPopup, setRegisterPopup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (!loginPopup) return null;

  const handleFacebookLogin = () => {
    alert("Facebook login coming soon!");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleBackdropClick = (e) => {
    if (e.target.dataset.backdrop === "true") setLoginPopup(false);
  };

  // VALIDATION
  const validateLogin = () => {
    let temp = {};

    if (!email.trim()) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      temp.email = "Enter a valid email";

    if (!password.trim()) temp.password = "Password is required";
    else if (password.length < 6)
      temp.password = "Password must be minimum 6 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // LOGIN API
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED");
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    if (!validateLogin()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      console.log("LOGIN STATUS:", res.status);

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setErrors({ api: data.message });
        return;
      }

      // ✅ TOKEN SAVE
      localStorage.setItem("token", data.token);
      console.log("TOKEN SAVED:", data.token);

      // after successful login
      localStorage.removeItem("guestCartId");
      localStorage.removeItem("cartCount");

      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("USER SAVED:", data);
      setLoginPopup(false);
      window.location.href = "";
      // window.location.reload(); 

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setErrors({ api: "Server error" });
    }
  };

  return (
    <div
      data-backdrop="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Login</h1>
          <IoCloseOutline
            onClick={() => setLoginPopup(false)}
            className="text-2xl cursor-pointer"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} noValidate>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-full mb-1"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mb-2">{errors.email}</p>
          )}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="w-full border px-3 py-2 rounded-full mb-1"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password}</p>
          )}

          {errors.api && (
            <p className="text-red-600 text-sm mb-2">{errors.api}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-full mt-2"
          >
            Login Now
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={() => {
              setLoginPopup(false);
              setRegisterPopup(true);
            }}
          >
            Register
          </span>
        </p>

        <p className="text-center text-sm mt-4">or login with</p>

        <div className="flex justify-center gap-6 mt-3">
          <FaFacebook
            onClick={handleFacebookLogin}
            className="text-2xl cursor-pointer hover:text-primary"
          />
          <FaGoogle
            onClick={handleGoogleLogin}
            className="text-2xl cursor-pointer hover:text-primary"
          /> 
        </div>

        {/* <div className="mt-3">
          <button
            type="button"
            className="btn w-100 d-flex align-items-center justify-content-center border"
            style={{ backgroundColor: "#fff", fontWeight: "500" }}
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={25} className="me-2" />
            Continue with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPopup;

