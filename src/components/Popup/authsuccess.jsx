import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userStr = params.get("user");

    console.log("TOKEN FROM URL:", token);
    console.log("USER FROM URL:", userStr);

    if (token && userStr) {
      try {
      const user = JSON.parse(decodeURIComponent(userStr));

      //  TOKEN + USER SAVE
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/account");

      } catch (err) {
        console.log("ERROR PARSING USER:", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging in with Google...</div>;
};

export default OAuthSuccess;