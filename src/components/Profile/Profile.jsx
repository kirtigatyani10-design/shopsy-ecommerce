import React from "react";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="mt-28 text-center text-xl font-semibold text-gray-600">
        No user data found. Please login again.
      </div>
    );
  }

  return (
    <div className="mt-24 mb-20 px-4">
      <div className="max-w-xl mx-auto bg-primary/30 dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <FaUserCircle className="text-6xl text-primary" />
          <h1 className="text-2xl font-bold">
            My Profile
          </h1>
          <p className="text-sm text-gray-500">
            Manage your account details
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 text-lg">

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-primary" />
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-primary" />
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Logged in user details
        </div>
      </div>
    </div>
  );
};

export default Profile;

