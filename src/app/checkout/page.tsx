"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Bangladesh",
    paymentMethod: "cod",
    notes: "",
  });

  const shippingCost = totalPrice >= 50 ? 0 : 5;
  const total = totalPrice + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
          shippingAddress: {
            address: form.address,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode,
            country: form.country,
          },
          items: items.map((i) => ({
            product: i._id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            image: i.image,
          })),
          subtotal: totalPrice,
          shippingCost,
          tax: 0,
          total,
          paymentMethod: form.paymentMethod,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        router.push(`/order-success?orderNumber=${data.orderNumber}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <a href="/shop" className="text-primary font-semibold hover:underline">Go to Shop</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-gray rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Shipping Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" name="customerName" value={form.customerName} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input type="tel" name="customerPhone" value={form.customerPhone} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State *</label>
                <input type="text" name="state" value={form.state} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code *</label>
                <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} required className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          <div className="border border-gray rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray rounded-lg cursor-pointer hover:border-primary transition">
                <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === "cod"} onChange={handleChange} className="text-primary" />
                <span className="font-medium text-sm">Cash on Delivery</span>
              </label>
            </div>
          </div>

          <div className="border border-gray rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Order Notes (Optional)</h2>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any special instructions..." className="w-full border border-gray rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="border border-gray rounded-xl p-6 sticky top-32">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded bg-gray-light flex-shrink-0 overflow-hidden">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-dark">{item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className="border-gray mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-dark">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-gray-dark">Shipping</span><span className="text-green-600">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span></div>
              <hr className="border-gray" />
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">${total.toFixed(2)}</span></div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiCheck /> {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
