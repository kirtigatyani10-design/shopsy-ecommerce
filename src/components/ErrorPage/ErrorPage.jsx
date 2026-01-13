import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdeed3] px-4">
      <div className="text-center w-full max-w-3xl">

        {/* CUSTOM 404 */}
        <div className="relative flex justify-center items-center mb-6">
          <span className="text-[90px] sm:text-[120px] md:text-[160px] font-extrabold text-[#0b1a2a] tracking-tight">
            4
          </span>

          {/* Styled ZERO */}
          <span className="mx-3 relative flex items-center justify-center">
            <span className="text-[90px] sm:text-[120px] md:text-[160px] font-extrabold text-[#0b1a2a]">
              0
            </span>
            {/* subtle ring */}
            <span className="absolute w-full h-full rounded-full border-[4px] border-[#0b1a2a]/20"></span>
          </span>

          <span className="text-[90px] sm:text-[120px] md:text-[160px] font-extrabold text-[#0b1a2a] tracking-tight">
            4
          </span>
        </div>

        {/* MESSAGE */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0b1a2a] mb-2">
          There&apos;s <span className="font-extrabold">NOTHING</span> here…
        </h2>

        <p className="text-sm sm:text-base text-[#3a4a5c] mb-8">
          Maybe the page you&apos;re looking for is not found or never existed.
        </p>

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-sm sm:max-w-md bg-white rounded-full px-5 py-3 shadow-md">
            <input
              type="text"
              placeholder="Search products, categories…"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <span className="ml-2 text-gray-500 cursor-pointer">🔍</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#ffab2d] text-white px-8 py-3 rounded-full text-sm font-medium shadow hover:opacity-90 transition"
        >
          Back to home
          <span className="text-base">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
