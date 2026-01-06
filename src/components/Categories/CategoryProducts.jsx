import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getHeaders } from "../../utils/utils";

const CategoryProducts = () => {
  const { slug } = useParams(); // electronics
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Category slug from URL:", slug);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        console.log(
          "API URL:",
          `${import.meta.env.VITE_API_URL}/products/category/${slug}`
        );

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/category/${slug}`,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );

        console.log("API status:", res.status);
        console.log("API headers:", res.headers);

        const data = await res.json();
        console.log("CATEGORY PRODUCTS RESPONSE:", data);
        console.log("CATEGORY PRODUCTS DATA:", data.data);

        setProducts(data.data || []);
      } catch (error) {
        console.error("API ERROR:", error);
        console.error("Failed to fetch category products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-semibold">
        Loading category products...
      </p>
    );
  }

  return (
    <div className="mt-24 mb-20 container">
      <h1 className="text-3xl font-bold text-center mb-10 capitalize">
        {slug} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-red-500">
          No products found for this category
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {products.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className="shadow-md p-3 rounded-md bg-primary/15 hover:scale-105 duration-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-[200px] w-full object-cover rounded-md"
              />

              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.category?.name}
              </p>

              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{item.rating}</span>
              </div>

              <p className="font-bold text-primary mt-1">
                ₹{item.price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
