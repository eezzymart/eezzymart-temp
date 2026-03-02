"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white dark:bg-[#1a1d2e] shadow-2xl transform transition-transform duration-400 ease-out flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2d3148] bg-gradient-to-r from-[#ff165d] to-[#ff4d82]">
          <div className="flex items-center gap-3">
            <FiShoppingBag size={20} className="text-white" />
            <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-[#252840] flex items-center justify-center mb-5">
                <FiShoppingBag size={36} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Looks like you haven&apos;t added anything yet</p>
              <button
                onClick={closeDrawer}
                className="bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item, index) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 bg-gray-50 dark:bg-[#141622] rounded-xl relative group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-[#2d3148]">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <FiShoppingBag size={20} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 mb-1 pr-6">{item.name}</h4>
                    <p className="text-sm font-bold text-[#ff165d] mb-2">৳{item.price.toLocaleString()}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-white dark:bg-[#1a1d2e] rounded-lg border border-gray-200 dark:border-[#2d3148] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-800 dark:text-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition text-gray-600"
                          disabled={item.quantity >= item.stock}
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">×</span>
                      <span className="text-sm font-bold text-gray-700">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-200/60 flex items-center justify-center text-gray-400 hover:bg-red-100 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-[#2d3148] p-5 bg-white dark:bg-[#1a1d2e] space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal ({totalItems} items)</span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">৳{totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff165d]/25 transition-all active:scale-[0.98] text-sm"
              >
                Checkout
                <FiArrowRight size={16} />
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full bg-gray-100 dark:bg-[#252840] text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-[#2d3148] transition text-sm"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
