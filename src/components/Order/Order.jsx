import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = [
    {
      id: "ORD123456",
      date: "12 Sep 2025",
      status: "Delivered",
      total: 2797,
      items: [
        {
          name: "Kids Cotton T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
          qty: 1,
          price: 499,
        },
        {
          name: "Wireless Earbuds",
          image:
            "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
          qty: 2,
          price: 1599,
        },
      ],
    },
    {
      id: "ORD789012",
      date: "05 Sep 2025",
      status: "Pending",
      total: 1299,
      items: [
        {
          name: "Running Shoes",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          qty: 1,
          price: 1299,
        },
      ],
    },
  ];

  return (
    <div className="mt-0 mb-20 max-w-6xl mx-auto px-4">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-10 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-6 shadow-sm bg-white"
            >
              {/* ORDER HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-semibold">
                    {order.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>
                  <p className="font-medium">
                    {order.date}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b pb-4 last:border-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              {/* ORDER FOOTER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
                <p className="font-bold text-lg">
                  Total: ₹{order.total}
                </p>

                <Link
                  to={`/orders/${order.id}`}
                  className="bg-primary text-white px-6 py-2 rounded-md text-sm hover:opacity-90"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
