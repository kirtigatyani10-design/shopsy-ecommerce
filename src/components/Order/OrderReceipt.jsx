import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHeaders } from "../../utils/utils";

const OrderReceipt = () => {
  const { orderId } = useParams(); // ORDxxxx
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
        { headers: getHeaders() }
      );
      const data = await res.json();

      if (data.isSuccess) {
        setOrder(data.order);
      }
    } catch (err) {
      console.error("ORDER FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print(); // Google / browser print
  };

  if (loading) {
    return <p className="text-center mt-20">Loading order...</p>;
  }

  if (!order) {
    return <p className="text-center mt-20 text-red-500">Order not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 bg-primary/20 p-8 text-sm border">

      {/* HEADER */}
      <div className="mb-6 relative">
        <div>
          {/* CENTER TITLE */}
          <h1 className="text-xl text-primary font-semibold text-center">
            Order Receipt
          </h1>

          {/* CENTER STATUS */}
          <p
            className={`text-center font-medium mt-1 ${order.payment?.status === "FAILED"
                ? "text-red-500"
                : "text-green-600"
              }`}
          >
            Transaction {order.payment?.status === "FAILED" ? "Declined" : order.status}
          </p>
        </div>

        <div className="absolute top-0 right-0 flex gap-2">
          <button className="bg-primary hover:bg-primary/80 rounded px-3 py-1 text-xs">EMAIL</button>
          <button onClick={handlePrint} className="bg-primary hover:bg-primary/80 rounded px-3 py-1 text-xs">
            PRINT
          </button>
        </div>
      </div>

      {/* ORDER DETAILS */}
      <h3 className="text-xl font-semibold text-gray-950 mb-3">Order Details</h3>

      <div className="grid grid-cols-2 gap-10 mb-12">
        {/* BILL TO */}
        <div>
          <p className="text-xl font-semibold mb-1">Bill To</p>
          <p className="text-xl font-medium">{order.user.firstName} {order.user.lastName}</p>
          <p className="text-xl font-medium">{order.user.email}</p>
          <p>{order.user.phone}</p>
        </div>

        {/* ORDER INFO */}
        <div>
          <p><b className="font-semibold text-xl">Order ID:</b> {order.orderID}</p>
          <p>
            <b className="text-xl font-semibold">Order Date:</b>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p><b>Authorization Code:</b> {order.payment?.transactionID || "null"}</p>
        </div>
      </div>

      {/* ADDRESSES */}
      <div className="grid grid-cols-3 gap-10 mb-8">
        {/* BILLING */}
        <div>
          <p className="font-medium text-xl text-primary mb-1">Billing Address</p>
          <p>{order.shippingAddress.addressLine1}</p>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.state}</p>
          <p>{order.shippingAddress.postcode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        {/* SHIPPING */}
        <div>
          <p className="font-medium text-xl text-primary mb-1">Shipping Address</p>
          <p>{order.shippingAddress.addressLine1}</p>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.state}</p>
          <p>{order.shippingAddress.postcode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        {/* SHIPPER */}
        <div> 
          <p className="font-medium text-xl text-primary mb-1">Shipper</p>
          <p>shopsywhk</p>
          <p>Shipper Contact</p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="border-t-2 border-black py-3 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between py-1">
            <span className="text-gray-950 text-xl font-medium">{item.name}</span>
            <span className="text-xl font-medium">Qty: {item.quantity}</span>
            <span className="text-xl font-medium">₹{item.price}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="text-right border-t-2 border-black mb-6">
        <p className="text-xl">Subtotal: ₹{order.pricing.subtotal}</p>
        <p className="text-xl">Shipping: ₹{order.pricing.shippingFee}</p>
        <p className="font-semibold border-t-2 border-black mt-2 pt-2 text-xl">
          Total: ₹{order.pricing.total}
        </p>
      </div>

      {/* PAYMENT DETAILS */}
      <div className="bg-gray-100 p-4 mb-6">
        <h4 className="font-semibold text-xl mb-2">Payment Details</h4>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p><b>Type:</b> {order.payment.method}</p>
            <p><b>Amount:</b> ₹{order.pricing.total}</p>
            <p><b>Order ID:</b> {order.orderID}</p>
            <p className="text-red-500">
              Transaction {order.payment.status}
            </p>
            <p className="text-xs">
              Response Message: Cancelled. Transaction not allowed.
            </p>
          </div>

          <div>
            <p><b>Card Number:</b> **** **** 2345</p>
            <p><b>Account:</b> null</p>
            <p><b>Authorization Code:</b> null</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-4">
        <button className="bg-primary hover:bg-primary/80 rounded text-white px-6 py-2 text-sm">
          RETRY
        </button>
        <button
          onClick={() => navigate("/account?tab=orders")}
          className="bg-primary hover:bg-primary/80 rounded px-6 py-2 text-white text-sm"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default OrderReceipt;
