import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const RegisterPopup = ({
  registerPopup,
  setRegisterPopup,
  setLoginPopup,
}) => {
  if (!registerPopup) return null;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim()) err.lastName = "Last name is required";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Enter a valid email";

    if (!form.password.trim()) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!form.confirmPassword.trim())
      err.confirmPassword = "Confirm your password";
    else if (form.confirmPassword !== form.password)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  console.log("REGISTER CLICKED");
  console.log("FORM DATA:", form);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    console.log("REGISTER STATUS:", res.status);

    // ❗ response text first
    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      setErrors({ api: "Server error (not JSON response)" });
      return;
    }

    if (!res.ok) {
      setErrors({ api: data.message || "Registration failed" });
      return;
    }

    localStorage.setItem("token", data.token);
    alert("Registration Successful!");
    setRegisterPopup(false);
    setLoginPopup(false);
    // window.location.reload();

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    setErrors({ api: "Something went wrong" });
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 p-6 w-[350px] rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Register</h2>
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setRegisterPopup(false)}
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleRegister}>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded mb-1 dark:bg-gray-800"
          />
          {errors.firstName && <p className="text-red-500 text-xs mb-2">{errors.firstName}</p>}

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded mb-1 dark:bg-gray-800"
          />
          {errors.lastName && <p className="text-red-500 text-xs mb-2">{errors.lastName}</p>}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded mb-1 dark:bg-gray-800"
          />
          {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded mb-1 dark:bg-gray-800"
          />
          {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-2 py-2 rounded mb-2 dark:bg-gray-800"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-md"
          >
            Register
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer font-semibold"
            onClick={() => {
              setRegisterPopup(false);
              setLoginPopup(true);
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPopup;
