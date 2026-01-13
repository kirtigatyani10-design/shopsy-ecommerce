import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeWishlistItem } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <p className="mt-24 text-center text-lg">
        Wishlist is empty 💔
      </p>
    );
  }

  return (
    <div className="mt-24 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist ❤️
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          if (!item?.productId?._id) return null;

          const product = item.productId;

          return (
            <div key={product._id} className="border p-4 rounded shadow">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} className="h-40 mx-auto" />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-primary font-bold">₹{product.price}</p>
              </Link>

              <button
                onClick={() => removeWishlistItem(product._id)}
                className="mt-3 text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
