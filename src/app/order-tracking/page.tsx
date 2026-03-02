"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiPackage } from "react-icons/fi";

interface Order {
  orderNumber: string;
  customerName: string;
  status: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: { address: string; city: string; state: string; zipCode: string; country: string };
}

const statusSteps = ["pending", "processing", "shipped", "delivered"];

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("orderNumber") || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/orders/${orderNumber.trim()}`);
      if (!res.ok) {
        setError("Order not found");
        setOrder(null);
      } else {
        setOrder(await res.json());
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Track Your Order</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter your order number (e.g., EM-XXXXX)"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 border border-gray rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
          />
          <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50">
            <FiSearch size={20} />
          </button>
        </form>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {order && (
          <div className="border border-gray rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-dark">Order Number</p>
                <p className="font-bold text-lg text-primary">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-dark">Order Date</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Status Steps */}
            {order.status !== "cancelled" ? (
              <div className="flex items-center justify-between mb-8">
                {statusSteps.map((step, i) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i <= currentStep ? "bg-primary text-white" : "bg-gray-light text-gray-dark"}`}>
                        {i <= currentStep ? "✓" : i + 1}
                      </div>
                      <p className="text-xs mt-1 capitalize">{step}</p>
                    </div>
                    {i < statusSteps.length - 1 && (
                      <div className={`h-1 flex-1 mx-1 rounded ${i < currentStep ? "bg-primary" : "bg-gray-light"}`} />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 mb-4">
                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold text-sm">Order Cancelled</span>
              </div>
            )}

            {/* Items */}
            <div className="space-y-3 mb-4">
              <h3 className="font-semibold">Items</h3>
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-gray last:border-0">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg border-t border-gray pt-3">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>

            <div className="mt-4 p-3 bg-gray-light rounded-lg text-sm">
              <div className="flex items-center gap-2 mb-1">
                <FiPackage className="text-primary" />
                <span className="font-semibold">Shipping Address</span>
              </div>
              <p className="text-gray-dark">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="animate-pulse h-40 bg-gray-light rounded-lg max-w-2xl mx-auto" /></div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
