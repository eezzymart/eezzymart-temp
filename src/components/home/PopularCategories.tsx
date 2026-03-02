"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

const categoryIcons: Record<string, string> = {
  "grocery-food": "🛒",
  "fresh-produce": "🥬",
  "electronics": "💻",
  "fashion": "👗",
  "home-living": "🏠",
  "health-beauty": "💄",
  "baby-kids": "🧸",
  "sports-fitness": "⚽",
  "books-stationery": "📚",
  "mobile-accessories": "📱",
};

const categoryColors: Record<string, string> = {
  "grocery-food": "from-green-500/20 to-green-600/5",
  "fresh-produce": "from-lime-500/20 to-lime-600/5",
  "electronics": "from-blue-500/20 to-blue-600/5",
  "fashion": "from-pink-500/20 to-pink-600/5",
  "home-living": "from-amber-500/20 to-amber-600/5",
  "health-beauty": "from-purple-500/20 to-purple-600/5",
  "baby-kids": "from-rose-500/20 to-rose-600/5",
  "sports-fitness": "from-emerald-500/20 to-emerald-600/5",
  "books-stationery": "from-cyan-500/20 to-cyan-600/5",
  "mobile-accessories": "from-indigo-500/20 to-indigo-600/5",
};

export default function PopularCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || d || []))
      .catch(() => {});
  }, []);

  if (!categories.length) return null;

  return (
    <section className="py-14 md:py-20 bg-white dark:bg-[#0f1117]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-[#ff165d] to-[#ff9a00] text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            Browse
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you need
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[cat.slug] || "from-gray-500/20 to-gray-600/5"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-6 text-center">
                {/* Icon or image */}
                {cat.image ? (
                  <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[cat.slug] || "📦"}
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#ff165d] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  Shop Now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
