"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { FiTrendingUp } from "react-icons/fi";

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

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products?sort=-numReviews&limit=10")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-[#DEE7ED] dark:bg-[#0f1117] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff165d]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ff165d]/10 px-4 py-1.5 rounded-full mb-4">
            <FiTrendingUp className="text-[#ff165d]" size={16} />
            <span className="text-[#ff165d] text-sm font-semibold tracking-widest uppercase">Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Most Popular Products
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] rounded-full mt-4 mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
