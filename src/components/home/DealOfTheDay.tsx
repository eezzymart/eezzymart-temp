"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiClock } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number;
  images: string[];
  stock: number;
}

export default function DealOfTheDay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const { addToCart } = useCart();
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    fetch("/api/products?sort=-comparePrice&limit=1")
      .then((r) => r.json())
      .then((d) => {
        if (d.products?.[0]) setProduct(d.products[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Countdown to midnight
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    updateTimer();
    intervalRef.current = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (!product) return null;

  const discount = product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff165d]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff9a00]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff165d]/20 to-[#ff9a00]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-square">
                  {product.images?.[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-contain rounded-2xl" />
                  )}
                </div>
              </Link>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-lg font-bold px-4 py-2 rounded-2xl shadow-lg">
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-[#ff9a00]/20 text-[#ff9a00] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              <FiClock size={14} />
              Deal of the Day
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {product.name}
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Grab this incredible deal before time runs out! Limited stock available.
            </p>

            {/* Timer */}
            <div className="flex gap-4 mb-8">
              {[
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[80px] border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-white font-mono">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-[#ff165d]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.comparePrice > product.price && (
                <span className="text-xl text-gray-400 line-through">
                  ৳{product.comparePrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => addToCart({ _id: product._id, name: product.name, price: product.price, image: product.images?.[0] || "", quantity: 1, stock: product.stock })}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#ff165d]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <FiShoppingCart size={20} />
                Add to Cart
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
