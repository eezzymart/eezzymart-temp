"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <FiShoppingBag className="mx-auto text-gray mb-4" size={60} />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-dark mb-6">Looks like you haven&apos;t added anything yet</p>
        <Link href="/shop" className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="flex gap-4 p-4 border border-gray rounded-lg">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-light">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-dark">No Image</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">{item.name}</h3>
                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray rounded">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-light">
                      <FiMinus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-light">
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 transition">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-light rounded-xl p-6 sticky top-32">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-dark">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-dark">Shipping</span>
                <span className="font-semibold text-green-600">{totalPrice >= 50 ? "Free" : "$5.00"}</span>
              </div>
              <hr className="border-gray" />
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary">${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full bg-primary text-white text-center font-semibold py-3 rounded-lg hover:bg-primary-dark transition">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="block text-center text-sm text-gray-dark mt-3 hover:text-primary transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
