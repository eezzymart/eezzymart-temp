"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number;
  images: string[];
  stock: number;
  ratings?: number;
  numReviews?: number;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?sort=-createdAt&limit=8")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-[#ff9a00]/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiStar className="text-[#ff9a00]" size={20} />
              <span className="text-[#ff9a00] text-sm font-semibold tracking-widest uppercase">Just In</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff9a00] to-[#ff165d] rounded-full mt-4" />
          </div>
          <Link
            href="/new-arrivals"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#ff165d] font-semibold hover:gap-3 transition-all group"
          >
            View All
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
