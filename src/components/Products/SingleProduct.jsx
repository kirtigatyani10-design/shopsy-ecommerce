import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaTruck, FaShieldAlt, FaStore } from "react-icons/fa";
import { addToCart } from "../../utils/utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import DarkMode from "../Navbar/DarkMode";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const p = data.data || data;
        if (!p.images && p.image) {
          p.images = [p.image];
        }

        setProduct(p);
        setSelectedImage(p.images[0]);
        setSelectedSize(p.sizes?.[0] ?? null);
        setSelectedColor(p.colors?.[0] ?? p.color ?? null);

        setLoading(false);
      })
      .catch((err) => {
        console.log("API error:", err);
        setLoading(false);
      });
  }, [id]);



  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  // derived values & safe access
  const name = product.name ?? "Untitled Product";
  const price = typeof product.price === "number" ? product.price : Number(product.price || 0);
  const mrp = product.mrp ?? Math.round(price * 1.25);
  const discountPercent = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const rating = product.rating ?? 0;
  const images = product.images ?? (product.image ? [product.image] : []);
  const brand = product.brand ?? product.manufacturer ?? "";
  const categoryName = product.category?.name ?? product.category ?? "";
  const inStock = product.stock === undefined ? true : Boolean(product.stock > 0);

  // sample sizes/colors 
  const sizes = product.sizes ?? ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = product.colors ?? (product.color ? [product.color] : ["Default"]);

  // Add to cart placeholder 
  const handleAddToCart = () => {

    addToCart(product._id, qty).then(res => console.log(res));

  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/cart";
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4 lg:px-6 pb-20 grid lg:grid-cols-12 gap-8
      bg-white dark:bg-gray-900 dark:text-white ">

      {/* LEFT thumbnails (col 1) */}
      <div className="hidden lg:block lg:col-span-1 space-y-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${name} thumb ${idx}`}
            onClick={() => setSelectedImage(img)}
            className={`w-full h-20 object-cover rounded cursor-pointer border ${selectedImage === img ? "ring-2 ring-primary" : "ring-0"
              }`}
          />
        ))}
      </div>

      {/* MAIN IMAGE (col 2-6) */}
      <div className="lg:col-span-5 flex items-start">
        <div className="w-full bg-white rounded shadow-sm p-4">
          <img src={selectedImage} alt={name} className="w-full h-[520px] object-contain" />
          {/* small gallery below on mobile */}
          <div className="mt-3 flex gap-2 lg:hidden overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb ${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${selectedImage === img ? "ring-2 ring-primary" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS (col 7-10) */}
      <div className="lg:col-span-4">
        <div className="space-y-3">
          {/* Title + brand */}
          <div>
            <p className="text-sm text-gray-600">{brand && `${brand} • ${categoryName}`}</p>
            <h1 className="text-2xl lg:text-3xl font-bold">{name}</h1>
          </div>

          {/* Rating & reviews */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
              <FaStar /> <span className="ml-2 font-semibold">{rating}</span>
            </div>
            <div className="text-sm text-gray-600">• 100+ Ratings • 50+ Reviews</div>
          </div>

          {/* Price block */}
          <div className="flex items-end gap-4 mt-2">
            <div>
              <div className="text-3xl font-extrabold text-primary">₹{price}</div>
              <div className="text-sm text-gray-500 line-through">MRP ₹{mrp}</div>
              <div className="text-sm text-green-700 font-semibold">{discountPercent}% off</div>
            </div>

            {/* small offers summary */}
            <div className="ml-4 text-sm bg-yellow-50 p-2 rounded">
              <div className="font-semibold">Offers</div>
              <div className="text-gray-700">Bank offer: 10% with XYZ card</div>
            </div>
          </div>

          {/* stock & delivery */}
          <div className="flex gap-6 items-center mt-3">
            <div className={`text-sm font-medium ${inStock ? "text-green-700" : "text-red-600"}`}>
              {inStock ? "In stock" : "Out of stock"}
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-2"><FaTruck /> Delivery in 3–5 days</div>
            <div className="text-sm text-gray-700 flex items-center gap-2"><FaShieldAlt /> 7 day returns</div>
          </div>

          {/* Size selector */}
          <div className="mt-4">
            <div className="font-semibold">Select Size</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`border px-3 py-1 rounded ${selectedSize === s ? "bg-primary text-white" : "bg-white"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {selectedSize && <div className="text-sm text-gray-600 mt-1">Selected: <strong>{selectedSize}</strong></div>}
          </div>

          {/* Color selector */}
          <div className="mt-4">
            <div className="font-semibold">Color</div>
            <div className="flex gap-2 mt-2">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  className={`border px-3 py-1 rounded ${selectedColor === c ? "ring-2 ring-primary" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add buttons */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3 py-2">-</button>
              <div className="px-4">{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2">+</button>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="text-2xl"
            >
              {isInWishlist(product._id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <button onClick={handleAddToCart} className="bg-orange-600 text-white px-6 py-2 rounded hover:opacity-95">Add to Cart</button>
            <button onClick={handleBuyNow} className="bg-primary text-white px-6 py-2 rounded hover:opacity-95">Buy Now</button>
          </div>

          {/* Seller info & extra small links */}
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <div><FaStore className="inline mr-2" />Sold by: <strong>{product.seller ?? "Shopsy Retail"}</strong></div>
            <div>₹{price} • Inclusive of all taxes</div>
            <div>Free delivery for Prime members</div>
          </div>
        </div>
      </div>

      {/* RIGHT sticky purchase box (col 12) */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 bg-white border rounded p-4 shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm">Deal Price</div>
              <div className="text-2xl font-bold">₹{price}</div>
              <div className="text-sm line-through text-gray-500">MRP ₹{mrp}</div>
              <div className="text-green-700 font-semibold">{discountPercent}% off</div>
            </div>
            <img src={images[0]} alt="mini" className="w-20 h-20 object-cover rounded" />
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600">Delivery</div>
            <div className="text-sm">Deliver by <strong>Thu, 14 Dec</strong></div>
            <div className="text-sm text-gray-600 mt-2">Seller: <strong>{product.seller ?? "Shopsy Retail"}</strong></div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="text-sm">Qty</div>
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="border px-2 py-1 rounded ml-2">
                {Array.from({ length: 10 }).map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>

            <button onClick={handleAddToCart} className="w-full mt-4 bg-orange-600 text-white py-2 rounded">Add to Cart</button>
            <button onClick={handleBuyNow} className="w-full mt-2 bg-primary text-white py-2 rounded">Buy Now</button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            7 days easy returns • Secure payments • Fast delivery
          </div>
        </div>
      </div>

      {/* BOTTOM — Product details & About & Specs & Reviews */}
      <div className="lg:col-span-8 mt-6">
        <h2 className="text-xl font-bold mb-3">Product details</h2>

        {/* specs table */}
        <div className="bg-white rounded border">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-semibold w-48">Material</td>
                <td className="p-3">{product.material ?? "Cotton blend"}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Fit Type</td>
                <td className="p-3">{product.fit ?? "Regular Fit"}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Brand</td>
                <td className="p-3">{brand || "-"}</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-semibold">Country of origin</td>
                <td className="p-3">India</td>
              </tr>
              {/* add more rows if product.specs exists */}
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <tr key={k} className="border-b">
                  <td className="p-3 font-semibold">{k}</td>
                  <td className="p-3">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* About this item */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">About this item</h3>
          <p className="text-gray-700 mt-2">{product.description ?? "No description available."}</p>
        </div>

        {/* Reviews placeholder */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Customer reviews</h3>
          <div className="mt-3 text-sm text-gray-600">No reviews yet. Be the first to review this product.</div>
        </div>
      </div>

      {/* Seller & Related (right) */}
      <div className="lg:col-span-4 mt-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-bold">Seller Information</h3>
          <p className="text-sm text-gray-700 mt-2">Sold by: <strong>{product.seller ?? "Shopsy Retail"}</strong></p>
          <p className="text-sm text-gray-700 mt-1">Return & Refund policy: 7 days replacement</p>
        </div>

        {/* Related products placeholder */}
        <div className="bg-white border rounded p-4 mt-4">
          <h3 className="font-bold">Frequently bought together</h3>
          <div className="mt-3 text-sm text-gray-600">— related product 1 —</div>
          <div className="mt-2 text-sm text-gray-600">— related product 2 —</div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
