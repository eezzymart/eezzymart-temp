"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

const fallbackColors = [
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-indigo-500 to-blue-600",
];

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        const cats = Array.isArray(d) ? d : d.categories || [];
        setCategories(cats.filter((c: Category & { parent?: string }) => !c.parent).slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff165d]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ff9a00]/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#ff165d] text-sm font-semibold tracking-widest uppercase mb-3">Browse Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] mx-auto rounded-full" />
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">Explore our carefully curated collection across all categories</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat._id}
              href={`/shop?category=${cat._id}`}
              className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Background */}
              {cat.image ? (
                <>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 group-hover:from-[#ff165d]/90 group-hover:via-[#ff165d]/40 transition-colors duration-500" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${fallbackColors[index % fallbackColors.length]} group-hover:scale-105 transition-transform duration-500`} />
              )}

              {/* Decorative ring */}
              <div className="absolute inset-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                <h3 className="font-bold text-sm md:text-base text-center mb-1 group-hover:-translate-y-3 transition-transform duration-300 drop-shadow-md">
                  {cat.name}
                </h3>
                <span className="text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  Shop Now <FiArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
