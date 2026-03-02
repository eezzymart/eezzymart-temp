"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=8")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff165d]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff9a00]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="inline-block text-[#ff165d] text-sm font-semibold tracking-widest uppercase mb-3">Handpicked for You</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] rounded-full mt-4" />
          </div>
          <Link
            href="/shop?featured=true"
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
